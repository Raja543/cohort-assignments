const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newAdmin = await Admin.create({ username, password });

    if (!newAdmin) {
      res.status(500).send("Admin already exists");
    } else {
      res.status(200).send("Admin created Successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating admin");
  }
});

router.post("/courses", async (req, res) => {
  const { courseId, title, description, price, imageLink } = req.body;

  try {
    const newCourse = await Course.create({
      courseId,
      title,
      description,
      price,
      imageLink,
    });

    if (!newCourse) {
      res.status(500).send("Course already exists");
    } else {
      res.status(200).send("Course created Successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating course");
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching courses");
  }
});

module.exports = router;
