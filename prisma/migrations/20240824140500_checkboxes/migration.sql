/*
  Warnings:

  - Made the column `hasBalcony` on table `PropertyFeature` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasGardenYard` on table `PropertyFeature` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasSwimmingPool` on table `PropertyFeature` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PropertyFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkingSpots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "hasSwimmingPool" BOOLEAN NOT NULL,
    "hasGardenYard" BOOLEAN NOT NULL,
    "hasBalcony" BOOLEAN NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PropertyFeature" ("area", "bathrooms", "bedrooms", "hasBalcony", "hasGardenYard", "hasSwimmingPool", "id", "parkingSpots", "propertyId") SELECT "area", "bathrooms", "bedrooms", "hasBalcony", "hasGardenYard", "hasSwimmingPool", "id", "parkingSpots", "propertyId" FROM "PropertyFeature";
DROP TABLE "PropertyFeature";
ALTER TABLE "new_PropertyFeature" RENAME TO "PropertyFeature";
CREATE UNIQUE INDEX "PropertyFeature_propertyId_key" ON "PropertyFeature"("propertyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
