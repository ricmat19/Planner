import React, { useState } from "react";
import IndexAPI from "../apis/indexAPI";
import PropTypes from "prop-types";

const DeleteToDoC = (props) => {
  const [loginStatus, setLoginStatus] = useState("");
  const [toDos, setToDos] = useState([]);

  const deleteToDo = async (id) => {
    try {
      const loginResponse = await IndexAPI.get(`/login`);
      setLoginStatus(loginResponse.data.status);

      if (loginResponse.data.data.loggedIn) {
        await IndexAPI.delete(`/planner/delete-toDo/${id}`);
        setToDos(
          toDos.filter((toDo) => {
            return toDo.id !== id;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Delete To Do */}
      <div>
        <label>Are you sure you want to delete this to do?</label>
      </div>
      <div className="login-error-message">{loginStatus}</div>
      <div className="form-button-div">
        <button
          className="delete form-button"
          onClick={() => deleteToDo(props.deletedToDo)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

DeleteToDoC.propTypes = {
  deletedToDo: PropTypes.string,
};

export default DeleteToDoC;
