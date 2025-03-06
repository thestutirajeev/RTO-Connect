import { query } from "express";
import Officer from "../models/OfficerSchema.js";
//PUT
export const updateOfficer = async (req, res) => {
    const id = req.params.id;

    try{
        const updatedOfficer = await Officer.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Officer updated successfully",
            data: updatedOfficer,
        });
    }catch(err){
        res.status(500).json({ success: false, message: "Failed to update Officer"});
    } 
};
//DELETE
export const deleteOfficer = async (req, res) => {
    const id = req.params.id;

    try{
        await Officer.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Officer successfully deleted",
        });
    }catch(err){
        res.status(500).json({ success: false, message: "Failed to delete Officer"});
    } 
};
//GET
export const getSingleOfficer = async (req, res) => {
    const id = req.params.id;

    try{
        const officer = await Officer.findById(id)
        .populate("reviews")
        .select("-password");

        res.status(200).json({
            success: true,
            message: "Officer Found",
            data: officer,
        });
    }catch(err){
        res.status(404).json({ success: false, message: "No Officer Found"});
    } 
};
//GET
// GET all officers
export const getAllOfficer = async (req, res) => {
    try {
        const officers = await Officer.find().select("-password");

        res.status(200).json({
            success: true,
            message: "Officers Found",
            data: officers,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "Officers Not Found" });
    }
};
