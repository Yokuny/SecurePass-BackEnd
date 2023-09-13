
<h1 align="center">
SecurePass
</h1>
<h4 align="center">
Simplifique o Gerenciamento de Senhas com segurança total
</h4>
<div align="center">
Esqueça suas múltiplas senhas, proteja todas elas com apenas um acesso!
</div>
<br>
<br>

[![first-banner.png](./public/first-banner.png)](https://secure-pass-yokuny.vercel.app/)

<div align="center">

[[Acesse o aplicativo online]](https://secure-pass-yokuny.vercel.app/)

</div>

**SecurePass** é um armazenamento seguro de informações para diversos sites e serviços em um só lugar.

Ideal para pessoas que possuem múltiplas contas em vários sites e redes sociais, cada uma com senhas distintas, e desejam armazená-las com segurança.
<br>

### Principais recursos

- **Armazenamento seguro de informações** - Suas informações são criptografadas e armazenadas em um banco de dados, com acesso restrito apenas ao seu usuário.
- **Acesso rápido e fácil** - Acesse suas informações com apenas um login.
- **Organização** - Organize suas informações em listas separadas, de acordo com o tipo de dado.
- **Design responsivo** - Acesse suas informações em qualquer dispositivo, seja no computador, tablet ou celular.
- **Design intuitivo** - Interface simples e intuitiva, com poucos cliques você consegue acessar, copiar e usar suas informações salvas.
<br>

### Como ter acesso:

1. Acesse nosso site: **[SecurePass](https://secure-pass-yokuny.vercel.app/login)**
2. Acesse a pagina “**Entrar**” na barra de navegação superior.
No celular, o link de acesso fica no menu superior, ao clicar no botão de menu.
3. Na página de acesso, faça login com seu e-mail e senha cadastrados; ou crie uma conta, bastando fornecer apenas um e-mail e senha.
<br>

### Como usar:

<img src="./public/first-acess.png" alt="first-acess" align="left"
width="55%"
style="margin-right:20px; "/>

<div align="right">
<br>
<br>
<br>
<br>
<br>
<br>

1. Quando você abrir o app pela primeira vez, verá um card vazio com a mensagem "**Comece adicionando um novo item!**”
<br>

 2. **Para registrar um novo item**, clique no botão verde inferir para abrir uma tela de registro.
<br>

3. **Na tela de registro**, você pode adicionar credenciais de sites ou redes sociais, informações de cartão de crédito, notas pessoais e senhas de Wi-Fi.
<br>

</div>

<div style="width: 92vw; display:flex; box-sizing:border-box;">

4. **Ao salvar um registro**, você é direcionado para a tela de card, onde suas informações serão apresentadas em uma lista.

    <br>

    <b>`Meus dados não estão aparecendo na lista!`</b>
    `O app organiza as informações em listas separadas, de acordo com o tipo de dado:`
    
    - Credenciais
    - Cartões
    - Notas
    - Wi-Fi
    
    -Na versão desktop, você pode alterar a lista no menu superior.
    -Na versão mobile, o acesso a cada lista fica no menu.
    <br>
    
<img src="./public/register-card.png" alt="register-card" align="right" width=100% 
style="margin-left:12px;"/>

</div>

5. **Para acessar, copiar ou apagar seu registro**, clique no item com o título que você colocou ao registrar a informação.
<br>

### Tecnologias usadas

**Front-end** _(interface)_**:**
- **[Next.js 13](https://nextjs.org/docs/getting-started)**
- **[NextUI v2](https://nextui.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Tailwind Variants](https://tailwind-variants.org)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Framer Motion](https://www.framer.com/motion/)**

**Back-end** _(servidor)_**:**
- **[NestJS](https://nestjs.com/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Prisma](https://www.prisma.io/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[JWT](https://jwt.io/)**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[Jest](https://jestjs.io/)**
- **[Supertest](https://www.npmjs.com/package/supertest)**
- **[Swagger](https://swagger.io/)**
- **[Render](https://render.com/)**
<br>

## Como rodar o projeto

**_Para rodar o projeto ambos Front-end e Back-end devem estar rodando._**

### **Como rodar o back-end**

1. Clone o repositório do back-end:
    ```bash
    git clone https://github.com/Yokuny/SecurePass-BackEnd
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie o arquivo .env na raiz do projeto e insira as seguintes linhas:
    ```bash
    #database connection
    DATABASE_URL=postgresql://user:pass@localhost:5432/db_name

    #jwt secret
    CRYPTO_SECRET=a_secret

    #server port access used by the front-end
    PORT=8080
    ```

4. Rode o projeto em modo de desenvolvimento:
    ```bash
    # development
    npm run start

    # watch mode
    npm run start:dev
    ```

### **Como rodar o front-end**

1. Clone o repositório do projeto:
    ```bash
    git clone https://github.com/Yokuny/SecurePass
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie o arquivo .env na raiz do projeto e insira a seguinte linha:
    ```bash
    #The same url as the back-end
    NEXT_PUBLIC_API=http://localhost:8080/
    ```

4. Rode o projeto em modo de desenvolvimento:
    ```bash
    npm run dev
    ```

5. Acesse o projeto em:
    ```bash
    http://localhost:3000/
    ```

6. Para gerar uma build do projeto:
    ```bash
    npm run build
    ```
<br>