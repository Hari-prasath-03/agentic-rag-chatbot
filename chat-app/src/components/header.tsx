import { BrainCircuit, LogOut } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
  login: () => void;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  username,
  login,
  logout,
}) => {
  return (
    <header className="border-b border-bg-accent bg-bg-sec">
      <div className="max-w-344.5 mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary">
            <BrainCircuit size={24} className="text-text" />
          </div>
          <h1 className="text-lg font-semibold">Envoy AIagent</h1>
        </div>

        {!isLoggedIn && !username ? (
          <button
            onClick={login}
            className="px-5 py-1.5 rounded-lg font-medium transition-colors bg-primary hover:bg-primary-hover text-text"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full flex items-center justify-center bg-primary">
              {username && username.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-lg transition-colors hover:bg-bg-accent"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
