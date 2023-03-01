import User from "../models/User.js";
import Article from "../models/Article.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";



//Create Article
export const createArticle = async (req,res) => {
    try{
        let newArticleData = {
            title: req.body.title,
            owner: req.user.id,
            body: req.body.body,
            category: req.body.category,
          };

          if (req.body.image) {
            const result = await cloudinary.v2.uploader.upload(req.body.image, {
              folder: 'Articles',
            });
            newArticleData.image = {
              public_id: result.public_id,
              url: result.secure_url,
            };
          } 
      
  
      const article = await Article.create(newArticleData);
      const user = await User.findById(req.user.id);
  
      user.article.unshift(article._id);
  
      await user.save();
      res.status(201).json({
        success: true,
        message: "Article created",
        article
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};



//Delete Article
export const deleteArticle = async (req,res) => {
    try {
        const article = await Article.findById(req.params.id);
    
        if (!article) {
          return res.status(404).json({
            success: false,
            message: "Article not found",
          });
        }
    
        if (article.owner.toString() !== req.user.id.toString()) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }

        //console.log(article.image !== null);
        //console.log(article.image === null);

        if(article.image === null){
            await cloudinary.v2.uploader.destroy(article.image.public_id);
        }
    
        await article.deleteArticle();
    
        const user = await User.findById(req.user.id);
    
        const index = user.article.indexOf(req.params.id);
        user.article.splice(index, 1);
    
        await user.save();
    
        res.status(200).json({
          success: true,
          message: "Article deleted",
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};




//Like-Unlike Article
export const likeUnlikeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        //console.log(article);
        if (!article) {
          return res.status(404).json({
            success: false,
            message: "Article not found",
          });
        }
        
    
        if (article.likes.includes(req.user.id)) {
          const index = article.likes.indexOf(req.user.id);
          article.likes.splice(index, 1);
          //console.log(index);

    
          await article.save();
          //console.log("here2");
    
          return res.status(200).json({
            success: true,
            message: "Article Unliked",
          });
        } else {
          article.likes.push(req.user.id);
    
          await article.save();
          //console.log("here");
    
          return res.status(200).json({
            success: true,
            message: "Article Liked",
          });
        }
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};



//Update Article descriptions
export const updateArticletDesc = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
    
        const { title, body, image, category } = req.body;

        if (!article) {
            return res.status(404).json({
              success: false,
              message: "Article not found",
            });
        }
      
        if (article.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
              success: false,
              message: "Unauthorized",
            });
        }
    
        if (title) {
          article.title = title;
        }
        if (body) {
          article.body = body;
        }
        if (image) {
          article.image = image;
        }
        if (category) {
          article.category = category;
        }
        
    
        await article.save();
        res.status(200).json({
          success: true,
          message: "Article updated",
          article
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};



//Comment on Article
export const commentOnArticle = async (req, res)=>{
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
          return res.status(404).json({
            success: false,
            message: "Article not found",
          });
        }
    
        let commentIndex = -1;
    
        // Checking if comment already exists
    
        article.comments.forEach((item, index) => {
          if (item.user.toString() === req.user.id.toString()) {
            commentIndex = index;
          }
        });
    
        if (commentIndex !== -1) {
          article.comments[commentIndex].comment = req.body.comment;
    
          await article.save();
          //console.log(article);
          return res.status(200).json({
            success: true,
            message: "Comment Updated",
            article
          });
        } else {
          article.comments.push({
            user: req.user.id,
            comment: req.body.comment,
          });
          await article.save();
          //console.log(article);
          return res.status(200).json({
            success: true,
            message: "Comment added",
            article
          });
        }
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};




//Delete Comment
export const deleteComment = async(req, res) => {
    try {
        const article = await Article.findById(req.params.id);
    
        if (!article) {
          return res.status(404).json({
            success: false,
            message: "Article not found",
          });
        }
        // Checking If owner wants to delete
    
        if (article.owner.toString() === req.user.id.toString()) {
          if (req.params.commentId === undefined) {
            return res.status(400).json({
              success: false,
              message: "Comment Id is required",
            });
          }
    
          article.comments.forEach((item, index) => {
            if (item._id.toString() === req.params.commentId.toString()) {
              return article.comments.splice(index, 1);
            }
          });
    
          await article.save();
    
          return res.status(200).json({
            success: true,
            message: "Selected Comment is deleted",
          });
        } else {
          article.comments.forEach((item, index) => {
            if (item.user.toString() === req.user.id.toString()) {
              return article.comments.splice(index, 1);
            }
          });
    
          await article.save();
    
          return res.status(200).json({
            success: true,
            message: "Your Comment is deleted",
          });
        }
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};



//Get All Articles
export const getallArticles = async (req,res)=>{
    try{
        const article = await Article.find().populate("owner");
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};