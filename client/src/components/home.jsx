import React, { useEffect, useRef, useState } from "react";
// import LoginC from "./login";
import CalculatorC from "./calculator";
import CalendarC from "./calendar";
import BooksC from "./books";
import PlannerC from "./planner";
// import MapC from "./map";
// import GoogleDriveC from "./googleDrive";
import GitHubC from "./github";
import RecipesC from "./recipes";
import EmailC from "./email";

const NavbarC = () => {
  // const [loginModal, setLoginModal] = useState("modal");
  // const loginRef = useRef();
  // const displayLoginModal = () => {
  //   setLoginModal("modal modal-active");
  // };

  const [calculatorModal, setCalculatorModal] = useState("modal");
  const calculatorRef = useRef();
  const displayCalculatorModal = () => {
    setCalculatorModal("modal modal-active");
  };

  const [calendarModal, setCalendarModal] = useState("modal");
  const calendarRef = useRef();
  const displayCalendarModal = () => {
    setCalendarModal("modal modal-active");
  };

  const [booksModal, setBooksModal] = useState("modal");
  const booksRef = useRef();
  const displayBooksModal = () => {
    setBooksModal("modal modal-active");
  };

  // const [mapModal, setMapModal] = useState("modal");
  // const mapRef = useRef();
  // const displayMapModal = () => {
  //   setMapModal("modal modal-active");
  // };

  // const [driveModal, setDriveModal] = useState("modal");
  // const driveRef = useRef();
  // const displayDriveModal = () => {
  //   setDriveModal("modal modal-active");
  // };

  const [githubModal, setGithubModal] = useState("modal");
  const githubRef = useRef();
  const displayGitHubModal = () => {
    setGithubModal("modal modal-active");
  };

  const [recipeModal, setRecipeModal] = useState("modal");
  const recipeRef = useRef();
  const displayRecipesModal = () => {
    setRecipeModal("modal modal-active");
  };

  const [emailModal, setEmailModal] = useState("modal");
  const emailRef = useRef();
  const displayEmailModal = () => {
    setEmailModal("modal modal-active");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.addEventListener("mousedown", (event) => {
          if (calculatorRef.current !== null && calendarRef.current !== null) {
            // if (!loginRef.current.contains(event.target)) {
            //   setLoginModal("modal");
            // }
            if (!calculatorRef.current.contains(event.target)) {
              setCalculatorModal("modal");
            }
            if (!calendarRef.current.contains(event.target)) {
              setCalendarModal("modal");
            }
            if (!booksRef.current.contains(event.target)) {
              setBooksModal("modal");
            }
            // if (!mapRef.current.contains(event.target)) {
            //   setMapModal("modal");
            // }
            // if (!driveRef.current.contains(event.target)) {
            //   setDriveModal("modal");
            // }
            if (!githubRef.current.contains(event.target)) {
              setGithubModal("modal");
            }
            if (!recipeRef.current.contains(event.target)) {
              setRecipeModal("modal");
            }
            if (!emailRef.current.contains(event.target)) {
              setEmailModal("modal");
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <div className={loginModal}>
        <div ref={loginRef} className="modal-content">
          <LoginC loginModal={loginModal} loginRef={loginRef} />
        </div>
      </div> */}
      <div className={calculatorModal}>
        <div ref={calculatorRef} className="modal-content">
          <CalculatorC
            calculatorModal={calculatorModal}
            calculatorRef={calendarRef}
          />
        </div>
      </div>
      <div className={calendarModal}>
        <div ref={calendarRef} className="modal-content">
          <CalendarC calendarModal={calendarModal} calendarRef={calendarRef} />
        </div>
      </div>
      <div className={booksModal}>
        <div ref={booksRef} className="modal-content">
          <BooksC booksModal={booksModal} booksRef={booksRef} />
        </div>
      </div>
      {/* <div className={mapModal}>
        <div ref={mapRef}>
          <MapC mapModal={mapModal} mapRef={mapRef} />
        </div>
      </div> */}
      {/* <div className={driveModal}>
        <div ref={driveRef} className="modal-content">
          <GoogleDriveC driveModal={driveModal} driveRef={driveRef} />
        </div>
      </div> */}
      <div className={githubModal}>
        <div ref={githubRef} className="modal-content">
          <GitHubC githubModal={githubModal} githubRef={githubRef} />
        </div>
      </div>
      <div className={recipeModal}>
        <div ref={recipeRef} className="modal-content">
          <RecipesC recipeModal={recipeModal} recipeRef={recipeRef} />
        </div>
      </div>
      <div className={emailModal}>
        <div ref={emailRef} className="modal-content email-modal-content">
          <EmailC emailModal={emailModal} emailRef={emailRef} />
        </div>
      </div>

      <nav className="grid nav-div">
        <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayEmailModal}>
            <img src="../images/envelope-solid.svg" />
          </div>
        </span>
        <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayRecipesModal}>
            <img src="../images/utensils-solid.svg" />
          </div>
        </span>
        <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayGitHubModal}>
            <img src="../images/github-square-brands.svg" />
          </div>
        </span>
        {/* <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayDriveModal}>
            <img src="../images/folder-open-solid.svg" />
          </div>
        </span> */}
        {/* <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayMapModal}>
            <img src="../images/map-marked-alt-solid.svg" />
          </div>
        </span> */}
        <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayBooksModal}>
            <img src="../images/book-solid.svg" />
          </div>
        </span>
        <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayCalendarModal}>
            <img src="../images/calendar-alt-solid.svg" />
          </div>
        </span>
        <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayCalculatorModal}>
            <img src="../images/calculator-solid.svg" />
          </div>
        </span>
        {/* <span className="nav-item">
          <div className="nav-item-anchor" onClick={displayLoginModal}>
            <img src="../images/unlock-alt-solid.svg" />
          </div>
        </span> */}
      </nav>
      <PlannerC />
    </div>
  );
};

export default NavbarC;
