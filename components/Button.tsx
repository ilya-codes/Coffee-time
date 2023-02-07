interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  dark?: boolean;
  small?: boolean;
  wide?: boolean;
  center?: boolean;
  disabled?: boolean;
  onClick?: (e: React.FormEvent) => void;
}

const Button = ({
  children,
  type,
  dark,
  small,
  wide,
  center,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${center && "mx-auto"} ${
        small ? "min-w-[4rem] px-3 py-1 text-sm" : "min-w-[8rem] py-2 px-6"
      } ${wide && " pl-12 pr-12"} ${
        dark
          ? "border-green-900 text-green-900 hover:bg-green-900 hover:text-white disabled:hover:bg-white disabled:hover:text-green-900"
          : "border-white text-white hover:bg-white hover:text-green-900"
      } h-10 max-w-max rounded-lg border font-semibold shadow-inner transition-all duration-200 ease-in-out`}
    >
      {children}
    </button>
  );
};

export default Button;
