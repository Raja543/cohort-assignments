const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await User.create({ username, password });
  if (!newUser) {
    res.status(500).send("Error signing up User");
  } else {
    res.status(200).send("User  created successfully");
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ course: [courses] });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const course = await Course.findOne({ courseId: req.params.courseId });
  if (!course) {
    res.status(500).send("Error finding course");
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      {
        $push: {
          purchasedCourses: course,
        },
      },
      { new: true }
    );
  }
  res.status(200).send("Course purchased successfully");
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const getUser = await User.findOne(req.user).populate("purchasedCourses");
  res.status(200).json({ purchasedCourses: getUser.purchasedCourses });
});

module.exports = router;
