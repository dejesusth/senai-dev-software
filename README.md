# Minha API - Desenvolvimento de Sistemas

API REST desenvolvida em C# com ASP.NET Core como atividade prática da disciplina de Desenvolvimento de Sistemas, do III Módulo do Curso Técnico em Desenvolvimento de Sistemas.

O projeto tem como objetivo aplicar, na prática, os conceitos de desenvolvimento de API's REST, utilizando métodos HTTP para realizar operações sobre os dados da aplicação.

## Status do Projeto:

🚧 Em Desenvolvimento

A API está sendo construída progressivamente durante as aulas da disciplina.

## 📚 Sobre o Projeto

Durante o desenvolvimento da atividade, estão sendo trabalhados conceitos como:
- Criação de uma API REST
- Organização do projeto em diferentes camadas
- Criação de Models
- Criação de Controllers
- Utilização de métodos HTTP
- Comunicação entre as diferentes partes da aplicação
- Testes das requisições da API

## 🛠 Tecnologias Utilizadas

- Git
- Swagger
- VS Code

### 💻 Linguagens

![C#](https://img.shields.io/badge/C#-A8B9CC?style=for-the-badge&logo=c&logoColor=black)
![.NET](https://img.shields.io/badge/.NET-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

### 📁 Estrutura do Projeto

Atualmente, o projeto está organizado da seguinte forma:

MinhaApi/
│
├── Controllers/
│   ├── ProdutoController.cs
│   ├── TipoController.cs
│   └── WeatherForecastController.cs
│
├── Models/
│   ├── Produto.cs
│   └── Tipo.cs
│
├── Repositories/
│   ├── IProdutoRepository.cs
│   └── ProdutoRepository.cs
│
├── Services/
│   ├── IProdutoService.cs
│   └── ProdutoService.cs
│
├── Properties/
│
├── MinhaApi.csproj
├── MinhaApi.http
├── Program.cs
├── appsettings.json
└── appsettings.Development.json

### Controllers

Os Controllers são responsáveis por receber as requisições HTTP e definir quais ações devem ser executadas.

Atualmente, o projeto possui:
- ProdutoController
- TipoController

### Models

Os Models representam os dados utilizados pela aplicação.

O Model Produto possui atualmente:

- Id
- Nome
- Preco
- Estoque
- Ativo
- Tipo

O Model Tipo possui atualmente:

- Id
- Nome

## ▶️ Como executar o projeto
### Pré-requisitos

Para executar o projeto, é necessário ter instalado:

.NET SDK;
Git;
Uma IDE ou editor de código compatível com C#, como Visual Studio ou Visual Studio Code.

### Executando localmente

Clone o repositório:

git clone https://github.com/dejesusth/senai-dev-software.git

Entre na pasta do projeto:

cd senai-dev-software/MinhaApi

Restaure as dependências:

dotnet restore

Execute a aplicação:

dotnet run

Após iniciar a aplicação, utilize o endereço apresentado no terminal para acessar a API.

📖 Swagger

O projeto utiliza Swagger para facilitar a visualização e o teste dos endpoints da API durante o desenvolvimento.

Com a aplicação em execução, o Swagger pode ser acessado pelo endereço disponibilizado pelo projeto.

🔄 Desenvolvimento com Git e GitHub

O código-fonte do projeto é versionado utilizando Git e armazenado no GitHub.

Durante o desenvolvimento são utilizados, entre outros, os seguintes comandos:

git status
git add .
git commit -m "mensagem do commit"
git push
git pull

O GitHub é utilizado como repositório remoto para armazenar e sincronizar as versões do projeto.

### 🚧 Próximos passos

O projeto continuará sendo desenvolvido conforme o conteúdo apresentado nas aulas da disciplina.

Novas funcionalidades e melhorias serão adicionadas ao README conforme forem implementadas no projeto.

### 🎓 Contexto acadêmico

Curso: Técnico em Desenvolvimento de Sistemas
Módulo: III Módulo
Disciplina: Desenvolvimento de Sistemas
Instituição: SENAI

👨‍💻 Autor

Thiago Silva

Projeto desenvolvido para fins acadêmicos.
