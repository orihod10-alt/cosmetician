export function FadingVideo({ src }: { src: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 0, backgroundColor: "oklch(8% 0.008 65)" }}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
