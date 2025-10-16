-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2025 at 05:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `preco_promocional` decimal(10,2) DEFAULT NULL,
  `estoque` int(11) NOT NULL DEFAULT 0,
  `imagem` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `categoria`, `marca`, `preco`, `preco_promocional`, `estoque`, `imagem`, `created_at`) VALUES
(1, 'Mateus', 'iossoo', 'dawmodmaw', 99999999.99, 2132312.00, 1000, '', '2025-10-16 02:59:56'),
(2, 'Notebook Ultra Pro', 'notebooks', 'TechBrand', 4999.00, NULL, 0, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', '2025-10-16 03:14:59'),
(3, 'Smartphone XZ Plus', 'smartphones', 'MobileMax', 2999.00, 2549.00, 4, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', '2025-10-16 03:14:59'),
(4, 'Fone Wireless Pro', 'perifericos', 'AudioTech', 299.00, NULL, 22, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', '2025-10-16 03:14:59'),
(5, 'Notebook Gamer X', 'notebooks', 'GamerTech', 6999.00, NULL, 4, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400', '2025-10-16 03:14:59'),
(6, 'Smartwatch Elite', 'perifericos', 'WearTech', 899.00, 749.00, 10, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', '2025-10-16 03:14:59'),
(7, 'Tablet Pro Max', 'tablets', 'TabletMax', 1899.00, NULL, 6, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', '2025-10-16 03:14:59'),
(8, 'Teclado Mecânico RGB', 'perifericos', 'KeyTech', 399.00, NULL, 17, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400', '2025-10-16 03:14:59'),
(9, 'Monitor 4K UltraWide', 'hardware', 'ViewTech', 2499.00, 2199.00, 2, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', '2025-10-16 03:14:59'),
(10, 'Produto Sem Estoque', 'hardware', 'TestBrand', 999.00, NULL, 0, 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400', '2025-10-16 03:14:59');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(190) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `reset_code` varchar(12) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `is_admin`, `reset_code`, `reset_expires`) VALUES
(9, 'Donassan', 'enzo.donassan@gmail.com', '$2y$10$ZoV8ck/cNIvdhZvYjpZxJ.jvMSpu6LkZbxuM4IFnK.S0ABAnf7Krq', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `cliente_email` varchar(190) DEFAULT NULL,
  `produto_id` int(11) NOT NULL,
  `produto_nome` varchar(150) NOT NULL,
  `quantidade` int(11) NOT NULL DEFAULT 1,
  `valor_unit` decimal(10,2) NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `status` enum('completed','pending','cancelled') DEFAULT 'completed',
  `data` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendas`
--

INSERT INTO `vendas` (`id`, `usuario_id`, `cliente_email`, `produto_id`, `produto_nome`, `quantidade`, `valor_unit`, `valor_total`, `status`, `data`) VALUES
(1, 1, NULL, 3, 'Smartphone XZ Plus', 2, 2549.00, 5098.00, 'completed', '2025-10-16 08:26:40'),
(2, 1, NULL, 4, 'Fone Wireless Pro', 1, 299.00, 299.00, 'completed', '2025-10-16 06:26:40'),
(3, 1, NULL, 2, 'Notebook Ultra Pro', 1, 4999.00, 4999.00, 'completed', '2025-10-16 04:26:40'),
(4, 1, NULL, 6, 'Smartwatch Elite', 1, 749.00, 749.00, 'completed', '2025-10-15 08:26:40'),
(5, 1, NULL, 8, 'Teclado Mecânico RGB', 3, 399.00, 1197.00, 'completed', '2025-10-15 06:26:40'),
(6, 1, NULL, 9, 'Monitor 4K UltraWide', 1, 2199.00, 2199.00, 'completed', '2025-10-11 08:26:40'),
(7, 1, NULL, 5, 'Notebook Gamer X', 1, 6999.00, 6999.00, 'completed', '2025-10-10 08:26:40'),
(8, 1, NULL, 7, 'Tablet Pro Max', 2, 1899.00, 3798.00, 'completed', '2025-10-09 08:26:40'),
(9, 1, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-06 08:26:40'),
(10, 1, NULL, 4, 'Fone Wireless Pro', 2, 299.00, 598.00, 'completed', '2025-10-04 08:26:40'),
(11, 1, NULL, 6, 'Smartwatch Elite', 1, 749.00, 749.00, 'completed', '2025-10-01 08:26:40'),
(12, 1, NULL, 2, 'Notebook Ultra Pro', 1, 4999.00, 4999.00, 'completed', '2025-09-28 08:26:40'),
(13, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:36:21'),
(14, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:36:21'),
(15, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:36:21'),
(16, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:36:21'),
(17, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:36:21'),
(18, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:36:21'),
(19, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:36:50'),
(20, 9, NULL, 3, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', '2025-10-16 03:37:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produto_id` (`produto_id`),
  ADD KEY `data` (`data`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
