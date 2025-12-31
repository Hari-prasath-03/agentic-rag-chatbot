interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className={`w-full py-1.5 rounded-lg font-medium transition-all ${
        props.disabled
          ? "bg-bg-accent/80 text-text/60 cursor-not-allowed"
          : "bg-primary hover:bg-primary-hover text-text"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
