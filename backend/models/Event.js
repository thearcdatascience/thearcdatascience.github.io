import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  poster: {
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
  
  EDesc: {
    type: String,
  },

  ETitle: {
    type: String,
  },

  EDate: {
    type: String,
    required: [true, "Please enter Event Date"]
  },

  ETime: {
    type: String,
    required: true
  },

  EVenue: {
    type: String,
    required: [true, "Please enter Event Venue"]
  },

  ECategory: {
    type: String,
    required: [true, "Please enter a category"], // can be -> Seminar, Hackathon, Workshop, Online/Offline
  },

});

// Add a custom deleteEvent method 
EventSchema.methods.deleteEvent = async function () {
  await this.model("Event").deleteOne({ _id: this._id });
};

export default mongoose.model("Event", EventSchema);