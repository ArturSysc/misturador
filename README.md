# GUI -TEMPLATE

Um template front-end utilizando React e Bootstrap para gerenciamento de sistema, incluindo componentes para login, registro e modal. O projeto é responsivo e utiliza componentes do `react-bootstrap` para facilitar o desenvolvimento e a estilização.

## Versão

| Versão           | Data       | commit  | Descrição                            |
| ---------------- | ---------- | ------- | ------------------------------------ |
| 0.3.0 :sparkles: | 2025-01-27 | xxxxxxx | Update writemodbus                   |
| 0.2.9 :sparkles: | 2025-01-24 | f4a6d60 | Build temporaly added                |
| 0.2.8 :sparkles: | 2025-01-24 | 1aa6540 | Update api with new schema mapped    |
| 0.2.7 :sparkles: | 2025-01-24 | 5d6592f | Add modbus and update api sensorData |
| 0.2.6 :sparkles: | 2025-01-22 | 8997009 | Add hexa handling in the backend     |
| 0.2.5 :bug:      | 2025-01-21 | 2918d8c | Fix bug in server time               |
| 0.2.4 :sparkles: | 2025-01-20 | 9a13470 | Add server active time and fix graph |
| 0.2.3 :sparkles: | 2025-01-20 | 12849c0 | Add pdf button in LineGraph          |
| 0.2.2 :sparkles: | 2025-01-20 | 8c834bd | Add basic db and api                 |
| 0.2.1 :bug:      | 2025-01-20 | 68f39e3 | Fix scrolling page bug               |
| 0.2.0 :sparkles: | 2025-01-20 | e957863 | Add backend logic and LineGraph      |
| 0.1.0 :sparkles: | 2024-01-16 | 669f4b1 | Initial commit                       |

## Estrutura do Projeto

O projeto possui a seguinte estrutura básica:

```
/sysc-template
│
├── /public
│   ├── /images
│       ├── footer-logo.png
│       ├── logo-sysc.png
│
├── /src
│   ├── /components
│       ├── Header.js          # Componente do cabeçalho com logo
│       ├── Footer.js          # Componente do rodapé com logo
│       ├── SidebarMenu.js      # Menu lateral com links
│       ├── LoginPage.js        # Página de login
│       ├── RegisterPage.js     # Página de registro
│       ├── ModalComponent.js    # Componente de modal
│
├── App.js                     # Componente principal da aplicação
├── App.css                    # Estilos globais
├── index.js                   # Ponto de entrada da aplicação
├── package.json                # Dependências do projeto
└── README.md                  # Documentação do projeto
```

/misturador

### Funcionalidades Implementadas

1. **Header**: Componente de cabeçalho que contém o nome do projeto e o logo, centralizado e estilizado com Bootstrap.

2. **Footer**: Componente de rodapé que exibe o logo e os direitos autorais.

3. **SidebarMenu**: Menu lateral com ícones e links para as páginas de login, registro e modal, com uma aparência consistente.

4. **LoginPage**: Página de login com campos de email e senha, incluindo um campo para confirmar a senha e uma opção de "Lembrar de mim". O layout é feito com um cartão estilizado pelo `react-bootstrap`.

5. **LineGraph**

O LineGraph é um componente de gráfico de linha que exibe dados de uma API em uma linha temporal.
Requisitos de Dados

A API deve retornar um objeto JSON com a seguinte estrutura:

```json
    {
    "timestamps": ["2024-11-01T00:00:00Z", "2024-11-02T00:00:00Z", ...],
    "values": [12, 19, 3, ...]
    }
```

    timestamps: Array de strings no formato de data ISO.
    values: Array de números correspondente aos valores em cada timestamp.

Dependências

    Bibliotecas: chart.js, react-chartjs-2
    Hook: useGraph – responsável por buscar e formatar os dados para o gráfico.

Estados do Componente

    Carregando: Exibe um indicador de carregamento.
    Erro: Exibe uma mensagem caso a API falhe.

Exemplo de Visualização

![Exemplo de Visualização](./img-components/LineGraph.png)

6.
7.
8.
