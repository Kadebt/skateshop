import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addToCart } from "../ducks/cartreducer";
import { connect } from "react-redux";
import FullItem from "./fullitem";
import Reviews from "./reviews";
import StarRatingComponent from "react-star-rating-component";
import SideBar from "./sidebar";
import { BounceLoader } from "react-spinners";
import "./styling/shop.css";
import filterby from "./styling/icons/icons8-slider-50.png";

const Shop = (props) => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [fullItem, setFullItem] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(5);
  const [filter, setFilter] = useState(false);

  useEffect(async () => {
    const id = params.id;
    await axios.get(`/api/inventory/${id}`).then((res) => {
      setShop(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, [params.id]);

  const handleClick = (id) => {
    axios.put(`/api/cart/${id}`).then((res) => {
      props.addToCart(res.data);
    });
  };

  const handlePopUp = (id) => {
    axios.get(`/api/fullitem/${id}`).then((res) => {
      setFullItem(res.data);
    });
    axios.get(`/api/reviews/${id}`).then((res) => {
      console.log(res);
      setReviews(res.data);
    });
  };

  const fullItemMapped = fullItem.map((e) => {
    return (
      <FullItem
        key={e.id}
        name={e.name}
        brand={e.brand}
        img={e.content}
        price={e.price}
        size={e.size}
        setPopUp={setPopUp}
      />
    );
  });

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const reviewSubmit = (event) => {
    event.preventDefault();
    const body = {
      review: input,
      rating: rating,
    };
    if (body.review.length > 5) {
      const id = fullItem[0].id;
      console.log(body);
      axios.post(`/api/postreviews/${id}`, body).then((res) => {
        setReviews(res.data);
      });
    }
    setPopUp(true);
    setInput("");
  };

  const handleRating = (num) => {
    setRating(num);
  };

  const reviewsMapped = reviews.map((e) => {
    return (
      <Reviews
        id={e.id}
        userid={e.user_id}
        username={e.user_name}
        review={e.review}
        rating={e.rating}
        reviews={setReviews}
        setPopUp={setPopUp}
      />
    );
  });

  const shopMapped = shop.map((e) => {
    return (
      <div className="shop-item">
        <div
          className="onclick-div"
          onClick={() => {
            handlePopUp(e.id);
            setPopUp(true);
          }}
        >
          <img
            style={{ height: "100px", width: "100px" }}
            src={e.content}
            className="item-img"
          />
          <h1 className="item-name">{e.name}</h1>
          <div className="price-size-wrap">
            <div>
              <p className="item-price">${e.price}</p>
              <p className="item-size">{e.size}</p>
            </div>
          </div>
        </div>
        <button
          className="item-button"
          onClick={() => {
            handleClick(e.id);
            console.log(props.cart);
          }}
        >
          +
        </button>
      </div>
    );
  });

  return (
    <div>
      {loading === true ? (
        <BounceLoader loading={loading} size={150} />
      ) : (
        <div className="shop-wrap">
          {popUp === true ? (
            <>
              <div className="fullitem-scrim" />
              <div className="center-scrim">
                <div className="fullitem-wrap">
                  {fullItemMapped}
                  <div className="item-reviews">
                    {!!props.user.user ? (
                      <form onSubmit={reviewSubmit}>
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={rating}
                          onStarClick={handleRating}
                        />
                        <label>
                          Review
                          <input
                            className="review-input"
                            value={input}
                            onChange={handleInput}
                          />
                        </label>
                        <button className="review-btn" type="submit">
                          Submit
                        </button>
                      </form>
                    ) : (
                      <p>Login to post a review</p>
                    )}
                    {reviewsMapped}
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className="filter-wrap">
            <p className="filter-p">Filter</p>
            <img
              src={filterby}
              className="filterby-img"
              onClick={() => {
                setFilter(true);
                console.log(shop);
              }}
            />
          </div>
          <div className="items-wrapper">
            <h2 className="items-found">Found {shop.length} Results</h2>
            {shopMapped}
          </div>
          <div className="sidebar-div">
            {params.id == 0 ? null : (
              <SideBar
                setFilter={setFilter}
                filter={filter}
                shop={shop}
                setShop={setShop}
              />
            )}
          </div>
        </div>
      )}{" "}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { addToCart })(Shop);
