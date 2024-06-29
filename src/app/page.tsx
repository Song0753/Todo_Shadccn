import Image from "next/image";
import { Button } from "@/components/ui/button";
import Background from "@/components/ui/Background";
import Greeting from "@/components/ui/Greeting";

export default function Home() {
  return (
    <div>
      <Background />
      <Greeting />
    </div>
  );
}
