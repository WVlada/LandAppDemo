/*
  Warnings:

  - You are about to alter the column `povrsina` on the `Parcel` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `rb` to the `Parcel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parcel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rb" INTEGER NOT NULL,
    "ko" TEXT NOT NULL,
    "potes" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "klasa" TEXT NOT NULL,
    "povrsina" INTEGER NOT NULL,
    "vlasnistvo" TEXT NOT NULL
);
INSERT INTO "new_Parcel" ("id", "klasa", "ko", "number", "potes", "povrsina", "vlasnistvo") SELECT "id", "klasa", "ko", "number", "potes", "povrsina", "vlasnistvo" FROM "Parcel";
DROP TABLE "Parcel";
ALTER TABLE "new_Parcel" RENAME TO "Parcel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
