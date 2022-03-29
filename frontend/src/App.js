import { Route, Routes } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/create" element={<CreateNote />} />
      <Route path="/create/:id" element={<CreateNote />} />
    </Routes>
  );
}

export default App;
