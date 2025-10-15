# Projeto de Suporte - Aplicação Frontend

Esta é a aplicação frontend para o Projeto de Suporte. É uma SPA (Single Page Application) construída com Next.js, responsável por toda a interface do usuário e interação com a API backend.

## Tecnologias

-   **Framework**: Next.js com React
-   **Linguagem**: TypeScript
-   **UI Kit**: Material-UI (MUI)
-   **Estilização**: Emotion
-   **Comunicação com API**: Axios

---

## Estrutura de Pastas
src/
├── app/          # Rotas e páginas da aplicação (App Router)
│   ├── (admin)/  # Rotas protegidas para administradores
│   ├── (dashboard)/ # Rotas para usuários logados
│   ├── login/    # Página de login
│   └── ...
├── components/   # Componentes React reutilizáveis
├── contexts/     # Contextos React (Ex: Autenticação)
├── hooks/        # Hooks customizados para lógica de negócio
├── services/     # Funções para fazer requisições à API (Axios)
└── types/        # Definições de tipos TypeScript
---

## Como Rodar (Modo Standalone)

Embora o método recomendado seja usar o Docker Compose na raiz do projeto, você pode rodar o frontend de forma isolada. **Lembre-se que o backend precisa estar rodando para que o login e outras funcionalidades funcionem.**

### 1. Pré-requisitos

-   Node.js (versão 18 ou superior)

### 2. Instalação

Clone o repositório, navegue até a pasta `frontend` e instale as dependências:

`bash
cd frontend
npm install
npm run dev`

### A aplicação estará disponível em http://localhost:3000
