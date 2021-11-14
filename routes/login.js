const express = require("express");
const router = express.Router();

//Login
router.post("/login", async (req, res) => {
  try {
    if(req.body.email === process.env.EMAIL && req.body.password === process.env.PASSWORD){

      req.session.user = process.env.EMAIL;
      console.log(req.session.user)
      console.log("You are now logged in!!!")

      res.status(201).json();

    }else{
      if(req.body.email !== process.env.EMAIL && req.body.password === process.env.PASSWORD){
        console.log("The provided email " + req.body.email + " was incorrect!")
        res.status(403).json();
      }else if(req.body.email === process.env.EMAIL && req.body.password !== process.env.PASSWORD){
        console.log("The provided password was incorrect!")
        res.status(403).json();
      }else{
        console.log("The provided email " + req.body.email + " and password were incorrect!")
        res.status(403).json();
      }

    }
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
