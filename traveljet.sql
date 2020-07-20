-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2020 at 02:49 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

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
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `booking_type` enum('One Way Trip','Round Trip','Round Trip with Sightseeing') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_at` date NOT NULL,
  `end_on` date NOT NULL,
  `pick_up` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `drop_on` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destination` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sightseeing` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `persons` int(11) DEFAULT NULL,
  `cab_type` enum('Sedan(4 Seater)','Innova(6 Seater)','SUV(7 Seater)') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_in` enum('Within 2 Days','Within 1 Week','Within 1 Month','Months +') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('posted','hired','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'posted',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `queries`
--

INSERT INTO `queries` (`id`, `user_id`, `booking_type`, `start_at`, `end_on`, `pick_up`, `drop_on`, `destination`, `sightseeing`, `persons`, `cab_type`, `book_in`, `budget`, `description`, `status`, `created_at`, `updated_at`) VALUES
(9, 4, 'Round Trip with Sightseeing', '2020-07-16', '2020-07-23', 'Noida', NULL, 'Delhi', 'Yes', 3, 'Innova(6 Seater)', NULL, 1000, 'fdh th fgj  k hl hl hiiiii hhjhjkk kkk', 'posted', '2020-07-08 13:55:15', '2020-07-08 14:17:58'),
(10, 4, 'Round Trip with Sightseeing', '2020-07-16', '2020-07-23', 'Noida', NULL, 'Delhi', 'Yes', 30, 'Innova(6 Seater)', NULL, 1000, 'fdh th fgj  k hl hl hiiiii hhjhjkk kkk', 'posted', '2020-07-08 13:55:15', '2020-07-08 14:17:58'),
(12, 4, 'Round Trip with Sightseeing', '2020-07-16', '2020-07-23', 'Noida', NULL, 'Delhi', 'Yes', 33, 'Innova(6 Seater)', NULL, 1000, 'fdh th fgj  k hl hl hiiiii hhjhjkk kkk', 'posted', '2020-07-08 13:55:15', '2020-07-08 14:17:58'),
(14, 4, 'Round Trip with Sightseeing', '2020-07-16', '2020-07-23', 'Noida', NULL, 'Delhi', 'Yes', 30, 'Innova(6 Seater)', NULL, 1000, 'fdh th fgj  k hl hl hiiiii hhjhjkk kkk', 'posted', '2020-07-08 13:55:15', '2020-07-08 14:17:58'),
(15, 4, 'Round Trip with Sightseeing', '2020-07-16', '2020-07-23', 'Noida', NULL, 'Delhi', 'Yes', 31, 'Innova(6 Seater)', NULL, 1000, 'fdh th fgj  k hl hl hiiiii hhjhjkk kkk', 'posted', '2020-07-08 13:55:15', '2020-07-08 14:17:58'),
(16, 4, 'Round Trip with Sightseeing', '2020-07-16', '2020-07-23', 'Noida', NULL, 'Delhi', 'Yes', 33, 'Innova(6 Seater)', NULL, 1000, 'fdh th fgj  k hl hl hiiiii hhjhjkk kkk', 'posted', '2020-07-08 13:55:15', '2020-07-08 14:17:58');

-- --------------------------------------------------------

--
-- Table structure for table `site_managements`
--

CREATE TABLE `site_managements` (
  `id` int(10) UNSIGNED NOT NULL,
  `meta_key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_managements`
--

INSERT INTO `site_managements` (`id`, `meta_key`, `meta_value`, `created_at`, `updated_at`) VALUES
(2, 'app_desc', '<p>Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina ilukita ylokem lokateise ination voluptate velit esse cillum dolore eu fugiat nulla pariatur lokaim urianewce.</p>\r\n                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumed perspiciatis.</p>', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(3, 'app_android_link', 'https://play.google.com/store/apps/details?id=com.app.amento.worketic', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(4, 'app_ios_link', '#', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(5, 'socials', 'a:5:{i:0;a:2:{s:5:\"title\";s:8:\"facebook\";s:3:\"url\";s:1:\"#\";}i:1;a:2:{s:5:\"title\";s:7:\"twitter\";s:3:\"url\";s:1:\"#\";}i:2;a:2:{s:5:\"title\";s:7:\"youtube\";s:3:\"url\";s:1:\"#\";}i:3;a:2:{s:5:\"title\";s:9:\"instagram\";s:3:\"url\";s:1:\"#\";}i:4;a:2:{s:5:\"title\";s:10:\"googleplus\";s:3:\"url\";s:1:\"#\";}}', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(11, 'email_data', 'a:1:{i:0;a:7:{s:10:\"from_email\";s:16:\"info@noreply.com\";s:13:\"from_email_id\";s:16:\"info@noreply.com\";s:11:\"sender_name\";s:6:\"Amento\";s:14:\"sender_tagline\";s:17:\"Your Work Partner\";s:10:\"sender_url\";s:39:\"http://amentotech.com/projects/worketic\";s:10:\"email_logo\";s:22:\"1555743744-favicon.png\";s:12:\"email_banner\";s:21:\"1555743744-banner.jpg\";}}', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(12, 'section_settings', 'a:1:{i:0;a:12:{s:20:\"home_section_display\";s:4:\"true\";s:10:\"section_bg\";s:21:\"1557484284-banner.jpg\";s:13:\"company_title\";s:16:\"Start As Company\";s:12:\"company_desc\";s:172:\"Consectetur adipisicing elit sed dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina ilukita ylokem lokateise ination voluptate velit esse cillum.\";s:11:\"company_url\";s:1:\"#\";s:16:\"freelancer_title\";s:19:\"Start As Freelancer\";s:15:\"freelancer_desc\";s:172:\"Consectetur adipisicing elit sed dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina ilukita ylokem lokateise ination voluptate velit esse cillum.\";s:14:\"freelancer_url\";s:1:\"#\";s:19:\"app_section_display\";s:4:\"true\";s:16:\"download_app_img\";s:36:\"1558518016-1557484284-mobile-img.png\";s:9:\"app_title\";s:20:\"Limitless Experience\";s:12:\"app_subtitle\";s:30:\"Roam Around With Your Business\";}}', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(13, 'show-page-1', 'true', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(14, 'show-page-3', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(15, 'access_type', 'both', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(16, 'show-page-5', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(17, 'show-banner-5', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(18, 'show-page-6', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(19, 'show-banner-6', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(20, 'show-page-7', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(21, 'show-banner-7', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(22, 'homepage', 'a:1:{s:4:\"home\";s:1:\"5\";}', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(23, 'show-page-2', '0', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(24, 'show-banner-2', '1', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(25, 'page-banner-2', '1579950098-img-02.jpg', '2020-02-12 01:48:05', '2020-02-12 01:48:05'),
(26, 'home_settings', 'a:1:{i:0;a:8:{s:11:\"home_banner\";s:14:\"banner-img.jpg\";s:17:\"home_banner_image\";s:10:\"img-01.png\";s:12:\"banner_title\";s:30:\"Hire expert freelancers2121112\";s:15:\"banner_subtitle\";s:19:\"for any job, Online\";s:18:\"banner_description\";s:101:\"Consectetur adipisicing elit sed dotem eiusmod tempor incuntes ut labore etdolore maigna aliqua enim.\";s:10:\"video_link\";s:43:\"https://www.youtube.com/watch?v=B-ph2g5o2K4\";s:11:\"video_title\";s:17:\"See For Yourself!\";s:10:\"video_desc\";s:43:\"How it works & experience the ultimate joy.\";}}', '2020-02-13 02:50:49', '2020-02-13 02:50:49'),
(41, 'search_menu', 'a:4:{i:0;a:2:{s:5:\"title\";s:18:\"Freelancers in USA\";s:3:\"url\";s:1:\"#\";}i:1;a:2:{s:5:\"title\";s:21:\"Freelancers in Turkey\";s:3:\"url\";s:1:\"#\";}i:2;a:2:{s:5:\"title\";s:11:\"Jobs in USA\";s:3:\"url\";s:1:\"#\";}i:3;a:2:{s:5:\"title\";s:9:\"Find Jobs\";s:3:\"url\";s:1:\"#\";}}', '2020-02-27 05:41:05', '2020-02-27 05:41:05'),
(42, 'menu_title', 'Explore More', '2020-02-27 05:41:05', '2020-02-27 05:41:05'),
(45, 'footer_settings', 'a:6:{s:11:\"footer_logo\";s:20:\"1582802005-flogo.png\";s:11:\"description\";s:187:\"Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim poskina ilukita ylokem lokateise ination voluptate velit esse cillum dolore eu fugiat nulla pariatur lokaim urianewce\";s:9:\"copyright\";s:58:\"Copyright  2020. Workman Supermarket, All Rights Reserved.\";s:12:\"menu_title_1\";s:7:\"Company\";s:12:\"menu_pages_1\";a:3:{i:0;s:1:\"2\";i:1;s:1:\"3\";i:2;s:1:\"4\";}s:5:\"pages\";a:3:{i:0;s:1:\"2\";i:1;s:1:\"3\";i:2;s:1:\"4\";}}', '2020-02-27 05:43:25', '2020-02-27 05:43:25'),
(49, 'payment_settings', 'a:1:{i:0;a:4:{s:9:\"client_id\";s:80:\"AS5qEG6tNef2jsyGRzTHiZ-L6ujTfKbW_mG7dmzaI4eJlfAdez0PUVnZocGu0vpQ5lR0Uq-4GWdDJcTx\";s:15:\"paypal_password\";s:8:\"ZGgp4]$1\";s:13:\"paypal_secret\";s:80:\"EN1m3edb98yaii0SPtJemQiRA9esGnYR0MdE4SbmNOfX8kk1KOJvbbUNeTqjX-hHlgF1MzJPg-cOjcfu\";s:14:\"enable_sandbox\";s:4:\"true\";}}', '2020-03-06 08:05:13', '2020-03-06 08:05:13'),
(51, 'settings', 'a:1:{i:0;a:10:{s:5:\"title\";s:7:\"Workman\";s:16:\"connects_per_job\";s:2:\"10\";s:15:\"connects_amount\";s:5:\"10000\";s:21:\"connects_no_of_credit\";s:2:\"10\";s:12:\"gmap_api_key\";N;s:12:\"chat_display\";s:5:\"false\";s:18:\"enable_theme_color\";s:5:\"false\";s:4:\"logo\";s:19:\"1582801018-logo.png\";s:8:\"language\";s:2:\"en\";s:15:\"body-lang-class\";s:7:\"lang-en\";}}', '2020-03-25 00:38:51', '2020-03-25 00:38:51'),
(55, 'commision', 'a:1:{i:0;a:7:{s:9:\"commision\";s:1:\"5\";s:10:\"min_payout\";s:3:\"250\";s:14:\"payment_method\";a:2:{i:0;s:6:\"paypal\";i:1;s:6:\"stripe\";}s:8:\"currency\";s:3:\"GBP\";s:15:\"enable_packages\";s:4:\"true\";s:16:\"employer_package\";s:4:\"true\";s:12:\"payment_mode\";s:4:\"true\";}}', '2020-04-18 01:29:23', '2020-04-18 01:29:23'),
(62, 'inner_page_data', 'a:1:{i:0;a:16:{s:17:\"f_list_meta_title\";N;s:16:\"f_list_meta_desc\";N;s:13:\"show_f_banner\";s:4:\"true\";s:19:\"emp_list_meta_title\";N;s:18:\"emp_list_meta_desc\";N;s:15:\"show_emp_banner\";s:5:\"false\";s:19:\"job_list_meta_title\";N;s:18:\"job_list_meta_desc\";N;s:15:\"show_job_banner\";s:5:\"false\";s:23:\"service_list_meta_title\";N;s:22:\"service_list_meta_desc\";N;s:19:\"show_service_banner\";s:5:\"false\";s:23:\"article_list_meta_title\";s:3:\"dgf\";s:22:\"article_list_meta_desc\";s:6:\"dfgdfg\";s:19:\"show_article_banner\";s:4:\"true\";s:20:\"article_inner_banner\";s:21:\"1587734072-img-02.jpg\";}}', '2020-04-24 07:44:32', '2020-04-24 07:44:32');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payable_id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('deposit','withdraw') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(64,0) NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `meta` text COLLATE utf8mb4_unicode_ci,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `payable_type`, `payable_id`, `wallet_id`, `type`, `amount`, `confirmed`, `meta`, `uuid`, `created_at`, `updated_at`) VALUES
(6, 'App\\User', 8, 4, 'deposit', '1000', 1, NULL, '11c6bcbf-dff5-486e-90b0-efe8fc132f87', '2020-07-20 03:15:59', '2020-07-20 03:15:59'),
(7, 'App\\User', 8, 4, 'deposit', '10', 1, NULL, '52cfd598-33b7-4f2f-ab50-07700f3c7a2b', '2020-07-20 03:17:14', '2020-07-20 03:17:14'),
(8, 'App\\User', 8, 4, 'deposit', '100', 1, NULL, 'b1789a63-5074-4f23-812a-295a956caf20', '2020-07-20 06:01:02', '2020-07-20 06:01:02'),
(9, 'App\\User', 8, 4, 'deposit', '1', 1, NULL, 'ef03cb22-b02b-4db0-adec-7aed9aac1fd1', '2020-07-20 06:24:32', '2020-07-20 06:24:32');

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `from_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_id` bigint(20) UNSIGNED NOT NULL,
  `to_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('exchange','transfer','paid','refund','gift') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'transfer',
  `status_last` enum('exchange','transfer','paid','refund','gift') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deposit_id` bigint(20) UNSIGNED NOT NULL,
  `withdraw_id` bigint(20) UNSIGNED NOT NULL,
  `discount` decimal(64,0) NOT NULL DEFAULT '0',
  `fee` decimal(64,0) NOT NULL DEFAULT '0',
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` bigint(11) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `email`, `phone`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'TravelJet Admin', 'admin', 'traveljet@admin.com', 9999999999, NULL, '$2y$10$ybC1KStQXq/UI7a7oq29cOPnVUVocAV2HEdG/dxu9d8yX6Z8qmk8m', NULL, '2020-07-17 13:57:16', '2020-07-17 13:57:16'),
(2, 'TravelJet Agent', 'agent', 'traveljet@agent.com', 9898989898, NULL, '$2y$10$ybC1KStQXq/UI7a7oq29cOPnVUVocAV2HEdG/dxu9d8yX6Z8qmk8m', NULL, '2020-07-17 13:57:16', '2020-07-17 13:57:16'),
(3, 'TravelJet Customer', 'customer', 'traveljet@customer.com', 9797979797, NULL, '$2y$10$ybC1KStQXq/UI7a7oq29cOPnVUVocAV2HEdG/dxu9d8yX6Z8qmk8m', NULL, '2020-07-17 13:57:16', '2020-07-17 13:57:16'),
(4, 'Prashant Chauhan', 'customer', 'prashant@gmail.com', 9696969696, NULL, '$2y$10$3IGqVSzQellETJaONBzTi.WUpf0HyYey0Ij07vyfTc7IPrwcwY7Te', NULL, '2020-07-18 04:53:10', '2020-07-18 04:53:10'),
(5, 'John Doe', 'agent', 'john@gmail.com', 9595959595, NULL, '$2y$10$4opPAmuwa41iFSXS2W.jG.AtgVXUAqt1YHgV8F/uUhgFEBptbWyGu', NULL, '2020-07-18 04:56:02', '2020-07-18 04:56:02'),
(6, 'Ulrich Neilsen', 'agent', 'ulrich@gmail.com', 9494949494, NULL, '$2y$10$H9J1vpxUAk.SMCR7sUDFm.vLGoAGiRZtHWn/FotxmwLKjhUGWbiGm', NULL, '2020-07-18 04:59:28', '2020-07-18 04:59:28'),
(7, 'Charellote', 'customer', 'charellote@gmail.com', 9393939393, NULL, '$2y$10$9KrJbddKZSNVgCcXm1U5leidj2J.O8FL4RtI0ONxoJhfKWtTsOBO.', NULL, '2020-07-18 05:21:35', '2020-07-18 05:21:35'),
(8, 'Krishna Mishra', 'customer', 'er.krishna.mishra@gmail.com', 9026574061, NULL, '$2y$10$/.hibNAGD1Aj7poLs7axueaBb60jORuIKPoC4D7nhIXYBcJtcsD7C', NULL, '2020-07-18 01:06:32', '2020-07-18 01:06:32');

-- --------------------------------------------------------

--
-- Table structure for table `user_razorpay_details`
--

CREATE TABLE `user_razorpay_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0' COMMENT ' 0=>buy_credits,1=>membership',
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `cost` double(15,8) NOT NULL,
  `credits` int(10) DEFAULT NULL,
  `payment_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_razorpay_details`
--

INSERT INTO `user_razorpay_details` (`id`, `type`, `user_id`, `description`, `cost`, `credits`, `payment_id`, `created_at`, `updated_at`) VALUES
(21, 0, 8, 'credits Purchase vai Razorpay', 10.00000000, NULL, 'pay_FGgn3i5T1rt4qL', '2020-07-20 03:17:14', '2020-07-20 03:17:14'),
(22, 0, 8, 'credits Purchase vai Razorpay', 100.00000000, NULL, 'pay_FGjZu0szWHQPqb', '2020-07-20 06:00:52', '2020-07-20 06:00:52'),
(23, 0, 8, 'credits Purchase vai Razorpay', 1.00000000, NULL, 'pay_FGjypdocwsi1uy', '2020-07-20 06:24:30', '2020-07-20 06:24:30');

-- --------------------------------------------------------

--
-- Table structure for table `user_transactions`
--

CREATE TABLE `user_transactions` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('deposit','withdraw') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` bigint(20) NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_transactions`
--

INSERT INTO `user_transactions` (`id`, `user_id`, `receiver_id`, `type`, `amount`, `confirmed`, `description`, `created_at`, `updated_at`) VALUES
(15, 4, 21, 'withdraw', 8000, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/web-content-developers\'>Web Content Developer</a>', '2020-04-09 07:33:37', '2020-04-08 07:33:37'),
(16, 21, 4, 'deposit', 8000, 0, 'Released Milestone Payment From <a href=\'profile/cooper-white\'>Cooper White</a> for project <a href=\'job/web-content-developers\'>Web Content Developer</a>', '2020-03-10 07:33:37', '2020-04-08 07:33:37'),
(17, 21, 4, 'withdraw', 400, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/web-content-developers\'>Web Content Developer</a>', '2020-04-08 07:33:37', '2020-04-08 07:33:37'),
(18, 1, 4, 'deposit', 400, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/web-content-developers\'>Web Content Developer</a>', '2020-04-08 07:33:37', '2020-04-08 07:33:37'),
(19, 4, 0, 'withdraw', 10, 0, 'done payment £ 10 to worksheriff for post project <a href=\'job/krishna-mishra\'>Krishna Mishra</a>', '2020-03-11 09:02:43', '2020-04-08 09:02:43'),
(20, 4, 0, 'withdraw', 10, 0, 'done payment £ 10 to worksheriff for post project <a href=\'job/krishna-mishra-1\'>Krishna Mishra</a>', '2020-04-08 09:03:23', '2020-04-08 09:03:23'),
(21, 4, 0, 'deposit', 5, 0, 'recived £5 from worksheriff for project <a href=\'job/web-content-developers\'>Web Content Developer</a> completion', '2020-04-02 09:06:56', '2020-04-08 09:06:56'),
(22, 4, 0, 'deposit', 5, 0, 'recived £5 from worksheriff for project <a href=\'job/web-content-developers\'>Web Content Developer</a> completion', '2020-04-10 09:07:16', '2020-04-08 09:07:16'),
(23, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/timber-management-professor\'>Timber Management Professor</a> completion', '2020-04-09 00:36:31', '2020-04-09 00:36:31'),
(24, 4, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/gfhgh\'>gfhgh</a>', '2020-04-09 02:52:57', '2020-04-09 02:52:57'),
(25, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-information-systems-professor\'>Computer Information Systems Professor</a> completion', '2020-04-10 00:07:44', '2020-04-10 00:07:44'),
(26, 6, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/forest-biometrics-professor\'>Forest Biometrics Professor</a> completion', '2020-04-10 00:28:57', '2020-04-10 00:28:57'),
(27, 5, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/krishna-mishra-hello\'>Krishna Mishra Hello</a>', '2020-04-10 01:55:16', '2020-04-10 01:55:16'),
(28, 4, 24, 'withdraw', 1100, 0, 'Done Milestone Payment to <a href=\'profile/jhon-xavier\'>Alexa Xavier</a> For Project <a href=\'job/krishna-mishra-1\'>Krishna Mishra</a>', '2020-04-10 08:52:00', '2020-04-10 08:52:00'),
(29, 24, 4, 'deposit', 1100, 0, 'Released Milestone Payment From <a href=\'profile/cooper-white\'>Cooper White</a> for project <a href=\'job/krishna-mishra-1\'>Krishna Mishra</a>', '2020-04-10 08:52:01', '2020-04-10 08:52:01'),
(30, 24, 4, 'withdraw', 55, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/krishna-mishra-1\'>Krishna Mishra</a>', '2020-04-10 08:52:01', '2020-04-10 08:52:01'),
(31, 1, 4, 'deposit', 55, 0, 'Commision From <a href=\'profile/jhon-xavier\'>Alexa Xavier</a> For Project <a href=\'job/krishna-mishra-1\'>Krishna Mishra</a>', '2020-04-10 08:52:01', '2020-04-10 08:52:01'),
(32, 4, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/krishna-mishra-1\'>Krishna Mishra</a> completion', '2020-04-10 08:53:51', '2020-04-10 08:53:51'),
(33, 5, 21, 'withdraw', 600, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/wildlife-conservation-professor\'>Wildlife Conservation Professor</a>', '2020-04-15 01:10:44', '2020-04-15 01:10:44'),
(34, 21, 5, 'deposit', 600, 0, 'Released Milestone Payment From <a href=\'profile/elijah-johnson\'>Elijah Johnson</a> for project <a href=\'job/wildlife-conservation-professor\'>Wildlife Conservation Professor</a>', '2020-04-15 01:10:44', '2020-04-15 01:10:44'),
(35, 21, 5, 'withdraw', 30, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/wildlife-conservation-professor\'>Wildlife Conservation Professor</a>', '2020-04-15 01:10:44', '2020-04-15 01:10:44'),
(36, 1, 5, 'deposit', 30, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/wildlife-conservation-professor\'>Wildlife Conservation Professor</a>', '2020-04-15 01:10:44', '2020-04-15 01:10:44'),
(37, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/new-job\'>New job</a>', '2020-04-15 23:18:48', '2020-04-15 23:18:48'),
(38, 2, 21, 'withdraw', 1300, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/new-job\'>New job</a>', '2020-04-20 00:48:53', '2020-04-20 00:48:53'),
(39, 21, 2, 'deposit', 1300, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/new-job\'>New job</a>', '2020-04-20 00:48:53', '2020-04-20 00:48:53'),
(40, 21, 2, 'withdraw', 65, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/new-job\'>New job</a>', '2020-04-20 00:48:53', '2020-04-20 00:48:53'),
(41, 1, 2, 'deposit', 65, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/new-job\'>New job</a>', '2020-04-20 00:48:53', '2020-04-20 00:48:53'),
(42, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review\'>Test review</a>', '2020-04-23 06:37:18', '2020-04-23 06:37:18'),
(43, 68, 0, 'deposit', 100, 0, 'Balance credited to wallet via Paypal', '2020-04-24 02:05:06', '2020-04-24 02:05:06'),
(44, 2, 0, 'deposit', 100, 0, 'Balance credited to wallet via Stripe', '2020-04-24 02:06:57', '2020-04-24 02:06:57'),
(45, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/customer-show\'>customer_show</a>', '2020-04-27 08:22:44', '2020-04-27 08:22:44'),
(46, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/customer-delete\'>customer_delete</a>', '2020-04-27 08:45:13', '2020-04-27 08:45:13'),
(47, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/krishna-mishra-job\'>Krishna Mishra Job</a>', '2020-04-28 02:15:13', '2020-04-28 02:15:13'),
(48, 2, 21, 'withdraw', 400, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:32:13', '2020-05-05 07:32:13'),
(49, 21, 2, 'deposit', 400, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>chris evans</a> for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:32:14', '2020-05-05 07:32:14'),
(50, 21, 2, 'withdraw', 20, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:32:14', '2020-05-05 07:32:14'),
(51, 1, 2, 'deposit', 20, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:32:14', '2020-05-05 07:32:14'),
(52, 2, 21, 'withdraw', 400, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:33:42', '2020-05-05 07:33:42'),
(53, 21, 2, 'deposit', 400, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>chris evans</a> for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:33:43', '2020-05-05 07:33:43'),
(54, 21, 2, 'withdraw', 20, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:33:43', '2020-05-05 07:33:43'),
(55, 1, 2, 'deposit', 20, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-05 07:33:44', '2020-05-05 07:33:44'),
(56, 5, 24, 'withdraw', 420, 0, 'Done Milestone Payment to <a href=\'profile/jhon-xavier\'>Alexa Xavier</a> For Project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-05 07:50:11', '2020-05-05 07:50:11'),
(57, 24, 5, 'deposit', 420, 0, 'Released Milestone Payment From <a href=\'profile/elijah-johnson\'>Elijah Johnson</a> for project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-05 07:50:11', '2020-05-05 07:50:11'),
(58, 24, 5, 'withdraw', 21, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-05 07:50:12', '2020-05-05 07:50:12'),
(59, 1, 5, 'deposit', 21, 0, 'Commision From <a href=\'profile/jhon-xavier\'>Alexa Xavier</a> For Project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-05 07:50:13', '2020-05-05 07:50:13'),
(60, 2, 21, 'withdraw', 1300, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/new-job\'>New job</a>', '2020-05-05 08:13:59', '2020-05-05 08:13:59'),
(61, 21, 2, 'deposit', 1300, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/new-job\'>New job</a>', '2020-05-05 08:14:00', '2020-05-05 08:14:00'),
(62, 21, 2, 'withdraw', 65, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/new-job\'>New job</a>', '2020-05-05 08:14:00', '2020-05-05 08:14:00'),
(63, 1, 2, 'deposit', 65, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/new-job\'>New job</a>', '2020-05-05 08:14:00', '2020-05-05 08:14:00'),
(64, 2, 21, 'withdraw', 1300, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/new-job\'>New job</a>', '2020-05-05 23:50:01', '2020-05-05 23:50:01'),
(65, 21, 2, 'deposit', 1300, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/new-job\'>New job</a>', '2020-05-05 23:50:01', '2020-05-05 23:50:01'),
(66, 21, 2, 'withdraw', 65, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/new-job\'>New job</a>', '2020-05-05 23:50:01', '2020-05-05 23:50:01'),
(67, 1, 2, 'deposit', 65, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/new-job\'>New job</a>', '2020-05-05 23:50:01', '2020-05-05 23:50:01'),
(68, 2, 21, 'withdraw', 400, 0, 'Done Milestone Payment to <a href=\'/profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'/job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 00:10:54', '2020-05-06 00:10:54'),
(69, 21, 2, 'deposit', 400, 0, 'Released Milestone Payment From <a href=\'/profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'/job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 00:10:54', '2020-05-06 00:10:54'),
(70, 21, 2, 'withdraw', 20, 0, 'Done Commision Payment to worksheriff For Project <a href=\'/job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 00:10:54', '2020-05-06 00:10:54'),
(71, 1, 2, 'deposit', 20, 0, 'Commision From <a href=\'/profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'/job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 00:10:54', '2020-05-06 00:10:54'),
(72, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/laxman-mishra\'>Laxman Mishra</a>', '2020-05-06 02:34:54', '2020-05-06 02:34:54'),
(73, 5, 24, 'withdraw', 420, 0, 'Done Milestone Payment to <a href=\'profile/jhon-xavier\'>Alexa Xavier</a> For Project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-06 06:57:25', '2020-05-06 06:57:25'),
(74, 24, 5, 'deposit', 420, 0, 'Released Milestone Payment From <a href=\'profile/elijah-johnson\'>Elijah Johnson</a> for project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-06 06:57:25', '2020-05-06 06:57:25'),
(75, 24, 5, 'withdraw', 21, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-06 06:57:25', '2020-05-06 06:57:25'),
(76, 1, 5, 'deposit', 21, 0, 'Commision From <a href=\'profile/jhon-xavier\'>Alexa Xavier</a> For Project <a href=\'job/it-professor\'>IT Professor</a>', '2020-05-06 06:57:26', '2020-05-06 06:57:26'),
(77, 2, 21, 'withdraw', 400, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 08:06:26', '2020-05-06 08:06:26'),
(78, 21, 2, 'deposit', 400, 0, 'Released Milestone Payment From Admin for Disputed project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 08:06:27', '2020-05-06 08:06:27'),
(79, 21, 2, 'withdraw', 20, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 08:06:27', '2020-05-06 08:06:27'),
(80, 1, 2, 'deposit', 20, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a>', '2020-05-06 08:06:27', '2020-05-06 08:06:27'),
(81, 2, 0, 'deposit', 60, 0, 'Balance credited to wallet via Paypal', '2020-05-08 15:30:12', '2020-05-08 15:30:12'),
(82, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/customer-show-1\'>customer_show</a>', '2020-05-08 15:31:09', '2020-05-08 15:31:09'),
(83, 2, 0, 'deposit', 10, 0, 'Balance credited to wallet via Paypal', '2020-05-10 08:31:11', '2020-05-10 08:31:11'),
(84, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review-1\'>Test review</a>', '2020-05-10 08:33:08', '2020-05-10 08:33:08'),
(85, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/ddd\'>ddd</a>', '2020-05-10 09:47:14', '2020-05-10 09:47:14'),
(86, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/kopal-maishra\'>Kopal maishra</a>', '2020-05-11 00:35:26', '2020-05-11 00:35:26'),
(87, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/amar-ujala\'>amar ujala</a>', '2020-05-11 05:17:26', '2020-05-11 05:17:26'),
(88, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/danic-jagran\'>danic jagran</a>', '2020-05-11 05:20:23', '2020-05-11 05:20:23'),
(89, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/select-radio-checkbox\'>Select radio checkbox</a>', '2020-05-12 02:45:23', '2020-05-12 02:45:23'),
(90, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/checkbox-select\'>checkbox select</a>', '2020-05-13 00:02:11', '2020-05-13 00:02:11'),
(91, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/radio-checkbox\'>Radio Checkbox</a>', '2020-05-13 01:56:03', '2020-05-13 01:56:03'),
(92, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/select-select\'>Select select</a>', '2020-05-13 07:05:36', '2020-05-13 07:05:36'),
(93, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/radio-select\'>Radio Select</a>', '2020-05-13 12:12:20', '2020-05-13 12:12:20'),
(94, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/empty-trade\'>Empty Trade</a>', '2020-05-14 01:59:01', '2020-05-14 01:59:01'),
(95, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/trade-empty\'>trade empty</a>', '2020-05-14 02:30:14', '2020-05-14 02:30:14'),
(96, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/new-job\'>New job</a> completion', '2020-05-14 02:39:58', '2020-05-14 02:39:58'),
(97, 2, 21, 'withdraw', 2200, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/select-select\'>Select select</a>', '2020-05-15 06:04:08', '2020-05-15 06:04:08'),
(98, 21, 2, 'deposit', 2200, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/select-select\'>Select select</a>', '2020-05-15 06:04:08', '2020-05-15 06:04:08'),
(99, 21, 2, 'withdraw', 110, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/select-select\'>Select select</a>', '2020-05-15 06:04:09', '2020-05-15 06:04:09'),
(100, 1, 2, 'deposit', 110, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/select-select\'>Select select</a>', '2020-05-15 06:04:10', '2020-05-15 06:04:10'),
(101, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/select-select\'>Select select</a> completion', '2020-05-15 06:04:59', '2020-05-15 06:04:59'),
(102, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:08:35', '2020-05-19 01:08:35'),
(103, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:10:42', '2020-05-19 01:10:42'),
(104, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:10:53', '2020-05-19 01:10:53'),
(105, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:11:41', '2020-05-19 01:11:41'),
(106, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:12:08', '2020-05-19 01:12:08'),
(107, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:12:22', '2020-05-19 01:12:22'),
(108, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:12:37', '2020-05-19 01:12:37'),
(109, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:13:10', '2020-05-19 01:13:10'),
(110, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/computer-programming-professor\'>Computer Programming Professor</a> completion', '2020-05-19 01:14:17', '2020-05-19 01:14:17'),
(111, 2, 21, 'withdraw', 1400, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/radio-checkbox\'>Radio Checkbox</a>', '2020-05-19 01:50:47', '2020-05-19 01:50:47'),
(112, 21, 2, 'deposit', 1400, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a>', '2020-05-19 01:50:47', '2020-05-19 01:50:47'),
(113, 21, 2, 'withdraw', 70, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/radio-checkbox\'>Radio Checkbox</a>', '2020-05-19 01:50:47', '2020-05-19 01:50:47'),
(114, 1, 2, 'deposit', 70, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/radio-checkbox\'>Radio Checkbox</a>', '2020-05-19 01:50:47', '2020-05-19 01:50:47'),
(115, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:51:56', '2020-05-19 01:51:56'),
(116, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:52:50', '2020-05-19 01:52:50'),
(117, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:53:09', '2020-05-19 01:53:09'),
(118, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:53:44', '2020-05-19 01:53:44'),
(119, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:56:51', '2020-05-19 01:56:51'),
(120, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:57:39', '2020-05-19 01:57:39'),
(121, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:58:12', '2020-05-19 01:58:12'),
(122, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:58:28', '2020-05-19 01:58:28'),
(123, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 01:58:40', '2020-05-19 01:58:40'),
(124, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:10:43', '2020-05-19 02:10:43'),
(125, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:11:18', '2020-05-19 02:11:18'),
(126, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:11:45', '2020-05-19 02:11:45'),
(127, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:12:15', '2020-05-19 02:12:15'),
(128, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:12:25', '2020-05-19 02:12:25'),
(129, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:12:38', '2020-05-19 02:12:38'),
(130, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:12:49', '2020-05-19 02:12:49'),
(131, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:12:58', '2020-05-19 02:12:58'),
(132, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:13:14', '2020-05-19 02:13:14'),
(133, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:13:40', '2020-05-19 02:13:40'),
(134, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:31:07', '2020-05-19 02:31:07'),
(135, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:31:52', '2020-05-19 02:31:52'),
(136, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:31:56', '2020-05-19 02:31:56'),
(137, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:33:47', '2020-05-19 02:33:47'),
(138, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:34:05', '2020-05-19 02:34:05'),
(139, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:35:14', '2020-05-19 02:35:14'),
(140, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:35:45', '2020-05-19 02:35:45'),
(141, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:36:17', '2020-05-19 02:36:17'),
(142, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:37:05', '2020-05-19 02:37:05'),
(143, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:39:02', '2020-05-19 02:39:02'),
(144, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/radio-checkbox\'>Radio Checkbox</a> completion', '2020-05-19 02:41:01', '2020-05-19 02:41:01'),
(145, 2, 21, 'withdraw', 5000, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/trade-empty\'>trade empty</a>', '2020-05-20 06:53:49', '2020-05-20 06:53:49'),
(146, 21, 2, 'deposit', 5000, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/trade-empty\'>trade empty</a>', '2020-05-20 06:53:49', '2020-05-20 06:53:49'),
(147, 21, 2, 'withdraw', 250, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/trade-empty\'>trade empty</a>', '2020-05-20 06:53:49', '2020-05-20 06:53:49'),
(148, 1, 2, 'deposit', 250, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/trade-empty\'>trade empty</a>', '2020-05-20 06:53:49', '2020-05-20 06:53:49'),
(149, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/trade-empty\'>trade empty</a> completion', '2020-05-20 07:13:07', '2020-05-20 07:13:07'),
(150, 2, 21, 'withdraw', 1100, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/danic-jagran\'>danic jagran</a>', '2020-05-20 07:22:52', '2020-05-20 07:22:52'),
(151, 21, 2, 'deposit', 1100, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/danic-jagran\'>danic jagran</a>', '2020-05-20 07:22:53', '2020-05-20 07:22:53'),
(152, 21, 2, 'withdraw', 55, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/danic-jagran\'>danic jagran</a>', '2020-05-20 07:22:53', '2020-05-20 07:22:53'),
(153, 1, 2, 'deposit', 55, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/danic-jagran\'>danic jagran</a>', '2020-05-20 07:22:54', '2020-05-20 07:22:54'),
(154, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/danic-jagran\'>danic jagran</a> completion', '2020-05-20 07:27:59', '2020-05-20 07:27:59'),
(155, 5, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/it-professor\'>IT Professor</a> completion', '2020-05-20 07:38:58', '2020-05-20 07:38:58'),
(156, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review-2\'>Test review</a>', '2020-06-05 06:37:34', '2020-06-05 06:37:34'),
(157, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review-3\'>Test review</a>', '2020-06-05 06:38:47', '2020-06-05 06:38:47'),
(158, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review-4\'>Test review</a>', '2020-06-05 06:41:03', '2020-06-05 06:41:03'),
(159, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review-5\'>Test review</a>', '2020-06-05 06:43:42', '2020-06-05 06:43:42'),
(160, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review-6\'>Test review</a>', '2020-06-05 06:49:45', '2020-06-05 06:49:45'),
(161, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/test-review-7\'>Test review</a>', '2020-06-05 06:51:36', '2020-06-05 06:51:36'),
(162, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/ffffff\'>ffffff</a>', '2020-06-05 06:53:55', '2020-06-05 06:53:55'),
(163, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/ffffff-1\'>ffffff</a>', '2020-06-05 06:55:18', '2020-06-05 06:55:18'),
(164, 2, 0, 'withdraw', 10, 0, 'Done payment £10 to worksheriff for posting project/job <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a>', '2020-06-05 07:04:56', '2020-06-05 07:04:56'),
(165, 2, 0, 'withdraw', 8, 0, '<a href=\'profile/ava-nguyen\'>Ava Nguyen</a> has paid Job amount of £ 8 for Project: <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a>', '2020-06-05 07:07:02', '2020-06-05 07:07:02'),
(166, 1, 0, 'deposit', 8, 0, '<a href=\'profile/ava-nguyen\'>Ava Nguyen</a> has paid Job amount of £ 8 for Project: <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a>', '2020-06-05 07:07:02', '2020-06-05 07:07:02'),
(167, 2, 21, 'withdraw', 8, 0, 'Done Milestone Payment to <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a>', '2020-06-05 08:05:19', '2020-06-05 08:05:19'),
(168, 21, 2, 'deposit', 8, 0, 'Released Milestone Payment From <a href=\'profile/ava-nguyen\'>Ava Nguyen</a> for project <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a>', '2020-06-05 08:05:19', '2020-06-05 08:05:19'),
(169, 21, 2, 'withdraw', 0, 0, 'Done Commision Payment to worksheriff For Project <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a>', '2020-06-05 08:05:19', '2020-06-05 08:05:19'),
(170, 1, 2, 'withdraw', 0, 0, 'Commision From <a href=\'profile/kai-clarke\'>Kai Clarke</a> For Project <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a>', '2020-06-05 08:05:20', '2020-06-05 08:05:20'),
(171, 2, 0, 'deposit', 5, 0, 'Recived £5 from worksheriff for project <a href=\'job/krishna-mishra-new\'>Krishna Mishra new</a> completion', '2020-06-05 08:09:21', '2020-06-05 08:09:21');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `holder_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `holder_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `balance` decimal(64,0) NOT NULL DEFAULT '0',
  `decimal_places` smallint(6) NOT NULL DEFAULT '2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `holder_type`, `holder_id`, `name`, `slug`, `description`, `balance`, `decimal_places`, `created_at`, `updated_at`) VALUES
(4, 'App\\User', 8, 'Default Wallet', 'default', NULL, '1111', 2, '2020-07-20 03:15:58', '2020-07-20 06:24:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`(191));

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `queries_user_id_index` (`user_id`);

--
-- Indexes for table `site_managements`
--
ALTER TABLE `site_managements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_uuid_unique` (`uuid`),
  ADD KEY `transactions_payable_type_payable_id_index` (`payable_type`,`payable_id`),
  ADD KEY `payable_type_ind` (`payable_type`,`payable_id`,`type`),
  ADD KEY `payable_confirmed_ind` (`payable_type`,`payable_id`,`confirmed`),
  ADD KEY `payable_type_confirmed_ind` (`payable_type`,`payable_id`,`type`,`confirmed`),
  ADD KEY `transactions_type_index` (`type`),
  ADD KEY `transactions_wallet_id_foreign` (`wallet_id`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transfers_uuid_unique` (`uuid`),
  ADD KEY `transfers_from_type_from_id_index` (`from_type`,`from_id`),
  ADD KEY `transfers_to_type_to_id_index` (`to_type`,`to_id`),
  ADD KEY `transfers_deposit_id_foreign` (`deposit_id`),
  ADD KEY `transfers_withdraw_id_foreign` (`withdraw_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_razorpay_details`
--
ALTER TABLE `user_razorpay_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_expenses_user_id_index` (`user_id`);

--
-- Indexes for table `user_transactions`
--
ALTER TABLE `user_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wallets_holder_type_holder_id_slug_unique` (`holder_type`,`holder_id`,`slug`),
  ADD KEY `wallets_holder_type_holder_id_index` (`holder_type`,`holder_id`),
  ADD KEY `wallets_slug_index` (`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `site_managements`
--
ALTER TABLE `site_managements`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transfers`
--
ALTER TABLE `transfers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_razorpay_details`
--
ALTER TABLE `user_razorpay_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user_transactions`
--
ALTER TABLE `user_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transfers`
--
ALTER TABLE `transfers`
  ADD CONSTRAINT `transfers_deposit_id_foreign` FOREIGN KEY (`deposit_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transfers_withdraw_id_foreign` FOREIGN KEY (`withdraw_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
