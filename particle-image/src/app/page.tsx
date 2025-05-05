"use client";
import { useState, useCallback } from "react";
import ParticleImage from "./components/particle";
import ImageControls from "./components/ImageControls";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Index() {
  const [imageUrl, setImageUrl] = useState<string>("/image.jpg");
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [key, setKey] = useState<number>(0);

  const handleImageUpload = useCallback((url: string) => {
    setImageUrl(url);
    resetAnimation();
    toast.success("Image loaded successfully");
  }, []);

  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    // Use a new key to force remount of the component
    setKey((prev) => prev + 1);

    // Short delay to ensure component unmounts before remounting
    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold">Particle Image Reveal</h1>
        <p className="text-sm text-muted-foreground">
          Click the image when formed to reset
        </p>
      </div>

      <div
        className={cn(
          "flex-1 relative overflow-hidden",
          !isAnimating && "opacity-0 transition-opacity duration-500"
        )}
      >
        {isAnimating && (
          <div key={key} className="w-full h-full">
            <ParticleImage imageUrl={imageUrl} onReset={resetAnimation} />
          </div>
        )}
      </div>

      <div className="p-4 bg-background">
        <ImageControls
          onImageUpload={handleImageUpload}
          onReset={resetAnimation}
          defaultImage="/placeholder.svg"
        />
      </div>
    </div>
  );
}
