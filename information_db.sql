-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 26, 2021 at 04:58 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `information_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `info_course`
--

CREATE TABLE `info_course` (
  `id` int NOT NULL,
  `id_course` int DEFAULT NULL,
  `course_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `section` int DEFAULT NULL,
  `credits` int DEFAULT NULL,
  `volume` int DEFAULT NULL,
  `teahcher` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `course_name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `info_course`
--

INSERT INTO `info_course` (`id`, `id_course`, `course_name`, `section`, `credits`, `volume`, `teahcher`, `department`, `course_name_en`) VALUES
(1, 701101, 'ภาษาอังกฤษ', 2, 12, 3, 'ครูอังคณา', 'คณะบริหารธุรกิจ', 'english'),
(2, 701102, 'ภาษาอังกฤษ22', 2, 12, 3, 'ครูอังคณา123', 'คณะบริหารธุรกิจ', 'english22'),
(3, 701103, 'ภาษาอังกฤษ3', 2, 12, 2, 'ครูอังคณา3', 'คณะบริหารธุรกิจ', 'english3'),
(8, 708557, 'gggg', 4, 4455, 30, 'NULL', 'NULL', 'ststst'),
(9, 708559, 'test2', 4, 4455, 30, 'NULL', 'NULL', 'ststst'),
(10, 708558, 'test2', 4, 4455, 30, 'NULL', 'NULL', 'ststst');

-- --------------------------------------------------------

--
-- Table structure for table `info_teachers`
--

CREATE TABLE `info_teachers` (
  `id_teacher` int NOT NULL,
  `designation_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `middle_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `department_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `first_name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `middle_name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `info_teachers`
--

INSERT INTO `info_teachers` (`id_teacher`, `designation_name`, `first_name`, `middle_name`, `last_name`, `department_name`, `first_name_en`, `middle_name_en`, `last_name_en`) VALUES
(1, 'นักวิชาการ', 'ครูอังคณา', NULL, 'คงอยู่ยง', 'ภาควิชาการบัญชี', 'Angkana', NULL, 'Khong Yu Yong'),
(2, 'นักวิชาการ', 'ครูอังคณา222', NULL, 'คงอยู่ยง', 'ภาควิชาการเงิน', 'Angkana222', NULL, 'Khong Yu Yong'),
(3, 'นักวิชาการ', 'ครูอังคณา33', NULL, 'คงอยู่ยง', 'ภาควิชาการตลาด', 'Angkana33', NULL, 'Khong Yu Yong'),
(4, 'นักวิขาการ2', 'ครูอังคณา455', NULL, 'คงอยู่ยง5', 'คณะบริหารธุรกิจ3', 'Angkana', NULL, 'Khong Yu Yong33'),
(5, 'cvcc', 'ggg', 'cvc', 'hhhh', 'ภาควิชาการบัญชี', 'cvcv', 'cvcv', 'cvcv');

-- --------------------------------------------------------

--
-- Table structure for table `teaching_infomation`
--

CREATE TABLE `teaching_infomation` (
  `id` int NOT NULL,
  `id_course` varchar(50) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `credits` int NOT NULL,
  `section` varchar(3) NOT NULL,
  `instructor` json NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teaching_infomation`
--

INSERT INTO `teaching_infomation` (`id`, `id_course`, `course_name`, `credits`, `section`, `instructor`, `date`) VALUES
(1, '701101', 'ภาษาอังกฤษ', 3, '003', '[{\"load\": \"20\", \"name\": \"อังคณา\"}, {\"load\": \"20\", \"name\": \"อังคณา2\"}, {\"load\": \"20\", \"name\": \"อังคณา3\"}, {\"load\": \"20\", \"name\": \"อังคณา\"}, {\"load\": \"123\", \"name\": \"ครูอังคณา33(Angkana33)\"}, {\"load\": \"20\", \"name\": \"ครูอังคณา455(Angkana)\"}, {\"load\": \"20\", \"name\": \"ggg(cvcv)\"}, {\"load\": \"20\", \"name\": \"cvcvcv(cvcvc)\"}, {\"load\": \"123\", \"name\": \"ครูอังคณา222(Angkana222)\"}, {\"load\": \"\", \"name\": \"ครูอังคณา(Angkana)\"}]', '(Tue-Fri))'),
(2, '701102', 'ภาษาอังกฤษ', 3, '003', '[{\"load\": \"20\", \"name\": \"อังคณา\"}, {\"load\": \"20\", \"name\": \"อังคณา2\"}, {\"load\": \"20\", \"name\": \"อังคณา1\"}, {\"load\": \"20\", \"name\": \"อังคณา8\"}, {\"load\": \"123\", \"name\": \"ครูอังคณา222(Angkana222)\"}, {\"load\": \"123\", \"name\": \"ครูอังคณา222(Angkana222)\"}, {\"load\": \"123\", \"name\": \"ครูอังคณา222(Angkana222)\"}, {\"load\": \"123\", \"name\": \"ครูอังคณา222(Angkana222)\"}, {\"load\": \"\", \"name\": \"ครูอังคณา(Angkana)\"}]', '(Mon - Thu)'),
(3, '701102', 'ภาษาอังกฤษ3', 3, '010', '[{\"load\": \"20\", \"name\": \"อังคณา\"}, {\"load\": \"20\", \"name\": \"อังคณา2\"}, {\"load\": \"20\", \"name\": \"อังคณา3\"}, {\"load\": \"123\", \"name\": \"ครูอังคณา33(Angkana33)\"}, {\"load\": \"20\", \"name\": \"ครูอังคณา(Angkana)\"}]', '(Mon - Thu)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `info_course`
--
ALTER TABLE `info_course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `info_teachers`
--
ALTER TABLE `info_teachers`
  ADD PRIMARY KEY (`id_teacher`);

--
-- Indexes for table `teaching_infomation`
--
ALTER TABLE `teaching_infomation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `info_course`
--
ALTER TABLE `info_course`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `info_teachers`
--
ALTER TABLE `info_teachers`
  MODIFY `id_teacher` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teaching_infomation`
--
ALTER TABLE `teaching_infomation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
