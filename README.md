# Formulário

Este projeto é um exemplo completo de formulário dividido em front-end e back-end, com boas práticas e padrões que costumo aplicar no dia a dia.

## Estrutura do projeto

- `formulario_front/` → código do front-end da aplicação.
- `formulario_server/` → código do back-end (API).

---

## Tecnologias utilizadas

- Node.js `v22.15.0`
- Vue 3 (com Vite)
- SCSS com metodologia BEM
- Componentes Vue com `scoped` para estilos locais

---

## Como executar o projeto

### Rodar apenas a API (back-end)

O projeto já inclui o `dist/` do front-end embutido no servidor, então **basta rodar apenas a API para funcionar**:

```bash
cd formulario_server
npm install
npm start

```

Após iniciar o servidor, a aplicação estará disponível em:

http://localhost:3000/registration

## Organização do projeto

Explorei algumas boas práticas e padrões para deixar este projeto o mais próximo do meu dia a dia profissional:

✅ **SCSS com BEM** → para garantir estilos consistentes e previsíveis.  
✅ **Scoped styles** nos componentes para evitar vazamento de estilos.  
✅ **Componentes globais e locais bem separados:**

- Componentes genéricos/globais (ex.: botão) estão em `formulario_front/src/components/`
- Componentes específicos do formulário (inputs, radios, etapas) estão em `formulario_front/src/components/formulario/`

✅ **Componente "casca" do formulário** → gerencia as etapas e carrega os componentes filhos correspondentes a cada etapa.

✅ ** Persistência de dados com localStorage**

- Os dados do formulário são salvos no localStorage conforme ele preenche.
- Se o usuário der um reload na página, os dados são recuperados automaticamente e exibidos para que ele possa continuar de onde parou.
- Ao concluir o cadastro, os dados armazenados no `localStorage` são removidos.

✅ Boas práticas de organização de pastas:

```
formulario_front/
└── src/
  ├── assets/          # imagens, estilos globais
  ├── components/      # componentes Vue globais
  │   └── formulario/  # componentes específicos do formulário
  ├── views/           # páginas principais
  ├── validators/      # validações
  └── services/        # serviços de rede
```

Assim, ao clonar o repositório, a estrutura de pastas será preservada.

### 🔗 Rodar front-end e back-end separadamente (modo desenvolvimento)

Se preferir trabalhar com o front em modo de desenvolvimento (com hot-reload, etc.), siga os passos abaixo em **dois terminais separados**:

#### Back-end | porta configurada 3000

```bash
cd formulario_server
npm install
npm start
```

#### Front-end | porta configurada 3001

```bash
cd formulario_front
npm install
npm run dev
```
