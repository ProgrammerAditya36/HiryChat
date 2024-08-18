import { Request, Response } from 'express';
import { createMessage , updateCoversation, getMessages, createDocument} from '../db/db';
export const newMessage = async (req: Request, res: Response) => {
    try{
        const {conversationId, sender, receiver, message} = req.body;
        console.log(conversationId, sender, receiver, message);
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

export const  newImage = async (req: Request, res: Response) => {
    try{
        const {conversationId, sender, receiver, url} = req.body;
        await createDocument(conversationId, sender, receiver, url.toString(), "image");  
        await updateCoversation(conversationId, url.toString());
        res.json({url});

    }
    catch(err){
        res.status(500).send("Error in creating image " + err);
    }
}

export const newVideo = async (req: Request, res: Response) => {
    try{
        const {conversationId, sender, receiver, url} = req.body;
        console.log(conversationId, sender, receiver, url);
        await createDocument(conversationId, sender, receiver, url.toString(), "video");  
        await updateCoversation(conversationId, url.toString());
        res.json({url});

    }
    catch(err){
        res.status(500).send("Error in creating video " + err);
    }
}

export const newFile = async (req: Request, res: Response) => {
    try{
        const {conversationId, sender, receiver, url} = req.body;
        await createDocument(conversationId, sender, receiver, url.toString(), "file");  
        await updateCoversation(conversationId, url.toString());
        res.json({url});

    }
    catch(err){
        res.status(500).send("Error in creating file " + err);
    }
}