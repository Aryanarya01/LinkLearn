import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import jwt from "jsonwebtoken";
import fs from "fs";
import Connection from "../models/connection.model.js";

const convertProfileToPdf = async (data) => {
  const doc = new PDFDocument();
  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);
  doc.pipe(stream);

  doc.image(`uploads/${data.userId.profilePicture}`, {
    align: "center",
    width: 100,
  });

  doc.fontSize(14).text(`Name : ${data.userId.name}`);
  doc.fontSize(14).text(`Username : ${data.userId.username}`);
  doc.fontSize(14).text(`Email : ${data.userId.email}`);
  doc.fontSize(14).text(`Bio : ${data.bio}`);
  doc.fontSize(14).text(`CurrentPost : ${data.currentPost}`);
  doc.fontSize(14).text("Past Work :");
  data.pastWork.forEach((work, index) => {
    doc.fontSize(14).text(`Company Name : ${work.company}`);
    doc.fontSize(14).text(`Position : ${work.position}`);
    doc.fontSize(14).text(`Years : ${work.years}`);
  });
  doc.end();
  return outputPath;
};

export const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const profile = new Profile({ userId: newUser._id });
    await profile.save();
    return res.status(200).json({ message: "User Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({ message: "Authentication Error!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true on deployed, false local
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax",
      path: "/",
    });
    return res.status(200).json({ message: "Login Successfull" , token: token,   // 👈 ADD THIS
  user: user});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error!" });
  }
};

export const uploadUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.profilePicture = req.file.filename;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { ...newUserData } = req.body;
    const { username, email } = newUserData;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return res.status(400).json({ message: "User Already Exist!" });
    }

    Object.assign(user, newUserData);
    await user.save();
    res.status(200).json({ message: "profile updated", user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserAndProfile = async (req, res) => {
  try {
    const Id = req.user.id;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name username email profilePicture",
    );

    return res.status(200).json(userProfile);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const Id = req.user.id;
    const { ...newProfileData } = req.body;
    const userProfile = await User.findById(Id);
    if (!userProfile) {
      return res.status(400).json({ message: "User not found!" });
    }
    const Profle_to_update = await Profile.findOne({ userId: userProfile.id });
    Object.assign(Profle_to_update, newProfileData);
    await Profle_to_update.save();
    res.status(200).json({ message: "Profile Updated!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllUserProfile = async (req, res) => {
  try {
    const AllProfile = await Profile.find().populate(
      "userId",
      "name username email profilePicture",
    );
    res.status(200).json({ AllProfile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const downloadProfile = async (req, res) => {
  try {
    const Id = req.user.id;
    const profile = await Profile.findOne({ userId: Id }).populate(
      "userId",
      "name email username profilePicture",
    );
    const outputPath = await convertProfileToPdf(profile);
    return res.status(200).json({ message: outputPath });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const sendConnectionRequest = async (req, res) => {
  try {
    const Id = req.user.id;
    const { connectionId } = req.body;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(400).json({ message: "User not found~!" });
    }
    const targetUser = await User.findOne({ _id: connectionId });
    if (!targetUser) {
      return res.status(404).json({ message: "Targeted User not found!" });
    }
    if (Id === connectionId) {
      return res
        .status(400)
        .json({ message: "You can't connect with yourself!" });
    }
    const existingRequest = await Connection.findOne({
      userId: user._id,
      connectionId: targetUser._id,
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request Already Sent!" });
    }
    const newRequest = new Connection({
      userId: user._id,
      connectionId: targetUser._id,
    });
    await newRequest.save();
    res.status(200).json({ message: "Request send!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//  maine kise bje hai
export const getMyConnections = async (req, res) => {
  try {
    const Id = req.user.id;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const mySendRequests = await Connection.find({
      userId: Id,
    }).populate("connectionId", "name email username profilePicture");
    res.status(200).json({ mySendRequests });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//kis ne muje bheji hai

export const whatAreMyConnections = async (req, res) => {
  try {
    const Id = req.user.id;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const myConnection = await Connection.find({
      connectionId: Id,
    }).populate("userId", "name email username profilePicture");
    return res.status(200).json({ myConnection });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const acceptConnectionRequest = async(req,res)=>{
  try{
    const Id = req.user.id;
    const {requestId,action_type} = req.body;
    const user = await User.findById(Id);
    if(!user){
      return res.status(404).json({message : "User not found!"});
    }
    const isConnection = await Connection.findOne({_id : requestId});
    if(!isConnection){
      return res.status(404).json({message : "Connection not found!"});
    }
    
    if(isConnection.action_type === "accept"){
      isConnection.status_accepted = true;
    }else{
      isConnection.status_accepted = false;
    }
    await isConnection.save()
   return res.status(200).json({message : "Request Accepted!"})

  }catch(err){
    return res.status(500).json({message : err.message})
  }
}


export const getUserProfileBasedOnUsername = async(req,res)=>{
   const {username} = req.query;
  try{
    
    const user = User.findOne({username});
    if(!user){
      return res.status(404).json({message : "User not found"});
    }
    
  }catch(err){
    return res.status(500).json({message : err.message})
  }
}