# Calculadora Financeira

Projeto desenvolvido para realizar cálculos financeiros utilizando fórmulas de matemática financeira.

O projeto possui uma versão web com interface gráfica e uma versão em linguagem C executada via terminal.

## Funcionalidades

### Versão Web

A aplicação web permite realizar cálculos de:

* Juros Simples
* Juros Compostos
* Desconto Comercial
* Desconto Racional
* Sistema de Amortização Constante (SAC)
* Taxas Equivalentes
* Conversão entre taxas
* Fator de Valor Presente (FVP / Price)
* Valor Presente Líquido (VPL)

A interface possui navegação por módulos e um visor para exibição dos resultados.

## Tecnologias utilizadas

### Web

* HTML5
* CSS3
* JavaScript

### Terminal

* Linguagem C
* Biblioteca matemática (`math.h`)

## Estrutura do projeto

```
Calculadora-Financeira/
│
├── web/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── c/
│   ├── main.c
│   └── capitalização simples.c
│
└── README.md
```

## Como executar

### Versão Web

1. Entre na pasta `web`.
2. Abra o arquivo:

```
index.html
```

3. Execute no navegador.

Não é necessário instalar dependências.

---

### Versão C

Compile utilizando GCC:

```bash
gcc main.c -o calculadora -lm
```

Execute:

Linux/macOS:

```bash
./calculadora
```

Windows:

```bash
calculadora.exe
```

## Objetivo

O objetivo do projeto é auxiliar estudantes no aprendizado e aplicação de conceitos de matemática financeira, permitindo realizar cálculos de forma rápida e organizada.

## Interface

A versão web utiliza uma identidade visual retrô inspirada em calculadoras e jogos clássicos, com elementos de pixel art, cores neon e estilo arcade.

## Autor

Desenvolvido por:

Mateus Teixeira

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de estudo.
