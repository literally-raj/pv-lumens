export default function VideoSection() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="relative aspect-video w-full max-w-350 mx-auto">
        <video
          className="h-full w-full object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
