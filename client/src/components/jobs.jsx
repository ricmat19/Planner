// import React, { useEffect, useRef, useState } from 'react';


// const JobC = (props) => {

//     const [upworkDisplay, setUpworkDisplay] = useState(false);

//     useEffect(() => {
//         const fetchData = async (req, res) => {
//             try{

//                 if(props.jobModal === "modal modal-active"){

//                 }

//             }catch(err){
//                 console.log(err);
//             }
//         }
//         fetchData();
//     }, [props.jobModal]);

//     const displayJobs = async (e) =>{
//         setUpworkDisplay(false)
//     }

//     const displayUpwork = async (e) =>{
//         setUpworkDisplay(true)
//     }

//     return(
//         <div className="main-body">
//             <div className="title">Jobs</div>
//             <div className="grid github-nav">
//                     <div className="sub-title" onClick={displayJobs}>Jobs</div>
//                     <div className="sub-title" onClick={displayUpwork}>Upwork</div>
//             </div>
//         </div>
//     )
// }

// export default JobC;