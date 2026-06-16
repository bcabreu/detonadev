export const siteConfig = {
  name: 'DetonaDev',
  title: 'DetonaDev Cyber Lab',
  description:
    'Estudos práticos de cibersegurança, Linux, redes, SSH, firewall, logs, SOC e segurança da informação documentados por Bruno Abreu.',
  url: 'https://detonadev.com',
  locale: 'pt-BR',

  author: {
    name: 'Bruno Abreu',
    role: 'Graduado em Sistemas de Informação e Economia — Em transição para Cibersegurança',
    email: 'contato@detonadev.com',
    linkedin: 'https://www.linkedin.com/in/bcabreu',
    github: '', // Manter vazio para esconder o link na UI
    resumeUrl: '/curriculo.pdf', // Adicione o caminho do PDF ou link do drive para habilitar o botão "Currículo"
  },

  nav: [
    { label: 'Início', href: '/' },
    { label: 'Lab', href: '/lab' },
    { label: 'Artigos', href: '/artigos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ],
} as const;
