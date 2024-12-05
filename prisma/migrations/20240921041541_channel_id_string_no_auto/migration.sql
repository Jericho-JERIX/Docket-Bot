/*
  Warnings:

  - The primary key for the `HomeworkChannel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HomeworkChannel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "file_id" INTEGER NOT NULL,
    "can_edit" BOOLEAN NOT NULL DEFAULT false,
    "enable_notification" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "HomeworkChannel_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "HomeworkFile" ("file_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HomeworkChannel" ("can_edit", "channel_id", "enable_notification", "file_id") SELECT "can_edit", "channel_id", "enable_notification", "file_id" FROM "HomeworkChannel";
DROP TABLE "HomeworkChannel";
ALTER TABLE "new_HomeworkChannel" RENAME TO "HomeworkChannel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
