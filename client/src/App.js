import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import IncomeList from "./pages/list/IncomeList";
import ExpenseList from "./pages/list/ExpenseList";
import HistoryList from "./pages/list/HistoryList";
import NotificationList from "./pages/list/NotificationList";
import Single from "./pages/single/Single";
import SingleIncome from "./pages/single/SingleIncome";
import SingleExpense from "./pages/single/SingleExpense";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  incomeInputs,
  expenseInputs,
  goalInputs,
  expenseEditInputs,
  productInputs,
} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CategoryList from "./pages/list/CategoryList";
import EditProduct from "./pages/edit/EditProduct";
import EditExpense from "./pages/edit/EditExpense";
import NewIncome from "./pages/new/NewIncome";
import NewExpense from "./pages/new/NewExpense";
import NewGoal from "./pages/new/NewGoal";
import ToolList from "./pages/list/ToolList";
import GoalList from "./pages/list/GoalList";

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
          <Route path="/expenses">
            <Route index element={<ExpenseList />} />
            <Route path=":expenseId" element={<SingleExpense />} />
            <Route
              path="new"
              element={
                <NewExpense inputs={expenseInputs} title="Add New Expense" />
              }
            />
            <Route
              path="edit/:id"
              element={
                <EditExpense inputs={expenseEditInputs} title="Edit Expense" />
              }
            />
          </Route>
          <Route path="/goals">
            <Route index element={<GoalList />} />
            <Route
              path="new"
              element={<NewGoal inputs={goalInputs} title="Add New Goal" />}
            />
          </Route>
          <Route path="/tools">
            <Route index element={<ToolList />} />
          </Route>
          <Route path="/category">
            <Route index element={<CategoryList />} />
          </Route>
          <Route path="/history">
            <Route index element={<HistoryList />} />
          </Route>
          <Route path="/notifications">
            <Route index element={<NotificationList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
