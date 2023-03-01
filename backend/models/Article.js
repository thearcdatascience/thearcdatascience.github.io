import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  image: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: [true, "Please enter a category"], 
  },

});


// Add a custom deleteArticle method to the schema
ArticleSchema.methods.deleteArticle = async function () {
  await this.model("Article").deleteOne({ _id: this._id });
};

export default mongoose.model("Article", ArticleSchema);


