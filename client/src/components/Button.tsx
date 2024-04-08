// src/components/Button.tsx

/**
 * Button Component
 * Display a button with a customisable title attribute
 * Optionally, it can handle onClick events, children, extra classes and a disabled state
 *
 * @component
 * @example
 * const buttonTitle = "My button title";
 * const handleClick = () => { console.log('button clicked')};
 * const isDisabled = false;
 * return (
 *  <Button title={buttonTitle} onClick={handleClick} extraClasses="fizz buzz" isDisabled>
 *    Click me, as children
 *  </Button>
 * )
 */

/** Properties for the Button component
 *
 * Defines the props accepted by the Button component to customise it's appearance.
 *
 * @interface
 */

export interface ButtonProps {
  /**
   * Function to handle click events on the button.
   * @param event - The mouse event triggered on button click.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** The content to be displayed inside the button. Can be text, icons, or any React node. */
  children?: React.ReactNode;
  /** Text for the button's title attribute. Provides additional information on hover. */
  title?: string;
  /** Indicates if the button should be disabled. A disabled button is unclickable and visually distinct. */
  isDisabled?: boolean;
  /** Additional CSS classes for custom styling. Can be used to apply utility classes or custom styles. */
  extraClasses?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  title = "default title",
  isDisabled = false,
  extraClasses = "",
}) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`p-1 px-2 flex rounded bg-primary ${extraClasses}`}
        title={title}
        disabled={isDisabled}
        name={title}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
