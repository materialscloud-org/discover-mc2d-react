import "./App.css";

import { Routes, Route, HashRouter } from "react-router-dom";

import MainPage from "./MainPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/details/:compound" element={<DetailPage />} /> */}
        {/* <Route
          path="/details/:compound/:id/:functional"
          element={<DetailPage />}
        /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;
