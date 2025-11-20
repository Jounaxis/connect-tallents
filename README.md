# Connect Tallents - Hub Global de Talentos

Conecte talentos de diferentes paises em uma unica interface. Esta entrega da Global Solution de Front-End foi construida como uma SPA em React para conectar profissionais, mentores e equipes a oportunidades de colaboracao, trocas de experiencia e preparacao para o mercado internacional.

## Status do Projeto
- Em desenvolvimento continuo, com deploy ativo na Vercel e API Java publicada.

## Sumario
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Requisitos da Global Solutions Cumpridos](#requisitos-da-global-solutions-cumpridos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalacao](#instalacao)
- [Como Usar](#como-usar)
- [Integracao com Back-End](#integracao-com-back-end)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rotas Principais](#rotas-principais)
- [Endpoints da API](#endpoints-da-api)
- [Integrantes](#integrantes)
- [Screenshots / Demo](#screenshots--demo)
- [Contato](#contato)

## Sobre o Projeto
Entrega da Global Solution (Front-End Design Engineering) com foco em colaboracao e preparacao profissional. O sistema centraliza feed global, projetos colaborativos, tarefas por trilha e paginas institucionais, consumindo a API Java hospedada no Render. Usa tema claro/escuro via Context API e responsividade para XS/SM/MD/LG/XL.

## Funcionalidades
- Autenticacao e perfil: cadastro, login por e-mail, persistencia no `localStorage`, edicao completa do perfil e upload de avatar.
- Feed Global: criacao e exclusao de posts (quando autenticado), timeline com usuarios, tendencias e skeletons de carregamento.
- Projetos Colaborativos: listagem de projetos com autor e time, modal de detalhes com tarefas do projeto e associacao a colaboradores.
- Detalhe de Projeto: rota dinamica `/projeto/:id` com carregamento de dados e tarefas vinculadas.
- Experiencias e Avaliacoes: envio de avaliacoes (nota/comentario) por projeto e mural reverso das ultimas avaliacoes.
- Trilhas e Tarefas: cards de trilha (Back-End, Front-End, Soft Skills, Carreira) e filtro de tarefas por area com estado de carregamento.
- Paginas institucionais: Home, Sobre, Contato, FAQ, Integrantes e navegacao para as secoes principais.

## Requisitos da Global Solutions Cumpridos
- Stack obrigatoria: SPA modular em React + Vite + TypeScript, roteamento completo com rotas estaticas e dinamicas, tipagem de dominio e integracao de APIs com backend Java hospedado remotamente.
- Deploy e acesso: aplicacao preparada para Vercel consumindo a URL da API remota; README destaca o link da aplicacao, do repositorio e orientacoes de entrega em ZIP sem node_modules.
- Versionamento: Git/GitHub/GitFlow em uso, commits frequentes por integrante, branch main obrigatoria e historico preservado para avaliacao.
- Regras de implementacao: uso de utilitarios Tailwind; paginas obrigatorias (Home, Integrantes, Sobre/About, FAQ ou Contato) presentes; pagina de integrantes com nome, foto, RM, turma e links de GitHub e LinkedIn.
- Documentacao: README em Markdown cobrindo titulo/descricao, status, sumario, tecnologias, instalacao, como usar (com URL da aplicacao), estrutura de pastas, rotas/endpoints principais, autores/creditos, screenshots/video e contatos.

## Tecnologias Utilizadas
- React 19 + TypeScript: base da SPA, com tipagens de dominio (Usuario, Projeto, Tarefa, Mensagem, Avaliacao, Colaboracao).
- Vite + @vitejs/plugin-react: ambiente rapido de desenvolvimento e build.
- React Router DOM 7: roteamento declarativo e navegacao SPA.
- Context API: controle de sessao e compartilhamento de usuario logado.
- Context API de Tema: alterna entre claro/escuro com `prefers-color-scheme` como fallback inicial.
- Tailwind CSS 4 (@tailwindcss/vite) + utilitarios customizados: tema, responsividade e efeitos visuais.
- React Icons: icones vetoriais para cards e navegacao.
- Fetch API: consumo direto do back-end (`VITE_URL_BASE=https://globalsolution2sem.onrender.com`).

## Instalacao
1. Clone o repositorio e acesse a pasta `Connect-Tallents`.
2. Crie o arquivo `.env` com `VITE_URL_BASE=https://globalsolution2sem.onrender.com` (ou a URL da sua API Java publicada).
3. Instale as dependencias: `npm install`.
4. Para build: `npm run build`.

## Como Usar
- Ambiente local: `npm run dev` e acesse `http://localhost:5173`.
- Ambiente publicado: https://connect-tallents.vercel.app/ (consumindo a API remota).
- Troque o tema no cabecalho (claro/escuro) e navegue pelos cards/rotas do menu.

## Integracao com Back-End
- API Java publicada no Render fornecendo endpoints para usuarios, projetos, tarefas, mensagens, colaboracoes e avaliacoes.
- Servicos em `src/services/api.ts` e `src/services/endpoint.ts` centralizam chamadas `GET`, `POST`, `PUT` e `DELETE`, reutilizadas nos fluxos de feed, projetos, avaliacoes e perfil.

## Estrutura do Projeto
```
Connect-Tallents/
- public/
- src/
  - assets/           # Imagens e icones
  - components/       # Componentes reutilizaveis (cards, barras laterais, modais, loaders)
  - context/          # Contexto de autenticacao e tema
  - data/             # Dados estaticos (integrantes)
  - pages/            # Paginas da aplicacao (Home, Global, Colaboracao, Experiencia, Preparacao, etc.)
  - routes/           # Definicao de rotas (SPA)
  - services/         # Integracao com API e endpoints
  - types/            # Tipagens de dominio
  - App.tsx           # Layout principal (cabecalho, conteudo, rodape)
  - global.css        # Tema, utilitarios e responsividade
  - main.tsx          # Entrada da aplicacao + providers
- package.json
- vite.config.ts
```

## Rotas Principais
- `/` pagina inicial
- `/integrantes`
- `/sobre`
- `/contato`
- `/faq`
- `/global`
- `/colaboracao`
- `/preparacao`
- `/experiencia`
- `/projeto/:id` (detalhe dinamico)
- `/login`
- `/cadastro`
- `/perfil`

## Endpoints da API
- `GET /usuarios`, `POST /usuarios`, `PUT /usuarios/:id`
- `GET /projetos`
- `GET /tarefas`
- `GET /mensagens`, `POST /mensagens`, `DELETE /mensagens/:id`
- `GET /colaboracoes`, `POST /colaboracoes`
- `GET /avaliacoes`, `POST /avaliacoes`

## Integrantes (Autores e Creditos)
- Joao Victor Gomes de Souza / RM-560907 / TURMA - 1TDSPW — [LinkedIn](https://www.linkedin.com/in/joao-victor-gomes-de-souza-419432324/) | [GitHub](https://github.com/Jounaxis)
- Lucas Barranha Giannini / RM-564508 / TURMA - 1TDSPW — [LinkedIn](https://www.linkedin.com/in/lucas-giannini-67832b2b4/) | [GitHub](https://github.com/Lucas06-ux)
- Miguel Henrique de Oliveira Dias / RM-565492 / TURMA - 1TDSPW — [LinkedIn](https://www.linkedin.com/in/miguel-oliveira-dias-59b605322/) | [GitHub](https://github.com/Maigol123)

## Screenshots / Demo
- Video de apresentacao (ate 3 minutos): [Connect-Tallents-Video]()
- Link do Repositorio Git: [Connect-Tallents-Projeto](https://github.com/ConnectTallents/Front)
- Link do Deploy no Vercel: [Connect-Tallents-Deploy](https://connect-tallents.vercel.app/)

