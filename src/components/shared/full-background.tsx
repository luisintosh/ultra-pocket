function FullBackground() {
  return (
    <video
      className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-10 grayscale"
      muted
      autoPlay
      loop
    >
      <source src="/bg.mp4" type="video/mp4" />
    </video>
  );
}

export default FullBackground;
