// src/components/Badge.tsx

/**
 * Badge Component
 * Displays a badge with customisable background and text colours.
 * Optionally, it can be marked as active to modify its appearance.
 *
 * @component
 * @example
 * const bgColor = "bg-primary";
 * const textColor = "text-white";
 * const isActive = true;
 * return (
 *  <Badge bgColor={bgColor} textColor={textColor} active={isActive} ariaLabel="Example Badge">
 *     Example Badge
 *  </Badge>
 * );
 */

/**
 * Properties for the Badge Component
 *
 * Defines the props accepted by the Badge component to customise its appearance.
 *
 * @interface
 */

export interface BadgeProps {
  /** The content to be displayed inside the badge */
  children: React.ReactNode;
  /** Background color of the badge, expected to match a Tailwind CSS color class */
  bgColor?: string;
  /** Text color of the badge, expected to match a Tailwind CSS color class */
  textColor?: string;
  /** Determines if the badge is in its active state, affecting its opacity */
  active?: boolean;
  // Adds an accessibility label to the component
  ariaLabel?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  bgColor = "bg-primary",
  active = false,
  ariaLabel = "Badge",
}) => {
  return (
    <span
      className={`${active ? bgColor : " opacity-10"} ${
        active ? "text-white" : "text-neutral-lightGrey opacity-50"
      } p-1 rounded text-xs`}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
};

export default Badge;
