import React from "react";
import axios from "axios";
import { connect } from "react-redux";

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
    <div>
      {!!props.user.user && props.user.user.id === props.userid ? (
        <button onClick={handleDelete}>delete</button>
      ) : null}
      <p>{props.username}</p>
      <p>{props.review}</p>
      <p>{props.rating}</p>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Review);
