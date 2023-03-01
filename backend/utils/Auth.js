import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", "true");
    //res.setHeader("Access-Control-Allow-Credentials", true);
    //console.log(cookie);
    if (!cookie) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("TheArc="));

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Who are you? You Degenerate at token 1",
      });
    }

    const tokenWithoutPrefix = token.split("=")[1];
    if (!tokenWithoutPrefix) {
      return res.status(401).json({
        success: false,
        error: "Who are you? You Degenerate at token 2",
      });
    }

    //console.log(tokenWithoutPrefix);
    const decoded = await jwt.verify(
      tokenWithoutPrefix,
      process.env.JWT_SECRET
    );

    //console.log(decoded._id);
    //console.log(decoded.id);

    req.user = await User.findById(decoded._id);
    //console.log(req.user);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const isResearch = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", "true");
    //res.setHeader("Access-Control-Allow-Credentials", true);
    //console.log(cookie);
    if (!cookie) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("TheArc="));

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Who are you? You Degenerate at token 1",
      });
    }

    const tokenWithoutPrefix = token.split("=")[1];
    if (!tokenWithoutPrefix) {
      return res.status(401).json({
        success: false,
        error: "Who are you? You Degenerate at token 2",
      });
    }

    //console.log(tokenWithoutPrefix);
    const decoded = await jwt.verify(
      tokenWithoutPrefix,
      process.env.JWT_SECRET
    );

    //console.log(decoded._id);
    //console.log(decoded.id);

    // check if the user role is 'research'
    if (decoded.role !== 'Research') {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to access this resource",
      });
    }

    req.user = await User.findById(decoded._id);
    //console.log(req.user);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const isMedia = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", "true");
    //res.setHeader("Access-Control-Allow-Credentials", true);
    //console.log(cookie);
    if (!cookie) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("TheArc="));

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Who are you? You Degenerate at token 1",
      });
    }

    const tokenWithoutPrefix = token.split("=")[1];
    if (!tokenWithoutPrefix) {
      return res.status(401).json({
        success: false,
        error: "Who are you? You Degenerate at token 2",
      });
    }

    //console.log(tokenWithoutPrefix);
    const decoded = await jwt.verify(
      tokenWithoutPrefix,
      process.env.JWT_SECRET
    );

    //console.log(decoded._id);
    //console.log(decoded.id);

    // check if the user role is 'media'
    //console.log(decoded.role );
    if (decoded.role !== 'Media') {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to access this resource",
      });
    }

    req.user = await User.findById(decoded._id);
    //console.log(req.user);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
