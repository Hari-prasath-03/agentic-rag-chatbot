import { BrainCircuit } from "lucide-react";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-start">
      <div className="flex flex-col gap-2 items-start">
        <div className="rounded-lg flex items-center gap-3">
          <div className="size-8 rounded-full flex items-center justify-center bg-primary shrink-0">
            <BrainCircuit size={20} className="text-white" />
          </div>

          <div className="flex items-center gap-1">
            {[0, 150, 300].map((delay) => (
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
