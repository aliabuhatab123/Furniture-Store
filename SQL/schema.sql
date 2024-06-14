-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 14, 2024 at 02:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerceproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `guest_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`guest_id`, `first_name`, `last_name`, `street_address`, `city`, `phone_number`, `email_address`) VALUES
(17, 'Ali', 'Abu Hatab', 'Jenin, Yab\'ad Post Office', 'Jenin', '0595148311', 'sqlali14@gmail.com'),
(18, 'Ali', 'Abu Hatab', 'Jenin, Yab\'ad Post Office', 'Jenin', '0595148311', 'sqlali14@gmail.com'),
(19, 'test', 'ali', 'tulkrem', 'Tulkarm', '363636437645', 'test@rest.com');

-- --------------------------------------------------------

--
-- Table structure for table `guest_orders`
--

CREATE TABLE `guest_orders` (
  `order_id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `note` text DEFAULT NULL,
  `products` text NOT NULL,
  `purchase_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guest_orders`
--

INSERT INTO `guest_orders` (`order_id`, `guest_id`, `first_name`, `last_name`, `street_address`, `city`, `phone_number`, `email_address`, `note`, `products`, `purchase_date`) VALUES
(17, 17, 'Ali', 'Abu Hatab', 'main street', 'Jenin', '05951483115352', 'sqlali14@gmail.com', '', '[{\"id\":64,\"title\":\"Dorel Fitz Accent Chair\",\"price\":124,\"quantity\":3,\"image\":\"http:\\/\\/localhost\\/api\\/library\\/images\\/products\\/0_Dorel+Fitz+Accent+Chair.webp\"},{\"id\":66,\"title\":\"Julian Bowen Hayward Ottoman Chenille Fabric Dark Grey\",\"price\":204.95,\"quantity\":2,\"image\":\"http:\\/\\/localhost\\/api\\/library\\/images\\/products\\/0_Julian+Bowe++Hayward+Ottoman+Chenille+Fabric+Dark+Grey.jpg\"}]', '2024-06-14 10:25:37'),
(18, 18, 'Ali', 'Abu Hatab', 'Nablus street', 'Jenin', '0595155338311', 'sqlali14@gmail.com', '', '[{\"id\":63,\"title\":\"LPD Furniture Charles Armchair\",\"price\":214.99,\"quantity\":1,\"image\":\"http:\\/\\/localhost\\/api\\/library\\/images\\/products\\/0_LPD+Furniture+Charles+Armchair.webp\"}]', '2024-06-14 10:45:47'),
(19, 19, 'test', 'ali', 'tulkrem', 'Tulkarm', '363636437645', 'test@rest.com', 'thanks', '[{\"id\":63,\"title\":\"LPD Furniture Charles Armchair\",\"price\":214.99,\"quantity\":7,\"image\":\"http:\\/\\/localhost\\/api\\/library\\/images\\/products\\/0_LPD+Furniture+Charles+Armchair.webp\"}]', '2024-06-14 12:05:35');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemID` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(300) NOT NULL,
  `mainImagePath` varchar(255) NOT NULL,
  `longDescription` text NOT NULL,
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemID`, `title`, `price`, `description`, `mainImagePath`, `longDescription`, `category`) VALUES
(62, 'Novogratz Teresa Memory Foam Accent Chair in Grey', 229.95, 'Step up your décor game with the Novogratz Teresa Memory Foam Chair! Designed with a rounded and luxurious silhouette, this piece of furniture will surely bring elegance and finesse to your home. This accent armchair is upholstered in soft velvet and features slanted wooden legs and diamond button-t', 'library/images/products/0_Novogratz+Teresa+Memory+Foam+Accent+Chair+in+Grey.webp', 'Additional Information\r\nBuilt To Last. Made With A Durable Wood Frame And A Reliable Filling Made Of High-Density Foam And Memory Foam For Plush Comfortable Support, Perfect For Long Hours Behind A Computer Desk.\r\nShips In One Box And It Is Simple To Assemble.\r\nDesigned And Manufactured By Dorel Home\r\n12 Months Guarantee On All Dorel Products\r\nDoorstep Delivery To Most Of The Uk*\r\nColour: Grey\r\nAssembly: Some Assembly Required\r\nProduct Guarantee: 12 Months\r\nDimensions: 82.6cm x 86.4cm x 82.6cm', 'Arm Chairs & Recliners'),
(63, 'LPD Furniture Charles Armchair', 214.99, 'Upgrade your living space with the LPD Charles Armchair, a true masterpiece in the world of furniture design. Choose from five luxury colours to match your personal taste: Sage Velvet, Ivory Boucle, Cream Velvet, Black Velvet, and Beige Velvet.\r\n\r\nDesigned to be both visually appealing and cosy, the', 'library/images/products/0_LPD+Furniture+Charles+Armchair.webp', 'Additional Information\r\nUpgrade your home with LPD Furniture\'s timeless and sophisticated designs.\r\nBring functionality and style to your living space with this versatile product.\r\nCreate the perfect home with The Furniture Home\'s curated collection of products.\r\n\r\nBrand:LPD Furniture\r\nRange: Charles\r\nColour: Blue\r\nMaterial: Velvet\r\nAssembly: Some Assembly Required\r\nProduct Guarantee: 12 Months\r\nDimensions: 66cm x 75.5cm x 76.5cm\r\nWeight: 25kg\r\n\r\nAdd a statement chair to your interior with our Charles chair sleek gold frame with plush velvet cushion.', 'Arm Chairs & Recliners'),
(64, 'Dorel Fitz Accent Chair', 124, 'Luxurious and trendy, the DHP Fitz Accent Chair is the perfect vintage pop of color to brighten up your home décor – and your life. The Fitz is made with a seat and backrest that are foam padded to provide you and your occasional guests with unparalleled plush comfort.', 'library/images/products/0_Dorel+Fitz+Accent+Chair.webp', 'The DHP Fitz Accent Chair is the perfect pop of color to brighten up your living room, bedroom or home office.\r\nCurved design upholstered in soft velvet that sits on sturdy black metal legs.\r\nMade with armrests and foam padded seating and backrest for unparalleled comfort.', 'Arm Chairs & Recliners'),
(65, 'Julian Bowen Hayward Chair Chenille Fabric Dark Grey', 430.95, 'Julian Bowen, Hayward Chair Chenille Fabric, Dark Grey\r\n\r\nThe Hayward Armchair will add a modern touch to any home. Finished in an elegant dark grey chenille fabric, this armchair features a padded frame allowing you to relax in style.', 'library/images/products/0_Julian+Bowen+Hayward+Chair+Chenille+Fabric+Dark+Grey.webp', 'Accompanied by two leg colour options - black or light oak, this armchair is the perfect design for a range of home decor. Part of the Hayward Upholstry Range from Julian Bowen.\r\n\r\nDimensions (cm): 89cm x 86cm x 86cm\r\n\r\nWeight (kg): 20.5', 'Arm Chairs & Recliners'),
(66, 'Julian Bowen Hayward Ottoman Chenille Fabric Dark Grey', 204.95, 'Julian Bowen, Hayward Ottoman Chenille Fabric, Dark Grey\r\n\r\nPerfectly proportioned to sit with the Julian Bowen Hayward Sofa Collection, the contemporary Hayward Ottoman is upholstered in an elegant dark grey chenille fabric Accompanied by two leg colour options - black or light oak, this armchair i', 'library/images/products/0_Julian+Bowe++Hayward+Ottoman+Chenille+Fabric+Dark+Grey.jpg', 'Perfectly proportioned to sit with the Julian Bowen Hayward Sofa Collection, the contemporary Hayward Ottoman is upholstered in an elegant dark grey chenille fabric Accompanied by two leg colour options - black or light oak, this armchair is the perfect design for a range of home décor.\r\n\r\nDimensions (cm): 67cm x 67cm x 52cm\r\n\r\nWeight (kg): 8', 'Arm Chairs & Recliners'),
(67, 'Alphason Cabrini Bookcase', 82.95, 'Alphason Cabrini Bookcase, White\r\n\r\nThe Cabrini bookcase has been designed to match the Cabrini Desk - but the neural colours ensure it looks great with other desks or on its on. This modern, attractive bookcase features 4 white shelves on a grey frame, and comes with adjustable feet and wall attach', 'library/images/products/0_Alphason+Cabrini+Bookcase.webp', 'This modern, attractive bookcase features 4 white shelves on a grey frame, and comes with adjustable feet and wall attachment for superior safety.\r\n\r\nPainted modern bookcase\r\n\r\n4 white shelves on a stylish grey frame\r\n\r\nIncludes wall fixing strap\r\n\r\nPerfectly matches Cabrini Desk\r\n\r\nAdjustable feet\r\n\r\nShelf area (mm): W 760 x D 300', 'Bookcases'),
(68, 'Dorel Wildwood Bookcase', 195.95, 'Dorel Wildwood Bookcase & Room Divider, Espresso\r\n\r\nCreate more storage opportunities in any room with the Ameriwood Home Wildwood Wood Veneer Bookcase/Room Divider. With 8 spacious, open shelves, you’ll have plenty of space for books, personal keepsakes, plants and other decorative accessories. The', 'library/images/products/0_Dorel+Wildwood+Bookcase.webp', 'Constructed of real wood veneer, the bookcase has a strong, durable build you can trust. It stands at 60”h x 36.22”w x 12.99”d. Two adults are recommended for proper assembly.\r\n\r\nAdd more storage options to any room with the spacious and stylish Wildwood Wood Veneer Bookcase/Room Divider\r\n\r\nThe bookcase has 8 shelves for storing and separating a variety of items\r\n\r\nFinished on all sides, the bookcase can be used in the middle of a room to separate 2 areas\r\n\r\nTwo adults are recommended for proper assembly. Dimensions: 60”h x 36.22”w x 12.99”d. Shipping weight is approximately 85 lbs\r\n\r\nA warm brown woodgrain finish, dark brown undertones and black accents create a stunning color combination', 'Bookcases'),
(70, 'LPD Furniture Tiva Ladder Bookcase', 91.99, 'The latest trend of ladder-style storage hasn\'t been overlooked with the Tiva Ladder Bookcase. Comprising of beautiful, leaning lines and simple shelving structures, the versatile pieces in the Tiva range can be joined together to form larger media or storage unit. Finished in a stunning oak and com', 'library/images/products/0_LPD+Furniture+Tiva+Ladder+Bookcase.webp', 'Additional Information\r\nTransform your home with LPD Furniture\'s stunning range of high-quality products.\r\nAdd a touch of elegance to your home with this stylish furniture piece.\r\nFind inspiration for your home decor at The Furniture Home.\r\n\r\nBrand:LPD Furniture\r\nRange: Tiva\r\nColour: Oak\r\nMaterial: MDF\r\nAssembly: Some Assembly Required\r\nProduct Guarantee: 12 Months\r\nDimensions: 38.6cm x 64cm x 175.4cm\r\nWeight: 20kg', 'Bookcases'),
(71, 'Dorel Franklin 2 Door Storage Cabinet', 147.99, 'Get storage where you need it with the Ameriwood Home Franklin 2 Door Storage Cabinet. Made of painted MDF and solid wood legs, the crisp white finish can easily be added into your existing décor. The 2 glass doors feature a mullion frame for a decorative touch and adjustable euro hinges. The decora', 'library/images/products/0_Dorel+Franklin+2+Door+Storage+Cabinet.webp', '. The Cabinet can also be used as a small buffet to store fine china, silverware, and cups. Get creative and use the Cabinet however you see fit.\r\n\r\nPainted MDF and solid wood legs\r\n\r\nTwo people are required for assembly\r\n\r\nFeatures 2 shelves, 1 adjustable & 2 glass doors. Open lower shelf.\r\n\r\nColour/Finish - White/White\r\n\r\nCoordinating products available.', 'Buffet & Sideboards'),
(72, 'Dorel Franklin 2 Door Storage Cabinet', 198.99, 'Dorel Franklin 2 Door Storage Cabinet, Grey\r\n\r\nGet storage where you need it with the Ameriwood Home Franklin 2 Door Storage Cabinet. Made of painted MDF and solid wood legs, the neutral grey finish can easily be added into your existing décor. The 2 glass doors feature a mullion frame for a decorat', 'library/images/products/0_Dorel+Franklin+2+Door+Storage+CabinetB.webp', 'The top surface is perfect for displaying photos and decorations and the open lower shelf gives you extra storage. The 2 shelves, 1 adjustable, can organize board games, blankets, or extra linens. The Cabinet can also be used as a small buffet to store fine china, silverware, and cups. Get creative and use the Cabinet however you see fit.\r\n\r\nPainted MDF and solid wood legs\r\n\r\nTwo people are required for assembly\r\n\r\nFeatures 2 shelves, 1 adjustable & 2 glass doors. Open lower shelf.\r\n\r\nColour/Finish - Grey/Grey\r\n\r\nCoordinating products available.', 'Buffet & Sideboards'),
(73, 'Novogratz Webster Coffee Table in Walnut', 58.95, 'Add a rustic industrial feel to your living room with the Novogratz Webster Coffee Table. The classic walnut woodgrain finish on the laminated hollow core and particleboard pairs with the metal frame for an updated look you will love. The spacious table top can hold all of your coasters, snacks, mag', 'library/images/products/0_Novogratz+Webster+Coffee+Table+in+Walnut.webp', 'The hidden drawer at the end of the Table is perfect for storing away smaller items like remotes to keep your table top clutter free. Finish your room with the rest of the Webster collection for a coordinated look (each sold separately). The Coffee Table ships flat to your door and requires assembly upon opening. Two adults are recommended to assemble. Once assembled, the Coffee Table measures to be 17.66”H x 42”W x 21.65”D.\r\n\r\nAdditional Information\r\nComplete Your Living Room With The Novogratz Webster Coffee Table\r\nMade Of Laminated Hollow Core And Particleboard With Metal Frame, The Classic Walnut Woodgrain Finish Pairs With The Gray Powder-Coated Metal For A Mix Of Rustic And Industrial Styles\r\nPlace Coasters, Snacks, And Reading Material On The Spacious Table Top. The Hidden Drawer Is Perfect For Smaller Electronics To Keep Your Table Top Clutter Free\r\nComplete Your Space With The Entire Webster Collection For A Coordinated Look (Each Sold Separately)\r\nThe Coffee Table Ships Flat To Your Door And 2 Adults Are Recommended To Assemble. The Table Top Can Hold Up To 80 Lbs. And The Drawer Can Hold 5 Lbs. Assembled Dimensions: 17.66”H X 42”W X 21.65”D\r\nColour: Walnut\r\nAssembly: Some Assembly Required\r\nProduct Guarantee: 12 Months\r\nDimensions: 44.9cm x 106.7cm x 55.0cm', 'Coffee Tables'),
(74, 'Dorel Vaughn Coffee Table Walnut', 100.99, 'Dorel Vaughn Coffee Table, Walnut\r\n\r\nThe Ameriwood Home Vaughn collection is bringing back the mid-century modern style with its unique, yet simple, design. The Vaughn Coffee Table has a mix of solid and louvered sliding doors which can alternate from left to right to open up different types or stor', 'library/images/products/0_Dorel+Vaughn+Coffee+Table.webp', 'Bring back the “old” with the mid-century modern look of the Vaughn Coffee Table\r\n\r\nTwo different sliding doors to help hide your living room must haves - retro louvered door on one side and a simple sleek door on the other\r\n\r\nFour small shelves and 2 large shelves help to give you storage options\r\n\r\nTwo adults are requires for proper assembly. Assembled dimensions: 17”h x 47.5”w x 23.6”d. Shipping weight is approximately 69.3 lbs\r\n\r\nThis Coffee Table is constructed of a gray woodgrain laminate on particleboard, MDF, solid wood and wood veneer', 'Coffee Tables'),
(75, 'Dorel Bowie Sofa Grey', 430.95, 'Brimming with modern appeal, the Bowie Sofa boasts a timeless yet minimalist aesthetic making it the perfect piece for your living room or seating area. A tailored design, the classically styled frame gives this piece a timeless appearance that is at home in both formal and casual settings.', 'library/images/products/0_Dorel+Bowie+Sofa+Grey.webp', 'dditional Information\r\nContemporary, mid-century modern inspired sofa. Designed with elegant tufting on seat and back cushions and features track arms.\r\nEasy-to-clean linen fabric with durable frame and solid wood pyramid legs in a black finish.\r\nCompact sofa size - small space friendly.\r\n\r\nColour: Grey\r\nAssembly: Some Assembly Required\r\nProduct Guarantee: 12 Months', 'Sofas'),
(76, 'Provence Nest Of Tables', 192.99, 'Julian Bowen, Provence Nest Of Tables, Limed Oak & Grey\r\n\r\nThis timeless nest of tables offer an authentic antique design with a classic turned leg design perfect for contemporary spaces as well as traditional homes.', 'library/images/products/0_Provence+Nest+Of+Tables.webp', 'Finished in a light grey lacquer with a limed oak effect top, the Provence features 2 tables that perfect fit away under one another when not in use. Part of the Provence dining and occasional collection.\r\n\r\nWeight (kg): 7.5', 'Tables'),
(77, 'Dorel Bowden Upholstered Molded Counter Stool', 191, 'Take your kitchen counter to the next level with the elegant and sophisticated Bowden Upholstered Molded Counter Stool. Shaped with rounded lines, this stool alludes to the Mid Century décor with its antique and distressed look. It is upholstered in faux leather with a foam-padded seat, footrest and', 'library/images/products/0_Dorel+Bowden+Upholstered+Molded+Counter+Stool.webp', 'Elegant and sophisticated chair alludes to the Mid Century décor.\r\nUpholstered in faux leather with an antique and distressed look. Stool height is 24 inches\r\nSeat comes with foam padding to ensure top comfort and it also includes a footrest.', 'Stools');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `note` text DEFAULT NULL,
  `purchase_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `first_name`, `last_name`, `street_address`, `city`, `phone_number`, `email_address`, `note`, `purchase_date`) VALUES
(40, 1, 'user1', 'test', 'main street jenin', 'Jenin', '98259458734975', 'userTest1@gmail.com', 'Thank you', '2024-06-14 09:32:13'),
(41, 4, 'Ali', 'Abu Hatab', 'Jenin, Yab\'ad Post Office', 'Jenin', '0595148311', 'sqlali14@gmail.com', '', '2024-06-14 10:24:02'),
(42, 40, 'user', 'user40', 'Nablus', 'Nablus', '032875t38', 'userTest1@gmail.com', 'aa', '2024-06-14 12:11:55');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `title`, `price`, `quantity`, `image`) VALUES
(15, 40, 1, 'Dorel Franklin Accent Table with 2 Drawers Black', 99.95, 1, 'http://localhost/api/library/images/products/0_Dorel-Franklin-Accent-Table-with-2-Drawers-Black.webp'),
(16, 40, 63, 'LPD Furniture Charles Armchair', 214.99, 4, 'http://localhost/api/library/images/products/0_LPD+Furniture+Charles+Armchair.webp'),
(17, 40, 70, 'LPD Furniture Tiva Ladder Bookcase', 91.99, 2, 'http://localhost/api/library/images/products/0_LPD+Furniture+Tiva+Ladder+Bookcase.webp'),
(18, 41, 66, 'Julian Bowen Hayward Ottoman Chenille Fabric Dark Grey', 204.95, 3, 'http://localhost/api/library/images/products/0_Julian+Bowe++Hayward+Ottoman+Chenille+Fabric+Dark+Grey.jpg'),
(19, 42, 68, 'Dorel Wildwood Bookcase', 195.95, 3, 'http://localhost/api/library/images/products/0_Dorel+Wildwood+Bookcase.webp'),
(20, 42, 68, 'Dorel Wildwood Bookcase', 195.95, 7, 'http://localhost/api/library/images/products/0_Dorel+Wildwood+Bookcase.webp');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `userName` varchar(80) NOT NULL,
  `userEmail` varchar(80) NOT NULL,
  `userPassword` varchar(80) NOT NULL,
  `userLevel` varchar(100) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `userName`, `userEmail`, `userPassword`, `userLevel`, `firstName`, `lastName`, `email`, `gender`, `phoneNumber`) VALUES
(0, 'adminUser', 'admin@furnitue2024.com', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'admin', 'admin', 'admin', '-', '-', '-'),
(1, 'user1', 'user1@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'One', 'user1@example.com', 'Male', '05912345'),
(2, 'user2', 'user2@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Two', 'user2@example.com', 'Male', '05623456'),
(3, 'user3', 'user3@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Three', 'user3@example.com', 'Female', '05934567'),
(4, 'user4', 'user4@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Four', 'user4@example.com', 'Male', '05645678'),
(5, 'user5', 'user5@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Five', 'user5@example.com', 'Female', '05956789'),
(6, 'user6', 'user6@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Six', 'user6@example.com', 'Male', '05667890'),
(7, 'user7', 'user7@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Seven', 'user7@example.com', 'Female', '05978901'),
(8, 'user8', 'user8@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Eight', 'user8@example.com', 'Male', '05689012'),
(9, 'user9', 'user9@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Nine', 'user9@example.com', 'Female', '05990123'),
(10, 'user10', 'user10@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Ten', 'user10@example.com', 'Male', '05601234'),
(11, 'user11', 'user11@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Eleven', 'user11@example.com', 'Female', '05912345'),
(12, 'user12', 'user12@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twelve', 'user12@example.com', 'Male', '05623456'),
(13, 'user13', 'user13@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirteen', 'user13@example.com', 'Female', '05934567'),
(14, 'user14', 'user14@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Fourteen', 'user14@example.com', 'Male', '05645678'),
(15, 'user15', 'user15@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Fifteen', 'user15@example.com', 'Female', '05956789'),
(16, 'user16', 'user16@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Sixteen', 'user16@example.com', 'Male', '05667890'),
(17, 'user17', 'user17@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Seventeen', 'user17@example.com', 'Female', '05978901'),
(18, 'user18', 'user18@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Eighteen', 'user18@example.com', 'Male', '05689012'),
(19, 'user19', 'user19@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Nineteen', 'user19@example.com', 'Female', '05990123'),
(20, 'user20', 'user20@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty', 'user20@example.com', 'Male', '05601234'),
(21, 'user21', 'user21@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-One', 'user21@example.com', 'Female', '05912345'),
(22, 'user22', 'user22@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Two', 'user22@example.com', 'Male', '05623456'),
(23, 'user23', 'user23@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Three', 'user23@example.com', 'Female', '05934567'),
(24, 'user24', 'user24@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Four', 'user24@example.com', 'Male', '05645678'),
(25, 'user25', 'user25@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Five', 'user25@example.com', 'Female', '05956789'),
(26, 'user26', 'user26@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Six', 'user26@example.com', 'Male', '05667890'),
(27, 'user27', 'user27@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Seven', 'user27@example.com', 'Female', '05978901'),
(28, 'user28', 'user28@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Eight', 'user28@example.com', 'Male', '05689012'),
(29, 'user29', 'user29@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Twenty-Nine', 'user29@example.com', 'Female', '05990123'),
(30, 'user30', 'user30@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty', 'user30@example.com', 'Male', '05601234'),
(31, 'user31', 'user31@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-One', 'user31@example.com', 'Female', '05912345'),
(32, 'user32', 'user32@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Two', 'user32@example.com', 'Male', '05623456'),
(33, 'user33', 'user33@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Three', 'user33@example.com', 'Female', '05934567'),
(34, 'user34', 'user34@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Four', 'user34@example.com', 'Male', '05645678'),
(35, 'user35', 'user35@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Five', 'user35@example.com', 'Female', '05956789'),
(36, 'user36', 'user36@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Six', 'user36@example.com', 'Male', '05667890'),
(37, 'user37', 'user37@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Seven', 'user37@example.com', 'Female', '05978901'),
(38, 'user38', 'user38@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Eight', 'user38@example.com', 'Male', '05689012'),
(39, 'user39', 'user39@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Thirty-Nine', 'user39@example.com', 'Female', '05990123'),
(40, 'user40', 'user40@example.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'User', 'Forty', 'user40@example.com', 'Male', '05601234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`guest_id`);

--
-- Indexes for table `guest_orders`
--
ALTER TABLE `guest_orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `guest_id` (`guest_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `guest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `guest_orders`
--
ALTER TABLE `guest_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guest_orders`
--
ALTER TABLE `guest_orders`
  ADD CONSTRAINT `guest_orders_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`guest_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
