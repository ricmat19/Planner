import React, { useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';

const DeleteToDoC = (props) => {

    const [toDos, setToDos] = useState([]);

    const deleteToDo = async (id) => {
        try{
            const response = await PlannerAPI.delete(`/planner/delete-toDo/${id}`);
            setToDos(toDos.filter(toDo => {
               return toDo.id !== id;
            }))
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">

            {/* Delete To Do */}
            <div>
                <label className="">Are you sure you want to delete this to do?</label>
            </div>
            <div>
                <button onClick={() => deleteToDo(props.deletedToDo)}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteToDoC;