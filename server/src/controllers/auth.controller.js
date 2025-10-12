const jwt = require("jsonwebtoken");
const Activity = require("../models/Activity.model");

async function Login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const neErrorActivity = await Activity.create({
        title: "Login Attempted Failed",
        email,
        attempted: true,
      });
      if (!neErrorActivity)
        return res.status(500).send({ message: "error something went wrong!" });

      await neErrorActivity.save();
      return res.status(400).send({ message: "All Fields are required!" });
    }
    if (
      email != process.env.ADMIN_EMAIL ||
      password != process.env.ADMIN_PASSWORD
    ) {
      const neErrorActivity = await Activity.create({
        title: "Login Failed",
        email,
        attempted: true,
      });
      if (!neErrorActivity)
        return res.status(500).send({ message: "error something went wrong!" });

      await neErrorActivity.save();
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ isAuth: true }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const newActivity = await Activity.create({
      title: "Login Successfully",
      email,
      attempted: false,
    });
    if (!newActivity)
      return res.status(500).send({ message: "error something went wrong!" });

    await newActivity.save();

    res
      .status(200)
      .send({ message: "logged-in successfully.....", token: token });
  } catch (error) {
    const neErrorActivity = await Activity.create({
      title: "Login Failed",
      email,
      attempted: true,
    });
    if (!neErrorActivity)
      return res.status(500).send({ message: "error something went wrong!" });

    await neErrorActivity.save();
  }
}

module.exports = { Login };
