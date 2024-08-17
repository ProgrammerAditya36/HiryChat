// src/routes/userRoutes.ts
import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { findUserByPhone, createUser, findAllUsers, getConnections as getDBconnections, createConnection as createDBConnection, setOnline } from "../db/db";

export const registerUser = async (req: Request, res: Response) => {
    const { name, phone, password,imgUrl } = req.body;
    console.log(req.body);
    try {
        let user = await findUserByPhone(phone);
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
        const hashedPassword = await bcrypt.hash(password, salt);
        await createUser(name, phone, hashedPassword, imgUrl);
        user = await findUserByPhone(phone);
        if(!user){
            res.status(500).send("Error in creating user");
            return;
        }
        user = await setOnline(user.id);
        res.json({ "user": user });
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    try {
        let user = await findUserByPhone(phone);
        if (!user) {
            res.status(401).send("User does not exist");
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send("Invalid credentials");
            return;
        }
        user = await setOnline(user.id);
        res.json({ "user": user });
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}
export const getUid = async (req: Request, res: Response) => {
    const { phone } = req.params;
    try {
        let user = await findUserByPhone(phone);
        if (!user) {
            res.status(401).send("User does not exist");
            return;
        }
        res.json( user.id );
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}
export const getUserByPhone = async (req: Request, res: Response) => {
    const { phone } = req.params;
    try {
        let user = await findUserByPhone(phone);
        if (!user) {
            res.status(401).send("User does not exist");
            return;
        }
        res.json({ "user": user });
    } catch (err) {
        res.status(500).send("Error in finding user");
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        let users = await findAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send("Error in finding users");
    }
}

export const getConnections = async (req: Request, res: Response) => {
    const { userId, status } = req.query;
    try {
        let connections =await getDBconnections(userId as string, status as string);
    
    }
    catch (err) {
        res.status(500).send("Error in finding connections");
    }
}

export const createConnection = async (req: Request, res: Response) => {
    const { from, to } = req.body;
    try {
        let connection = await createDBConnection(from, to);
        res.json(connection);
    }
    catch (err) {
        res.status(500).send(err);
    }
}