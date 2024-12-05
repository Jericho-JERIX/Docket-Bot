/*
  Warnings:

  - A unique constraint covering the columns `[owner_id,filename]` on the table `HomeworkFile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HomeworkFile_owner_id_filename_key" ON "HomeworkFile"("owner_id", "filename");
