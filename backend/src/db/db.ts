import { eq, sql } from "drizzle-orm";
import { db } from "./drizzle/db";
import { UserTable, ConversationTable } from "./drizzle/schema";
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