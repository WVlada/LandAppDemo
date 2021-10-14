/*
  Warnings:

  - Added the required column `klasa` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ko` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potes` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `povrsina` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vlasnistvo` to the `Parcel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parcel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ko" TEXT NOT NULL,
    "potes" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "klasa" TEXT NOT NULL,
    "povrsina" TEXT NOT NULL,
    "vlasnistvo" TEXT NOT NULL
);
INSERT INTO "new_Parcel" ("id", "number") SELECT "id", "number" FROM "Parcel";
DROP TABLE "Parcel";
ALTER TABLE "new_Parcel" RENAME TO "Parcel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
