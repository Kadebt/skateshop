import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./styling/reviews.css";

const Review = (props) => {
  console.log();
  const handleDelete = () => {
    const id = props.id;
    axios.delete(`/api/deletereview/${id}`).then((res) => {
      props.reviews(res.data);
    });
    props.setPopUp(false);
  };
  return (
    <div className="reviews-wrapper">
      {!!props.user.user && props.user.user.id === props.userid ? (
        <button className="reviewdelete-btn" onClick={handleDelete}>
          Delete
        </button>
      ) : null}
      <p>User: {props.username}</p>
      <p>Review: {props.review}</p>
      <p>Rating: {props.rating}</p>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Review);
