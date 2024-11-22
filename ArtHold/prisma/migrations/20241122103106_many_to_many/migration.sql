/*
  Warnings:

  - You are about to drop the column `artworkId` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_artworkId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "artworkId";

-- CreateTable
CREATE TABLE "_ArtworkTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtworkTags_AB_unique" ON "_ArtworkTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtworkTags_B_index" ON "_ArtworkTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "_ArtworkTags" ADD CONSTRAINT "_ArtworkTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtworkTags" ADD CONSTRAINT "_ArtworkTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
