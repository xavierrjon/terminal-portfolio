import { profile } from "@/data/profile";

export default function AboutCommand() {
  return (
    <div className="flex flex-col gap-3 leading-relaxed">
      <p className="text-accent">Olá, eu sou Johnny Xavier.</p>
      <p>
        Sou estudante de <span className="text-accent">Engenharia de Software</span>{" "}
        e desenvolvedor interessado em criar experiências digitais bonitas,
        funcionais e bem construídas.
      </p>
      <p>
        Meu principal foco é <span className="text-accent">frontend</span>,{" "}
        <span className="text-accent">UI/UX</span> e desenvolvimento de
        aplicações web, mas também trabalho com backend, bancos de dados e
        ferramentas de desenvolvimento.
      </p>
      <p>
        Participo do <span className="text-accent">WebAcademy</span>, programa de
        capacitação em desenvolvimento web full-stack promovido pelo{" "}
        <span className="text-accent">ICOMP</span> em parceria com a{" "}
        <span className="text-accent">Motorola</span>. Atualmente estou
        construindo projetos, estudando novas tecnologias e buscando transformar
        ideias em produtos reais.
      </p>
      <p className="text-muted-foreground">
        # formação: {profile.education}
      </p>
    </div>
  );
}
