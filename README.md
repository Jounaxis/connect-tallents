# Connect Tallents - Hub Global de Talentos

Conecte talentos de diferentes paises em uma unica interface. Esta entrega da Global Solution de Front-End foi construida como uma SPA em React para conectar profissionais, mentores e equipes a oportunidades de colaboracao, trocas de experiencia e preparacao para o mercado internacional.

## Funcionalidades
- Autenticacao e perfil: cadastro, login por e-mail, persistencia no `localStorage`, edicao completa do perfil e upload de avatar.
- Feed Global: criacao e exclusao de posts (quando autenticado), timeline com usuarios, tendencias e skeletons de carregamento.
- Projetos Colaborativos: listagem de projetos com autor e time, modal de detalhes com tarefas do projeto e associacao a colaboradores.
- Experiencias e Avaliacoes: envio de avaliacoes (nota/comentario) por projeto e mural reverso das ultimas avaliacoes.
- Trilhas e Tarefas: cards de trilha (Back-End, Front-End, Soft Skills, Carreira) e filtro de tarefas por area com estado de carregamento.
- Paginas institucionais: Home, Sobre, Contato, FAQ, Integrantes e navegacao para as secoes principais.

## Requisitos da Global Solutions Cumpridos
- Front-End Design Engineering: SPA modular em React + Vite + TypeScript, roteamento completo com rotas estaticas e dinamicas, tipagem de dominio e integracao de APIs com backend Java hospedado remotamente.
- Deploy e acesso: aplicacao preparada para Vercel consumindo a URL da API remota; README destaca o link da aplicacao, do repositorio e orientacoes de entrega em ZIP sem node_modules.
- Versionamento: Git/GitHub/GitFlow em uso, commits frequentes por integrante, branch main obrigatoria e historico preservado para avaliacao.
- Regras de implementacao: uso exclusivo de TailwindCSS para estilos; proibicao de frameworks extras; paginas obrigatorias (Home, Integrantes, Sobre/About, FAQ ou Contato) presentes; pagina de integrantes com nome, foto, RM, turma e links de GitHub e LinkedIn.
- Documentacao: README em Markdown cobrindo titulo/descricao, status, sumario, sobre, tecnologias, instalacao, como usar (com URL da aplicacao), estrutura de pastas, rotas/endpoints principais, autores/creditos, screenshots/video e contatos.
- Criterios de avaliacao atendidos:
  - Construcao do projeto (20 pts): rotas estaticas e dinamicas bem tipadas, navegacao fluida e redirecionamentos com feedback.
  - Estilizacao e responsividade (35 pts): layout Tailwind responsivo para XS/SM/MD/LG/XL; tema claro/escuro via Context API conforme regra do trabalho.
  - Deploy na Vercel (10 pts): URL funcional divulgada em README.
  - Integracao de APIs (20 pts): consumo de endpoints com GET/POST/PUT/DELETE, tratamento de dados e erros.
  - Versionamento (10 pts): repositorio GitHub com commits, tags e participacao do time.
  - README (10 pts) e Video (5 pts): arquivo completo com links e apresentacao em ate 3 minutos.
- Penalidades evitadas: entrega segue stack obrigatoria (Vite+TS), inclui paginas requeridas e links, evita CSS puro, arquivos pesados e frameworks proibidos.

## Tecnologias Utilizadas
- React 19 + TypeScript: base da SPA, com tipagem para dominios (Usuario, Projeto, Tarefa, Mensagem, Avaliacao, Colaboracao).
- Vite + @vitejs/plugin-react: ambiente rapido de desenvolvimento e build.
- React Router DOM 7: roteamento declarativo e navegacao SPA.
- Context API: controle de sessao e compartilhamento de usuario logado.
- Tailwind CSS 4 (@tailwindcss/vite) + CSS utilitario: tema, responsividade e efeitos visuais.
- React Icons: icones vetoriais para cards e navegacao.
- Fetch API: consumo direto do back-end (`VITE_URL_BASE=https://globalsolution2sem.onrender.com`).

## Como Executar o Projeto (modo local)
1. Clone o repositorio e acesse a pasta `Connect-Tallents`.
2. Garanta o `.env` com `VITE_URL_BASE=https://globalsolution2sem.onrender.com` (ou a URL da sua API).
3. Instale as dependencias: `npm install`.
4. Rode o servidor de desenvolvimento: `npm run dev` e acesse `http://localhost:5173`.

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
  - context/          # Contexto de autenticacao
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

## Integrantes
- Joao Victor Gomes de Souza / RM-560907 / TURMA - 1TDSPW
- Lucas Barranha Giannini / RM-564508 / TURMA - 1TDSPW
- Miguel Henrique de Oliveira Dias / RM-565492 / TURMA - 1TDSPW

## Visualização

- Link do Repositório Git: [Connect-Tallents-Projeto](https://github.com/ConnectTallents/Front)
- Link do Deploy no Vercel: [Connect-Tallents-Deploy](https://connect-tallents.vercel.app/)
- Link do Video apresentando o Projeto: [Connect-Tallents-Video]()