import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import IncomeList from "./pages/list/IncomeList";
import Single from "./pages/single/Single";
import SingleIncome from "./pages/single/SingleIncome";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { incomeInputs, productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CategoryList from "./pages/list/CategoryList";
import EditProduct from "./pages/edit/EditProduct";
import NewIncome from "./pages/new/NewIncome";

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
            <Route path=":productId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
            <Route
              path="edit/:id"
              element={
                <EditProduct inputs={productInputs} title="Edit Product" />
              }
            />
          </Route>
          <Route path="/incomes">
            <Route index element={<IncomeList />} />
            <Route path=":incomeId" element={<SingleIncome />} />
            <Route
              path="new"
              element={
                <NewIncome inputs={incomeInputs} title="Add New Income" />
              }
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
