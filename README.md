# Kepoweb Technical Premium Boilerplate

Boilerplate de altíssima performance para sites institucionais e landing pages, projetado para Next.js 15 App Router e Tailwind CSS V4.

## Arquitetura e Decisões
- **Design Tokens Flexíveis:** Baseados no Tailwind V4 (`@theme`), mapeados com variáveis CSS reais em `src/app/globals.css` para alterar as cores de UI instântaneamente por cliente.
- **Server Components Otimizados:** Utilizam runtime do Node (`output: standalone`) garantindo a melhor performance e Image optimization sem exportações estáticas capadas.
- **Rastreamento com Consent Mode (LGPD):** GTM/Analytics aguarda a camada Context (`acceptAll()`) do Tracking Provider.
- **UTM Persistence (Traffic Attribution):** O Hook na raiz detecta URLs da campanhas e injeta os trackers diretamente na carga do formulário.

## O que está incluso
- ✅ **Base SEO Pronta:** Layout dinâmico auxiliado pelo `metadata.ts`, OpenGraph e geração dinâmica via `sitemap.ts` / `robots.ts`.
- ✅ **Schema Markup:** Componente JSON-LD nativo embutido em `schema-markup.tsx`.
- ✅ **Seções Escaláveis:** Design system agnóstico usando Container padronizado.

## Geração de Sitemap vs Google Search Console
A indexação oficial do BOILERPLATE ocorre 100% aderente ao Google Search Console:
> **Atenção:** Como o Google descontinuou a API clássica de `ping` de Sitemap, nós não usaremos ping antigo. Nossa arquitetura expõe um `/sitemap.xml` dinâmico que propaga a propriedade ISO 8601 de `lastmod` fiel ao momento da compilação.
> O cadastro deve ocorrer manualmente uma única vez no Google Search Console de cada cliente, apontando para este sitemap.

## Como Clonar e Rodar
1. Crie o novo repositório derivado deste.
2. Rode `npm install`.
3. Edite as variáveis `:root` em `src/app/globals.css` e o Logo no Header.
4. Adicione `.env.local` com `NEXT_PUBLIC_SITE_URL`.
5. Substitua os disparadores no arquivo de Tracking Provider pelo ID Oficial do cliente.
6. Rode `npm run dev` para testes locais e `npm run build` para build de compilação.

## Deploy (Agóstico)
Este boilerplate foi desacoplado de exclusividade de host e possui suporte nativo sem configurações extras (zero-config) para os líderes de mercado:

### Vercel (Ready)
A Vercel aplica as otimizações e detecta automaticamente a build `output: standalone` (se configurada) e cache behaviors de Next.js App Router (Sem necessidade de `vercel.json`).
- Configure a variável `SITE_URL` e `NEXT_PUBLIC_SITE_URL` no painel Vercel Environment Variables.
- A pipeline de Sitemap Action no Github responde à trigger de ambiente com nome `Production`.

### Netlify (Ready)
O Netlify usa a arquitetura Runtime v5 para projetos Next.js > 13.5 e lida perfeitamente com Next.js SSR automático (Sem necessidade de `netlify.toml`).
- Configure a variável `SITE_URL` e `NEXT_PUBLIC_SITE_URL` no painel em Site settings > Environment variables.
- A pipeline de Sitemap Action no Github responde à trigger de ambiente com nome `production`.
