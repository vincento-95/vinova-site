"use client";

interface ScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ScrollLink({
  href,
  children,
  className = "",
  onClick,
}: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      // On est sur la homepage, scroll direct
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
      onClick?.();
    } else {
      // On est sur une autre page, naviguer vers /#section
      e.preventDefault();
      window.location.href = `/${href}`;
    }
  };

  return (
    <a href={`/${href}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
