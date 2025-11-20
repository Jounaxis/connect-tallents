import { Link } from "react-router-dom";
import BackgroundNeon from "../../components/Background/Background";

type FAQItem = {
  pergunta: string;
  resposta: string;
};

type FAQBloco = {
  titulo: string;
  tag: string;
  descricao: string;
  perguntas: FAQItem[];
};

const blocos: FAQBloco[] = [
  {
    titulo: "Conta e acesso",
    tag: "Autenticacao",
    descricao: "Cadastro, login e uso do tema claro/escuro.",
    perguntas: [
      {
        pergunta: "Como crio minha conta?",
        resposta:
          "Acesse Cadastro e preencha nome, email, pais, idioma, tipo de usuario e habilidade. Os dados sao enviados para a API e voce ja pode fazer login.",
      },
      {
        pergunta: "Preciso de senha para entrar?",
        resposta:
          "O login busca seu email cadastrado na API. Basta informar o mesmo email usado no cadastro; os dados do usuario ficam salvos no localStorage apos autenticar.",
      },
      {
        pergunta: "O tema claro/escuro afeta minha conta?",
        resposta:
          "Nao. O tema e salvo localmente e pode ser alternado pelo botao no cabecalho sem impactar seus dados.",
      },
    ],
  },
  {
    titulo: "Feed Global",
    tag: "Social",
    descricao: "Posts, exclusao e carregamento de conteudo.",
    perguntas: [
      {
        pergunta: "Preciso estar logado para postar?",
        resposta:
          "Sim. Apenas usuarios autenticados podem criar ou excluir posts. O feed publico carrega posts existentes mesmo para visitantes.",
      },
      {
        pergunta: "Como excluir um post meu?",
        resposta:
          "Clique em Excluir no card do post. A acao envia um DELETE para o endpoint de mensagens e remove o item da lista local.",
      },
      {
        pergunta: "Por que vejo skeletons no feed?",
        resposta:
          "Enquanto buscamos usuarios e mensagens na API, exibimos placeholders para evitar saltos de layout e sinalizar carregamento.",
      },
    ],
  },
  {
    titulo: "Projetos e colaboracao",
    tag: "Projetos",
    descricao: "Detalhes, tarefas e combinacao com colaboradores.",
    perguntas: [
      {
        pergunta: "Como ver detalhes de um projeto?",
        resposta:
          "Na lista de Projetos Colaborativos, clique em Ver detalhes. Um modal mostra o autor, a colaboracao associada e as tarefas filtradas pelo projeto.",
      },
      {
        pergunta: "Consigo mapear quem participa de cada projeto?",
        resposta:
          "Sim. As colunas exibem o usuario dono do projeto e a colaboracao vinculada, alimentadas pelos endpoints de usuarios e colaboracoes.",
      },
      {
        pergunta: "As tarefas sao filtradas por projeto?",
        resposta:
          "Dentro do modal carregamos as tarefas e filtramos por codigo do projeto para exibir apenas atividades relevantes.",
      },
    ],
  },
  {
    titulo: "Preparacao e trilhas",
    tag: "Carreira",
    descricao: "Trilhas sugeridas e tarefas por area.",
    perguntas: [
      {
        pergunta: "Quais trilhas estao disponiveis?",
        resposta:
          "Exibimos quatro trilhas fixas: Back-End, Front-End, Soft Skills e Carreira, com foco em preparacao pratica.",
      },
      {
        pergunta: "Como filtramos tarefas?",
        resposta:
          "O filtro superior ajusta a lista pelo campo area das tarefas retornadas pela API (ou mostra todas quando selecionado Todas).",
      },
      {
        pergunta: "Existe indicacao de carregamento?",
        resposta:
          "Sim. Enquanto as tarefas da API sao buscadas, exibimos skeletons dedicados para manter consistencia visual.",
      },
    ],
  },
  {
    titulo: "Perfil e dados",
    tag: "Perfil",
    descricao: "Edicao de informacoes e upload de avatar.",
    perguntas: [
      {
        pergunta: "Onde altero meus dados?",
        resposta:
          "Acesse a pagina Perfil. Os campos sao preenchidos com o usuario carregado via endpoint e apos salvar a aplicacao atualiza o contexto de sessao.",
      },
      {
        pergunta: "Posso trocar a foto?",
        resposta:
          "Sim. Selecione um arquivo de imagem; o preview aparece imediatamente e e enviado junto na atualizacao do usuario.",
      },
      {
        pergunta: "E se eu sair da conta?",
        resposta:
          "O botao de sair limpa o usuario do contexto e do localStorage. Os dados continuam na API para novos logins.",
      },
    ],
  },
  {
    titulo: "Suporte e integracoes",
    tag: "Suporte",
    descricao: "Ajuda rapida e integracao com a API Java.",
    perguntas: [
      {
        pergunta: "A API esta fora do ar, o que fazer?",
        resposta:
          "Confirme a variavel VITE_URL_BASE no .env e se o servico Java no Render esta online. Sem a API, listas e autenticacao podem falhar.",
      },
      {
        pergunta: "Como falo com o time?",
        resposta:
          "Use a pagina Contato para enviar mensagem ou consulte Integrantes para acessar GitHub e LinkedIn de cada membro.",
      },
      {
        pergunta: "O deploy precisa de algo especial?",
        resposta:
          "O README lista o link de producao na Vercel e o link do repositorio. Suba o projeto sem node_modules e mantenha o historico Git.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <main className="faq-container">
      <BackgroundNeon />

      <header className="faq-header">
        <span className="faq-chip">FAQ</span>
        <h1 className="faq-title">Perguntas frequentes</h1>
        <p className="faq-subtitle">
          Dicas rapidas sobre acesso, feed, projetos, preparacao e suporte para a Connect Tallents.
        </p>
      </header>

      <section className="faq-grid">
        {blocos.map((bloco) => (
          <article key={bloco.titulo} className="faq-card">
            <div className="faq-card-top">
              <span className="faq-tag">{bloco.tag}</span>
              <h3>{bloco.titulo}</h3>
              <p>{bloco.descricao}</p>
            </div>

            <div className="faq-lista">
              {bloco.perguntas.map((qa) => (
                <div key={qa.pergunta} className="faq-item">
                  <p className="faq-pergunta">{qa.pergunta}</p>
                  <p className="faq-resposta">{qa.resposta}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="faq-cta">
        <div className="faq-cta-card">
          <div>
            <p className="faq-cta-title">Ainda ficou com duvida?</p>
            <p className="faq-cta-desc">
              Fale conosco pela pagina de Contato ou conheca a equipe em Integrantes.
            </p>
          </div>
          <div className="faq-cta-actions">
            <Link to="/contato" className="faq-cta-button">
              Contato
            </Link>
            <Link to="/integrantes" className="faq-cta-link">
              Ver integrantes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
