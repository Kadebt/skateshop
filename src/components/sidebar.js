import axios from "axios";
import React, { useEffect, useState } from "react";
import { resolvePath, useParams } from "react-router-dom";
import "./styling/sidebar.css";
import close from "./styling/icons/icons8-close-window-50.png";

const Sidebar = (props) => {
  const params = useParams();

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [sizeMinValue, setSizeMinValue] = useState(0);
  const [sizeMaxValue, setSizeMaxValue] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [constShop, setConstShop] = useState([]);

  useEffect(() => {
    const id = params.id;
    axios.get(`/api/inventory/${id}`).then((res) => {
      setConstShop(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBrandQuery = selectedBrands.reduce((accumulator, brand) => {
      return `${accumulator} ${brand}`;
    }, "");

    const id = params.id;

    axios
      .get(
        `/api/filter/${id}?min=${minValue}&max=${maxValue}&sizemin=${sizeMinValue}&sizemax=${sizeMaxValue}&brands=${selectedBrandQuery}`
      )
      .then((res) => {
        console.log(res.data);
        props.setShop(res.data);
      });
  };

  const handleBrandClick = (e) => {
    if (
      selectedBrands.includes(e) &&
      selectedBrands.length !== brandsMapped.length
    ) {
      const newBrands = selectedBrands.filter((brand) => {
        return brand !== e;
      });
      setSelectedBrands(newBrands);
    } else if (selectedBrands.length === brandsMapped.length) {
      setSelectedBrands([e]);
    } else {
      setSelectedBrands([...selectedBrands, e]);
    }
  };

  const brandsMapped = constShop
    .filter((e, index) => constShop.indexOf(e) === index)
    .map((e) => {
      return (
        <div>
          <input
            type="checkbox"
            value={e.brand}
            onClick={() => {
              handleBrandClick(e.brand);
            }}
          />
          <label>{e.brand}</label>
        </div>
      );
    });

  const valueChange = (e) => {
    console.log(e);
    setMinValue(Number(e.target.value));
  };

  const maxValueChange = (e) => {
    setMaxValue(Number(e.target.value));
  };

  const minSizeValueChange = (e) => {
    setSizeMinValue(Number(e.target.value));
  };

  const maxSizeValueChange = (e) => {
    setSizeMaxValue(Number(e.target.value));
  };

  const priceMax = constShop.reduce((prev, curr) => {
    return prev > curr.price ? prev : curr.price;
  }, 0);

  const priceMin = constShop.reduce((prev, curr) => {
    return prev < curr.price ? prev : curr.price;
  }, priceMax - 1);

  const sizeMax = constShop.reduce((prev, curr) => {
    return prev > curr.size ? prev : curr.size;
  }, 0);

  const sizeMin = constShop.slice(1).reduce((prev, curr) => {
    return prev < curr.size ? prev : curr.size;
  }, sizeMax - 1);

  const priceMid = (priceMin + priceMax) / 2;
  const sizeMid = (Math.round(sizeMin) + Math.round(sizeMax)) / 2;

  /**
   * On initial component render this will run and
   * maxPrice will be 0 (falsy) - Does nothing
   *
   * When priceMax (only value being watched) is updated, this
   * will run again and then update the maxValue if priceMax is truthy (not 0)
   */
  React.useEffect(() => {
    if (!!priceMax) {
      setMaxValue(priceMax);
    }
  }, [priceMax]);

  React.useEffect(() => {
    if (!!sizeMin) {
      setSizeMinValue(sizeMin);
    }
  }, [sizeMin]);

  React.useEffect(() => {
    if (!!priceMin) {
      setMinValue(priceMin);
    }
  }, [priceMin]);

  React.useEffect(() => {
    if (!!sizeMax) {
      setSizeMaxValue(sizeMax);
    }
  }, [sizeMax]);

  React.useEffect(() => {
    if (selectedBrands.length < 1) {
      setSelectedBrands(props.shop.map((e) => e.brand));
    }
  }, [brandsMapped]);

  const stepCalculator = (sizeMax - sizeMin) / 10;
  console.log(stepCalculator);

  return (
    <>
      <div
        className={props.filter ? "filter-scrim" : "filter-scrim-inactive"}
      />
      <form
        className={props.filter ? "filter-active" : "filter-inactive"}
        onSubmit={handleSubmit}
      >
        <img
          className="close-filter"
          onClick={(e) => {
            e.preventDefault();
            props.setFilter(false);
          }}
          src={close}
        />
        <h3 className="filter-label">Filter</h3>
        <div>
          <p className="slider-label">Brands</p>
          {brandsMapped}
        </div>
        <div className="slider-div">
          <p className="slider-label">Price</p>
          <p className="value-label">Min {minValue}</p>
          <input
            className="min-slider"
            type="range"
            min={priceMin}
            max={maxValue - 1}
            value={minValue}
            onChange={valueChange}
            step={1}
          />
          <input
            className="max-slider"
            type="range"
            min={minValue}
            max={priceMax}
            value={maxValue}
            onChange={maxValueChange}
          />
          <p className="value-label">Max {maxValue}</p>
        </div>
        <div className="slider-div">
          <p className="slider-label">Size</p>
          <p className="value-label">Min {sizeMinValue}</p>
          <input
            className="min-slider"
            type="range"
            min={sizeMin}
            max={sizeMaxValue - stepCalculator}
            value={sizeMinValue}
            onChange={minSizeValueChange}
            step={stepCalculator}
          />
          <input
            className="max-slider"
            type="range"
            min={sizeMinValue}
            max={sizeMax}
            value={sizeMaxValue}
            onChange={maxSizeValueChange}
            step={stepCalculator}
          />
          <p className="value-label">Max {sizeMaxValue}</p>
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Sidebar;
