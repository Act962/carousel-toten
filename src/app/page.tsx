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
    url: "game-1/1.mp4",
  },
  {
    url: "game-1/2.mp4",
  },
  {
    url: "game-1/3.mp4",
  },
  {
    url: "game-1/4.mp4",
  },
  {
    url: "game-1/5.mp4",
  },
  {
    url: "game-1/6.mp4",
  },
  {
    url: "game-1/7.mp4",
  },
  {
    url: "game-1/8.mp4",
  },
  {
    url: "game-1/9.mp4",
  },
  {
    url: "game-2/1.mp4",
  },
  {
    url: "game-2/2.mp4",
  },
  {
    url: "game-2/3.mp4",
  },
  {
    url: "game-2/4.mp4",
  },
  {
    url: "game-2/5.mp4",
  },
];

export default function Home() {
  const [isPause, setIsPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
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

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = (): void => {
      // Alterna para o próximo vídeo quando o atual terminar
      setCurrentVideoIndex((prevIndex: number) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    };

    const handleLoadedMetadata = (): void => {
      // Define a duração do vídeo baseada nos dados do objeto
      // const currentVideo: VideoItem = videos[currentVideoIndex];
      // if (video && currentVideo.duration) {
      //   // Opcional: você pode usar a duração definida ou a duração real do arquivo
      //   console.log(
      //     `Vídeo carregado: ${currentVideo.url}, duração: ${currentVideo.duration}s`
      //   );
      // }
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Cleanup dos event listeners
      return (): void => {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [videos, currentVideoIndex]);

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-black"
      onClick={handlePause}
    >
      <video
        ref={videoRef}
        src={videos[currentVideoIndex].url}
        autoPlay
        muted
        loop={false} // removido o loop para permitir a troca
        playsInline
        preload="metadata"
        className="w-full h-screen object-cover"
        key={currentVideoIndex} // força re-render quando muda o vídeo
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
