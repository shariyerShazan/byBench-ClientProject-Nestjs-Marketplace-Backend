/*
  Warnings:

  - You are about to drop the column `addressId` on the `SellerProfile` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nickName` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `SellerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `SellerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `SellerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `SellerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `SellerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SellerProfile" DROP CONSTRAINT "SellerProfile_addressId_fkey";

-- DropIndex
DROP INDEX "SellerProfile_addressId_key";

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "nickName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellerProfile" DROP COLUMN "addressId",
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Address";
