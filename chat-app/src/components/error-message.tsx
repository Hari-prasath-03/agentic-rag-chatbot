interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg">
      <p className="text-sm text-red-400">{message}</p>
    </div>
  );
};

export default ErrorMessage;
