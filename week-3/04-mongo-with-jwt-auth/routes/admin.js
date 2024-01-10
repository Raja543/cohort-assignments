const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const router = Router();
const jwt_secret = process.env.JWT_SECRET;

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  try {
    // Check if an admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res
        .status(400)
        .send("Username already exists. Choose a different one.");
    }

    // If no existing admin, create a new one
    const newAdmin = await Admin.create({ username, password });

    if (!newAdmin) {
      res.status(500).send("Error signing up Admin");
    } else {
      res.status(200).send("Admin created successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signin logic
  const { username, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ username, password });
    console.log("Found Admin:", Admin);

    if (!existingAdmin) {
      res.status(401).json({ error: "Unauthorized - Admin not found" });
    } else {
      // Generate JWT token
      const token = jwt.sign({ userId: existingAdmin._id }, jwt_secret, {
        expiresIn: "1h",
      });
      res.status(200).json({
        token,
        message: "Admin signin successfully",
      });
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
