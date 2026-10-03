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
CREATE TABLE IF NOT EXISTS vendas (
	id INT AUTO_INCREMENT PRIMARY KEY,
    data_venda DATETIME NOT NULL,
    quantidade INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    produto_id INT NOT NULL,
    cliente_id INT NOT NULL,
    
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- 5. Criação da Tabela de Departamento
CREATE TABLE IF NOT EXISTS departamento (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    email VARCHAR(100) NOT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- 6. Criação da Tabela de Funcionários
CREATE TABLE IF NOT EXISTS funcionario (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cpf VARCHAR(14),
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    departamento_id INT NOT NULL,
    
    FOREIGN KEY (departamento_id) REFERENCES departamento(id)
);

INSERT INTO produtos (nome, preco, estoque, ativo) 
VALUES 
('Notebook', 3500.00, 10, 1),
('Mouse Gamer', 120.50, 45, 1);

INSERT INTO clientes (nome, email, cpf, ativo)
VALUES
('Thiago', 'thiago@email.com', '123.456.789-00',1);