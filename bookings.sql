-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2020 at 03:30 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `traveljet`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `booking_type` enum('One Way Trip','Round Trip','Round Trip with Sightseeing') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'One Way Trip',
  `for_sightseeing` tinyint(4) DEFAULT '0' COMMENT '0=>true,1=>false',
  `origin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_places` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickupstate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_places` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destinationstate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stopeges` text COLLATE utf8mb4_unicode_ci,
  `in_city` tinyint(4) DEFAULT '0' COMMENT '1=>outside city',
  `arrival` date DEFAULT NULL,
  `depart` date DEFAULT NULL,
  `pickup` time DEFAULT NULL,
  `booking_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_of_adults` int(11) DEFAULT NULL,
  `no_of_childrens` int(11) DEFAULT NULL,
  `no_of_infants` int(11) DEFAULT NULL,
  `vehicle_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `vehicle_budget` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicle_when` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('posted','hired','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'posted',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `booking_type`, `for_sightseeing`, `origin`, `from_places`, `pickupstate`, `to_places`, `destinationstate`, `stopeges`, `in_city`, `arrival`, `depart`, `pickup`, `booking_name`, `no_of_adults`, `no_of_childrens`, `no_of_infants`, `vehicle_type`, `description`, `name`, `mobile`, `email`, `otp`, `vehicle_budget`, `vehicle_when`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 'One Way Trip', 0, NULL, 'Lu', 'Uttar Pradesh', 'delhi', 'Delhi NCR', NULL, 1, '2020-08-20', '2020-08-13', '17:32:00', 'Lucknow to Noida Booking', 5, 1, 1, 'Sedan', 'Lucknow to noida booking description', 'Krishna Mishra', '9026574061', 'er.krishna@gmail.com', 2345, '6500-12,000', 'Within 2 days', 'posted', '2020-08-07 06:32:02', '2020-08-07 06:32:02'),
(2, 3, 'One Way Trip', 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 8, 5, 4, 'Hatchback', NULL, NULL, NULL, NULL, NULL, '35000- 55000', 'Within 2 weeks', 'posted', '2020-08-07 07:34:43', '2020-08-07 07:34:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
