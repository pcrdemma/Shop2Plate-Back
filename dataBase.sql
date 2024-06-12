CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "sexe" BOOLEAN NOT NULL,
    "price" REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS "Product" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "ShoppingList" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id"),
    FOREIGN KEY ("productId") REFERENCES "Product"("id")
);

CREATE TABLE IF NOT EXISTS "Expenses" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" REAL NOT NULL,
    "date" DATE NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id")
);

CREATE TABLE IF NOT EXISTS "Stock" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "productStockId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id"),
    FOREIGN KEY ("productStockId") REFERENCES "Product"("id")
);

CREATE TABLE IF NOT EXISTS "ProductStock" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expirationDate" DATE NOT NULL,
    "openingDate" DATE NOT NULL,
    "storageTime" INTEGER NOT NULL
);
