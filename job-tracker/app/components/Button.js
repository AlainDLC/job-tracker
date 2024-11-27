import className from "classnames";

export default function Button({
  children,
  onClick,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
}) {
  //1st arg:: for all variations.
  const classes = className("px-3  border", {
    "bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-400  ": primary,
    "border-gray-900 bg-gray-900 text-white": secondary,
    "border-green-500 bg-green-500 text-white": success,
    "border-yellow-400 bg-yellow-400 text-white": warning,
    "border-red-500 bg-red-500 text-white": danger,
    "rounded-full": rounded,
    "bg-white": outline,
    "text-blue-500": outline && primary,
    "text-gray-900": outline && secondary,
    "text-green-500": outline && success,
    "text-yellow-500": outline && warning,
    "text-red-500": outline && danger,
  });

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, danger, warning }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!danger) +
      Number(!!warning);
    if (count > 1) {
      return new Error("Only one of p, s, w , s ,d can be true");
    }
  },
};
