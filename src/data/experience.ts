export type Experience = {
  title: string;
  org: string;
  period: string;
  type: "academic" | "program" | "project" | "volunteer";
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    title: "Estudante de Engenharia de Software",
    org: "UFAM — Universidade Federal do Amazonas",
    period: "Atualmente",
    type: "academic",
    description:
      "Formação em Engenharia de Software, com foco em desenvolvimento de sistemas e boas práticas de engenharia.",
    highlights: [
      "Base sólida em algoritmos, estrutura de dados e engenharia de requisitos",
      "Projetos práticos ao longo da formação",
    ],
  },
  {
    title: "Participante do WebAcademy",
    org: "ICOMP em parceria com a Motorola",
    period: "Atualmente",
    type: "program",
    description:
      "Programa de capacitação em desenvolvimento web full-stack, promovido pelo ICOMP em parceria com a Motorola.",
    highlights: [
      "Capacitação prática em frontend, backend e banco de dados",
      "Desenvolvimento de projetos reais de aplicações web",
    ],
  },
  {
    title: "Desenvolvedor — Portfólio e Projetos Pessoais",
    org: "Desenvolvimento Front-end & UI/UX",
    period: "Em andamento",
    type: "project",
    description:
      "Construção de aplicações web próprias, explorando desde a interface até a implementação.",
    highlights: [
      "EcoMida, BinomialLab, WeatherNow e outros projetos",
      "Experiência com React, Next.js, TypeScript e Tailwind CSS",
    ],
  },
];
