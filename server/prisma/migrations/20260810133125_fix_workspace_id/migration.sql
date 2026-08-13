/*
  Warnings:

  - The primary key for the `Workspace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `if` on the `Workspace` table. All the data in the column will be lost.
  - The required column `id` was added to the `Workspace` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_pkey",
DROP COLUMN "if",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id");
