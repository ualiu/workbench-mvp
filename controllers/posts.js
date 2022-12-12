const { name } = require("ejs");
const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Customer = require("../models/Customer");
const { sendSms } = require('../middleware/sms.js');
const { CustomerProfilesContext } = require("twilio/lib/rest/trusthub/v1/customerProfiles");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const postss = await Post.find({ user: req.user.id });
      const posts = await Post.find({status: 'open'}).lean().sort({createdAt: 'desc'});
      const activeWo = await Post.countDocuments({userId:req.user.id, status: 'active'})
      res.render("profile.ejs", { posts: posts, left: activeWo, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  addCustomer: async (req, res) => {
    try {
      res.render("addCustomer.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  customerProfile: async (req, res) => {
    try {
      const customers = await Customer.find( req.params.id );
      res.render("customerProfile.ejs", { customers: customers });
    } catch (err) {
      console.log(err);
    }
  },

  getSearch: async (req, res) => {
    console.log('check')
    try {
      let q = req.body.searchInput
      console.log(req.body)
      // let woData = null
      let woResults
      let qry = {customerPhone:{$regex: '^' + q, $options: 'i'}} //search qry input

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

  getCustomer: async (req, res) => {
    try {
      let q = req.body.searchInput
      console.log(req.body)
      let qry = {customerPhone:{$regex: '^' + q, $options: 'i'}} //search qry input
      let data = qry
      let user = await Customer.findOne(data)

      if (user === null) {
          console.log('user not found')
          // redirect to customer add page
          res.render("addCustomerTwo.ejs")
      } else {
          res.render("customerProfile.ejs", { customers: user })
        console.log("User found success!" + user)
        // return res.render("customerProfile.ejs", { customers: user }) // load customerProfile page
      }
      // res.render("customerProfile.ejs", { customers: user })
     // res.end()
    } catch (err) {
      console.log(err);
    }
  },

  


  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find({status: 'open'}).lean().sort({createdAt: 'desc'});
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
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

  addNewWo: async (req, res) => {
    try {
      res.render("addFormPost.ejs");
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

  createCustomer: async (req, res) => {
    try {
      const customer = await Customer.create({
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        customerEmail: req.body.customerEmail,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.render("customerProfileTwo.ejs", { customer: customer });
    } catch (err) {
      console.log(err);
    }
  },

  // customerProfileTwo: async (req, res) => {
  //   try {
  //     const customersTwo = await Customer.findById( req.params.id );
  //     if (customersTwo) {
  //       res.render("customerProfileTwo.ejs", { customersTwo: customersTwo });
  //     console.log("loaded!")
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },


  createWo: async (req, res) => {
    try {
      await Post.create({
        itemType: req.body.itemType,
        brand: req.body.brand,
        description: req.body.description,
        severity: req.body.severity,
        cost: req.body.cost,
        status: req.body.status,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        user: req.user.id,
        customer: req.params.id
      });
      console.log("Post has been added!");
      res.redirect(302, "/profile");
    } catch (err) {
      console.log(err);
    }
  },
  


  // createCustomer: async (req, res) => {
  //   try {
  //     const { customerPhone } = req.body;
  //     const customer = await Customer.findOne( { customerPhone: customerPhone})
  //     if (customer) {
  //       console.log("this customer exists!")
  //       res.redirect("/customerProfile");
  //     } else {
        // await Customer.create({
        //   customerName: req.body.customerName,
        //   customerPhone: req.body.customerPhone,
        //   customerEmail: req.body.customerEmail,
        //   itemType: req.body.itemType,
        //   brand: req.body.brand,
        //   description: req.body.description,
        //   severity: req.body.severity,
        //   cost: req.body.cost,
        //   status: req.body.status,
        //   image: result.secure_url,
        //   cloudinaryId: result.public_id,
        //   user: req.user.id,
        // });
        // console.log("Post has been added!");
      //   res.redirect("/addCustomer.ejs");
      // }

      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);


  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  editPost: async (req, res) => {
    try {
      let post = await Post.findById(req.params.id).lean()
     // console.log(post)

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
                let customersNumber = post.phone
                console.log(customersNumber)
          }
          res.redirect('/profile')
        sendSms();
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


