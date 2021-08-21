import React, { useEffect, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const ToDoC = () => {

    // const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                // const response = await PlannerAPI.get(`/?`);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);


    return(
        <div classNameName="main-body">
            <div className="grid grid-center">
                <div className="grid grid-center container">
                    <div className="title">My To-Do's</div>
                    <div className="grid input-div">
                        <input className="input-box" placeholder="Add to do..." type="text"/>
                        <button className="to-do-button"><img src="../images/pencil-alt-solid.svg"/></button>
                    </div>
                    <div className="grid to-do-list">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoC;