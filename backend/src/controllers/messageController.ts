import { Request, Response } from 'express';
import { createMessage , updateCoversation, getMessages} from '../db/db';
export const newMessage = async (req: Request, res: Response) => {
    try{
        const {conversationId, sender, receiver, message} = req.body;
        let msg = await createMessage(conversationId, sender, receiver, message);
        if(!msg){
            res.status(500).send("Error in creating message");
            return;
        }
        await updateCoversation(conversationId, message);
        res.json(msg);
    }
    catch(err){
        res.status(500).send("Error in creating message " + err);
    }
}

export const getMessage = async (req: Request, res: Response) => {
    const conversationId = req.params.conversationId;
    try {
        let messages = await getMessages(conversationId);
        res.json(messages);
    } catch (err) {
        res.status(500).send("Error in finding messages");
    }
}

export const getMessagesAll = async (req: Request, res: Response) => {
    try {
        let messages = await getMessages();
        res.json(messages);
    } catch (err) {
        res.status(500).send("Error in finding messages" + err);
    }
}