import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CategoryList from "./pages/list/CategoryList";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          {/* Display the Login component at the root URL */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New Product" />}
            />
          </Route>
          <Route path="/category">
            <Route index element={<CategoryList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
