import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";
import MyTable from "./Table";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const optionsList = [10, 20, 50, 100, 150];
const Home = (props) => {
  let location = useLocation();

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [datasPerpage, setDatasPerpage] = useState(optionsList[0]);

  /* query Url starts */
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let letters = /^[a-zA-Z]+$/;

    if (urlParams.get("pageSize") && urlParams.get("pageSize").match(letters)) {
      alert("Can't be a letter! Please check again");
    }
    if (urlParams.get("pageNow") && urlParams.get("pageNow").match(letters)) {
      alert("Can't be a letter! Please check again");
    }

    if (1 <= urlParams.get("pageSize") <= 150) {
      setDatasPerpage(urlParams.get("pageSize"));
    }
    if (urlParams.get("pageSize") < 1) {
      setDatasPerpage(10);
    }
    if (urlParams.get("pageSize") > 150) {
      setDatasPerpage(150);
    }
    urlParams.get("pageNow") < 1
      ? setCurrentPage(1)
      : setCurrentPage(parseInt(urlParams.get("pageNow")));
  }, [location.search]);
  /* query Url ends */

  const handleData = (data) => {
    if (Object.keys(data).length == 2) {
      setDatas(data.entries);
      setLoading(false);
      console.log(Object.keys(data).length);
    } else {
      setDatas(data);
      setLoading(false);
    }
  };

  /*call API */
  useEffect(() => {
    setLoading(true);
    fetch(`${props.api}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(Object.keys(data).length);
        // if (Object.keys(data).length == 2) {
        //   setDatas(data.entries);
        //   setLoading(false);
        //   console.log(Object.keys(data).length);
        // } else {
        //   setDatas(data);
        //   setLoading(false);
        // }
        handleData(data);
      })
      .catch(() => {
        alert("Error");
        setLoading(true);
      });
  }, [props.api]);

  const objectkeys = useMemo(() => {
    if (!loading) {
      return Object.keys(datas[0]);
    }
  }, [datas]);

  const indexOfLastData = currentPage * datasPerpage;
  const indexOfFirstData = indexOfLastData - datasPerpage;
  const currentDatas = datas.slice(indexOfFirstData, indexOfLastData);

  const paginate = (Pagenumber) => {
    setCurrentPage(Pagenumber);
  };

  return (
    <>
      <Link
        to="/Home"
        style={{
          backgroundColor: "#606060",
          color: "#fff",
          padding: "8px 28px",
          marginLeft: "20px",
          textDecoration: "none",
        }}
      >
        Table 1
      </Link>
      <Link
        to="/Home1"
        style={{
          backgroundColor: "#606060",
          color: "#fff",
          padding: "8px 28px",
          marginLeft: "20px",
          textDecoration: "none",
        }}
      >
        Table 2
      </Link>
      <form style={{ margin: "12px 4px", marginLeft: "20px" }}>
        <label for="records"> </label>

        <select
          onChange={(e) => setDatasPerpage(e.target.value)}
          name="records"
          id="records"
          style={{ padding: "6px 8px", fontSize: "20px", cursor: "pointer" }}
          value={datasPerpage}
        >
          {optionsList.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </form>
      {!loading && (
        <h6>
          {datasPerpage * currentPage - datasPerpage} to{" "}
          {currentPage * datasPerpage > datas.length
            ? datas.length
            : currentPage * datasPerpage}{" "}
          of {datas.length}{" "}
        </h6>
      )}
      <MyTable
        objectkeys={objectkeys}
        currentData={currentDatas}
        loading={loading}
      ></MyTable>
      {!loading && (
        <Pagination
          path={props.path}
          PageNow={currentPage}
          itemsPerpage={datasPerpage}
          totalitems={datas.length}
          paginate={paginate}
        ></Pagination>
      )}
    </>
  );
};

export default Home;
