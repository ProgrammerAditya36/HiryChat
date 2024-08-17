import { eq, sql } from "drizzle-orm";
import { db } from "./drizzle/db";
import { UserTable, ConversationTable,MessageTable } from "./drizzle/schema";
export const createUser = async (name: string, phone: string, password: string, imgUrl: string) => {  
    return await db.insert(UserTable).values({
        phone,
        name,
        imgUrl,
        password
    });
}
export const getUser = async (phone: string) => {
    const users =  await db.select().from(UserTable).where(eq(UserTable.phone, phone));
    return users[0];
}

export const getAllUsers = async () => {
    return await db.select().from(UserTable);
}

export const updateUser = async (phone: string, name: string, imgUrl: string) => {
    return await db.update(UserTable).set({
        name,
        imgUrl
    }).where(eq(UserTable.phone, phone));
}
export const getConversation = async (sender: string, receiver: string) => {
    const conversations = await db
        .select()
        .from(ConversationTable)
        .where(sql`members @> ARRAY[${sender}, ${receiver}]::varchar[]`);

    if (conversations.length === 0) {
        return null;
    }

    return conversations[0];
};

export const createConversation = async (sender: string, receiver: string) => {
    await db.insert(ConversationTable).values({
        members: [sender, receiver],
        message: "",
    });
}

export const createMessage = async (conversationId: string, sender: string, receiver: string, message: string) => {
    try{
    return await db.insert(MessageTable).values({
        conversationId,
        sender,
        receiver,
        message
    });}
    catch(err){
        console.log(err);
        return null;
    }
}

export const updateCoversation = async (conversationId: string, message: string) => {
    try{
    await db.update(ConversationTable).set({
        message
    }).where(eq(ConversationTable.id, conversationId));
    await db.update(ConversationTable).set({
        updatedAt: new Date()
    }).where(eq(ConversationTable.id, conversationId));
    return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}


export const getMessages = async (conversationId?: string|null|undefined) => {
    if(conversationId === null||conversationId === undefined){
        return await db.select().from(MessageTable);
    }
    return await db.select().from(MessageTable).where(eq(MessageTable.conversationId, conversationId));
}