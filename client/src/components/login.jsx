import React, { 
    // useEffect, 
    useRef, useState } from "react";
import IndexAPI from "../apis/indexAPI";

const LoginC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {

    //     } catch (err) {
    //         console.log(err);
    //     }
    //     };
    //     fetchData();
    // }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await IndexAPI.post("/login", {
            email: email,
            password: password,
          });
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div>
            <p className="login-header title">login</p>
            <div>
                <div className="modal-input-div">
                <input
                    type="email"
                    ref={emailInput}
                    value={email}
                    name="email"
                    placeholder="email"
                    onChange={(e) => {
                    setEmail(e.target.value);
                    }}
                />
                </div>
                <div className="modal-input-div">
                <input
                    type="password"
                    ref={passwordInput}
                    value={password}
                    name="password"
                    placeholder="password"
                    onChange={(e) => {
                    setPassword(e.target.value);
                    }}
                />
                </div>
            </div>
            <div>
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginC;
