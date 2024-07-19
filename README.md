# 📊 Aplicação de Relatórios Interativos com ViteJS, Firebase, Amplify e Power BI

## Visão Geral

Este projeto é uma aplicação web desenvolvida com ViteJS, utilizando Firebase para autenticação e Amplify para integração contínua. A aplicação permite que usuários acessem e visualizem relatórios interativos criados no Power BI. Os links para esses relatórios são embutidos na aplicação, proporcionando uma experiência integrada e intuitiva para os clientes.

A primeira versão deste projeto tem o objetivo de agregar relatórios do Power BI de vários times, centralizando as informações em um único local para fácil acesso e análise.

### Acesse a aplicação no link abaixo:
[Customer Governance Portal](https://mygovernance.com.br)

## Objetivos do Projeto

1. **🔒 Autenticação Segura:** Implementar um sistema de autenticação robusto para garantir que apenas usuários autorizados possam acessar os relatórios.
2. **🚀 Integração Contínua:** Automatizar o processo de build e deployment utilizando o serviço AWS Amplify, garantindo que as atualizações sejam lançadas de forma rápida e segura nos ambientes de desenvolvimento (dev) e produção (prod).
3. **📈 Visualização de Dados:** Facilitar o acesso a relatórios e dashboards interativos do Power BI, fornecendo insights através de uma interface web amigável.

## Tecnologias Utilizadas

- **ViteJS:** Ferramenta de build rápida para desenvolvimento front-end, proporcionando um ambiente de desenvolvimento ágil e eficiente.
- **Firebase:** Plataforma usada para gerenciar a autenticação dos usuários, garantindo segurança e facilidade de uso (backend as a service do Google Cloud).
- **AWS Amplify:** Ferramenta para integração contínua, gerenciando o pipeline de deployment e simplificando o processo de lançamento de novas versões.
- **GitHub:** Repositório de código-fonte onde o controle de versão e colaboração são gerenciados, permitindo um fluxo de trabalho organizado e eficiente.
- **Power BI:** Ferramenta de análise de dados e criação de relatórios interativos, utilizada para criar e gerenciar os gráficos e dashboards que serão acessados pelos clientes.

## Estrutura do Projeto

1. **Frontend:**
   - **ViteJS:** Configurado para desenvolvimento rápido com hot module replacement.
   - **React:** Utilizado para construir a interface do usuário, garantindo uma experiência interativa e responsiva.
   - **Tailwind CSS:** Estilos personalizados para uma interface visualmente atraente e consistente.

2. **Backend:**
   - **Firebase Auth:** Gerenciamento de usuários, permitindo login seguro via e-mail/senha e autenticação social.
   - **Amplify CLI:** Configuração e gerenciamento de ambientes (dev e prod), facilitando o deployment contínuo.

3. **Relatórios:**
   - **Power BI:** Criação e publicação de relatórios, que são então embutidos na aplicação web através de links compartilhados.

## Fluxo de Trabalho

1. **Desenvolvimento:**
   - Os desenvolvedores fazem alterações no código base, criando commits e enviando para o repositório GitHub.
   - Amplify monitora o repositório e, ao detectar novas alterações, inicia o pipeline de build e deployment para o ambiente de desenvolvimento (staging).

2. **Testes e Validação:**
   - No ambiente de desenvolvimento, são realizados testes para garantir que as novas funcionalidades e correções funcionem corretamente.
   - Após a validação, as alterações são mescladas na branch principal, disparando o pipeline de deployment para o ambiente de produção.

3. **Publicação de Relatórios:**
   - A equipe de dados cria e publica relatórios no Power BI.
   - Os links desses relatórios são embutidos na aplicação web, onde os clientes podem acessá-los diretamente.

## Arquitetura Simplificada

![Desenho da arquitetura do projeto](/public/arch.png)

## Acesso Baseado em Funções (Role-Based Access Control)

A aplicação implementa controle de acesso baseado em funções para garantir que diferentes usuários tenham permissões adequadas:

- **Admin:** Tem acesso completo a todas as funcionalidades, incluindo gerenciamento de usuários e configuração da aplicação. Apenas admins podem cadastrar novos usuários.
- **Usuário:** Pode visualizar relatórios e dashboards atribuídos a ele. Usuários externos ou públicos não têm a capacidade de se registrar na aplicação.

## Benefícios

- **⚡ Agilidade no Desenvolvimento:** Com ViteJS e Amplify, o time pode desenvolver e lançar novas funcionalidades rapidamente.
- **🔐 Segurança:** A autenticação via Firebase garante que somente usuários autorizados acessem os dados sensíveis.
- **📊 Insights Poderosos:** Com Power BI, os clientes têm acesso a relatórios e dashboards interativos, proporcionando uma visão detalhada e clara dos dados.

---
