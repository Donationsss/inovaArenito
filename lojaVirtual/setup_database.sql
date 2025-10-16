-- ========================================
-- SETUP DO BANCO DE DADOS - TECHSTORE
-- ========================================
-- Execute estes comandos no phpMyAdmin ou MySQL Workbench

-- 1. Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS techstore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE techstore;

-- 2. Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(190) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) NOT NULL DEFAULT 0,
    is_vip TINYINT(1) NOT NULL DEFAULT 0,
    reset_code VARCHAR(12) DEFAULT NULL,
    reset_expires DATETIME DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY username (username),
    KEY idx_email (email),
    KEY idx_created_at (created_at)
);

-- 3. Criar tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    marca VARCHAR(100) DEFAULT NULL,
    preco DECIMAL(10,2) NOT NULL,
    preco_promocional DECIMAL(10,2) DEFAULT NULL,
    estoque INT(11) NOT NULL DEFAULT 0,
    imagem VARCHAR(255) DEFAULT NULL,
    descricao TEXT DEFAULT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_categoria (categoria),
    KEY idx_estoque (estoque),
    KEY idx_ativo (ativo),
    KEY idx_created_at (created_at)
);

-- 4. Criar tabela de vendas
CREATE TABLE IF NOT EXISTS vendas (
    id INT(11) NOT NULL AUTO_INCREMENT,
    usuario_id INT(11) DEFAULT NULL,
    cliente_email VARCHAR(190) DEFAULT NULL,
    produto_id INT(11) NOT NULL,
    produto_nome VARCHAR(150) NOT NULL,
    quantidade INT(11) NOT NULL DEFAULT 1,
    valor_unit DECIMAL(10,2) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    status ENUM('completed','pending','cancelled') DEFAULT 'completed',
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY fk_usuario (usuario_id),
    KEY fk_produto (produto_id),
    KEY idx_status (status),
    KEY idx_data (data),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- 5. Inserir usuário administrador padrão
-- Senha: admin123
INSERT IGNORE INTO usuarios (username, email, password, is_admin) VALUES 
('admin', 'admin@techstore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1);

-- 6. Inserir usuário normal de exemplo
-- Senha: user123
INSERT IGNORE INTO usuarios (username, email, password, is_admin) VALUES 
('usuario1', 'usuario@teste.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0);

-- 7. Inserir produtos de exemplo
INSERT IGNORE INTO produtos (nome, categoria, marca, preco, preco_promocional, estoque, imagem) VALUES
('Notebook Ultra Pro', 'notebooks', 'TechBrand', 4999.00, NULL, 10, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'),
('Smartphone XZ Plus', 'smartphones', 'MobileMax', 2999.00, 2549.00, 15, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'),
('Fone Wireless Pro', 'perifericos', 'AudioTech', 299.00, NULL, 25, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'),
('Notebook Gamer X', 'notebooks', 'GamerTech', 6999.00, NULL, 5, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400'),
('Smartwatch Elite', 'perifericos', 'WearTech', 899.00, 749.00, 12, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'),
('Tablet Pro Max', 'tablets', 'TabletMax', 1899.00, NULL, 8, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'),
('Teclado Mecânico RGB', 'perifericos', 'KeyTech', 399.00, NULL, 20, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400'),
('Monitor 4K UltraWide', 'hardware', 'ViewTech', 2499.00, 2199.00, 3, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'),
('Mouse Gamer Pro', 'perifericos', 'GameTech', 149.00, NULL, 30, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'),
('Webcam HD Pro', 'perifericos', 'StreamTech', 199.00, 179.00, 18, 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400');

-- 8. Inserir vendas de exemplo (opcional - para teste)
-- Descomente as linhas abaixo se quiser dados de exemplo
/*
INSERT INTO vendas (usuario_id, produto_id, produto_nome, quantidade, valor_unit, valor_total, status, data) VALUES
(1, 2, 'Smartphone XZ Plus', 1, 2549.00, 2549.00, 'completed', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(1, 3, 'Fone Wireless Pro', 2, 299.00, 598.00, 'completed', DATE_SUB(NOW(), INTERVAL 2 HOURS)),
(2, 1, 'Notebook Ultra Pro', 1, 4999.00, 4999.00, 'completed', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 5, 'Smartwatch Elite', 1, 749.00, 749.00, 'completed', DATE_SUB(NOW(), INTERVAL 2 DAYS));
*/

-- 9. Atualizar estrutura se necessário (adicionar campos que podem estar faltando)
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS is_vip TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE produtos ADD COLUMN IF NOT EXISTS descricao TEXT DEFAULT NULL;
ALTER TABLE produtos ADD COLUMN IF NOT EXISTS ativo TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE produtos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 10. Criar índices adicionais para performance
CREATE INDEX IF NOT EXISTS idx_vendas_usuario_data ON vendas(usuario_id, data);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria_ativo ON produtos(categoria, ativo);
CREATE INDEX IF NOT EXISTS idx_usuarios_admin_vip ON usuarios(is_admin, is_vip);

-- ========================================
-- COMANDOS ÚTEIS PARA MANUTENÇÃO
-- ========================================

-- Limpar todas as vendas (CUIDADO!)
-- DELETE FROM vendas WHERE id > 0;

-- Resetar auto_increment das vendas
-- ALTER TABLE vendas AUTO_INCREMENT = 1;

-- Ver estatísticas do sistema
-- SELECT 
--     (SELECT COUNT(*) FROM usuarios) as total_usuarios,
--     (SELECT COUNT(*) FROM produtos WHERE ativo = 1) as produtos_ativos,
--     (SELECT COUNT(*) FROM vendas WHERE status = 'completed') as vendas_concluidas,
--     (SELECT SUM(valor_total) FROM vendas WHERE status = 'completed') as receita_total;

-- Backup das vendas (copiar para uma tabela de backup)
-- CREATE TABLE vendas_backup LIKE vendas;
-- INSERT INTO vendas_backup SELECT * FROM vendas;

COMMIT;