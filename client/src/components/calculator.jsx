import React, { useEffect, useState } from 'react';
import PlannerAPI from '../plannerAPI.js';


const CalculatorC = () => {

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

                    <div className="title">My Calculator</div>

                    <div>
                        <div className="grid input-div">
                            <input className="input-box" value="0" type="text" readonly/>
                        </div>

                        <div classNameName="calculator">
                            <div className="button-box one">1</div>
                            <div className="button-box two">2</div>
                            <div className="button-box three">3</div>
                            <div className="button-box plus">+</div>
                            <div className="button-box four">4</div>
                            <div className="button-box five">5</div>
                            <div className="button-box six">6</div>
                            <div className="button-box minus">-</div>
                            <div className="button-box seven">7</div>
                            <div className="button-box eight">8</div>
                            <div className="button-box nine">9</div>
                            <div className="button-box multiply">x</div>
                            <div className="button-box zero">0</div>
                            <div className="button-box equal">=</div>
                            <div className="button-box clear">C</div>
                            <div className="button-box divide">&#247</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalculatorC;