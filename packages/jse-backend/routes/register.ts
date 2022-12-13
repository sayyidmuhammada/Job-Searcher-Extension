import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      skills,
      experience,
    } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
});

export default router;
