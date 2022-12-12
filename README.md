<div align="center">
   <a href="https://github.com/thallesyam">
      <img alt="Made by thalles" src="https://img.shields.io/badge/made%20by-thalles-yellow"/>
   </a>
   <img alt="GitHub Repo Size" src="https://img.shields.io/github/repo-size/mathrb22/IgniteLab-Design-System"/>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/mathrb22/IgniteLab-Design-System"/>
   <a href="https://github.com/mathrb22/IgniteLab-Design-System/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/mathrb22/IgniteLab-Design-System"/>
   </a>
   <a href="https://github.com/mathrb22/IgniteLab-Design-System/issues">
      <img alt="GitHub Issues" src="https://img.shields.io/github/issues/mathrb22/IgniteLab-Design-System"/>
   </a>
   <a href="https://github.com/mathrb22/IgniteLab-Design-System/pulls">
      <img alt="Pull Requests Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"/>
   </a>
   </br>
   </br>
   <a href="#-tecnologias-utilizadas">
      <img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>
   </a>
</div>

</br>
<div align="center">

[**Sobre**](#-sobre) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Tecnologias e ferramentas utilizadas**](#-tecnologias-e-ferramentas-utilizadas) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Instalação e execução**](#-instalação-e-execução) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Como contribuir**](#-como-contribuir) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Contato**](#-contato) &nbsp;&nbsp;**|**&nbsp;&nbsp;
[**Licença**](#-licença)

</div>

## 📃 Sobre

<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="Clean Architecture" />

Esse é um projeto pessoal desenvolvido com o intuito de praticar o TDD e a Clean Architecture.

## 🚀 Tecnologias e ferramentas utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias e ferramentas:

- [**Node**](https://nodejs.org/en/): Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.

- [**TypeScript**](https://www.typescriptlang.org/): um super conjunto da linguagem JavaScript que fornece classes, interfaces e tipagem estática opcional. Utilizado em conjunto com React no frontend web;

- [**Express**](https://expressjs.com/pt-br/): Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web

- [**Jest**](https://jestjs.io/pt-BR/): Jest é uma estrutura de teste JavaScript construída em cima do Jasmine e mantida pela Meta.

- [**Prisma**](https://www.prisma.io/): O Prisma é um ORM de próxima geração que consiste nas seguintes ferramentas: Prisma Client: Construtor de consultas gerado automaticamente e seguro para Node.js

- [**Fly io**](https://fly.io/): Para hospedar a aplicação utilizei o serviço de hospeadagem do fly io

## 🔧 Instalação e execução

Para baixar o código-fonte do projeto em sua máquina, primeiramente terá que ter instalado o [**Git**](https://git-scm.com/).

Com o Git instalado, em seu terminal execute o seguinte comando:

```bash
git clone https://github.com/thallesyam/vent-management.git
```

Para instalar as dependências e executar o projeto terá que ter instalado em sua máquina o [**Node.js**](https://nodejs.org/en/), que vem acompanhado do NPM. Com ele instalado:

- Instale as dependências do projeto:

  ```bash
  yarn
  ```

- Crie um arquivo .env e adicione a variavel:
 ```
  DATABASE_URL_PG=YOUR DATABASE URL HERE
 ```

- Rode o comando: 
  ```
    npx prisma migrate run dev
  ```

- Execute o projeto:

  ```bash
  yarn dev

  ```

## 📌 Dicas:

- A api está hospedada em event-server.fly.dev
- Todos os endpoints e consultas podem ser consultados no arquivo `rest-controller.spec.ts`


## 💡 Como contribuir

- Faça um **_fork_** desse repositório;
- Crie um **branch** para a sua feature: `git checkout -b minha-feature`;
- Faça um **commit** com suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça um **push** para o seu branch: `git push origin minha-feature`;
- Faça um **pull request** com sua feature;

Pull requests são sempre bem-vindos. Em caso de dúvidas ou sugestões, crie uma _**issue**_ ou entre em contato comigo.

## 📲 Contato

Entre em contato comigo por e-mail ou pelo meu LinkedIn:

<a href="mailto:thallesyam@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://www.linkedin.com/in/thalles-ian/"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## 📝 Licença

<a href="https://github.com/mathrb22/IgniteLab-Design-System/blob/main/LICENSE.md">
  <img alt="GitHub License" src="https://img.shields.io/github/license/mathrb22/IgniteLab-Design-System">
</a>

Esse projeto está sob a licença **MIT**. Veja o arquivo _**LICENSE**_ para mais detalhes.

---

<h5 align="center">
  &copy;2022 - <a href="https://github.com/thallesyam/">Thalles Ian</a>
</h5>
