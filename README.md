# Teddy

Aplicacao React para cadastro e gestao de parceiros e empresas externas, usando PrimeReact e Vite.

## Stack

- React 18
- React Router DOM 6
- PrimeReact e PrimeFlex
- Axios
- Vite 7
- ESLint 9
- Docker com Nginx para servir o build de producao

## Scripts

```sh
npm install
npm run dev
npm run lint
npm run build
```

## Desenvolvimento local

O servidor de desenvolvimento sobe em:

```txt
http://localhost:5173
```

## Build de producao

```sh
npm run build
```

O resultado fica em `dist/`.

## Docker

Build da imagem:

```sh
docker build -t teddy .
```

Executar localmente:

```sh
docker run -p 4173:80 teddy
```

Ou com Compose:

```sh
docker compose up --build
```

Aplicacao disponivel em:

```txt
http://localhost:4173
```

## Deploy

O projeto esta configurado como SPA. Em ambientes como Vercel, rotas internas sao redirecionadas para `index.html`.

## Observacoes

- O login atual e uma sessao local simples usando cookie ou localStorage.
- As listagens consomem APIs mockadas externas.
- O codigo foi reorganizado para centralizar rotas, sessao, normalizacao de dados e servicos HTTP.
- Se a API externa falhar, o front usa dados seedados e um CRUD local persistido em `localStorage`, mantendo o site funcional para estudo e demonstracao.

.custom-menubar .p-menuitem-link,
.custom-menubar .p-menuitem-link {
    z-index: 1;
    overflow: hidden;
    background: transparent !important;
    box-shadow: none !important;
}

.custom-menubar .p-menuitem-link:active,
.custom-menubar .p-menuitem-link.p-active,
.custom-menubar .p-menuitem-link.p-highlight {
    background: transparent !important;
}

.custom-menubar .p-menuitem-link::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    
    /* Seu gradiente aqui */
    background: linear-gradient(90deg, #f16342, #f6b3f9, #7639f2);
    border-radius: 0.5rem;
    
    /* Começa invisível */
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: -1;
}

.custom-menubar .p-menuitem-link:hover::before,
.custom-menubar .p-menuitem-link:focus::before {
    opacity: 1;
}


.p-menuitem-content {
    border-radius: 0.5rem;
    margin-right: 0.5rem;
}

.p-button-success,
.btn-orange {
    background-color: #290377;
    border-color: #290377;
    color: white;
    border-radius: 0.5rem;
}

.p-button-success:hover,
.btn-orange:hover,
.p-button.p-button-danger:hover {
    background-color: #44189f;
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #bc9aff;
    border-color: #7639f2;
}

.btn-red-not-bg,
.btn-orange-not-bg {
    background-color: transparent;
    border-color: #f16342;
    color: #f16342;
    border-radius: 0.5rem;
}

.p-button.p-button-danger{
    color: #ffffff;
    background: #290377;
    border: #290377;
    border-radius: 0.5rem;
}

.p-button.p-component.p-button-icon-only.p-button-outlined.p-button-rounded.p-button-danger {
    background-color: transparent;
    color: #b03cb7;
    border: 1px solid #b03cb7;
    border-radius: 100%;
}

.p-button.p-component.p-button-icon-only.p-button-outlined.p-button-rounded.p-button-danger:focus, 
.p-button.p-component.p-button-icon-only.p-button-outlined.p-button-rounded.p-button-danger:hover {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #f6b3f9;
}

.p-button.p-button-warning.p-button-outlined {
    border-color: #f16342;
    color: #f16342;
}

.p-button.p-button-warning.p-button-outlined:hover, .p-button.p-button-warning.p-button-outlined:focus  {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #ffcabe;
    border-color: #f16342;
}

.btn-red-not-bg:hover, .btn-orange-not-bg:hover {
    background-color: transparent;
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #ffcabe;
    border-color: #ff866a;
}

