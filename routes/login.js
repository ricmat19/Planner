const express = require("express");
const router = express.Router();

//Login
router.post("/login", async (req, res) => {
  try {

    if(req.body.email === process.env.EMAIL && req.body.password === process.env.PASSWORD){
        console.log("You are now logged in!!!")
        req.session.email = process.env.EMAIL;
    }else{
        if(req.body.email !== process.env.EMAIL && req.body.password === process.env.PASSWORD){
            console.log("The provided email " + req.body.email + " was incorrect!")
        }else if(req.body.email === process.env.EMAIL && req.body.password !== process.env.PASSWORD){
            console.log("The provided password was incorrect!")
        }else{
            console.log("The provided email " + req.body.email + " and password were incorrect!")
        }
    }

    console.log(req.session)

    res.status(201).json();
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
