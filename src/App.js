import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import "./styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
