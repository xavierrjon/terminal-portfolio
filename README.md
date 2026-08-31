# Portfólio Terminal — Johnny Xavier

Portfólio web com estética de **terminal moderno interativo** (inspirado em Claude Code e OpenCode). Em vez de navegação tradicional, o visitante explora todo o conteúdo digitando comandos.

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
| `/limpar` | Limpar terminal |

Também há aliases em inglês (`/about`, `/skills`, `/projects`, `/contact`, `/resume`, `/help`), comandos tradicionais (`ls`, `pwd`, `whoami`, `help`, `clear`) e alguns easter eggs (`/coffee`, `/sudo`, `/42`...).

## Temas

`/tema` permite alternar entre **Midnight**, **Dracula**, **Nord**, **Amber** e **Matrix**. A escolha é salva no seu navegador.

## Tecnologias

- React
- Next.js
- TypeScript
- Tailwind CSS

Acesse em: [https://johnny-xavier.vercel.app](https://johnny-xavier.vercel.app)
