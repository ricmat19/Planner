import React, { useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';

const DeleteListC = (props) => {

    const [listCollection, setListCollection] = useState([]);

    const deleteList = async (list) => {
        try{
            const response = await PlannerAPI.delete(`/planner/delete-list/${list}`);
            setListCollection(listCollection.filter(list => {
               return list.list !== list;
            }))
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">

            {/* Delete List */}
            <div>
                <label className="">Are you sure you want to delete this list?</label>
            </div>
            <div>
                <button onClick={() => deleteList(props.deletedList)}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteListC;