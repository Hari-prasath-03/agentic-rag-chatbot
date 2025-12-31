import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  helperText?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  helperText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label className="block text-sm text-text-muted mb-2">
        {label}
      </label>
      <div className="relative">
        <Lock size={18} className="absolute left-3 top-3 text-text/70" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          className="w-full pl-10 pr-10 py-2 bg-bg-accent border border-bg-sec rounded-lg text-text placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-text/70 hover:text-text transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {helperText && (
        <p className="text-xs text-neutral-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default PasswordInput;
