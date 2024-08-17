CREATE TABLE IF NOT EXISTS "conversation" (
	"members" varchar[],
	"message" varchar,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
