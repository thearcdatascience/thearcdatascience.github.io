import User from "../models/User.js";
import Event from "../models/Event.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";



//Create Event
export const createEvent = async (req,res) => {
    try{

      let newEventData = {
        ETitle: req.body.ETitle,
        owner: req.user.id,
        EDesc: req.body.EDesc,
        ETime: req.body.ETime,
        EDate: req.body.EDate,
        EVenue: req.body.EVenue,
        ECategory: req.body.ECategory,
      };

      if (req.body.poster) {
        const result = await cloudinary.v2.uploader.upload(req.body.poster, {
          folder: 'Events',
        });
        newEventData.poster = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      };
  
      const event = await Event.create(newEventData);
      const user = await User.findById(req.user.id);
  
  
      await user.save();
      res.status(201).json({
        success: true,
        message: "Event created",
        event
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};



//Delete Event
export const deleteEvent = async (req,res) => {
    try {
        const event = await Event.findById(req.params.id);
    
        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Event not found",
          });
        }
    
        if (event.owner.toString() !== req.user.id.toString()) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }

        if(event.poster === null){
            await cloudinary.v2.uploader.destroy(event.poster.public_id);
        }
    
        await event.deleteEvent();
    
        const user = await User.findById(req.user.id);
    
        await user.save();
    
        res.status(200).json({
          success: true,
          message: "Event deleted",
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};





//Update Event descriptions
export const updateEventDesc = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
    
        const { ETitle, EDesc, poster, EDate, ETime, EVenue, ECategory } = req.body;

        if (!event) {
            return res.status(404).json({
              success: false,
              message: "Event not found",
            });
        }
      
        if (event.owner.toString() !== req.user.id.toString()) {
            return res.status(401).json({
              success: false,
              message: "Unauthorized",
            });
        }
    
        if (ETitle) {
          event.ETitle = ETitle;
        }
        if (EDesc) {
          event.EDesc = EDesc;
        }
        if (poster) {
          event.poster = poster;
        }
        if (ECategory) {
          event.ECategory = ECategory;
        }
        if (EDate) {
          event.EDate = EDate;
        }
        if (ETime) {
          event.ETime = ETime;
        }
        if (EVenue) {
          event.EVenue = EVenue;
        }
        
    
        await event.save();
        res.status(200).json({
          success: true,
          message: "Event updated",
          event
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};




//Get All Events
export const getallEvents = async (req,res)=>{
    try{
        const event = await Event.find().populate("owner");
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};