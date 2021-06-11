-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2021 at 02:09 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `askme_question`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `title` varchar(30) NOT NULL,
  `body` varchar(140) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `user_id`, `title`, `body`, `timestamp`) VALUES
(1, 23, 'Question1', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-01 12:11:53'),
(2, 5, 'Question2', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-01 04:39:20'),
(3, 29, 'Question3', 'Lorem ipsum dolor sit amet,', '2021-06-03 06:48:31'),
(4, 25, 'Question4', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-04 01:03:22'),
(5, 29, 'Question5', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-04 01:24:54'),
(6, 29, 'Question6', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-06 00:21:52'),
(7, 11, 'Question7', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-01 09:08:35'),
(8, 21, 'Question8', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-06-04 08:29:55'),
(9, 30, 'Question9', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2021-06-01 11:49:13'),
(10, 8, 'Question10', 'Lorem ipsum dolor sit amet,', '2021-06-06 06:30:16'),
(11, 14, 'Question11', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-06-04 22:27:58'),
(12, 30, 'Question12', 'Lorem ipsum dolor sit', '2021-06-02 20:49:49'),
(13, 18, 'Question13', 'Lorem ipsum dolor sit', '2021-06-06 21:12:02'),
(14, 7, 'Question14', 'Lorem', '2021-06-03 06:37:10'),
(15, 25, 'Question15', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-01 14:55:21'),
(16, 15, 'Question16', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-01 14:15:01'),
(17, 10, 'Question17', 'Lorem ipsum', '2021-06-05 16:02:30'),
(18, 6, 'Question18', 'Lorem ipsum', '2021-06-07 17:52:36'),
(19, 26, 'Question19', 'Lorem ipsum', '2021-06-02 16:30:50'),
(20, 26, 'Question20', 'Lorem ipsum dolor', '2021-06-01 16:07:39'),
(21, 18, 'Question21', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-07 23:37:19'),
(22, 10, 'Question22', 'Lorem ipsum', '2021-06-04 19:35:52'),
(23, 9, 'Question23', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-06-06 00:26:17'),
(24, 6, 'Question24', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-07 14:27:35'),
(25, 20, 'Question25', 'Lorem ipsum', '2021-06-02 19:18:22'),
(26, 27, 'Question26', 'Lorem', '2021-06-01 13:06:54'),
(27, 23, 'Question27', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-02 07:33:27'),
(28, 24, 'Question28', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-06-03 04:33:44'),
(29, 11, 'Question29', 'Lorem', '2021-06-02 04:12:23'),
(30, 25, 'Question30', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-05 05:27:18'),
(31, 19, 'Question31', 'Lorem ipsum dolor', '2021-06-01 09:51:08'),
(32, 20, 'Question32', 'Lorem ipsum dolor sit amet,', '2021-06-07 19:28:04'),
(33, 27, 'Question33', 'Lorem ipsum dolor sit', '2021-06-04 05:45:09'),
(34, 16, 'Question34', 'Lorem ipsum', '2021-06-02 21:01:59'),
(35, 26, 'Question35', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-05 06:50:11'),
(36, 30, 'Question36', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-04 13:50:13'),
(37, 9, 'Question37', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-05 23:41:21'),
(38, 16, 'Question38', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-03 11:31:00'),
(39, 13, 'Question39', 'Lorem ipsum dolor sit amet,', '2021-06-04 20:07:39'),
(40, 21, 'Question40', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam', '2021-06-06 00:22:42'),
(41, 4, 'Question41', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-06 08:57:30'),
(42, 1, 'Question42', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.', '2021-06-02 20:46:11'),
(43, 10, 'Question43', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-02 23:23:52'),
(44, 25, 'Question44', 'Lorem ipsum', '2021-06-04 17:35:11'),
(45, 7, 'Question45', 'Lorem ipsum dolor sit amet,', '2021-06-02 02:20:43'),
(46, 20, 'Question46', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-06-02 20:16:24'),
(47, 26, 'Question47', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam', '2021-06-06 00:37:58'),
(48, 6, 'Question48', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2021-06-05 19:14:27'),
(49, 17, 'Question49', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-06-07 01:40:58'),
(50, 9, 'Question50', 'Lorem', '2021-06-03 07:24:16'),
(51, 2, 'Question51', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-06 23:19:32'),
(52, 1, 'Question52', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-02 11:11:14'),
(53, 20, 'Question53', 'Lorem ipsum dolor sit amet,', '2021-06-03 03:11:45'),
(54, 22, 'Question54', 'Lorem ipsum dolor sit', '2021-06-01 02:28:04'),
(55, 29, 'Question55', 'Lorem', '2021-06-02 00:45:49'),
(56, 5, 'Question56', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-03 06:20:14'),
(57, 15, 'Question57', 'Lorem ipsum dolor sit amet,', '2021-06-06 19:51:15'),
(58, 27, 'Question58', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2021-06-06 02:28:07'),
(59, 24, 'Question59', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-05 10:30:28'),
(60, 24, 'Question60', 'Lorem ipsum dolor sit amet,', '2021-06-03 16:38:25'),
(61, 3, 'Question61', 'Lorem', '2021-06-05 11:09:13'),
(62, 25, 'Question62', 'Lorem ipsum dolor sit amet,', '2021-06-03 13:46:53'),
(63, 25, 'Question63', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-02 17:55:38'),
(64, 15, 'Question64', 'Lorem ipsum dolor sit', '2021-06-01 20:14:37'),
(65, 21, 'Question65', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-06-05 13:20:05'),
(66, 10, 'Question66', 'Lorem ipsum dolor', '2021-06-03 11:22:53'),
(67, 17, 'Question67', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-01 11:07:52'),
(68, 21, 'Question68', 'Lorem ipsum', '2021-06-07 16:56:27'),
(69, 27, 'Question69', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-06-01 03:34:37'),
(70, 27, 'Question70', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.', '2021-06-06 09:01:47'),
(71, 18, 'Question71', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-07 18:17:21'),
(72, 12, 'Question72', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-06-05 05:40:44'),
(73, 23, 'Question73', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-05 02:16:46'),
(74, 22, 'Question74', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-02 05:51:39'),
(75, 4, 'Question75', 'Lorem ipsum dolor', '2021-06-02 21:56:39'),
(76, 5, 'Question76', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-04 21:26:15'),
(77, 15, 'Question77', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2021-06-04 04:46:04'),
(78, 3, 'Question78', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-01 19:31:52'),
(79, 14, 'Question79', 'Lorem', '2021-06-01 04:09:14'),
(80, 12, 'Question80', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-03 07:50:50'),
(81, 24, 'Question81', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-07 22:15:00'),
(82, 8, 'Question82', 'Lorem ipsum dolor', '2021-06-06 10:42:59'),
(83, 4, 'Question83', 'Lorem ipsum', '2021-06-04 14:22:02'),
(84, 13, 'Question84', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-06-05 15:48:28'),
(85, 10, 'Question85', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-06-03 01:22:04'),
(86, 27, 'Question86', 'Lorem ipsum dolor sit', '2021-06-03 14:22:06'),
(87, 27, 'Question87', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-06-01 15:26:53'),
(88, 29, 'Question88', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-03 11:15:20'),
(89, 20, 'Question89', 'Lorem ipsum dolor sit amet,', '2021-06-01 21:27:54'),
(90, 13, 'Question90', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-04 21:04:58'),
(91, 23, 'Question91', 'Lorem ipsum dolor', '2021-06-04 19:33:15'),
(92, 24, 'Question92', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-06-03 05:26:08'),
(93, 5, 'Question93', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-06-03 01:51:53'),
(94, 24, 'Question94', 'Lorem ipsum dolor sit amet,', '2021-06-05 20:14:06'),
(95, 25, 'Question95', 'Lorem ipsum dolor sit amet,', '2021-06-03 19:29:24'),
(96, 9, 'Question96', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-03 10:32:47'),
(97, 11, 'Question97', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-02 11:03:51'),
(98, 26, 'Question98', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-06-04 22:33:29'),
(99, 21, 'Question99', 'Lorem ipsum dolor sit amet, consectetuer', '2021-06-07 14:11:02'),
(100, 13, 'Question100', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam', '2021-06-07 22:40:29'),
(119, 1, 'title', 'What is this?', '2021-06-09 21:13:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
