import express from "express";
import {
  createEvent,
  deleteEvent,
  updateEventDesc,
  getallEvents
  
} from "../controllers/event.js";
import { isAuthenticated, isMedia } from "../utils/Auth.js";

const router = express.Router();

router.post("/create", isMedia, createEvent);

router.delete("/:id", isMedia, deleteEvent);

router.put("/update/:id", isMedia, updateEventDesc);

router.get("/events", isAuthenticated, getallEvents);


export default router;