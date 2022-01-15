import React, { useState } from "react";
import IndexAPI from "../apis/indexAPI";
import PropTypes from "prop-types";

const DeleteListC = (props) => {
  // const [loginStatus, setLoginStatus] = useState("");
  const [listCollection, setListCollection] = useState([]);

  const deleteList = async (list) => {
    try {
      // const loginResponse = await IndexAPI.get(`/login`);
      // setLoginStatus(loginResponse.data.status);

      // if (loginResponse.data.data.loggedIn) {
        await IndexAPI.delete(`/planner/delete-list/${list}`);
        setListCollection(
          listCollection.filter((list) => {
            return list.list !== list;
          })
        );
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Delete List */}
      <div>
        <label>Are you sure you want to delete this list?</label>
      </div>
      <div className="form-button-div">
        <button
          className="delete form-button"
          onClick={() => deleteList(props.deletedList)}
        >
          Delete
        </button>
      </div>
      {/* <div className="login-error-message">{loginStatus}</div> */}
    </div>
  );
};

DeleteListC.propTypes = {
  deletedList: PropTypes.string,
};

export default DeleteListC;
