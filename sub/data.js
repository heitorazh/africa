const countries = {
    AO: {
        name: "🇦🇴 Angola",
        population: "36,6 milhões",
        age: "16 anos",
        future: "Busca por diversificação econômica além do petróleo e forte urbanização.",
        chartData: [47.5, 46.2, 44.1, 41.0, 38.2, 35.5, 33.0, 30.2], // Taxa de Natalidade
        pibData: [9.1, 35.3, 83.8, 116.2, 53.6, 93.8, 125.0, 150.5]  // PIB (Bilhões US$)
    },
    BI: {
        name: "🇧🇮 Burundi",
        population: "13,2 milhões",
        age: "17 anos",
        future: "Potencial de modernização agrícola, mas enfrenta desafios de infraestrutura.",
        chartData: [48.1, 46.5, 43.8, 40.2, 37.5, 34.8, 32.1, 29.5],
        pibData: [0.8, 1.1, 2.0, 3.0, 2.8, 3.5, 4.2, 5.5]
    },
    BJ: {
        name: "🇧🇯 Benin",
        population: "13,7 milhões",
        age: "18 anos",
        future: "Expansão como hub logístico regional através da modernização do porto de Cotonou.",
        chartData: [44.2, 42.8, 40.5, 38.1, 35.9, 33.4, 31.0, 28.5],
        pibData: [2.5, 4.8, 9.5, 11.3, 15.6, 21.0, 28.5, 38.0]
    },
    BF: {
        name: "🇧🇫 Burkina Faso",
        population: "23,2 milhões",
        age: "17 anos",
        future: "Foco no desenvolvimento do setor de mineração e expansão de energias renováveis.",
        chartData: [47.8, 46.0, 43.2, 40.1, 37.4, 34.5, 32.0, 29.2],
        pibData: [2.6, 5.4, 10.1, 11.8, 17.9, 22.5, 30.0, 40.5]
    },
    BW: {
        name: "🇧🇼 Botsuana",
        population: "2,6 milhões",
        age: "24 anos",
        future: "Transição para uma economia do conhecimento e consolidação do ecoturismo de alto valor.",
        chartData: [28.5, 26.2, 24.8, 23.5, 22.1, 20.5, 19.0, 17.5],
        pibData: [5.8, 9.9, 12.7, 13.5, 15.0, 21.0, 26.5, 32.0]
    },
    CF: {
        name: "🇨🇫 Rep. Centro-Africana",
        population: "5,7 milhões",
        age: "18 anos",
        future: "Necessidade de pacificação para atrair investimentos e explorar recursos naturais.",
        chartData: [43.5, 42.1, 39.8, 37.5, 35.2, 33.0, 31.0, 28.5],
        pibData: [1.0, 1.3, 2.1, 1.7, 2.3, 2.8, 3.5, 4.5]
    },
    CI: {
        name: "🇨🇮 Costa do Marfim",
        population: "28,8 milhões",
        age: "19 anos",
        future: "Consolidação como potência agrícola da região e crescimento do setor de serviços.",
        chartData: [42.1, 40.5, 38.2, 36.1, 34.0, 31.8, 29.5, 27.0],
        pibData: [10.7, 17.0, 24.9, 45.8, 61.3, 82.0, 110.5, 145.0]
    },
    CM: {
        name: "🇨🇲 Camarões",
        population: "28,6 milhões",
        age: "18 anos",
        future: "Diversificação industrial e investimentos pesados em infraestrutura de transporte.",
        chartData: [41.5, 40.0, 37.8, 35.5, 33.2, 31.0, 28.8, 26.5],
        pibData: [10.0, 17.6, 27.5, 32.2, 40.8, 48.5, 62.0, 78.5]
    },
    CD: {
        name: "🇨🇩 Rep. Dem. do Congo",
        population: "102 milhões",
        age: "17 anos",
        future: "Papel central na transição energética global devido às vastas reservas de cobalto e minérios.",
        chartData: [48.5, 47.2, 45.1, 42.8, 40.5, 38.2, 35.5, 32.5],
        pibData: [4.3, 7.1, 11.9, 37.9, 48.7, 72.5, 105.0, 150.0]
    },
    CG: {
        name: "🇨🇬 Congo",
        population: "6,1 milhões",
        age: "19 anos",
        future: "Esforços para preservação florestal e desenvolvimento de infraestrutura sustentável.",
        chartData: [40.2, 38.5, 36.1, 34.0, 32.2, 30.5, 28.5, 26.5],
        pibData: [3.2, 6.0, 12.0, 8.5, 10.4, 15.0, 20.5, 26.0]
    },
    DJ: {
        name: "🇩🇯 Djibuti",
        population: "1,1 milhão",
        age: "27 anos",
        future: "Expansão de sua posição estratégica como o principal porto logístico do Chifre da África.",
        chartData: [30.5, 28.2, 26.0, 24.1, 22.5, 21.0, 19.5, 18.0],
        pibData: [0.5, 0.7, 1.1, 2.4, 3.4, 4.2, 5.5, 7.0]
    },
    DZ: {
        name: "🇩🇿 Argélia",
        population: "45,6 milhões",
        age: "28 anos",
        future: "Transição da matriz energética e fortalecimento de startups de tecnologia.",
        chartData: [21.5, 23.0, 25.5, 24.8, 22.1, 20.5, 18.8, 17.5],
        pibData: [54.7, 103.1, 161.2, 165.9, 145.0, 220.0, 280.5, 350.0]
    },
    EG: {
        name: "🇪🇬 Egito",
        population: "112,7 milhões",
        age: "25 anos",
        future: "Crescimento impulsionado por megaprojetos, novas cidades inteligentes e energias renováveis.",
        chartData: [26.8, 25.5, 27.2, 26.5, 22.8, 20.5, 18.5, 17.0],
        pibData: [99.8, 89.6, 218.9, 332.6, 383.8, 430.5, 580.0, 750.0]
    },
    ER: {
        name: "🇪🇷 Eritreia",
        population: "3,7 milhões",
        age: "19 anos",
        future: "Potencial crescente no setor de mineração e desenvolvimento portuário a longo prazo.",
        chartData: [39.5, 37.8, 35.5, 33.2, 31.0, 29.5, 27.5, 25.5],
        pibData: [0.7, 1.1, 1.5, 2.1, 2.0, 2.5, 3.2, 4.0]
    },
    ET: {
        name: "🇪🇹 Etiópia",
        population: "126,5 milhões",
        age: "19 anos",
        future: "Industrialização acelerada e expansão da aviação conectando o mercado continental.",
        chartData: [45.2, 42.5, 39.1, 36.5, 34.2, 31.8, 29.5, 27.0],
        pibData: [8.2, 12.4, 29.9, 64.5, 107.6, 160.0, 230.5, 320.0]
    },
    GA: {
        name: "🇬🇦 Gabão",
        population: "2,4 milhões",
        age: "22 anos",
        future: "Liderança em sustentabilidade e economia verde protegendo a bacia do Congo.",
        chartData: [32.5, 31.0, 29.5, 28.0, 26.5, 25.0, 23.5, 22.0],
        pibData: [5.0, 8.6, 14.3, 14.3, 15.3, 22.0, 28.5, 35.0]
    },
    GH: {
        name: "🇬🇭 Gana",
        population: "34,1 milhões",
        age: "21 anos",
        future: "Avanço no setor tecnológico, explosão de fintechs e fortalecimento da indústria local.",
        chartData: [35.8, 34.0, 32.2, 30.5, 28.8, 26.5, 24.5, 22.5],
        pibData: [4.9, 10.7, 32.1, 43.3, 68.5, 78.5, 105.0, 140.0]
    },
    GN: {
        name: "🇬🇳 Guiné",
        population: "14,1 milhões",
        age: "19 anos",
        future: "Expansão da exploração de bauxita com maior foco em refinamento interno de minérios.",
        chartData: [43.5, 42.0, 39.8, 37.5, 35.2, 33.0, 31.0, 28.5],
        pibData: [2.9, 2.9, 6.8, 8.8, 14.1, 23.0, 32.5, 45.0]
    },
    GM: {
        name: "🇬🇲 Gâmbia",
        population: "2,7 milhões",
        age: "17 anos",
        future: "Retomada do turismo sustentável e modernização da infraestrutura costeira.",
        chartData: [42.0, 40.5, 38.2, 36.0, 34.1, 32.0, 29.5, 27.0],
        pibData: [0.6, 0.7, 1.5, 1.4, 1.9, 2.5, 3.5, 5.0]
    },
    GW: {
        name: "🇬🇼 Guiné-Bissau",
        population: "2,1 milhões",
        age: "19 anos",
        future: "Melhoria da cadeia produtiva do caju e atração de novos investimentos internacionais.",
        chartData: [42.5, 41.0, 39.2, 37.0, 35.1, 33.0, 31.0, 28.5],
        pibData: [0.3, 0.5, 0.8, 1.0, 1.4, 1.9, 2.6, 3.5]
    },
    GQ: {
        name: "🇬🇶 Guiné Equatorial",
        population: "1,7 milhão",
        age: "22 anos",
        future: "Desafio de reduzir a dependência da exportação de petróleo e expandir o setor de serviços.",
        chartData: [38.5, 37.0, 35.2, 33.5, 31.8, 30.0, 28.5, 26.5],
        pibData: [1.2, 8.2, 16.2, 13.1, 10.0, 13.5, 17.0, 21.0]
    },
    KE: {
        name: "🇰🇪 Quênia",
        population: "55,1 milhões",
        age: "20 anos",
        future: "Grande expansão do setor tecnológico e das fintechs, a 'Silicon Savannah'.",
        chartData: [38.5, 36.2, 33.5, 30.8, 28.2, 26.0, 24.0, 22.0],
        pibData: [12.7, 18.7, 40.0, 63.7, 100.6, 120.5, 165.0, 220.0]
    },
    LR: {
        name: "🇱🇷 Libéria",
        population: "5,4 milhões",
        age: "19 anos",
        future: "Reconstrução contínua da infraestrutura nacional e fortalecimento do setor agrícola.",
        chartData: [42.5, 41.0, 38.8, 36.5, 34.2, 32.0, 30.0, 27.5],
        pibData: [0.8, 0.6, 1.2, 3.1, 3.0, 4.2, 5.5, 7.5]
    },
    LY: {
        name: "🇱🇾 Líbia",
        population: "6,8 milhões",
        age: "28 anos",
        future: "Potencial de reconstrução econômica focada na reestruturação do setor energético.",
        chartData: [24.5, 23.2, 21.8, 20.5, 19.2, 18.0, 17.0, 16.0],
        pibData: [38.9, 42.8, 74.7, 27.7, 29.1, 45.0, 60.5, 80.0]
    },
    LS: {
        name: "🇱🇸 Lesoto",
        population: "2,3 milhões",
        age: "24 anos",
        future: "Desenvolvimento avançado do setor hídrico e fornecimento de energia limpa para a região.",
        chartData: [31.5, 30.0, 28.5, 27.0, 25.5, 24.0, 22.5, 21.0],
        pibData: [0.8, 1.4, 2.6, 2.5, 1.8, 2.5, 3.2, 4.2]
    },
    MA: {
        name: "🇲🇦 Marrocos",
        population: "37,8 milhões",
        age: "29 anos",
        future: "Referência global em energia solar e forte aproximação comercial com a Europa.",
        chartData: [21.8, 20.5, 19.2, 17.8, 16.5, 15.5, 14.5, 13.5],
        pibData: [38.8, 62.3, 93.2, 101.5, 114.7, 140.0, 180.5, 230.0]
    },
    MG: {
        name: "🇲🇬 Madagascar",
        population: "30,3 milhões",
        age: "19 anos",
        future: "Valorização da biodiversidade única com foco estratégico em ecoturismo e agricultura.",
        chartData: [42.5, 41.0, 38.5, 36.2, 34.0, 31.5, 29.5, 27.0],
        pibData: [3.8, 5.0, 8.7, 9.7, 13.0, 16.5, 22.0, 29.0]
    },
    ML: {
        name: "🇲🇱 Mali",
        population: "23,2 milhões",
        age: "16 anos",
        future: "Desenvolvimento focado em estabilidade institucional, segurança hídrica e alimentar.",
        chartData: [47.5, 46.0, 44.2, 42.5, 40.5, 38.5, 36.0, 33.5],
        pibData: [2.4, 5.3, 10.6, 13.1, 17.4, 23.0, 31.0, 42.0]
    },
    MZ: {
        name: "🇲🇿 Moçambique",
        population: "33,8 milhões",
        age: "17 anos",
        future: "Transformação econômica radical através da exploração e exportação de gás natural liquefeito.",
        chartData: [43.8, 42.5, 40.5, 38.8, 37.0, 35.2, 33.0, 30.5],
        pibData: [4.1, 6.5, 10.1, 14.8, 14.0, 22.5, 35.0, 52.0]
    },
    MR: {
        name: "🇲🇷 Mauritânia",
        population: "4,8 milhões",
        age: "20 anos",
        future: "Aumento das exportações de minérios e projetos pioneiros em produção de hidrogênio verde.",
        chartData: [38.5, 37.2, 35.5, 33.8, 32.0, 30.5, 28.5, 26.5],
        pibData: [1.2, 2.1, 4.3, 4.8, 7.9, 10.5, 14.5, 19.5]
    },
    MW: {
        name: "🇲🇼 Malawi",
        population: "20,9 milhões",
        age: "18 anos",
        future: "Modernização da agricultura nacional e investimentos em tecnologia no campo.",
        chartData: [44.5, 42.8, 40.0, 36.5, 33.8, 31.0, 28.5, 26.0],
        pibData: [1.7, 2.7, 5.4, 6.3, 11.9, 14.5, 19.5, 26.0]
    },
    NA: {
        name: "🇳🇦 Namíbia",
        population: "2,6 milhões",
        age: "22 anos",
        future: "Exploração de energias renováveis e atração de projetos globais de hidrogênio verde.",
        chartData: [31.5, 30.2, 29.0, 27.5, 26.2, 25.0, 23.5, 22.0],
        pibData: [3.9, 6.3, 11.2, 11.4, 10.7, 14.0, 18.5, 24.0]
    },
    NE: {
        name: "🇳🇪 Níger",
        population: "27,2 milhões",
        age: "15 anos",
        future: "Desafios com a rápida transição demográfica, com foco na expansão e modernização da mineração.",
        chartData: [52.5, 51.0, 49.5, 47.2, 45.0, 42.5, 39.5, 36.5],
        pibData: [1.7, 3.4, 5.7, 7.2, 13.7, 19.5, 28.0, 40.0]
    },
    NG: {
        name: "🇳🇬 Nigéria",
        population: "223,8 milhões",
        age: "18 anos",
        future: "Maior mercado consumidor da África continental e rápido crescimento de megalópoles.",
        chartData: [42.1, 41.5, 40.2, 38.5, 36.4, 34.1, 31.5, 29.0],
        pibData: [69.4, 112.2, 361.5, 493.0, 432.3, 477.3, 580.0, 720.0]
    },
    RW: {
        name: "🇷🇼 Ruanda",
        population: "14,1 milhões",
        age: "20 anos",
        future: "Hub consolidado de inovação, polo financeiro emergente e referência em digitalização.",
        chartData: [39.5, 37.8, 35.0, 32.5, 30.2, 28.0, 26.0, 24.0],
        pibData: [1.7, 2.5, 5.6, 8.2, 10.3, 15.0, 21.5, 30.0]
    },
    EH: {
        name: "🇪🇭 Saara Ocidental",
        population: "600 mil",
        age: "28 anos",
        future: "Região com potencial não explorado em pesca e extração de fosfato.",
        chartData: [26.5, 24.8, 23.0, 21.5, 20.2, 19.0, 18.0, 17.0],
        pibData: [0.5, 0.7, 0.9, 1.1, 1.3, 1.6, 2.0, 2.5]
    },
    SD: {
        name: "🇸🇩 Sudão",
        population: "48,1 milhões",
        age: "19 anos",
        future: "Vasto potencial agropecuário adormecido aguardando estabilidade política.",
        chartData: [38.5, 37.0, 35.2, 33.8, 32.0, 30.5, 28.5, 26.5],
        pibData: [12.2, 26.5, 65.6, 82.8, 31.3, 40.0, 52.0, 68.0]
    },
    SS: {
        name: "🇸🇸 Sudão do Sul",
        population: "11 milhões",
        age: "19 anos",
        future: "Necessidade imperativa de diversificação da economia petrolífera para agricultura e construção.",
        chartData: [42.5, 41.0, 38.8, 36.5, 34.2, 32.0, 30.0, 27.5],
        pibData: [2.0, 3.5, 17.1, 11.9, 4.3, 6.0, 8.5, 12.0]
    },
    SN: {
        name: "🇸🇳 Senegal",
        population: "18,2 milhões",
        age: "19 anos",
        future: "Forte crescimento estimulado pela nova indústria de gás e solidez institucional duradoura.",
        chartData: [40.5, 39.0, 37.2, 35.0, 33.1, 31.0, 28.5, 26.0],
        pibData: [4.6, 8.7, 16.1, 17.7, 24.5, 32.0, 42.5, 58.0]
    },
    SL: {
        name: "🇸🇱 Serra Leoa",
        population: "8,7 milhões",
        age: "19 anos",
        future: "Reforma estratégica no setor de mineração e atração de investimentos em infraestrutura.",
        chartData: [44.5, 43.0, 40.5, 38.2, 36.0, 33.8, 31.5, 29.0],
        pibData: [0.6, 1.2, 2.5, 4.2, 4.0, 5.5, 7.5, 10.0]
    },
    SZ: {
        name: "🇸🇿 Eswatini",
        population: "1,2 milhão",
        age: "23 anos",
        future: "Modernização focada da indústria de cana-de-açúcar e ampliação do turismo regional.",
        chartData: [32.5, 31.0, 29.5, 28.0, 26.5, 25.0, 23.5, 22.0],
        pibData: [1.7, 3.1, 4.4, 4.0, 3.9, 4.8, 5.8, 7.2]
    },
    TD: {
        name: "🇹🇩 Chade",
        population: "18,2 milhões",
        age: "16 anos",
        future: "Foco crescente na segurança regional e diversificação econômica voltada à agropecuária.",
        chartData: [48.5, 47.0, 45.2, 43.0, 41.1, 39.0, 36.5, 33.5],
        pibData: [1.4, 5.8, 10.6, 10.9, 11.3, 14.5, 19.5, 26.0]
    },
    TG: {
        name: "🇹🇬 Togo",
        population: "9 milhões",
        age: "19 anos",
        future: "Desenvolvimento contínuo do Porto de Lomé como grande centro logístico da África Ocidental.",
        chartData: [39.5, 38.0, 36.2, 34.5, 32.8, 31.0, 29.0, 27.0],
        pibData: [1.4, 2.1, 3.1, 4.1, 7.3, 10.0, 13.5, 18.0]
    },
    TN: {
        name: "🇹🇳 Tunísia",
        population: "12,4 milhões",
        age: "32 anos",
        future: "Foco agressivo em tecnologia da informação e exportações altamente competitivas para a Europa.",
        chartData: [17.5, 16.8, 18.5, 19.2, 16.5, 15.0, 14.0, 13.0],
        pibData: [21.4, 32.2, 44.0, 43.1, 41.6, 52.0, 68.5, 88.0]
    },
    TZ: {
        name: "🇹🇿 Tanzânia",
        population: "67,4 milhões",
        age: "18 anos",
        future: "Crescimento contínuo como polo turístico e corredor comercial central da África Oriental.",
        chartData: [42.5, 41.0, 39.5, 37.8, 36.2, 34.0, 31.5, 29.0],
        pibData: [13.3, 18.0, 31.4, 45.6, 62.4, 85.0, 120.5, 170.0]
    },
    UG: {
        name: "🇺🇬 Uganda",
        population: "48,5 milhões",
        age: "16 anos",
        future: "Foco na industrialização agrícola e expansão maciça do setor de infraestrutura regional.",
        chartData: [47.5, 46.0, 44.2, 41.8, 39.5, 37.0, 34.5, 31.5],
        pibData: [6.1, 9.0, 20.1, 27.1, 37.6, 52.0, 75.5, 105.0]
    },
    ZA: {
        name: "🇿🇦 África do Sul",
        population: "60,4 milhões",
        age: "28 anos",
        future: "Transição desafiadora para uma matriz energética limpa e fortalecimento de serviços financeiros.",
        chartData: [23.5, 22.8, 21.5, 20.8, 19.5, 18.5, 17.5, 16.5],
        pibData: [136.3, 257.7, 375.3, 317.6, 335.3, 405.0, 490.5, 610.0]
    },
    ZM: {
        name: "🇿🇲 Zâmbia",
        population: "20,5 milhões",
        age: "17 anos",
        future: "Renovação acelerada na mineração de cobre, minério essencial para a transição energética global.",
        chartData: [44.5, 43.0, 41.2, 39.0, 36.8, 34.5, 32.0, 29.5],
        pibData: [3.6, 8.3, 20.2, 21.2, 18.1, 26.0, 35.5, 48.0]
    },
    ZW: {
        name: "🇿🇼 Zimbábue",
        population: "16,6 milhões",
        age: "19 anos",
        future: "Potencial de reestruturação econômica com fortes bases na mineração e desenvolvimento do agronegócio.",
        chartData: [35.5, 34.8, 33.5, 32.0, 30.5, 29.0, 27.5, 26.0],
        pibData: [6.6, 5.8, 12.0, 19.9, 21.5, 28.0, 36.5, 48.0]
    },
    SO: {
        name: "🇸🇴 Somália",
        population: "18,1 milhões",
        age: "16 anos",
        future: "Reconstrução nacional gradual com oportunidades emergentes no setor portuário e de telecomunicações.",
        chartData: [48.5, 47.0, 45.2, 43.5, 41.8, 39.5, 37.0, 34.5],
        pibData: [1.2, 1.8, 2.5, 3.5, 5.0, 7.5, 10.5, 15.0]
    }
};