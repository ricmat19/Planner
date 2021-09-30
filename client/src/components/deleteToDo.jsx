import React, { useState } from 'react';
import IndexAPI from '../apis/indexAPI';

const DeleteToDoC = (props) => {

    const [toDos, setToDos] = useState([]);

    const deleteToDo = async (id) => {
        try{
            const response = await IndexAPI.delete(`/planner/delete-toDo/${id}`);
            setToDos(toDos.filter(toDo => {
               return toDo.id !== id;
            }))
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div>

            {/* Delete To Do */}
            <div>
                <label>Are you sure you want to delete this to do?</label>
            </div>
            <div>
                <button className="delete form-button" onClick={() => deleteToDo(props.deletedToDo)}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteToDoC;