// src/routes/userRoutes.ts
import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { createUser, getAllUsers as getAllUsersDB,getUser as getUserDB, updateUser as updateUserDB } from "../db/db";

export const registerUser = async (req: Request, res: Response) => {
    let { name, phone, password,imgUrl } = req.body;
    console.log(req.body);
    try {
        let user = await getUserDB(phone);
        if (user) {
            res.status(401).send("User already exists");
            return;
        }
        if (!name || !phone || !password) {
            res.status(400).send("Please enter all fields");
            return;
        }
        if (!validator.isMobilePhone(phone)) {
            res.status(400).send("Please enter a valid phone number");
            return;
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        await createUser(name, phone, password,imgUrl);
        user = await getUserDB(phone);
        
        res.json({ "user": user });
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    try {
        let user = await getUserDB(phone);
        if (!user) {
            res.status(401).send("User does not exist");
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password??"");
        if (!isMatch) {
            res.status(401).send("Invalid credentials");
            return;
        }
        res.json({ "user": user });
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}

export const getUser = async (req: Request, res: Response) => {
    const phone = req.params.phone;
    try {
        let user = await getUserDB(phone);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}


export const getUsers = async (req: Request, res: Response) => {
    try {
        let users = await getAllUsersDB();
        res.json(users);
    } catch (err) {
        res.status(500).send("Error in finding users");
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const phone = req.params.phone;
    const { name, imgUrl } = req.body;
    try {
        let user = await getUserDB(phone);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        await updateUserDB(phone, name, imgUrl);
        user = await getUserDB(phone);
        res.json(user);
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}