import { useState } from "react";

interface Options {
  closeOnBackdropClick?: boolean;
  backgroundColor?: string;
}

export default function usePopupModel(options?: Options) {
  const {
    closeOnBackdropClick = true,
    backgroundColor = "rgba(0, 0, 0, 0.5)",
  } = options || {};
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const Backdrop = ({ children }: { children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
      <div
        onClick={(e) =>
          closeOnBackdropClick && e.target === e.currentTarget && close()
        }
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor }}
      >
        {children}
      </div>
    );
  };

  return [open, Backdrop, close, isOpen] as const;
}
