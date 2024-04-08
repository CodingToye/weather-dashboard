// src/components/CustomTooltip.tsx

/**
 * CustomTooltip Component
 * Displays a custom tooltip for charts
 *
 * @component
 * @example
 * <ToolTip> is a Recharts component - https://recharts.org/en-US/api/Tooltip
 * return (
 *  <Tooltip
      content={<CustomTooltip category="Wind" unit={speedUnit} />}
    />
 * );
 */

/**
 * Properties for the CustomTooltip Component
 *
 * Defines the props accepted by the CustomTooltip component to customise its appearance.
 *
 * @interface
 */

export interface TooltipPayload {
  /** value from the payload */
  value?: string | number;
}

export interface CustomTooltipProps {
  /** Payload object */
  payload?: TooltipPayload[];
  /** Label for the custom tooltip */
  label?: string;
  /** current active unit */
  unit?: string;
  /** Catergory of the chart the tooltip is for */
  category?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  payload,
  label,
  category,
  unit,
}) => {
  if (!payload || payload.length === 0) return null;
  const value = payload[0].value;
  const formatValue = (value: string | number | undefined) => {
    if (typeof value === "number") {
      return value.toFixed(0);
    } else if (typeof value === "string") {
      return value;
    }
    return "N/A";
  };
  return (
    <div className="bg-primary text-white px-4 py-1 rounded shadow-lg">
      <p className="text-xs">
        {category && `${category} `}
        {label && `${label}: `}
        {`${formatValue(value)}${unit ? ` ${unit}` : ""}`}
      </p>
    </div>
  );
};

export default CustomTooltip;
