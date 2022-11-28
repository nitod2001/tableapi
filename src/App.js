import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<User />}></Route>
          <Route path="Home" element={<Page1></Page1>}></Route>
          <Route path="Home1" element={<Page2></Page2>}></Route>
        </Route>
      </Routes>
    </>
  );
  // return <Home></Home>;
}

export default App;
