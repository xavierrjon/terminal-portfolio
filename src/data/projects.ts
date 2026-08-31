import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "ecomida",
    name: "EcoMida",
    tagline: "Gerenciamento inteligente de alimentos domésticos.",
    description:
      "Sistema web de gerenciamento de alimentos em ambiente doméstico.",
    problem:
      "Muitas pessoas perdem alimentos por não acompanharem o que têm em casa e as datas de validade, gerando desperdício.",
    solution:
      "Aplicação web que ajuda a registrar e controlar os alimentos do lar, rastreando validade e consumo.",
    technologies: ["Javascript", "Python", "SQLite"],
    features: [
      "Cadastro de alimentos",
      "Controle de validade",
      "Organização por categoria",
      "Visão geral do estoque doméstico",
    ],
    image: "/images/ecomida.png",
    githubUrl: "https://github.com/xavierrjon/ecomida-web",
    status: "completed",
    emoji: "🥫",
  },
  {
    id: "binomiallab",
    name: "BinomialLab",
    tagline: "Laboratório de aprendizagem de Distribuição Binomial.",
    description: "Laboratório de aprendizagem de Distribuição Binomial.",
    problem:
      "O conceito de Distribuição Binomial costuma ser abstrato e difícil de visualizar para estudantes de estatística.",
    solution:
      "Ferramenta interativa que permite explorar e visualizar a Distribuição Binomial de forma prática.",
    technologies: ["React", "TypeScript", "TailwindCSS"],
    features: [
      "Visualização interativa",
      "Exploração de parâmetros",
      "Apoio ao aprendizado",
    ],
    image: "/images/binomiallab-foto.png",
    githubUrl: "https://github.com/xavierrjon/binomial-lab",
    liveUrl: "https://binomial-lab.netlify.app/",
    status: "completed",
    emoji: "📊",
  },
  {
    id: "weathernow",
    name: "WeatherNow",
    tagline: "Aplicação de previsão do tempo com dados em tempo real.",
    description: "Aplicação de previsão do tempo com dados em tempo real.",
    problem: "Acompanhar a previsão do tempo de forma rápida e objetiva.",
    solution:
      "Aplicação que consome uma API de clima e exibe as condições atuais de forma clara.",
    technologies: ["React", "Vite", "Sass"],
    features: [
      "Previsão em tempo real",
      "Dados de clima atuais",
      "Interface responsiva",
    ],
    image: "/images/weather-now.png",
    githubUrl: "https://github.com/xavierrjon/weather-now-web",
    liveUrl: "https://weather-now-jsx.netlify.app/",
    status: "completed",
    emoji: "🌦️",
  },
  {
    id: "moviesapp",
    name: "MoviesApp",
    tagline: "Sistema de listagem de filmes com TMDB.",
    description: "Sistema de listagem de filmes com TMDB.",
    problem: "Explorar e organizar informações de filmes de forma prática.",
    solution:
      "Sistema que consome a API do TMDB para listar e detalhar filmes.",
    technologies: ["React", "Next.js", "TypeScript", "Sass"],
    features: [
      "Listagem de filmes",
      "Integração com TMDB",
      "Detalhes dos títulos",
    ],
    image: "/images/moviesapp-foto.png",
    githubUrl: "https://github.com/xavierrjon/list-movies-web",
    status: "completed",
    emoji: "🎬",
  },
  {
    id: "buscador-albuns",
    name: "Buscador de Álbum",
    tagline: "Sistema de busca de álbuns com a API do iTunes.",
    description: "Sistema de busca de álbuns com integração com a API do iTunes.",
    problem: "Encontrar álbuns e suas informações de forma ágil.",
    solution: "Buscador que consulta a API do iTunes e lista os álbuns.",
    technologies: ["React", "Next.js", "TailwindCSS"],
    features: ["Busca de álbuns", "Integração com iTunes", "Resultados em grade"],
    image: "/images/buscador-albuns-foto.png",
    githubUrl: "https://github.com/xavierrjon/buscador-albuns.git",
    liveUrl: "https://buscador-albuns.netlify.app/",
    status: "completed",
    emoji: "💿",
  },
];
