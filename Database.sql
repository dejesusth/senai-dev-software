-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS minha_api_db;
USE minha_api_db;

-- 2. Criação da Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- 3. Criação da Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cpf VARCHAR(14),
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- 4. Criação da Tabela de Vendas
CREATE TABLE IF NOT EXISTS venda (
	id INT AUTO_INCREMENT PRIMARY KEY,
    data_venda DATE,
    horario_venda TIME,
    valor_total DECIMAL(10,2),
    idproduto INT,
    idcliente INT,
    FOREIGN KEY (idproduto) REFERENCES produtos(idproduto),
    FOREIGN KEY (idcliente) REFERENCES clientes(idcliente)
);
-- 5. Inserção de Dados Iniciais
INSERT INTO produtos (nome, preco, estoque, ativo) 
VALUES 
('Notebook', 3500.00, 10, 1),
('Mouse Gamer', 120.50, 45, 1);

INSERT INTO clientes (nome, email, cpf, ativo)
VALUES
('Thiago', 'thiago@email.com', '123.456.789-00',1);

select * from venda;