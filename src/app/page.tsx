"use client";
import { useState, useEffect, useRef } from "react";
import { ButtonFullScreen } from "@/components/button";

// Definição do tipo para os objetos de vídeo
interface VideoItem {
  url: string;
  duration: number; // duração em segundos
}

export default function Home() {
  const videos: VideoItem[] = [
    {
      url: "caju_pro_portfólio_reels.mp4",
      duration: 35, // duração em segundos
    },
    {
      url: "video_act_apresntation.mp4",
      duration: 29, // duração em segundos
    },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      const currentVideo: VideoItem = videos[currentVideoIndex];
      if (video && currentVideo.duration) {
        // Opcional: você pode usar a duração definida ou a duração real do arquivo
        console.log(
          `Vídeo carregado: ${currentVideo.url}, duração: ${currentVideo.duration}s`
        );
      }
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

  // Alternativa: trocar vídeo em intervalo fixo (descomente se preferir)
  /*
  useEffect(() => {
    const interval = setInterval((): void => {
      setCurrentVideoIndex((prevIndex: number) => 
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // troca a cada 10 segundos

    return (): void => clearInterval(interval);
  }, [videos.length]);
  */

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
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

      <ButtonFullScreen />
    </main>
  );
}
