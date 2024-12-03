import className from "classnames";

export default function Button({
  children,
  onClick,
  primary,
  secondary,
  success,
  test,
  warning,
  danger,
  outline,
  rounded,
}) {
  //1st arg:: for all variations.
  const classes = className(
    "mt-2 py-3 mr-2 w-25 text-center text-sm py-1 px-2 sm:text-base sm:py-2 sm:px-4",
    {
      "bg-blue-400 text-black py-2 px-4 rounded hover:bg-blue-500 text-white  ":
        primary,
      "bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 text-white ":
        secondary,
      "bg-green-400 text-black py-2 px-4 rounded hover:bg-green-500 text-white":
        success,
      "bg-orange-200 text-black py-2 px-4 rounded hover:bg-orange-300 text-white":
        test,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "bg-red-400 text-black py-2 px-4 rounded hover:bg-red-500 text-white":
        danger,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-500": outline && warning,
      "text-red-500": outline && danger,
    }
  );

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
