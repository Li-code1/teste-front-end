# Teste Econverse: Front-End Jr

Página de e-commerce desenvolvida em **React + TypeScript + Sass**, seguindo o layout do teste
(Home + modal do produto), sem bibliotecas de UI.

## Demonstração online

Acesse a página publicada na Vercel: **[teste-front-end-khaki.vercel.app](https://teste-front-end-khaki.vercel.app/)**

- A vitrine consome a API do teste por meio de um rewrite configurado no `vercel.json`
  (`/api/produtos`), o mesmo papel do proxy do Vite em desenvolvimento.
- Se a API estiver fora do ar, aparece o aviso "Exibindo produtos de exemplo".
- A página é responsiva: dá para testar em desktop, tablet e celular.

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

# 4. rodar os testes (Vitest + Testing Library)
npm test

# 5. build de produção (gera a pasta dist/)
npm run build

# 6. visualizar o build localmente (usa o mesmo proxy da API do dev)
npm run preview
```

`npm run test:watch` roda os testes em modo contínuo.

## Testes

Os testes ficam ao lado do código que verificam e cobrem comportamento, não só tipos:

- **`productService`**: conversão de preço (`toNumber`, inclusive o formato brasileiro `R$ 1.499,90`),
  `normalize` (valores padrão quando faltam campos) e `fetchProducts` (lista direta, objeto com
  `products`, erro HTTP e uso do caminho `/api/produtos`).
- **`useProducts`**: carrega da API sem fallback e, quando a API falha, usa os dados de exemplo
  e sinaliza `usingFallback`.
- **`ProductModal`**: fecha com ESC, com o X e clicando fora; quantidade mínima 1; foco entra ao
  abrir, circula com Tab/Shift+Tab e volta ao fechar; confirmação ao clicar em Comprar.
- **`ProductCard` e `ProductShowcase`**: nome acessível sem repetição, abas como botões
  alternáveis (`aria-pressed`) e estado de carregamento.
- **`App`**: clicar num produto abre o modal com os dados dele e o aviso aparece só quando a API falha.

## Funcionalidades

- **Vitrine de produtos** consumindo o JSON da API do teste
  (`https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`),
  com carrossel horizontal (scroll-snap + setas).
- **Modal do produto** ao clicar no card ou em "Comprar": foto, nome, preço, descrição,
  seletor de quantidade e botão de compra. Fecha com o **X**, com **ESC** ou clicando fora;
  trava o scroll do fundo, mantém o Tab dentro do modal, move o foco para ele e o devolve ao fechar
  (`role="dialog"`, `aria-modal`). O botão **Comprar** mostra uma confirmação ("N itens adicionados
  ao carrinho") sem fechar o modal.
- Se a API falhar, aparece um **aviso no topo da página** ("Exibindo produtos de exemplo"), então
  dados de exemplo nunca são confundidos com dados reais.
- Newsletter com validação básica e layout responsivo.
- As categorias e as abas da vitrine (Celular, Tablets etc.) mudam apenas o estado visual
  de "selecionado"; **não filtram os produtos**, pois o JSON do teste não traz categoria.

## Estrutura

```
src/
├── assets/img/                  # imagens usadas na página
├── assets/layout/home.png       # frame "Home" do Figma (1x), usado só pelo LayoutOverlay (ative com `?layout` na URL do `npm run dev`, janela em 1440px)
├── test/setup.ts                # limpeza entre os testes
├── components/
│   ├── Header/  Hero/  Categories/  PartnerBanners/  Brands/  Newsletter/  Footer/
│   ├── ProductShowcase/         # vitrine (carrossel) + ProductCard (cada um com seu .scss)
│   ├── ProductModal/            # modal do produto
│   ├── ApiNotice/               # aviso exibido quando a vitrine usa dados de exemplo
│   ├── LayoutOverlay/           # só em dev: sobrepõe o layout do Figma à página
│   └── Icons.tsx                # ícones SVG inline
├── hooks/useProducts.ts         # busca os produtos e controla loading/erro
├── services/productService.ts   # fetch + normalização do JSON
├── types/product.ts             # tipo Product
├── utils/format.ts              # formatação de moeda (pt-BR)
├── data/fallbackProducts.ts     # dados locais usados se a API falhar
└── styles/                      # variáveis, mixins e estilos globais
vite.config.ts                   # proxy da API (dev e preview) + configuração do Vitest
vercel.json                      # rewrite equivalente ao proxy, caso seja publicado na Vercel
.env.example                     # VITE_PRODUCTS_URL (opcional) para trocar o endereço da API
```

## Decisões e observações

- **CORS**: a API do teste não libera acesso direto do navegador. O app sempre chama o caminho
  local `/api/produtos`, e o `vite.config.ts` faz o proxy tanto no `npm run dev` quanto no
  `npm run preview`, então o build local também mostra os produtos reais. Se o site for publicado,
  o proxy do Vite não existe no servidor estático: o `vercel.json` traz o rewrite equivalente para
  a Vercel (em outra hospedagem, é preciso configurar o mesmo rewrite no servidor).
- **Normalização do JSON**: `productService.ts` converte o retorno da API (`productName`,
  `descriptionShort`, `photo`, `price`) para o tipo `Product`.
- **Fallback**: se a API falhar, a vitrine usa dados locais de exemplo para a página continuar
  funcionando, e um aviso visível informa isso (além do `console.warn`).
- **Preço "de" e parcelamento**: o layout mostra preço riscado, "ou 2x de ..." e "Frete grátis".
  Como o JSON traz só o preço atual, o preço riscado (+10%) e a parcela (÷2) são calculados
  em `ProductCard.tsx` apenas para reproduzir o layout.
- **Imagens**: o JSON não traz imagem de hero nem de banner. A foto do hero e a dos banners de
  parceiros foram reconstruídas a partir do PNG do layout (com o texto removido por *inpainting*),
  então podem ter pequenas imperfeições; o ideal é exportar a imagem original direto do Figma
  (PNG 2x) e substituir `hero-bg.jpg` e `partner-bg.jpg`. Os ícones de categoria são recortes do
  layout e os ícones do header e do rodapé são SVGs próprios aproximando os do Figma; o ideal é
  exportá-los do Figma em SVG.
- **Abas e categorias**: não filtram os produtos porque o JSON não traz categoria. Para evoluir:
  receber a categoria na API, guardar a escolhida em estado e derivar a lista exibida com `useMemo`.
- **Links sem destino**: onde o teste não traz a tela (itens do menu, rodapé, redes sociais,
  "Veja mais detalhes"), usei `button` em vez de `<a href="#">`; onde há destino na página
  ("Ofertas do dia", "Ver todos", "Confira"), usei âncora para a vitrine.
- **Acessibilidade**: o botão do card tem o nome do produto uma única vez (imagem decorativa, sem
  `h3` dentro do botão), as abas são botões com `aria-pressed` e o modal mantém o foco preso
  enquanto está aberto.
- **Identificador do produto**: a API não traz `id`, então ele vem da posição na lista.

## Conferência com o layout

Para comparar a página com o desenho em desenvolvimento, o `LayoutOverlay` sobrepõe o frame da
Home do Figma (`src/assets/layout/home.png`) com um controle de opacidade (canto inferior direito).
Ele só é carregado em `npm run dev` e **não entra no build de produção** (dá para apagar a pasta
`LayoutOverlay` e o `home.png` sem afetar o app). Use a janela em 1440px de largura e abra `http://localhost:5173/?layout`; sem `?layout` a sobreposição fica desligada.

Conferência feita com capturas do Chromium em 1440px contra o `Home.png`/`Popup.png`: a página
tem 4659px de altura (layout: 4660px) e os marcos verticais (títulos, abas, cards, banners,
botões, newsletter e rodapé) ficaram a no máximo 1px do desenho; o modal tem 769×300px como no
layout. Fica fora dessa conferência a comparação em outros navegadores e telas.
