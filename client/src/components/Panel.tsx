// src/components/Panel.tsx

/**
 * Panel Component
 * Provides a presentational wrapper for all the data panels
 *
 * @component
 * @example
 * return (
 *  <Panel flexDirection="col" extraClasses="fizz buzz" itemsCentered>
 *     any child content
 *  </Panel>
 * );
 */

/**
 * Properties for the Panel Component
 *
 * Defines the props accepted by the Panel component to customise its appearance.
 *
 * @interface
 */

export interface PanelProps {
  /** The content to be displayed inside the panel */
  children: React.ReactNode;
  /** Additional CSS classes for custom styling. Can be used to apply utility classes or custom styles. */
  extraClasses?: string;
  /**
   * Determines the direction of the flex layout. Defaults to "col".
   * - "col" for column layout
   * - "row" for row layout
   */
  flexDirection?: "col" | "row";
  /**
   * Indicates if the content should be centered within the panel.
   * Alignment is horizontal when flexDirection is "col", and vertical when "row".
   */
  itemsCentered?: boolean;
  /** passing through data-testid for testing */
  dataTestId?: string;
}

const Panel: React.FC<PanelProps> = ({
  children,
  extraClasses = "",
  flexDirection = "col",
  itemsCentered = false,
  dataTestId = "",
}) => {
  return (
    <section
      data-testid={dataTestId}
      className={`c-panel flex flex-${flexDirection} ${
        itemsCentered && "items-center"
      } justify-between gap-4 ${extraClasses}`}
    >
      {children}
    </section>
  );
};

export default Panel;

// TODO - consider classnames utility
// TODO - consider justify-between as a prop, to switch between between and around
