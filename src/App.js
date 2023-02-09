import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.css";
import Edit from "./pages/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/edituser/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;
