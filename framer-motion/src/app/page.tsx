import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-[8rem] font-bold">Hello, World</h1>
      </main>
      <button>
        <Link href={"./BasicsOfMotion"}>BasicsOfMotion</Link>
      </button>
      <button>
        <Link href={"./Gestures"}>Gestures</Link>
      </button>
      <button>
        <Link href={"./AnimationControls"}>AnimationControls</Link>
      </button>
      <button>
        <Link href={"./ViewBasedAnimation"}>ViewBasedAnimation</Link>
      </button>
      <button>
        <Link href={"./ScrollAnimations"}>ScrollAnimations</Link>
      </button>
    </div>
  );
}
