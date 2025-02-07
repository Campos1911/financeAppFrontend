# Finance App Frontend - Em construção

Este é o frontend do Finance App, uma aplicação web para gerenciamento financeiro pessoal. Ele consome a API do backend para autenticação de usuários, controle de transações e gestão de categorias de despesas e receitas.

## Tecnologias Utilizadas

- **Next**
- **TypeScript**
- **TailwindCSS**
- **Shadcn UI**
- **Axios** (requisições HTTP)
- **JOI** (validação de dados)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Campos1911/financeAppFrontend.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd financeAppFrontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Uso

Para iniciar o projeto em ambiente de desenvolvimento, execute:
```bash
npm run dev
```
O servidor será iniciado em `http://localhost:3000`

## Funcionalidades Principais

- Cadastro e login de usuários
- Visualização de transações financeiras
- Criação, edição e remoção de transações

Desenvolvido por [Campos1911](https://github.com/Campos1911).

