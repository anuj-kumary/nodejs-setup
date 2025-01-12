import { Request, Response } from 'express';
const { Users } = require("../models");

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body,"ff")
        const { username, email, password } = req.body;
        const user = await Users.create({ username, email, password });
        res.status(201).json(user);
    } catch (error: unknown) {
        res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }

};
