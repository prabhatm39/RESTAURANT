import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../css/Show.module.css";
import ReactPaginate from "react-paginate";
import Form from "./Form";

export const Show = () => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/deatils")
      .then((r) => r.json())
      .then((d) => {
        console.log(d);
        setRes(...res, d);
      });
    changkro();
  }, []);

  const onadd = (newdata) => {
    setRes([...res, newdata]);
  };

  const changkro = (e) => {
    if (e == "1") {
      setRes(
        (re) =>
          (re = [
            ...res.filter((a) => {
              return a.reating >= 1;
            }),
          ])
      );
    } else if (e == "2") {
      setRes(
        (re) =>
          (re = [
            ...res.filter((a) => {
              return a.reating >= 2;
            }),
          ])
      );
    } else if (e == "3") {
      setRes(
        (re) =>
          (re = [
            ...res.filter((a) => {
              return a.reating >= 3;
            }),
          ])
      );
    } else if (e == "4") {
      setRes(
        (re) =>
          (re = [
            ...res.filter((a) => {
              return a.reating >= 4;
            }),
          ])
      );
    }
  };

  const pricechange = (e) => {
    if(e=="lth"){
    setRes((pre) => (pre = [...res.sort((a,b) => a.minPrice - b.minPrice)]) )
 }
   else if(e=="htl"){
      setRes((pre) => (pre = [...res.sort((a,b) => b.minPrice - a.minPrice)]) ) 
    }
}

const [pagenumber, setPagenumber] = useState(0);

const userPerpage = 5; //12
const pageVisted = userPerpage * pagenumber; //0

const displayUser = res
  .slice(pageVisted, pageVisted + userPerpage)
  .map((el) => {
    return (
      <div className={styles.head}>
      <div>
        <img src={el.imgUrl} />
      </div>
      <div>
        <h3>{el.name}</h3>
        <h5>{el.menu}</h5>
        <h5>cost {el.costForOne} for one</h5>
        <h5>
          Min ₹{el.minPrice} <li>Up to {el.orderTime} min </li>
        </h5>
        <h5> Accept online paymeny only</h5>
      </div>
      <div>
        <h3>{el.reating}</h3>
        <h5>{el.votes} votes</h5>
        <h5>{el.reviews} reviews</h5>
      </div>
    </div>
    );
  });
const pageCount = Math.ceil(res.length / userPerpage);

const changePage = ({ selected }) => {
  setPagenumber(selected);
};


  // const four = () => {
  //     setRes((re) => (re = [...res.filter((a) => {
  //         return a.reating >= 4
  //     } )]))
  // };
  // four();

  return (
    <div>
      Form
      <div>
        <Form onadd={onadd} />
      </div>
      <br/>
      <br/>
     
      <div>
        <select onChange={(e) => pricechange(e.target.value)}>
          <option>Sort</option>
        <option value="htl">Hight to Low</option>
        <option value="lth">Low to High</option>
        </select>
      </div>
      <br/>
      <label>Filter by Rating</label>
      <select onChange={(e) => changkro(e.target.value)}>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      {/* <button onCanPlay={four}>4</button> */}
      {/* {res.map((res) => {
        return (
          <div className={styles.head}>
            <div>
              <img src={res.imgUrl} />
            </div>
            <div>
              <h3>{res.name}</h3>
              <h5>{res.menu}</h5>
              <h5>cost {res.costForOne} for one</h5>
              <h5>
                Min ₹{res.minPrice} <li>Up to {res.orderTime} min </li>
              </h5>
              <h5> Accept online paymeny only</h5>
            </div>
            <div>
              <h3>{res.reating}</h3>
              <h5>{res.votes} votes</h5>
              <h5>{res.reviews} reviews</h5>
            </div>
          </div>
        );
      })} */}
      <div>
        <h1>
        Restaurent
        </h1>
       
        </div>
        <div className="right_paginate">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
          <div>{displayUser}</div>
    </div>
  );
};
