const { name } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const activeWo = await Post.countDocuments({userId:req.user.id, status: 'active'})
      res.render("profile.ejs", { posts: posts, left: activeWo, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getSearch: async (req, res) => {
    console.log('check')
    try {
      let q = req.body.searchInput
      console.log(req.body)
      let woData = null
      let woResults
      let qry = {phone:{$regex: '^' + q, $options: 'i'}} //search qry input

      if (q != null) {
         woResults = await Post.find(qry)
          //console.log(woResults)
      } else {
        q = 'Search'
        woResults = await Post.find({})
    //    console.log(woResults)
      }
      res.render("search.ejs", { posts: woResults })
     // res.end()
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find({status: 'open'}).lean().sort({createdAt: 'desc'});
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getWorking: async (req, res) => {
    try {
      const posts = await Post.find( {status: 'working'} ).lean().sort({createdAt: 'desc'})
      res.render("working.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getCompleted: async (req, res) => {
    try {
      const posts = await Post.find( {status: 'completed'} ).lean().sort({createdAt: 'desc'})
      res.render("completed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },


  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        secondTitle: req.body.secondTitle,
        status: req.body.status,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        cost: req.body.cost,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  editPost: async (req, res) => {
    try {
      let post = await Post.findById(req.params.id).lean()
      console.log(post)

      if(!post) {
        return res.render('post.ejs')
      }

      if(post.user != req.user.id) {
        res.redirect('post.ejs')
      } else {
        post = await Post.findOneAndUpdate({_id: req.params.id},
          req.body, {
            new: true,
            runValidators: true,
          })
          if (req.body.status === 'completed') {
              console.log('syntax')
          }
          res.redirect('/profile')
      }
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile",);
    }
  },
}

