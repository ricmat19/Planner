//Check if the user is loggedIn
function loggedIn (req, res, next) {
    try {
        console.log(req.session.email)
        if(req.session.email === process.env.EMAIL){
            res.status(201).json();
            next();
        }else{
            console.log("Not Allowed. You must login to perform this action.")
            res.status(403).json();
        }
    } catch (err) {
            console.log(err);
    }
}

module.exports = loggedIn;