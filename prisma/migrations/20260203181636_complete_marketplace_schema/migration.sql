/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `authId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `adminFee` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerAmount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_authId_fkey";

-- DropIndex
DROP INDEX "Payment_invoiceId_key";

-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "buyerId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
DROP COLUMN "authId",
DROP COLUMN "invoiceId",
DROP COLUMN "isPaid",
ADD COLUMN     "adminFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "buyerId" TEXT NOT NULL,
ADD COLUMN     "sellerAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
