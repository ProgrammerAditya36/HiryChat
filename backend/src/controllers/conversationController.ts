import { Request, Response } from 'express';
import { getConversation,createConversation } from '../db/db';
export const newCoversation = async (req: Request, res: Response) => {
    try{
        const {sender, receiver} = req.body;
        let conversation = await getConversation(sender, receiver);
        if(conversation){
            res.json(conversation);
            return;
        }
        await createConversation(sender, receiver);
        conversation = await getConversation(sender, receiver);
        res.json(conversation);
    }
    catch(err){
        res.status(500).send("Error in creating conversation " + err as string);
    }
}