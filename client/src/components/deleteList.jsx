import React, { useState } from "react";
import IndexAPI from "../apis/indexAPI";
import PropTypes from 'prop-types';

const DeleteListC = (props) => {
  const [listCollection, setListCollection] = useState([]);

  const deleteList = async (list) => {
    try {
      await IndexAPI.delete(`/planner/delete-list/${list}`);
      setListCollection(
        listCollection.filter((list) => {
          return list.list !== list;
        })
      );
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
