"use client";
import { useState, useEffect, useRef } from "react";
import { ButtonFullScreen } from "@/components/button";
import Image from "next/image";

// Definição do tipo para os objetos de vídeo
interface VideoItem {
  url: string;
}

const videos: VideoItem[] = [
  {
    url: "video.mp4",
  },
];

export default function Home() {
  const [isPause, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePause() {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    }
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-black"
      onClick={handlePause}
    >
      <video
        ref={videoRef}
        src={videos[0].url}
        autoPlay
        muted
        loop={true} // removido o loop para permitir a troca
        playsInline
        preload="metadata"
        className="w-full h-screen object-cover"
      />

      {isPause && (
        <Image
          src="/play.svg"
          alt="Ícone de Play"
          width={200}
          height={200}
          className="absolute w-1/3 z-20 inset-0 m-auto"
        />
      )}

      <ButtonFullScreen />
    </main>
  );
}
