# Teste Econverse — Front-End Jr

Página de e-commerce desenvolvida em **React + TypeScript + Sass**, seguindo o layout do teste
(Home + modal do produto), sem bibliotecas de UI.

## Tecnologias

- [Vite](https://vitejs.dev/) + React 18 + TypeScript (modo `strict`)
- Sass (SCSS) com variáveis, mixins e um arquivo de estilo por componente
- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`) e boas práticas de SEO
  (`title`, `meta description`, Open Graph, um único `h1`, `alt` nas imagens, `lang="pt-BR"`)

## Pré-requisitos

- Node.js 18+ e npm

## Como rodar

```bash
# 1. instalar dependências
npm install

# 2. servidor de desenvolvimento (http://localhost:5173)
npm run dev

# 3. checar tipos
npm run typecheck

# 4. build de produção (gera a pasta dist/)
npm run build

# 5. visualizar o build localmente
npm run preview
```

## Funcionalidades

- **Vitrine de produtos** consumindo o JSON da API do teste
  (`https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`),
  com carrossel horizontal (scroll-snap + setas).
- **Modal do produto** ao clicar no card/botão "Comprar": foto, nome, preço, descrição,
  seletor de quantidade e botão de compra. Fecha com o **X**, **ESC** ou clicando fora;
  trava o scroll do fundo, move o foco para o modal e o devolve ao fechar (`role="dialog"`, `aria-modal`).
- Categorias e abas de filtro selecionáveis, newsletter com validação básica, layout responsivo.

## Estrutura

```
src/
├── assets/img/            # imagens usadas na página
├── components/
│   ├── Header/  Hero/  Categories/  PartnerBanners/  Brands/  Newsletter/  Footer/
│   ├── ProductShowcase/   # vitrine (carrossel) + ProductCard
│   ├── ProductModal/      # modal do produto
│   └── Icons.tsx          # ícones SVG inline
├── hooks/useProducts.ts   # busca os produtos e controla loading/erro
├── services/productService.ts  # fetch + normalização do JSON
├── types/product.ts       # tipo Product
├── utils/format.ts        # formatação de moeda (pt-BR)
├── data/fallbackProducts.ts    # dados locais usados se a API falhar
└── styles/                # variáveis, mixins e estilos globais
```

## Decisões e observações

- **Normalização do JSON**: `productService.ts` converte o retorno da API (`productName`,
  `descriptionShort`, `photo`, `price`) para o tipo `Product`, aceitando também array puro
  ou nomes alternativos de campo.
- **Fallback**: se a API estiver fora do ar/sem internet, a vitrine usa dados locais
  (aviso no console) para a página continuar funcionando.
- **Preço "de" e parcelamento**: o layout mostra preço riscado, "ou 2x de …" e "Frete grátis".
  Como o JSON traz só o preço atual, o preço riscado (+10%) e a parcela (÷2) são calculados
  em `ProductCard.tsx` apenas para reproduzir o layout.
- **Imagens**: banner, parceiros e ícones de categoria foram recortados do PNG do layout;
  os ícones do header/rodapé são SVGs próprios, aproximando os do Figma.
