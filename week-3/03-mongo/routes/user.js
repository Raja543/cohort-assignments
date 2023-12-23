const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const router = Router();
const { User, Course } = require("../db");

// User Routes
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
  try {
    const courses = await Course.find({});
    res.status(200).send({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching courses");
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findOne({ courseId });
  if (!course) {
    res.status(500).send("error fetching course");
  } else {
    await User.findAndUpdate(
      {
        username: req.user.username,
      },
      {
        $push: {
          purchasedCourses: Course,
        },
      },
      { new: true }
    );
    res.status(200).send("course purchased successfully");
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const { user } = req.user;
  const getUser = await User.findOne({ user }).populate("purchasedCourses");
  res.status(200).json({ purchasedCourses: getUser.purchasedCourses });
});

module.exports = router;
