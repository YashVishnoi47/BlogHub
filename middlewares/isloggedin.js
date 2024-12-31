const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async function (req, res, next) {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        req.isLoggedIn = false;
        // req.flash("error", "You must be logged in");
        return res.send("Log in")
        // return res.redirect("/register"); // Redirect if no token is provided
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.Sec_Key);

        // Find the user in the database and exclude the password
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            req.isLoggedIn = false;
            return res.send("In valid")
            // req.flash("error", "Invalid or expired session");
            // return res.redirect("/register"); // Redirect if user isn't found
        }

        // Attach user data and login state to the request
        req.user = user;
        req.isLoggedIn = true;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        req.isLoggedIn = false;
        // req.flash("error", "Invalid or expired token");
        console.log(error)
        return res.send("ISE")
        // return res.redirect("/");
    }
};
