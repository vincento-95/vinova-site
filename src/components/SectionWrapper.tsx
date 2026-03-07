interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bgColor?: "cream" | "white" | "wine";
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  bgColor = "cream",
}: SectionWrapperProps) {
  const bgClasses: Record<string, string> = {
    cream: "bg-cream",
    white: "bg-white",
    wine: "bg-wine text-white",
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-6 md:px-12 lg:px-20 ${bgClasses[bgColor]} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
