"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Constants
const PARTICLE_COUNT = 500000;

// Generate position and UV buffers based on image content
function generateParticles(texture: THREE.Texture): {
  positions: Float32Array;
  uvs: Float32Array;
  colors: Float32Array;
  originalPositions: Float32Array;
} {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
  const uvs = new Float32Array(PARTICLE_COUNT * 2);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  // Create a canvas to sample the image
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  // Set canvas dimensions based on texture
  const width = texture.image.width;
  const height = texture.image.height;
  canvas.width = width;
  canvas.height = height;

  // Calculate aspect ratio to maintain image proportions
  const aspectRatio = width / height;
  const scaleX = aspectRatio >= 1 ? 1 : aspectRatio;
  const scaleY = aspectRatio >= 1 ? 1 / aspectRatio : 1;

  // Draw the image to the canvas
  ctx.drawImage(texture.image, 0, 0, width, height);

  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height).data;

  // Sample points based on image content
  const sampledPoints: Array<{
    x: number;
    y: number;
    u: number;
    v: number;
    color: [number, number, number];
  }> = [];

  // Sample the image to find important pixels
  const sampleStep = Math.max(
    1,
    Math.floor(Math.sqrt((width * height) / PARTICLE_COUNT / 2))
  );

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const i = (y * width + x) * 4;
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];

      // Skip transparent pixels
      if (a < 128) continue;

      // Calculate brightness
      const brightness = r + g + b;

      // Higher probability for brighter/more distinct pixels
      if (Math.random() < (brightness / 765) * 0.8 + 0.2) {
        // Convert to normalized coordinates (-1 to 1) with aspect ratio correction
        const normalizedX = ((x / width) * 2 - 1) * scaleX;
        const normalizedY = -((y / height) * 2 - 1) * scaleY; // Flip Y to match WebGL coordinates

        // UV coordinates (0 to 1)
        const u = x / width;
        const v = y / height;

        sampledPoints.push({
          x: normalizedX,
          y: normalizedY,
          u,
          v: 1 - v, // Flip the v coordinate to correct the upside-down issue
          color: [r / 255, g / 255, b / 255],
        });
      }
    }
  }

  // If we have more sampled points than our particle count, randomly select some
  let pointsToUse = sampledPoints;
  if (sampledPoints.length > PARTICLE_COUNT) {
    pointsToUse = [];
    const step = sampledPoints.length / PARTICLE_COUNT;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const index = Math.floor(i * step);
      pointsToUse.push(sampledPoints[index]);
    }
  }

  // Fill our buffers
  for (let i = 0; i < Math.min(PARTICLE_COUNT, pointsToUse.length); i++) {
    const point = pointsToUse[i];

    // Target position (where particles will condense to)
    positions[i * 3] = point.x;
    positions[i * 3 + 1] = point.y;
    positions[i * 3 + 2] = 0;

    // Original scattered position
    const randomAngle = Math.random() * Math.PI * 2;
    const randomRadius = Math.random() * 3;
    originalPositions[i * 3] = point.x + Math.cos(randomAngle) * randomRadius;
    originalPositions[i * 3 + 1] =
      point.y + Math.sin(randomAngle) * randomRadius;
    originalPositions[i * 3 + 2] = (Math.random() - 0.5) * 2; // Add some depth

    // UV coordinates for texture sampling
    uvs[i * 2] = point.u;
    uvs[i * 2 + 1] = point.v;

    // Particle colors
    colors[i * 3] = point.color[0];
    colors[i * 3 + 1] = point.color[1];
    colors[i * 3 + 2] = point.color[2];
  }

  // If we have fewer sampled points than our particle count, fill the rest with random values
  for (let i = pointsToUse.length; i < PARTICLE_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();

    positions[i * 3] = (u - 0.5) * 2;
    positions[i * 3 + 1] = (v - 0.5) * 2;
    positions[i * 3 + 2] = 0;

    originalPositions[i * 3] = (u - 0.5) * 4;
    originalPositions[i * 3 + 1] = (v - 0.5) * 4;
    originalPositions[i * 3 + 2] = (Math.random() - 0.5) * 2;

    uvs[i * 2] = u;
    uvs[i * 2 + 1] = v;

    colors[i * 3] = 1;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 1;
  }

  return { positions, uvs, colors, originalPositions };
}

// GLSL Shaders
const vertexShader = `
  uniform float uProgress;
  uniform float uSize;
  attribute vec2 aUv;
  attribute vec3 aColor;
  attribute vec3 aOriginalPosition;
  varying vec2 vUv;
  varying vec3 vColor;
  
  void main() {
    vUv = aUv;
    vColor = aColor;
    
    // Mix between original scattered position and target position
    vec3 pos = mix(aOriginalPosition, position, uProgress);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (1.0 - 0.5 * (1.0 - uProgress)); // Particles grow slightly as they form the image
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform bool uUseTextureColors;
  uniform float uProgress;
  varying vec2 vUv;
  varying vec3 vColor;
  
  void main() {
    // Ensure we're using the correct UV coordinates
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Use either the texture color or the sampled color
    vec4 finalColor = uUseTextureColors ? texColor : vec4(vColor, texColor.a);
    
    // Create circular particles
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) {
      discard;
    }
    
    // Transition to full image based on progress
    gl_FragColor = mix(finalColor, texColor, uProgress);
  }
`;

// Points component rendered inside Canvas
function ParticlePoints({
  imageUrl,
  onAnimationComplete,
}: {
  imageUrl: string;
  onAnimationComplete: () => void;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const texture = useTexture(imageUrl);
  const [buffers, setBuffers] = useState<{
    positions: Float32Array;
    uvs: Float32Array;
    colors: Float32Array;
    originalPositions: Float32Array;
  } | null>(null);
  const { size } = useThree();
  const animationCompleted = useRef(false);

  // Calculate appropriate particle size based on screen resolution
  const particleSize = useMemo(() => {
    const aspectRatio = size.width / size.height;
    return 3 * (aspectRatio > 1 ? 1 : aspectRatio);
  }, [size]);

  // Generate particles once texture is loaded
  useEffect(() => {
    if (texture && texture.image) {
      // Fix aspect ratio issues by adjusting the texture
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      animationCompleted.current = false;

      const newBuffers = generateParticles(texture);
      setBuffers(newBuffers);
    }
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTexture: { value: texture },
      uSize: { value: particleSize },
      uUseTextureColors: { value: true },
    }),
    [texture, particleSize]
  );

  // Animation
  useFrame((_, delta) => {
    if (uniforms.uProgress.value < 1) {
      uniforms.uProgress.value = Math.min(
        1,
        uniforms.uProgress.value + delta * 0.5
      );

      // When animation completes, call the completion handler
      if (!animationCompleted.current && uniforms.uProgress.value >= 0.99) {
        animationCompleted.current = true;
        setTimeout(() => {
          onAnimationComplete();
        }, 200); // Short delay before showing the original image
      }
    }
  });

  if (!buffers) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[buffers.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aOriginalPosition"
          args={[buffers.originalPositions, 3]}
        />
        <bufferAttribute attach="attributes-aUv" args={[buffers.uvs, 2]} />
        <bufferAttribute
          attach="attributes-aColor"
          args={[buffers.colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleImage({
  imageUrl,
  onReset,
}: {
  imageUrl: string;
  onReset: () => void;
}) {
  const [showOriginalImage, setShowOriginalImage] = useState(false);

  const handleAnimationComplete = () => {
    setShowOriginalImage(true);
  };

  const handleCanvasClick = () => {
    if (showOriginalImage) {
      setShowOriginalImage(false);
      onReset();
    }
  };

  return (
    <div className="w-full h-full relative" onClick={handleCanvasClick}>
      {!showOriginalImage && (
        <Canvas camera={{ position: [0, 0, 3] }}>
          <color attach="background" args={["#000"]} />
          <ParticlePoints
            imageUrl={imageUrl}
            onAnimationComplete={handleAnimationComplete}
          />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      )}

      {showOriginalImage && (
        <div className="absolute inset-0 flex items-center justify-center fade-in">
          <img
            src={imageUrl}
            alt="Original"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
