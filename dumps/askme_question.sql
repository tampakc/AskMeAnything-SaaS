-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1:3307
-- Χρόνος δημιουργίας: 09 Ιουν 2021 στις 20:24:54
-- Έκδοση διακομιστή: 10.4.17-MariaDB
-- Έκδοση PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `askme_question`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `question`
--

CREATE TABLE `question` (
  `question_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `title` varchar(30) NOT NULL,
  `body` varchar(140) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `question`
--

INSERT INTO `question` (`question_id`, `user_id`, `title`, `body`, `timestamp`) VALUES
(1, 23, 'Question1', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-12-20 00:00:00'),
(2, 5, 'Question2', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2022-03-24 00:00:00'),
(3, 29, 'Question3', 'Lorem ipsum dolor sit amet,', '2022-02-27 00:00:00'),
(4, 25, 'Question4', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-03-28 00:00:00'),
(5, 29, 'Question5', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-06-21 00:00:00'),
(6, 29, 'Question6', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2020-07-29 00:00:00'),
(7, 11, 'Question7', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-03-15 00:00:00'),
(8, 21, 'Question8', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2022-04-03 00:00:00'),
(9, 30, 'Question9', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2021-04-16 00:00:00'),
(10, 8, 'Question10', 'Lorem ipsum dolor sit amet,', '2021-08-28 00:00:00'),
(11, 14, 'Question11', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-07-26 00:00:00'),
(12, 30, 'Question12', 'Lorem ipsum dolor sit', '2020-11-11 00:00:00'),
(13, 18, 'Question13', 'Lorem ipsum dolor sit', '2022-01-22 00:00:00'),
(14, 7, 'Question14', 'Lorem', '2021-04-23 00:00:00'),
(15, 25, 'Question15', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2020-08-20 00:00:00'),
(16, 15, 'Question16', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2020-11-23 00:00:00'),
(17, 10, 'Question17', 'Lorem ipsum', '2022-04-26 00:00:00'),
(18, 6, 'Question18', 'Lorem ipsum', '2021-11-30 00:00:00'),
(19, 26, 'Question19', 'Lorem ipsum', '2022-02-07 00:00:00'),
(20, 26, 'Question20', 'Lorem ipsum dolor', '2021-05-03 00:00:00'),
(21, 18, 'Question21', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2020-07-02 00:00:00'),
(22, 10, 'Question22', 'Lorem ipsum', '2020-11-24 00:00:00'),
(23, 9, 'Question23', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-10-25 00:00:00'),
(24, 6, 'Question24', 'Lorem ipsum dolor sit amet, consectetuer', '2021-12-14 00:00:00'),
(25, 20, 'Question25', 'Lorem ipsum', '2021-04-16 00:00:00'),
(26, 27, 'Question26', 'Lorem', '2021-11-07 00:00:00'),
(27, 23, 'Question27', 'Lorem ipsum dolor sit amet, consectetuer', '2020-07-25 00:00:00'),
(28, 24, 'Question28', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2021-08-02 00:00:00'),
(29, 11, 'Question29', 'Lorem', '2021-06-15 00:00:00'),
(30, 25, 'Question30', 'Lorem ipsum dolor sit amet, consectetuer', '2021-11-10 00:00:00'),
(31, 19, 'Question31', 'Lorem ipsum dolor', '2020-12-03 00:00:00'),
(32, 20, 'Question32', 'Lorem ipsum dolor sit amet,', '2021-01-07 00:00:00'),
(33, 27, 'Question33', 'Lorem ipsum dolor sit', '2021-11-15 00:00:00'),
(34, 16, 'Question34', 'Lorem ipsum', '2021-09-15 00:00:00'),
(35, 26, 'Question35', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-12-09 00:00:00'),
(36, 30, 'Question36', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2020-07-28 00:00:00'),
(37, 9, 'Question37', 'Lorem ipsum dolor sit amet, consectetuer', '2021-08-03 00:00:00'),
(38, 16, 'Question38', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-09-27 00:00:00'),
(39, 13, 'Question39', 'Lorem ipsum dolor sit amet,', '2020-10-01 00:00:00'),
(40, 21, 'Question40', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam', '2020-10-24 00:00:00'),
(41, 4, 'Question41', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2020-10-12 00:00:00'),
(42, 1, 'Question42', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.', '2021-05-07 00:00:00'),
(43, 10, 'Question43', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2020-11-27 00:00:00'),
(44, 25, 'Question44', 'Lorem ipsum', '2022-04-10 00:00:00'),
(45, 7, 'Question45', 'Lorem ipsum dolor sit amet,', '2021-04-02 00:00:00'),
(46, 20, 'Question46', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2022-01-10 00:00:00'),
(47, 26, 'Question47', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam', '2020-10-20 00:00:00'),
(48, 6, 'Question48', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2021-12-09 00:00:00'),
(49, 17, 'Question49', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2020-06-02 00:00:00'),
(50, 9, 'Question50', 'Lorem', '2020-10-17 00:00:00'),
(51, 2, 'Question51', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2020-06-23 00:00:00'),
(52, 1, 'Question52', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2021-08-22 00:00:00'),
(53, 20, 'Question53', 'Lorem ipsum dolor sit amet,', '2021-05-31 00:00:00'),
(54, 22, 'Question54', 'Lorem ipsum dolor sit', '2021-01-13 00:00:00'),
(55, 29, 'Question55', 'Lorem', '2020-11-12 00:00:00'),
(56, 5, 'Question56', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2021-03-30 00:00:00'),
(57, 15, 'Question57', 'Lorem ipsum dolor sit amet,', '2021-02-20 00:00:00'),
(58, 27, 'Question58', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2020-12-13 00:00:00'),
(59, 24, 'Question59', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2020-09-11 00:00:00'),
(60, 24, 'Question60', 'Lorem ipsum dolor sit amet,', '2020-06-21 00:00:00'),
(61, 3, 'Question61', 'Lorem', '2022-04-19 00:00:00'),
(62, 25, 'Question62', 'Lorem ipsum dolor sit amet,', '2021-10-03 00:00:00'),
(63, 25, 'Question63', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2022-04-02 00:00:00'),
(64, 15, 'Question64', 'Lorem ipsum dolor sit', '2021-11-01 00:00:00'),
(65, 21, 'Question65', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2020-11-30 00:00:00'),
(66, 10, 'Question66', 'Lorem ipsum dolor', '2021-06-27 00:00:00'),
(67, 17, 'Question67', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2022-03-22 00:00:00'),
(68, 21, 'Question68', 'Lorem ipsum', '2020-05-28 00:00:00'),
(69, 27, 'Question69', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2020-08-14 00:00:00'),
(70, 27, 'Question70', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.', '2021-12-15 00:00:00'),
(71, 18, 'Question71', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2020-05-24 00:00:00'),
(72, 12, 'Question72', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2022-02-13 00:00:00'),
(73, 23, 'Question73', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2020-10-11 00:00:00'),
(74, 22, 'Question74', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2020-11-07 00:00:00'),
(75, 4, 'Question75', 'Lorem ipsum dolor', '2020-12-08 00:00:00'),
(76, 5, 'Question76', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-12-10 00:00:00'),
(77, 15, 'Question77', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed', '2020-12-15 00:00:00'),
(78, 3, 'Question78', 'Lorem ipsum dolor sit amet, consectetuer', '2020-11-07 00:00:00'),
(79, 14, 'Question79', 'Lorem', '2021-03-05 00:00:00'),
(80, 12, 'Question80', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-01-16 00:00:00'),
(81, 24, 'Question81', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-11-07 00:00:00'),
(82, 8, 'Question82', 'Lorem ipsum dolor', '2021-06-05 00:00:00'),
(83, 4, 'Question83', 'Lorem ipsum', '2020-11-18 00:00:00'),
(84, 13, 'Question84', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-03-14 00:00:00'),
(85, 10, 'Question85', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-02-28 00:00:00'),
(86, 27, 'Question86', 'Lorem ipsum dolor sit', '2021-04-17 00:00:00'),
(87, 27, 'Question87', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.', '2020-10-07 00:00:00'),
(88, 29, 'Question88', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2020-10-10 00:00:00'),
(89, 20, 'Question89', 'Lorem ipsum dolor sit amet,', '2022-02-13 00:00:00'),
(90, 13, 'Question90', 'Lorem ipsum dolor sit amet, consectetuer', '2021-10-16 00:00:00'),
(91, 23, 'Question91', 'Lorem ipsum dolor', '2022-04-18 00:00:00'),
(92, 24, 'Question92', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer', '2021-05-16 00:00:00'),
(93, 5, 'Question93', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing', '2021-03-07 00:00:00'),
(94, 24, 'Question94', 'Lorem ipsum dolor sit amet,', '2020-06-19 00:00:00'),
(95, 25, 'Question95', 'Lorem ipsum dolor sit amet,', '2021-06-13 00:00:00'),
(96, 9, 'Question96', 'Lorem ipsum dolor sit amet, consectetuer adipiscing', '2020-08-11 00:00:00'),
(97, 11, 'Question97', 'Lorem ipsum dolor sit amet, consectetuer', '2021-08-15 00:00:00'),
(98, 26, 'Question98', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur', '2020-06-21 00:00:00'),
(99, 21, 'Question99', 'Lorem ipsum dolor sit amet, consectetuer', '2021-09-21 00:00:00'),
(100, 13, 'Question100', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam', '2021-07-25 00:00:00');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
