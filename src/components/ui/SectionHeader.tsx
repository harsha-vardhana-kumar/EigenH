import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Plain semantic markup. Entrance animations are added by the parent
 * section's GSAP timeline using [data-anim] hooks below.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: Props) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow ? (
        <span className="eyebrow" data-anim="header-eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-clinical-green" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`section-title ${eyebrow ? "mt-4" : ""}`}
        data-anim="header-title"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`section-sub ${isCenter ? "mx-auto" : ""}`}
          data-anim="header-desc"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
