# Controle Fácil

Este é um aplicativo de controle financeiro pessoal criado com Next.js e Firebase.

O aplicativo foi desenvolvido no Firebase Studio. Siga as instruções abaixo para configurar o deploy automático para a Netlify usando o GitHub.

---

## Deploy Automático com Netlify e GitHub (CI/CD)

Depois de configurar isso, toda vez que seu código for atualizado no GitHub, a Netlify irá automaticamente fazer o deploy da nova versão.

### Passo 1: Crie um Repositório no GitHub

1.  Vá para [GitHub.com](https://github.com/) e faça login. Se não tiver uma conta, crie uma.
2.  Crie um novo repositório (pode ser público ou privado). **Importante**: Marque a opção **"Initialize this repository with a README"**.

### Passo 2: Envie seu Projeto para o GitHub

Você tem duas opções. Se a primeira (via terminal) não funcionar devido a erros, pule para a alternativa, que é mais visual.

---

### Opção 1: Via Terminal (Linha de Comando)

Se você tem o Git instalado, este é o método mais rápido.

1.  Abra o terminal na pasta do seu projeto no seu computador.
2.  Inicialize um repositório git local:
    ```bash
    git init
    git add .
    git commit -m "Versão inicial do projeto"
    ```
3.  Vá para a página do seu novo repositório no GitHub e copie os comandos sob o título "…or push an existing repository from the command line". Eles serão parecidos com isto:
    ```bash
    git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
    git branch -M main
    git push -u origin main
    ```
4.  Cole esses comandos no seu terminal e execute.

---

### Alternativa: Enviando os Arquivos Pelo Site do GitHub (Sem Terminal)

Este método funciona sem instalar nada e é a melhor opção se você recebeu o erro `'git' não é reconhecido`.

1.  Vá para o repositório que você criou no GitHub.
2.  Clique no botão **"Add file"** e, no menu que aparecer, selecione **"Upload files"**.
3.  Você verá uma área que diz "Drag files here to add them to your repository".
4.  Abra a pasta do seu projeto no seu computador (por exemplo, no Windows Explorer ou Finder do Mac).
5.  Selecione **TODOS os arquivos e pastas** do seu projeto (como `src`, `public`, `package.json`, etc.), **EXCETO a pasta `node_modules`** (ela é muito grande e desnecessária).
6.  **Clique nos arquivos e pastas selecionados, segure e arraste-os todos de uma vez** para a área de upload no site do GitHub. O navegador mostrará uma mensagem indicando que está processando os arquivos. Isso pode levar um momento.
7.  Aguarde o carregamento de todos os arquivos. Você verá uma lista deles aparecer na tela.
8.  Quando o carregamento terminar, role a página para baixo. Você verá um campo para uma mensagem de "commit". Digite algo como "Versão inicial do projeto".
9.  Clique no botão verde **"Commit changes"**.

Pronto! Seus arquivos e a estrutura de pastas correta estarão no GitHub.

---

### Passo 3: Conecte o Netlify ao GitHub

1.  Faça login no seu painel da [Netlify](https://app.netlify.com/).
2.  Vá para a página do seu site que já está funcionando.
3.  Vá para a aba **"Deploys"** e depois em **"Deploy settings"**.
4.  Em "Build settings", clique em **"Link site to a Git repository"**.
5.  Escolha "GitHub" e autorize a Netlify a acessar sua conta.
6.  Selecione o repositório que você acabou de criar.

A Netlify irá detectar o arquivo `netlify.toml` que já está no projeto e usará as configurações corretas automaticamente. Ela fará um novo deploy e, a partir de agora, qualquer alteração que você enviar para a branch `main` do GitHub irá acionar um novo deploy automático.