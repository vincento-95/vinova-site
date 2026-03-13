interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bgColor?: "bg" | "surface" | "accent" | "wine";
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  bgColor = "bg",
}: SectionWrapperProps) {
  const bgClasses: Record<string, string> = {
    bg: "bg-bg",
    surface: "bg-surface",
    accent: "bg-accent",
    wine: "bg-wine text-white",
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-6 md:px-12 lg:px-20 ${bgClasses[bgColor]} ${className}`}
    >
      <div className="mx-auto max-w-6xl scroll-animate">{children}</div>
    </section>
  );
}
