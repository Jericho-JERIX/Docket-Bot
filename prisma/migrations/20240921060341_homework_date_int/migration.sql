/*
  Warnings:

  - You are about to alter the column `date` on the `Homework` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Homework" (
    "homework_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "date" INTEGER NOT NULL,
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
INSERT INTO "new_Homework" ("date", "day_name", "file_id", "homework_id", "is_active", "is_checked", "label", "month", "no_deadline", "timestamp", "type", "year") SELECT "date", "day_name", "file_id", "homework_id", "is_active", "is_checked", "label", "month", "no_deadline", "timestamp", "type", "year" FROM "Homework";
DROP TABLE "Homework";
ALTER TABLE "new_Homework" RENAME TO "Homework";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
