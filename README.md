# Recomendador de Produtos - Teste Tecnico

Este projeto integra o processo seletivo para a vaga de desenvolvedor front-end. O objetivo e implementar a logica de recomendacao de produtos em uma aplicacao React.js existente, consumindo dados de uma API simulada via json-server.

## Visao Geral

A aplicacao permite que usuarios selecionem preferencias e funcionalidades desejadas para receber recomendacoes de produtos adequados. O projeto utiliza uma arquitetura baseada em workspaces (monorepo) para gerenciar o frontend e o backend no mesmo repositorio.

### Tecnologias Principais

- **React.js**: Biblioteca para interface de usuario.
- **json-server**: Simulacao de API RESTful.
- **Tailwind CSS**: Framework de estilizacao.
- **Yarn Workspaces**: Gerenciamento de dependencias do monorepo.

## Estrutura do Projeto

O projeto esta organizado da seguinte forma:

- **frontend/**: Contem a aplicacao React (interface do usuario).
- **backend/**: Contem o servidor json-server (dados dos produtos).
- **package.json**: Arquivo de configuracao raiz que gerencia os scripts e workspaces.

## Pre-requisitos

- Node.js (versao 18.3 ou superior)
- Yarn (gerenciador de pacotes recomendado)

## Instalacao e Execucao

1. Clone o repositorio:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd ProductRecommendation
   ```

2. Instale as dependencias:
   ```bash
   yarn install
   ```
   O comando instalara as dependencias da raiz e dos workspaces (frontend e backend).

3. Inicie a aplicacao em modo de desenvolvimento:
   ```bash
   yarn dev
   ```
   Este comando executa simultaneamente o frontend (porta 3000) e o backend (porta 3001).

### Outros Comandos Disponiveis

- `yarn start:frontend`: Inicia apenas o frontend.
- `yarn start:backend`: Inicia apenas o backend (API).

## Desenvolvimento e Logica Implementada

O foco do desenvolvimento concentrou-se nos seguintes arquivos para atender aos criterios de aceite:

1.  **frontend/src/services/recommendation.service.js**: Implementacao do algoritmo de recomendacao. A logica pontua os produtos com base na interseccao entre as preferencias/funcionalidades do usuario e as caracteristicas do produto.
    *   **SingleProduct**: Retorna o produto com maior pontuacao. Em caso de empate de pontuacao, o criterio de desempate e o indice original do produto (o ultimo da lista prevalece, conforme requisito).
    *   **MultipleProducts**: Retorna todos os produtos compativeis ordenados por pontuacao (decrescente).

2.  **frontend/src/components/Form/Form.js**: Integracao do servico de recomendacao com o formulario. Ao submeter, os dados sao processados e o resultado e enviado para o componente pai.

3.  **frontend/src/App.js**: Gerenciamento de estado para exibir a lista de recomendacoes retornada pelo formulario.

## Criterios de Aceite Atendidos

1.  Recebimento de preferencias e funcionalidades via formulario.
2.  Geracao de recomendacoes baseadas nas escolhas do usuario.
3.  Suporte a recomendacao de produto unico (SingleProduct) com criterio de desempate especifico (ultimo item valido).
4.  Suporte a recomendacao de multiplos produtos (MultipleProducts) com ordenacao por relevancia.
5.  Tratamento de diferentes tipos de entrada e validacao de dados.

## Licenca

Este projeto esta licenciado sob a Licenca MIT.
