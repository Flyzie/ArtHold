/*
  Warnings:

  - Added the required column `name` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "name" TEXT NOT NULL;
