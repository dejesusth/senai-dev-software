# Minha API - Desenvolvimento de Sistemas

API REST desenvolvida em C# com ASP.NET Core como atividade prática da disciplina de Desenvolvimento de Sistemas, do III Módulo do Curso Técnico em Desenvolvimento de Sistemas - SENAI.

O projeto tem como objetivo aplicar, na prática, os conceitos de desenvolvimento de API's REST, organização em camadas, operações HTTP, persistência de dados e integração com banco de dados MySQL.

## Status do Projeto:

✅ Concluído

A API possui operações para gerenciamento de produtos e clientes, além do registro de vendas com controle de estoque.

A aplicação foi desenvolvida utilizando uma arquitetura organizada em camadas:

Controller
    ↓
 Service
    ↓
Repository
    ↓
  MySQL

## 📚 Sobre o Projeto

Durante o desenvolvimento da atividade, estão sendo trabalhados conceitos como:
- Criação de uma API REST
- Utilização de métodos HTTP
- Criação e Organização de Models
- Criação e Organização de Controllers
- Services e Interfaces
- Injeção de Dependência
- Integração com Banco de Dados MySQL
- Consultas SQL parametrizadas
- Validação de Dados
- Controle de estoque durante uma venda
- Testes dos Endpoints utilizando Swagger
- Versionamento com Git e Github


## 🛠 Tecnologias Utilizadas

![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### 📁 Estrutura do Projeto

Atualmente, o projeto está organizado da seguinte forma:
```
MinhaApi/
├── Controllers/
|   ├── ClienteController.cs
│   ├── ProdutoController.cs
│   └── VendaController.cs
│
├── Models/
|   ├── Cliente.cs
│   ├── Produto.cs
│   └── Venda.cs
│
├── Repositories/
|   ├── IClienteRepository.cs
│   ├── IProdutoRepository.cs
|   ├── IVendaRepository.cs
|   ├── ClienteRepository.cs
|   ├── ProdutoRepository.cs
│   └── VendaRepository.cs
│
├── Services/
|   ├── IClienteService.cs
│   ├── IProdutoService.cs
|   ├── IVendaService.cs
|   ├── ClienteService.cs
|   ├── ProdutoService.cs
│   └── VendaService.cs
│
├── Program.cs
├── MinhaApi.csproj
├── appsettings.json
└── Database.sql
```
### Controllers

Os Controllers são responsáveis por receber as requisições HTTP e definir quais ações devem ser executadas.

Atualmente, o projeto possui:
- ClienteController
- ProdutoController
- VendaController

### Models

#### Produto
Representa os produtos disponíveis para venda.

Possui:
- Id
- Nome
- Preco
- Estoque
- Ativo

#### Cliente
Representa os clientes cadastrados na aplicação.

Possui:
- Id
- Nome
- Email
- CPF
- Ativo

#### Venda
Representa uma venda realizada.

Possui: 
- Id
- DataVenda
- Quantidade
- ValorTotal
- ProdutoId
- ClienteId

Durante o registro de uma venda, o sistema verifica a existência do cliente e do produto, verifica o estoque disponível, calcula o valor total e atualiza o estoque do produto.

### 🌐 Endpoints

#### Produtos

Método |     Endpoint	   | Descrição
GET	   |   /api/Produto    | Lista todos os produtos
GET	   | /api/Produto/{id} | Busca um produto pelo ID
POST   |   /api/Produto	   | Cadastra um produto
PUT	   | /api/Produto/{id} | Atualiza um produto
DELETE | /api/Produto/{id} | Remove um produto

#### Clientes

Método |     Endpoint	   | Descrição
GET	   |   /api/Cliente    | Lista todos os clientes
GET	   | /api/Cliente/{id} | Busca um cliente pelo ID
POST   |   /api/Cliente	   | Cadastra um cliente
PUT	   | /api/Cliente/{id} | Atualiza um cliente
DELETE | /api/Cliente/{id} | Remove um cliente

#### Vendas

Método |     Endpoint	 | Descrição
GET	   |   /api/Venda    | Lista todas as vendas
GET	   | /api/Venda/{id} | Busca uma venda pelo ID
POST   |   /api/Venda	 | Registra uma nova venda

### Banco de Dados

A aplicação utiliza MySQL para armazenamento de dados.

O arquivo Database.sql contém a estrutura necessária para criação do banco de dados e das tabelas utilizadas pela aplicação.

#### ⚙ Configuração do Banco

A conexão com o MySQL é configurada no arquivo *appsettings.json* através da *ConnectionString*.

## ▶️ Como executar o projeto
### Pré-requisitos

Para executar o projeto, é necessário ter instalado:

- .NET SDK;
- MySQL Server
- Git;
- Uma IDE ou editor de código compatível com C#, como Visual Studio ou Visual Studio Code.

### 📖 Swagger

O projeto utiliza Swagger para facilitar a visualização e o teste dos endpoints da API durante o desenvolvimento.

Com a aplicação em execução, o Swagger pode ser acessado pelo endereço disponibilizado pelo projeto.

### 🔄 Desenvolvimento com Git e GitHub

O código-fonte do projeto é versionado utilizando Git e armazenado no GitHub.

Durante o desenvolvimento são utilizados, entre outros, os seguintes comandos:

git status
git add .
git commit -m "mensagem do commit"
git push
git pull

O GitHub é utilizado como repositório remoto para armazenar e sincronizar as versões do projeto.

### 🎓 Contexto acadêmico

Curso: Técnico em Desenvolvimento de Sistemas
Módulo: III Módulo
Disciplina: Desenvolvimento de Sistemas
Instituição: SENAI

👨‍💻 Autor

Thiago Silva

Projeto desenvolvido para fins acadêmicos.
