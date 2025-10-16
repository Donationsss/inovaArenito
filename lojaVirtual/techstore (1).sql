-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2025 at 07:55 AM
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `descricao` text DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `categoria`, `marca`, `preco`, `preco_promocional`, `estoque`, `imagem`, `created_at`, `descricao`, `ativo`, `updated_at`) VALUES
(2, 'Notebook Ultra Pro', 'notebooks', 'TechBrand', 4999.00, NULL, 11, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', '2025-10-16 03:14:59', NULL, 0, '2025-10-16 05:16:49'),
(3, 'Smartphone XZ Plus', 'perifericos', 'MobileMax', 2999.00, 2549.00, 37, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', '2025-10-16 03:14:59', NULL, 0, '2025-10-16 05:34:55'),
(4, 'Fone Wireless Pro', 'perifericos', 'AudioTech', 299.00, NULL, 40, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', '2025-10-16 03:14:59', NULL, 0, '2025-10-16 05:16:49'),
(5, 'Notebook Gamer X', 'perifericos', 'GamerTech', 6999.00, NULL, 17, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400', '2025-10-16 03:14:59', NULL, 0, '2025-10-16 05:34:55'),
(11, 'Notebook Ultra Pro', 'notebooks', 'TechBrand', 4999.00, NULL, 9, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 05:28:36'),
(12, 'Smartphone XZ Plus', 'smartphones', 'MobileMax', 2999.00, 2549.00, 0, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 04:51:11'),
(13, 'Fone Wireless Pro', 'perifericos', 'AudioTech', 299.00, NULL, 24, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 05:46:56'),
(14, 'Notebook Gamer X', 'notebooks', 'GamerTech', 6999.00, NULL, 5, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 04:09:22'),
(15, 'Smartwatch Elite', 'perifericos', 'WearTech', 899.00, 749.00, 12, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 04:09:22'),
(16, 'Tablet Pro Max', 'tablets', 'TabletMax', 1899.00, NULL, 8, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 04:09:22'),
(17, 'Teclado Mecânico RGB', 'perifericos', 'KeyTech', 399.00, NULL, 20, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 04:09:22'),
(18, 'Monitor 4K UltraWide', 'hardware', 'ViewTech', 2499.00, 2199.00, 0, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 05:49:57'),
(19, 'Mouse Gamer Pro', 'perifericos', 'GameTech', 149.00, NULL, 30, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', '2025-10-16 04:09:21', NULL, 1, '2025-10-16 04:09:22');

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
  `reset_expires` datetime DEFAULT NULL,
  `is_vip` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password`, `is_admin`, `reset_code`, `reset_expires`, `is_vip`) VALUES
(9, 'Donassan', 'enzo.donassan@gmail.com', '$2y$10$ZoV8ck/cNIvdhZvYjpZxJ.jvMSpu6LkZbxuM4IFnK.S0ABAnf7Krq', 1, NULL, NULL, 1),
(10, 'admin', 'admin@techstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, NULL, NULL, 0),
(11, 'usuario1', 'usuario@teste.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, NULL, 0);

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
(1, 9, NULL, 11, 'Notebook Ultra Pro', 1, 4999.00, 4999.00, 'completed', '2025-10-16 05:28:36'),
(2, 9, 'enzo.donassan@gmail.com', 1, 'Smartphone Samsung Galaxy', 2, 1299.99, 2599.98, 'completed', '2024-09-15 17:30:00'),
(3, 11, 'usuario@teste.com', 3, 'Mouse Wireless Logitech', 1, 89.90, 89.90, 'completed', '2024-09-18 13:15:00'),
(4, 9, 'enzo.donassan@gmail.com', 4, 'Teclado Mecânico', 1, 299.99, 299.99, 'completed', '2024-09-22 19:45:00'),
(5, 11, 'usuario@teste.com', 2, 'Notebook Dell Inspiron', 1, 2499.90, 2499.90, 'completed', '2024-09-28 14:20:00'),
(6, 9, 'enzo.donassan@gmail.com', 5, 'Monitor 24\" Full HD', 2, 599.90, 1199.80, 'completed', '2024-08-05 12:00:00'),
(7, 11, 'usuario@teste.com', 1, 'Smartphone Samsung Galaxy', 1, 1299.99, 1299.99, 'completed', '2024-08-12 18:30:00'),
(8, 9, 'enzo.donassan@gmail.com', 3, 'Mouse Wireless Logitech', 3, 89.90, 269.70, 'completed', '2024-08-20 17:10:00'),
(9, 11, 'usuario@teste.com', 4, 'Teclado Mecânico', 2, 299.99, 599.98, 'completed', '2024-08-25 15:45:00'),
(10, 9, 'enzo.donassan@gmail.com', 2, 'Notebook Dell Inspiron', 1, 2499.90, 2499.90, 'completed', '2024-07-03 13:20:00'),
(11, 11, 'usuario@teste.com', 5, 'Monitor 24\" Full HD', 1, 599.90, 599.90, 'completed', '2024-07-15 19:00:00'),
(12, 9, 'enzo.donassan@gmail.com', 1, 'Smartphone Samsung Galaxy', 1, 1299.99, 1299.99, 'completed', '2024-07-28 16:25:00'),
(13, 11, 'usuario@teste.com', 3, 'Mouse Wireless Logitech', 2, 89.90, 179.80, 'completed', '2024-06-08 14:30:00'),
(14, 9, 'enzo.donassan@gmail.com', 4, 'Teclado Mecânico', 3, 299.99, 899.97, 'completed', '2024-06-18 17:15:00'),
(15, 11, 'usuario@teste.com', 2, 'Notebook Dell Inspiron', 1, 2499.90, 2499.90, 'completed', '2024-06-25 12:50:00'),
(16, 9, 'enzo.donassan@gmail.com', 5, 'Monitor 24\" Full HD', 1, 599.90, 599.90, 'completed', '2024-05-10 18:40:00'),
(17, 11, 'usuario@teste.com', 1, 'Smartphone Samsung Galaxy', 1, 1299.99, 1299.99, 'completed', '2024-05-20 15:10:00'),
(18, 9, 'enzo.donassan@gmail.com', 3, 'Mouse Wireless Logitech', 4, 89.90, 359.60, 'completed', '2024-05-28 13:35:00'),
(19, 11, 'usuario@teste.com', 4, 'Teclado Mecânico', 1, 299.99, 299.99, 'completed', '2024-04-05 16:20:00'),
(20, 9, 'enzo.donassan@gmail.com', 2, 'Notebook Dell Inspiron', 1, 2499.90, 2499.90, 'completed', '2024-04-15 19:25:00'),
(21, 11, 'usuario@teste.com', 5, 'Monitor 24\" Full HD', 2, 599.90, 1199.80, 'completed', '2024-04-28 14:45:00'),
(22, 9, NULL, 13, 'Fone Wireless Pro', 1, 299.00, 299.00, 'completed', '2025-10-16 05:46:56'),
(23, 9, NULL, 18, 'Monitor 4K UltraWide', 1, 2199.00, 2199.00, 'completed', '2025-10-16 05:47:19'),
(24, 9, NULL, 18, 'Monitor 4K UltraWide', 2, 2199.00, 4398.00, 'completed', '2025-10-16 05:49:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_produtos_categoria_ativo` (`categoria`,`ativo`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_usuarios_admin_vip` (`is_admin`,`is_vip`);

--
-- Indexes for table `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produto_id` (`produto_id`),
  ADD KEY `data` (`data`),
  ADD KEY `idx_vendas_usuario_data` (`usuario_id`,`data`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
