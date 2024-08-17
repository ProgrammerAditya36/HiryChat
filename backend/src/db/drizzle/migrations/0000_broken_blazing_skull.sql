DO $$ BEGIN
 CREATE TYPE "public"."user_status" AS ENUM('online', 'offline');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"phone" varchar(10) PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"password" varchar,
	"imgUrl" varchar DEFAULT 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
	"status" "user_status" DEFAULT 'online'
);
