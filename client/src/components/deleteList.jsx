import React, { useEffect, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import PropTypes from 'prop-types';

const DeleteListC = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [listCollection, setListCollection] = useState([]);

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

  const deleteList = async (list) => {
    try {
      if(loggedIn){
        await IndexAPI.delete(`/planner/delete-list/${list}`);
        setListCollection(
          listCollection.filter((list) => {
            return list.list !== list;
          })
        );
      }
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
      <div>
        <button
          className="delete form-button"
          onClick={() => deleteList(props.deletedList)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

DeleteListC.propTypes = {
  deletedList: PropTypes.string
}

export default DeleteListC;
