const User = require("../model/userModel");
var bcrypt = require("bcryptjs");

module.exports = {
  signIn: async (req, res) => {
    try {
      // Extract email and password from the req.body object
      const { email, password } = req.body;

      // Check if user exists in database
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        // res === true
        if (result) {
          return res
            .status(200)
            .json({ message: "User Logged in Successfully" });
        }
        if(err) console.log(err);
        return res.status(401).json({ message: "Invalid Credentials" });
      });

    } catch (error) {
      res.status(401).send(err.message);
    }
  },
  signUp: async (req, res) => {
    try {
      // Extract email and password from the req.body object
      const { email, password } = req.body;

      // Check if the email is already in use
      let userExists = await User.findOne({ email });

      if (userExists) {
        res.status(401).json({ message: "Email is already in use." });
        return;
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) throw new Error("Internal Server Error");

          // Create a new user
          let user = new User({
            email,
            password: hash,
          });

          // Save user to database
          user.save().then(() => {
            res.json({ message: "User created successfully", user });
          });
        });
      });
      
    } catch (err) {
      return res.status(401).send(err.message);
    }
  },
};
