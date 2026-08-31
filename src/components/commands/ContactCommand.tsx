import { profile } from "@/data/profile";

export default function ContactCommand() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-accent">Vamos conversar?</p>

      <div className="flex flex-col gap-2">
        <div className="text-sm">
          <span className="w-24 inline-block text-muted-foreground">GitHub</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 hover:brightness-110"
          >
            → github.com/xavierrjon
          </a>
        </div>

        <div className="text-sm">
          <span className="w-24 inline-block text-muted-foreground">LinkedIn</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 hover:brightness-110"
          >
            → linkedin.com/in/johnny-xavier
          </a>
        </div>

        <div className="text-sm">
          <span className="w-24 inline-block text-muted-foreground">Email</span>
          <a
            href={`mailto:${profile.email}`}
            className="text-accent underline underline-offset-4 hover:brightness-110"
          >
            → xavier.johnnysilva@gmail.com
          </a>
        </div>
      </div>

      <div className="mt-1 border-t border-border pt-3 text-sm">
        <p className="text-foreground"># dica: os links abrem em nova aba.</p>
        <p className="text-muted-foreground">
          Respondo rápido e estou aberto a novas oportunidades. 😉
        </p>
      </div>
    </div>
  );
}
