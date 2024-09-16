# Desafio Fullstack - Repositório de Implementação

### Link do desafio [aqui](https://github.com/comigotech/avaliacao-candidatos-fullstack)

## Funcionalidades Implementadas
### Back-end:
- [x] Nível 1 - Validação
- [x] Nível 2 - Persistência
- [x] Nível 3 - Autenticação
- [x] Nível 4 - Gerenciamento de permissões
- [ ] Nível 5 - Testes unitários
- [x] Nível 6 - Infraestrutura
- [x] Nível 7 - Cloud AWS (Free tier não aguentou)
- [ ] Nível 8 - Monitoramento e Observabilidade

### Front-end:
- [x] Nível 1 - Cadastro
- [x] Nível 2 - Conexão com API
- [x] Nível 3 - Listagem de dados
- [x] Nível 4 - Autenticação
- [ ] Nível 5 - Testes

---

## Como Executar o Projeto

### Back-end

#### Passos Docker:
1. Clone o repositório.
2. Com o docker instalado, execute  o comando `docker-compose up --build` para iniciar o banco, backend e frontend.
3. O frontend estará disponível em `http://localhost:3000`, o backend estará disponível em `http://localhost:4000` e o banco de dados estará disponível em `http://localhost:5432`.

### Passos node:
1. Clone o repositório.
2. Execute o docker-compose up postgres para iniciar o banco ou crie um banco postgres com o nome `comigo` com  as credenciais `postgres` e `admin`.
3. Entre na pasta `backend`.
4. Instale as dependências com `npm install`.
5. Execute o comando npx prisma migrate dev para criar as tabelas no banco de dados.
6. Execute o comando `npm run seed` para popular o banco de dados com os dados de exemplo.
7. Inicie o projeto com `npm run dev`. O backend estará rodando em `http://localhost:4000`.

#### Seed:
- Execute o comando `npm run seed` para popular o banco de dados com os dados de exemplo.

#### Logins:
- Utilize os logins `atendente@comigo.com` senha `atendente` e `admin@comigo.com` senha `admin` para acessar o sistema.

### Front-end

#### Passos:
1. Clone o repositório.
2. Entre na pasta `frontend`.
3. Instale as dependências com `npm install`.
4. Inicie o projeto com `npm run dev`. O front-end estará rodando em `http://localhost:3000`.
5. Faça login com um dos usuários criados na seed.

---

## Tecnologias Utilizadas
- **Docker** (Back-end)
- **Node.js** (Back-end)
- **TypeScript** (Back-end & Front-end)
- **Postgres** (Back-end)
- **Express.js** (Back-end)
- **Axios** (Front-end)
- **NextJS** (Front-end)
- **Tailwind** (Front-end)
---

## Pendências
- [ ] Monitoramento e Observabilidade (Back-end)
- [ ] Testes (Back-end & Front-end)
- [ ] Finalizar filtros
- [ ] Modo Dark
- [ ] Estilizar tabela para ficar exatamente igual ao design

---
