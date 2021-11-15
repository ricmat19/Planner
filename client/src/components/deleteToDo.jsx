import React, { useEffect, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import PropTypes from 'prop-types';

const DeleteToDoC = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    try {

      //Check if logged in
      const loginResponse = await IndexAPI.get(`/login`);
      setLoggedIn(loginResponse.data.data.loggedIn)

    } catch (err) {
        console.log(err);
    }
    };
    fetchData();
}, []);

  const deleteToDo = async (id) => {
    try {
      if(loggedIn){
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
      <div>
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
  deletedToDo: PropTypes.string
}

export default DeleteToDoC;
