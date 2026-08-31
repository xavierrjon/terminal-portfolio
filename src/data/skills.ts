export type Skill = {
  name: string;
  level: number; // 0-100, representação visual apenas
};

export type SkillCategory = {
  title: string;
  icon: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "Python", level: 70 },
    ],
  },
  {
    title: "Banco de dados",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: 70 },
      { name: "MySQL", level: 65 },
      { name: "SQLite", level: 70 },
      { name: "Prisma", level: 65 },
    ],
  },
  {
    title: "Ferramentas",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 80 },
      { name: "Docker", level: 65 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 80 },
    ],
  },
];

export const areas = [
  "Engenharia de Software",
  "Desenvolvimento Full-Stack",
  "Desenvolvimento Front-end",
  "UI/UX Design",
  "Prototipação e Wireframing",
];
