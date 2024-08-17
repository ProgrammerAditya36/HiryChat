import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
export const UserStatus = pgEnum('user_status',['online','offline']);
export const UserTable = pgTable('users',{
    phone:varchar('phone', {length:10}).primaryKey(),
    name:varchar('name',{length:100}),
    password:varchar('password'),
    imgUrl:varchar('imgUrl').default("https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"),
    status: UserStatus('status').default('online'),
})


export const ConversationTable = pgTable('conversation',{
    members:varchar('members').array(),
    status:varchar('status').default('active'),
    message:varchar('message'),
    createdAt:timestamp('createdAt').defaultNow(),
    updatedAt:timestamp('updatedAt').defaultNow(),
    id:uuid('id').primaryKey().defaultRandom(),
})
