const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  try {
    const newAdmin = await Admin.create({ username, password });
    res.status(200).send("Admin created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up as admin");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signin logic
  const { username, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ username, password });
    if (!existingAdmin) {
      res.status(500).send("Admin not found");
    } else {
      res.status(200).send("Admin signin successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
    } else {
      res.status(200).json({
        message: "Course created successfully",
        courseId: course.courseId,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({});
    if (!courses) {
      res.status(500).send("Error in fetching courses");
    } else {
      res.status(200).json({ courses });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
