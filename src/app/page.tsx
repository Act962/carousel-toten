import { ButtonFullScreen } from "@/components/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <video
        src="video_act_apresntation.mp4" // coloque seu vídeo dentro da pasta public
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-screen object-cover"
      />

      <ButtonFullScreen />
    </main>
  );
}
