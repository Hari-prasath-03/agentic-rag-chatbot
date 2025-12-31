interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  icon: React.ReactNode;
}
const Input: React.FC<InputProps> = ({ label, value, icon, ...props }) => {
  return (
    <div>
      <label className="block text-sm text-text-muted mb-2">
        {label}
      </label>
      <div className="relative">
        {icon}
        <input
          value={value}
          className="w-full pl-10 pr-4 py-2 bg-bg-accent border border-bg-sec rounded-lg text-text placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
