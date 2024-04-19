CREATE TABLE IF NOT EXISTS `User` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `firstname` varchar(255) NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `sexe` boolean NOT NULL,
    `price` int(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Product` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `price` int(11) NOT NULL,
    `category` varchar(255) NOT NULL,
    `quantity` int(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS `ShoppingList` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `userId` int(11) NOT NULL,
    `productId` int(11) NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (productId) REFERENCES Product(id)
);	

CREATE TABLE IS NOT EXISTS `Expenses` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `userId` int(11) NOT NULL,
    `price` int(11) NOT NULL,
    `date` date NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS `Stock` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `userId` int(11) NOT NULL,
    `productStockId` int(11) NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (productStockId) REFERENCES Product(id)
);

CREATE TABLE IF NOT EXISTS `ProductStock` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `price` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    `expirationDate` date NOT NULL, 
    `openingDate` date NOT NULL,
    `storageTime` int(11) NOT NULL
);
