CREATE DATABASE IF NOT EXISTS minha_api_db;
USE minha_api_db;

CREATE TABLE IF NOT EXISTS produtos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS clientes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS vendas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_venda DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantidade INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    produto_id INT NOT NULL,
    cliente_id INT NOT NULL,
    
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS departamentos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS funcionarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    departamento_id INT NOT NULL,
    
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    ativo TINYINT(1)   NOT NULL DEFAULT 1
);

INSERT INTO produtos (nome, preco, estoque, ativo) 
VALUES 
('Notebook', 3500.00, 10, 1),
('Mouse Gamer', 120.50, 45, 1);

INSERT INTO clientes (nome, email, cpf, ativo)
VALUES
('Thiago', 'thiago@email.com', '123.456.789-00', 1);

INSERT INTO usuarios (nome, email, senha_hash)
VALUES ('Admin SENAI', 'admin@senai.com',
        '$2a$11$dIjjGbl0KpncvNaQd/xZv..EQUxfP3DXMyOITmH4Am7H8EdUuZQAq');