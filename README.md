# InovA - Plataforma de Cursos de Tecnologia
 
InovA é uma plataforma moderna de cursos de tecnologia, projetada para oferecer educação de qualidade e acessível. Somos uma **B-Corp** e temos o compromisso de destinar parte de nossos lucros para apoiar o Instituto Inova, que ajuda crianças em situação de vulnerabilidade a terem acesso a uma educação de qualidade.
 
Este repositório contém o código-fonte da nossa API, construída com Node.js, MongoDB e com funcionalidades CRUD para gestão dos cursos, usuários e transações.
 
---
 
## 📚 Tecnologias Utilizadas
 
- **Node.js**: Plataforma JavaScript no lado do servidor.
- **Express.js**: Framework para construção da API.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Bcrypt.js**: Para criptografar senhas de usuários.
- **Express-session.js**: Gerenciar sessões de usuários, permitindo o armazenamento de dados temporários no servidor.
---
 
## 🛠️ Funcionalidades
 
### 1. **Gestão de Cursos**
- CRUD de cursos: Criar, ler, atualizar e excluir cursos.
- Cada curso possui título, descrição, preço e uma lista de módulos.
- Cursos podem ser gratuitos ou pagos.
 
### 2. **Gestão de Usuários**
- Cadastro de usuários (alunos e administradores).
- Login com JWT para autenticação.
- Perfil de usuário com informações pessoais e dashboard de cursos.
 
### 3. **Gestão de Transações**
- Registro de compras de cursos (a ser implementado em versões futuras).
- Transações são feitas via integração com sistemas de pagamento (a ser implementado em versões futuras).
 
### 4. **Doação ao Instituto**
- Ao final de cada transação, parte do valor é automaticamente doado ao **Instituto Inova**, uma ONG que oferece bolsas de estudo para crianças em situação de vulnerabilidade.
 
---
 
## 🚀 Como Rodar o Projeto
 
### 1. **Pré-requisitos**
Certifique-se de que você tem as seguintes ferramentas instaladas:
 
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (ou use um serviço de MongoDB na nuvem, como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
 
### 2. **Instalação**
 
Clone o repositório e instale as dependências:
 
```bash
git clone https://github.com/mateus-henriquee/future-fest2024
cd inova-api
npm install
```
 
### 3. **Rodando o Projeto**
 
Execute o servidor com o seguinte comando:
 
```bash
npm start
```
 
A API estará disponível em `http://localhost:3000`.
 
---
 
## 📦 Endpoints
 
### **1. Usuários**
 
- **POST /api/usuarios/Accounts**: Cadastro de um novo usuário (aluno ou administrador).
- **GET /api/usuarios/Accounts**: Exibe o perfil do usuário autenticado.
 
### **2. Cursos**
 
- **GET /api/cursos**: Lista todos os cursos disponíveis.
- **GET /api/cursos/:id**: Detalhes de um curso específico.
- **POST /api/cursos**: Criação de um novo curso (apenas para administradores / a ser implementado em versões futuras).
- **PUT /api/cursos/:id**: Atualização de um curso existente (apenas para administradores / a ser implementado em versões futuras).
- **DELETE /api/cursos/:id**: Exclusão de um curso (apenas para administradores / a ser implementado em versões futuras).
 
### **3. Transações**
 
- **POST /api/transactions**: Registro de uma nova transação (compra de curso / a ser implementado em versões futuras).
- **GET /api/transactions**: Lista todas as transações (apenas para administradores / a ser implementado em versões futuras).
 
---
 
## 📄 Licença
 
Este projeto é licenciado sob a [MIT License](LICENSE).
 
---
 
## 🙏 Agradecimentos
 
- Ao nosso instituto: Instituto Inova, que inspira nossa missão de fazer a diferença na vida das crianças.
- Aos colaboradores e à comunidade por contribuir para o crescimento deste projeto.
 
---
 
## 💡 Sobre a inovA
 
Somos uma **B-Corp** com a missão de democratizar o acesso à educação de qualidade. Acreditamos que a tecnologia tem o poder de transformar vidas e, por isso, nossa plataforma oferece cursos acessíveis, voltados para o mercado de trabalho, sempre com foco na inovação. Além disso, destinamos uma parte dos nossos lucros para o **Instituto inovA**, que oferece bolsas de estudo para crianças em situação de vulnerabilidade.
 
Junte-se a nós nessa jornada para transformar e inovAr o futuro!
