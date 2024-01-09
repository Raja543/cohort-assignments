const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const newAdmin = await Admin.create({ username, password });
  if (!newAdmin) {
    res.status(500).send("Error signing up admin");
  } else {
    res.status(200).send("Admin  created successfully");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { courseId, title, description, price, imageLink, published } =
    req.body;

  try {
    const course = await Course.create({
      courseId,
      title,
      description,
      price,
      imageLink,
      published,
    });

    if (!course) {
      res.status(500).send("Error creating course");
    }

    res.status(200).json({
      message: "Course created successfully",
      courseId: course.courseId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  if (!courses) {
    res.status(500).send("Erron in fetching Course");
  } else {
    res.status(200).json({ courses });
  }
});

module.exports = router;
