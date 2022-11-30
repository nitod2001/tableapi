import "../css/pagination.css";
import { useState, useEffect, useMemo } from "react";
import { Link, Route, Routes } from "react-router-dom";

const Pagination = (props) => {
  const [numberOfPages, setNumberOfPages] = useState([]);
  // Current active button number
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    if (props.PageNow) setCurrentPage(props.PageNow ? props.PageNow : 1);
  }, [props.PageNow]);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    const arr = [];
    for (
      let i = 1;
      i <= Math.ceil(props.totalitems / props.itemsPerpage);
      i++
    ) {
      arr.push(i);
    }
    setNumberOfPages(arr);
  }, [props.totalitems, props.itemsPerpage]);

  useEffect(() => {
    let clonearrOfCurrButtons = [...arrOfCurrButtons];
    let dotsInittial = "...";
    let dotsLeft = "...";
    let dotsRight = "...";
    if (numberOfPages.length < 6) {
      clonearrOfCurrButtons = numberOfPages;
    } else if (currentPage >= 1 && currentPage <= 3) {
      clonearrOfCurrButtons = [1, 2, 3, 4, dotsInittial, numberOfPages.length];
    } else if (currentPage === 4) {
      const sliced = numberOfPages.slice(0, 5);
      clonearrOfCurrButtons = [...sliced, dotsInittial, numberOfPages.length];
    } else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentPage - 2, currentPage);
      const sliced2 = numberOfPages.slice(currentPage, currentPage + 1);
      clonearrOfCurrButtons = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentPage > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      clonearrOfCurrButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInittial) {
      console.log(arrOfCurrButtons.length);
      setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      setArrOfCurrButtons(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      setArrOfCurrButtons(arrOfCurrButtons[3] - 2);
    }
    setArrOfCurrButtons(clonearrOfCurrButtons);
  }, [currentPage, numberOfPages]);

  const disablenprev = useMemo(() => {
    if (currentPage == 1) {
      return true;
    }
    return false;
  }, [currentPage]);

  const disablenext = useMemo(() => {
    if (currentPage == numberOfPages.length) {
      return true;
    }
    return false;
  }, [currentPage, numberOfPages]);

  const Linkto = (item) => {
    console.log(typeof item);
    if (typeof item === "number") {
      return `${props.path}/?pageNow=${item}&pageSize=${props.itemsPerpage}`;
    }
  };

  return (
    <>
      <div className="pagination-container">
        <Link
          to={`${props.path}/?pageNow=${
            numberOfPages.length / numberOfPages.length
          }&pageSize=${props.itemsPerpage}`}
          style={{
            padding: "0 30px",
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
          }}
          href="!#"
          className={`${disablenprev === true ? "disable" : ""}`}
          // onClick={handleFirst}
        >
          First
        </Link>
        <Link
          to={`${props.path}/?pageNow=${currentPage - 1}&pageSize=${
            props.itemsPerpage
          }`}
          className={`${
            disablenprev === true ? "disable" : "fa-solid fa-arrow-left"
          }`}
          // onClick={handlePrev}
          href="#"
        ></Link>
        {arrOfCurrButtons.map((item, index) => {
          return (
            <Link
              to={Linkto(item)}
              className={`${currentPage === item ? "active" : ""}`}
              key={index}
              // onClick={() => {
              //   setCurrentPage(item);
              //   if (typeof item === "number") {
              //     props.paginate(item);
              //   }
              // }}
            >
              {item}
            </Link>
          );
        })}
        <Link
          to={`${props.path}/?pageNow=${currentPage + 1}&pageSize=${
            props.itemsPerpage
          }`}
          // href="#"
          // onClick={handleNext}
          className={`${
            disablenext === true ? "disable" : "fa-solid fa-arrow-right"
          }`}
        ></Link>
        <Link
          to={`${props.path}/?pageNow=${numberOfPages.length}&pageSize=${props.itemsPerpage}`}
          style={{
            padding: "0 30px",
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
          href="!#"
          className={`${disablenext === true ? "disable" : ""}`}
          // onClick={handleLast}
        >
          Last
        </Link>
      </div>
    </>
  );
};

export default Pagination;
