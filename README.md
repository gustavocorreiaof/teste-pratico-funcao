﻿# 🧪 Teste Prático - Desenvolvedor

Repositório criado para o teste técnico da função Sistemas

---

## ⚙️ Pré-requisitos

- **Visual Studio 2022**  
  [Download gratuito (edição Community)](https://visualstudio.microsoft.com/pt-br/downloads/)

### 🔧 Componentes obrigatórios ao instalar o Visual Studio:

- Pacote de direcionamento do **.NET Framework 4.8**
- SDK do **.NET Framework 4.8**
- **SQL Server Express 2019 LocalDB**

---

## 🚀 Como executar o projeto

1. Baixe e extraia o arquivo `.zip` da solução.
2. Abra o arquivo `FI.WebAtividadeEntrevista.sln` no Visual Studio 2022.
3. Execute a aplicação (F5).
4. Acesse a aba **Clientes** para visualizar e utilizar as funcionalidades implementadas.

---

## ✅ O que foi implementado

### 1. Campo CPF no Cliente

- Adicionado campo `CPF` no formulário de cadastro/edição de clientes.
- Regras aplicadas:
  - Campo **obrigatório**
  - Máscara e formatação: `999.999.999-99`
  - Validação de CPF (dígito verificador)
  - Impede cadastro de CPF duplicado

---

### 2. Cadastro de Beneficiários

- Botão **"Beneficiários"** adicionado na tela de cadastro de cliente.
- Ao clicar, abre um **pop-up** com:
  - Campos para CPF e Nome do Beneficiário
  - Grid com beneficiários já adicionados
  - Opções para **editar** ou **remover**
- Regras aplicadas:
  - Máscara e validação de CPF
  - Proibição de beneficiários com CPF duplicado para o mesmo cliente
  - Beneficiários são salvos ao clicar em "Salvar" no formulário de cliente
- Banco de dados:
  - Criada a tabela `BENEFICIARIOS` com os campos: `ID`, `CPF`, `NOME`, `IDCLIENTE`

---