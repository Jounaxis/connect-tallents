import { Link } from "react-router-dom";
import BackgroundNeon from "../../components/Background/Background";

type FAQItem = {
  pergunta: string;
  resposta: string;
};

type FAQBloco = {
  titulo: string;
  perguntas: FAQItem[];
};

const blocos: FAQBloco[] = [
  {
    titulo: "Conta e acesso",
    perguntas: [
      {
        pergunta: "Como criar uma conta?",
        resposta:
          "Clique em Cadastro, preencha nome e email e escolha seu perfil (Profissional, Estudante ou Empresa). Depois use o mesmo email para entrar.",
      },
      {
        pergunta: "Preciso de senha?",
        resposta:
          "Hoje o acesso é feito pelo email cadastrado. Após entrar, seus dados ficam salvos localmente para agilizar o próximo acesso.",
      },
      {
        pergunta: "Posso trocar a foto e dados?",
        resposta:
          "Sim. Na página Perfil você edita nome, email, país, idioma, tipo de usuário e envia uma nova foto. Salve para atualizar.",
      },
    ],
  },
  {
    titulo: "Feed e publicações",
    perguntas: [
      {
        pergunta: "O que é o feed Global?",
        resposta:
          "É a área pública de posts. Você vê conteúdo de outros usuários e, se estiver logado, pode publicar e excluir seus próprios posts.",
      },
      {
        pergunta: "Como faço uma publicação?",
        resposta:
          "Entre no site, acesse o feed Global e use o campo de texto para postar. Somente usuários logados podem publicar.",
      },
      {
        pergunta: "Consigo apagar um post meu?",
        resposta:
          "Sim. Seus posts mostram o botão de excluir. Ao confirmar, a publicação sai do feed.",
      },
    ],
  },
  {
    titulo: "Projetos colaborativos",
    perguntas: [
      {
        pergunta: "Como criar um projeto?",
        resposta:
          "No menu Colaboração, use o card “Crie um novo projeto”. Informe o nome do projeto e salve. Ele aparece no topo da lista.",
      },
      {
        pergunta: "O que é Ver Detalhes?",
        resposta:
          "Abre um resumo do projeto com autor e tarefas associadas. Use para entender o que está em andamento.",
      },
      {
        pergunta: "Para que serve Adicionar detalhes?",
        resposta:
          "Permite registrar tarefas do projeto: nome, área, status (Iniciada, Em andamento, Encerrada ou Ativa) e datas. Assim você controla etapas e prazos.",
      },
      {
        pergunta: "Posso excluir um projeto?",
        resposta:
          "Sim, apenas se você for o criador. Primeiro removemos as tarefas ligadas a ele e depois apagamos o projeto.",
      },
    ],
  },
  {
    titulo: "Trilhas e preparação",
    perguntas: [
      {
        pergunta: "O que encontro na área de Preparação?",
        resposta:
          "Quatro trilhas fixas (Back-End, Front-End, Soft Skills e Carreira) com tarefas sugeridas para cada caminho.",
      },
      {
        pergunta: "Como filtro por área?",
        resposta:
          "Use o filtro superior para mostrar apenas tarefas da área escolhida ou deixar em Todas para ver a lista completa.",
      },
    ],
  },
  {
    titulo: "Suporte rápido",
    perguntas: [
      {
        pergunta: "A página não carrega dados, o que faço?",
        resposta:
          "Verifique sua conexão e tente recarregar. Se persistir, pode ser instabilidade do servidor; tente novamente mais tarde.",
      },
      {
        pergunta: "Onde falo com o time?",
        resposta:
          "Use a página Contato para enviar sua mensagem. Você também pode conhecer a equipe em Integrantes.",
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
          Entenda rapidamente como criar conta, publicar no feed, montar projetos e usar as trilhas.
        </p>
      </header>

      <section className="faq-grid">
        {blocos.map((bloco) => (
          <article key={bloco.titulo} className="faq-card">
            <div className="faq-card-top">
              <h3>{bloco.titulo}</h3>
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
            <p className="faq-cta-title">Ainda ficou com dúvida?</p>
            <p className="faq-cta-desc">
              Fale conosco pela página de Contato ou conheça a equipe em Integrantes.
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
