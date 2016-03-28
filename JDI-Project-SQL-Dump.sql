-- phpMyAdmin SQL Dump
-- version 4.4.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Mar 28, 2016 at 08:58 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `jdi-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cars`
--

CREATE TABLE `Cars` (
  `id` int(11) NOT NULL,
  `make` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Cars`
--

INSERT INTO `Cars` (`id`, `make`, `model`, `color`, `img`) VALUES
(1, 'Mercedes', 'C Class Saloon', 'Black', 'car-1.jpg'),
(2, 'BMW', '3 Series', 'Silver', 'car-2.jpg'),
(3, 'BMW', '7 Series', 'White', 'car-3.jpg'),
(4, 'BMW', '3 Series', 'Silver', 'car-2.jpg'),
(5, 'BMW', '7 Series', 'White', 'car-3.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cars`
--
ALTER TABLE `Cars`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cars`
--
ALTER TABLE `Cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;