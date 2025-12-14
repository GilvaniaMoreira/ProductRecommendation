## Visao Geral

A aplicacao permite que usuarios selecionem preferencias e funcionalidades desejadas para receber recomendacoes de produtos adequados. O projeto utiliza uma arquitetura baseada em workspaces (monorepo) para gerenciar o frontend e o backend no mesmo repositorio.

### Tecnologias Principais

- **React.js (CRA)** para interface
- **json-server** como API mock
- **Tailwind CSS** para estilo
- **Jest + React Testing Library** para testes
- **Yarn Workspaces** para monorepo

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

- `yarn start:frontend`: inicia apenas o frontend (CRA).
- `yarn start:backend`: inicia apenas o backend (json-server).
- `yarn test`: executa a suíte de testes do frontend.

## Desenvolvimento e Logica Implementada

- **Algoritmo de recomendacao** : normaliza entradas, pontua por matches, desempata e adiciona metadados (`_meta`) com score, rank e listas de matches.
  - **SingleProduct**: retorna o melhor score; em empate, prevalece o ultimo na ordem original.
  - **MultipleProducts**: retorna lista ordenada por score desc, mantendo ordem original nos empates.
- **Formulario** : estado controlado, validacoes de tipo e selecoes, feedback de loading/erro, botao com loading e desabilitado sem dados.
- **Lista de recomendacoes** : exibe score, ranking e motivos (matches) com fallback para features/preferences quando nao ha metadados.
- **Scroll com offset** : rola ate a secao de resultados.

## Testes

- **Servico**: paths de recomendacao, empates, normalizacao e mocks do projeto .
- **Formulario (integracao)**: validacoes, fluxo, erro do servico e estados de loading/erro de produtos .
- **Lista**: render de score/rank/matches, fallback e estado vazio .

## Licenca

Este projeto esta licenciado sob a Licenca MIT.
