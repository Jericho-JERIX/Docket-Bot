-- CreateTable
CREATE TABLE "HomeworkFile" (
    "file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Homework" (
    "homework_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "date" DATETIME NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "day_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "no_deadline" BOOLEAN NOT NULL DEFAULT false,
    "is_checked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Homework_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "HomeworkFile" ("file_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HomeworkChannel" (
    "channel_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" INTEGER NOT NULL,
    "can_edit" BOOLEAN NOT NULL DEFAULT false,
    "enable_notification" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "HomeworkChannel_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "HomeworkFile" ("file_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
