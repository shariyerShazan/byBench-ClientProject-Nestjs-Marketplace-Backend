/*
  Warnings:

  - You are about to drop the `SellerBank` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripeAccountId]` on the table `SellerProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SellerBank" DROP CONSTRAINT "SellerBank_sellerProfileId_fkey";

-- AlterTable
ALTER TABLE "SellerProfile" ADD COLUMN     "isStripeVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeAccountId" TEXT;

-- DropTable
DROP TABLE "SellerBank";

-- CreateIndex
CREATE UNIQUE INDEX "SellerProfile_stripeAccountId_key" ON "SellerProfile"("stripeAccountId");
