const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/addCustomer", postsController.addCustomer);

router.get("/customerProfile", postsController.customerProfile);
// router.get("/customerProfileTwo", postsController.customerProfileTwo);
router.get('/search', ensureAuth, postsController.getSearch);
router.get("/profile", ensureAuth, postsController.getProfile);
// router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/working", ensureAuth, postsController.getWorking);
router.get("/completed", ensureAuth, postsController.getCompleted);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
