import React, { useRef, useState } from 'react';
import IndexAPI from '../apis/indexAPI';

const CreateListC = (props) => {

    const [list, setList] = useState("");
    const [listModal, setListModal] = useState("modal");
    const listInput = useRef(null);

    const createList = async (e) => { 
        e.preventDefault()
        try{
            const response = await IndexAPI.post("/planner/add-list",{
                list,
            });
            listInput.current.value = "";
            
            props.setNewList(list)

        }catch(err){
            console.log(err);
        }
    };
    return(
        <div>

            {/* Create List */}
            <div className="grid">
                <label className="title">List</label>
            </div>
            <div className="grid">
                <input value={list} ref={listInput} onChange={e => setList(e.target.value)} type="text" name="list"/>
            </div>
            <div>
                <button className="form-button" onClick={createList}>Save</button>
            </div>
        </div>
    )
}

export default CreateListC;