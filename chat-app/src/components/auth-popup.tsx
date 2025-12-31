import { useState } from "react";
import { Mail, User } from "lucide-react";
import Input from "./input";
import PasswordInput from "./password-field";
import ErrorMessage from "./error-message";
import Button from "./button";
import { login, signup } from "../api";
import toast from "react-hot-toast";

type AuthOptions = "login" | "signup";

const AuthPopup = ({ closePopup }: { closePopup: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthOptions>("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    setIsLoading(true);
    login(formData.email, formData.password)
      .then((res) => {
        toast.success(res.message || "Logged in successfully!");
        localStorage.setItem("token", res.token);
        setIsLoading(false);
        closePopup();
      })
      .catch((err) => {
        toast.error(err.message || "Login failed!");
        setIsLoading(false);
      });
  };

  const handleSignup = () => {
    setIsLoading(true);
    signup(formData.name, formData.email, formData.password)
      .then((res) => {
        toast.success(res.message || "Signed up successfully!");
        setIsLoading(false);
        closePopup();
      })
      .catch((err) => {
        toast.error(err.message || "Signup failed!");
        setIsLoading(false);
      });
  };

  const onTabChange = (value: AuthOptions) => setActiveTab(value);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      {activeTab === "login" ? (
        <LoginPopup
          isLoading={isLoading}
          onAction={handleLogin}
          email={formData.email}
          onChange={handleChange}
          password={formData.password}
          switchTo={() => onTabChange("signup")}
        />
      ) : (
        <SignupPopup
          isLoading={isLoading}
          onAction={handleSignup}
          name={formData.name}
          email={formData.email}
          password={formData.password}
          onChange={handleChange}
          switchTo={() => onTabChange("login")}
        />
      )}
    </div>
  );
};

export default AuthPopup;

interface FormPopupProps {
  isLoading: boolean;
  name: string;
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  switchTo: () => void;
  onAction: () => void;
}

const SignupPopup: React.FC<FormPopupProps> = ({
  isLoading,
  name,
  email,
  password,
  onChange,
  switchTo,
  onAction,
}) => {
  return (
    <div className="space-y-4 p-5 pt-6.5">
      <Input
        name="name"
        value={name}
        onChange={onChange}
        label="Full Name"
        placeholder="Enter your name"
        icon={
          <User size={18} className="absolute left-3 top-3 text-neutral-500" />
        }
      />

      <Input
        name="email"
        value={email}
        onChange={onChange}
        label="Email Address"
        placeholder="user@example.com"
        icon={
          <Mail size={18} className="absolute left-3 top-3 text-neutral-500" />
        }
      />

      <PasswordInput
        name="password"
        value={password}
        label="Password"
        onChange={onChange}
        placeholder="••••••••"
        helperText="At least 8 characters"
      />

      <ErrorMessage message="" />

      <Button onClick={onAction} disabled={isLoading}>
        Sign Up
      </Button>

      <p className="text-text-muted text-sm text-center">
        Already have an account?{" "}
        <button className="text-primary hover:underline" onClick={switchTo}>
          Log In
        </button>
      </p>
    </div>
  );
};

const LoginPopup: React.FC<Omit<FormPopupProps, "name">> = ({
  isLoading,
  email,
  password,
  onChange,
  switchTo,
  onAction,
}) => {
  return (
    <div className="space-y-4 p-5 pt-6.5">
      <Input
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Enter your email"
        label="Email Address"
        icon={
          <Mail size={18} className="absolute left-3 top-3 text-neutral-500" />
        }
      />

      <PasswordInput
        name="password"
        value={password}
        onChange={onChange}
        label="Password"
        placeholder="••••••••"
        helperText="At least 8 characters"
      />

      <ErrorMessage message="" />

      <Button onClick={onAction} disabled={isLoading}>
        Log In
      </Button>

      <p className="text-text-muted text-sm text-center">
        Don't have an account?{" "}
        <button className="text-primary hover:underline" onClick={switchTo}>
          Sign Up
        </button>
      </p>
    </div>
  );
};
