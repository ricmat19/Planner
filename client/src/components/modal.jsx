import React, { useEffect, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const ModalC = () => {

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
                <div className="container">
                    <div className="modal-button">Button</div>
                    <div className="grid grid-center modal">
                        <div className="grid grid-center modal-content container">
                        <div className="grid modal-title-div">
                            <div className="title modal-title">My Modal</div>
                            <div className="modal-close">&times;</div>
                        </div>
                        <div className="modal-body">
                            <div>Random Text</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalC;