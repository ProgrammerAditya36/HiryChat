import { eq, sql } from "drizzle-orm";
import { db } from "./drizzle/db";
import { UserTable, ConnectionTable,MessageTable, ChatHistoryTable } from "./drizzle/schema";

export const findUserByPhone = async (phone: string) => {
    const users = await db.select().from(UserTable).where(eq(UserTable.phone, phone));
    return users.length > 0 ? users[0] : null;
}

export const createUser = async (name: string, phone: string, hashedPassword: string, imgUrl: string | null) => {
    const userData: any = {
        name,
        phone,
        password: hashedPassword
    };

    if (imgUrl) {
        userData.imgUrl = imgUrl;
    }

    return await db.insert(UserTable).values(userData);
};

export const getConnections = async (userId: string, status: string) => {    
    const result = await db
    .select()
    .from(ConnectionTable)
    .where(sql`${ConnectionTable.from} = ${userId} AND ${ConnectionTable.status} = ${status}`);
    console.log(result);    
    return result;
}

export const setOnline = async (userId: string) => {
    await db.update(UserTable).set({
        status:"online",
    }).where(eq(UserTable.id, userId));
    const users = await db.select().from(UserTable).where(eq(UserTable.id, userId));
    return users[0];

}

export const setOffline = async (userId: string) => {
    return await db.update(UserTable).set({
        status:"offline",
    }).where(eq(UserTable.id, userId));
}

export const createConnection = async (from: string, to: string) =>{
    console.log(from, to);
    const tryConnection = await db.select().from(ConnectionTable).where(sql`${ConnectionTable.from} = ${from} and ${ConnectionTable.to} = ${to}`);
    if(tryConnection.length > 0){
        return tryConnection[0];
    }
    await db.insert(ConnectionTable).values({
        from,
        to
    });
    await db.insert(ConnectionTable).values({
        from: to,
        to: from
    });
    return await db.select().from(ConnectionTable).where(sql`${ConnectionTable.from} = ${from} and ${ConnectionTable.to} = ${to}`);
}
export const findAllUsers = async () => {
    return await db.select().from(UserTable);
}
