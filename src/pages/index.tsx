import { Inter } from "next/font/google";
import HeaderComp from "@/components/Headercomp";
import CalcComp from "@/components/CalcComp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-yellow-50 py-10 h-[100vh]">
      <HeaderComp />
      <CalcComp />
    </main>
  );
}
