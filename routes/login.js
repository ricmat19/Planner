const express = require("express");
const router = express.Router();

router.get("/login", async (req, res) => {
  try {

    if(req.session.user === process.env.EMAIL){
      res.status(201).json({
        status: "success",
        data: {
          loggedIn: true,
        },
      });
    }else{
      res.status(201).json({
        status: "Not Allowed. You must login to perform this action.",
        data: {
          loggedIn: false,
        },
      });
    }
    
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    if(req.body.email === process.env.EMAIL && req.body.password === process.env.PASSWORD){

      req.session.user = process.env.EMAIL;
      
      res.status(201).json({
        status: "success",
        data: {
          loggedIn: true,
        },
      });

    }else{
      if(req.body.email !== process.env.EMAIL && req.body.password === process.env.PASSWORD){
        res.status(201).json({
          status: "The provided email " + req.body.email + " was incorrect!",
          data: {
            loggedIn: false,
          },
        });
      }else if(req.body.email === process.env.EMAIL && req.body.password !== process.env.PASSWORD){
        res.status(201).json({
          status: "The provided password was incorrect!",
          data: {
            loggedIn: false,
          },
        });
      }else{
        res.status(201).json({
          status: "The provided email " + req.body.email + " and password were incorrect!",
          data: {
            loggedIn: false,
          },
        });
      }

    }
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
