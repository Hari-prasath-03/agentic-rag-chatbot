import { Toaster } from "react-hot-toast";
import ChatInterface from "./pages/chat-interface";

function App() {
  return (
    <>
      <ChatInterface />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
