# IEAB Central - Sistema Administrativo

Sistema para gerenciamento de conteúdo do site da Igreja IEAB Central. Este sistema permite gerenciar de forma dinâmica o conteúdo sem precisar modificar o código-fonte diretamente.

## Funcionalidades

- **Gerenciar Página Sobre**
  - Editar texto e imagem da história da igreja
  - Adicionar, editar e excluir líderes por categoria e igreja

- **Gerenciar Eventos**
  - Adicionar, editar e excluir eventos
  - Organizar eventos por categorias

- **Gerenciar Galeria**
  - Adicionar, editar e excluir categorias
  - Adicionar, editar e excluir fotos
  - Organizar fotos por categoria

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative os serviços Firebase Authentication e Firestore Database
3. Configure as regras de segurança no Firestore
4. Obtenha a configuração do Firebase (apiKey, authDomain, etc)
5. Edite o arquivo `src/firebase/config.js` e substitua os valores de configuração com os seus:

```js
const firebaseConfig = {
  apiKey: "SEU_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

### 3. Criar usuário administrativo

1. No Firebase Console, vá até Authentication > Users
2. Clique em "Add User" e crie um usuário com email e senha
3. Este será o acesso ao painel administrativo

## Desenvolvimento

```bash
npm run dev
```

## Produção

```bash
npm run build
```

## Acessando o Painel Administrativo

O painel administrativo está disponível na rota `/admin/login`. 

Após fazer login com as credenciais configuradas no Firebase Authentication, você terá acesso ao sistema de gerenciamento de conteúdo.

## Estrutura do Banco de Dados (Firestore)

O sistema utiliza as seguintes coleções no Firestore:

- **sobre**
  - Documento `historia`: contém título, parágrafos e URL da imagem

- **lideres**
  - Documentos com informações dos líderes: nome, cargo, foto, categoria, igreja

- **eventos**
  - Documentos com informações dos eventos: título, descrição, data, horário, local, categoria, imagem

- **fotos**
  - Documentos com informações das fotos da galeria: título, url, descrição, data, categoria

- **galeria**
  - Documento `categorias`: contém a lista de categorias da galeria
