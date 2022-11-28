import "../css/user.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";

function User(props) {
  return (
    <>
      <div className="wrap">
        <div className="user-container">
          <img src="https://media.istockphoto.com/id/1399944678/photo/multiple-database-is-placed-on-relational-database-tables-with-server-room-and-datacenter.jpg?b=1&s=170667a&w=0&k=20&c=Ii0Wn4lommSX7q2U237SsZVYdMiE6XDzfr2-_oli97w="></img>
          <div className="user-content">
            <h3>api table</h3>
            <p>
              The table next page gives information about some of the animal's
              <span>api</span>
            </p>
          </div>
          <Link to="./Home" className="user-btn">
            Click here to show
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default User;
