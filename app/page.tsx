import Image from "next/image";
import { ThemeToggle } from "@/components/toggle-theme";
import BuildPassword from "@/hooks/BuildPassword";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ThemeToggle />
        <h1 className="font-bold text-3xl">
          Type your password, select your hash options, and watch the result 🔥
        </h1>
        <div className="flex flex-col max-w-2xl mx-auto py-1O px-4">
          <BuildPassword />
        </div>
      </div>
    </div>
  );
}
