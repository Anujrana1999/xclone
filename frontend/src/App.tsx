import Home from "./components/Home";
import Auth from "./components/auth/auth";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./components/utils/PrivateRoutes";


function App() {
  return (
    <main className="bg-gray-700 text-white">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
