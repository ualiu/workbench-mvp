const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes 
router.get("/:id", ensureAuth, postsController.getPost);
router.get("/addNewWo/:id", postsController.addNewWo);

router.post("/getPost", postsController.getSearch);
router.post("/getCustomer", postsController.getCustomer);

// router.post("/createPost", upload.single("file"), postsController.createPost);
router.post("/createCustomer", postsController.createCustomer);

router.post("/createWo/:id", postsController.createWo);

router.put("/editPost/:id", postsController.editPost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
