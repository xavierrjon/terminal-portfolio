# Portfólio Terminal — Johnny Xavier

Portfólio web com estética de **terminal moderno interativo** (inspirado em Claude Code). Em vez de navegação tradicional, o visitante explora todo o conteúdo digitando comandos. Foi feito por diversão, para juntar dois interesses: programação e interfaces com cara de terminal.

## Como funciona

Ao entrar, uma breve **boot sequence** carrega, seguida de uma saudação:

```text
johnny@portfolio:~$

Olá, eu sou Johnny Xavier.
Engenheiro de Software em formação
Frontend • UI/UX • Full Stack

Digite "/" para explorar.
```

Digite `/` para ver os comandos disponíveis e navegue com teclado (Tab para autocompletar, setas ↑/↓ para histórico).

## Comandos

| Comando | Descrição |
| --- | --- |
| `/ajuda` | Mostra todos os comandos |
| `/sobre` | Sobre mim |
| `/habilidades` | Tecnologias e conhecimentos (com barras) |
| `/projetos` | Lista de projetos |
| `/projetos/nome` | Detalhes de um projeto |
| `/experiencia` | Experiências |
| `/contato` | Formas de contato |
| `/curriculo` | Currículo resumido |
| `/neofetch` | Informações do perfil (ASCII art) |
| `/tema` | Alternar tema |
| `/clear` | Limpar terminal |

Também há comandos tradicionais (`ls`, `pwd`, `whoami`, `help`, `clear`) e alguns easter eggs (`/coffee`, `/sudo`, `/hello`).

## Temas

`/tema` permite alternar entre **Midnight**, **Dracula**, **Nord**, **Amber** e **Matrix**. A escolha é salva no seu navegador.

## Tecnologias

- React
- Next.js
- TypeScript
- Tailwind CSS

Acesse em: [portfolio-bash-jsx.netlify.app](portfolio-bash-jsx.netlify.app)