import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Routes>
      {/* A public route for the login page */}
      <Route path="/" element={<LoginPage />} />

      {/* All other routes are handled by the protected layout */}
      {/* <Route path="/*" element={<ProtectedLayout />} /> */}
    </Routes>
  );
}

export default App;
