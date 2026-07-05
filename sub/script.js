console.log("Script e Gráficos carregados com sucesso!");

let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }
    lastScroll = currentScroll;
});

// ==========================================
// 1. GRÁFICO DE NATALIDADE (País x Mundo)
// ==========================================
const ctxPop = document.getElementById('popGrafico').getContext('2d');
let graficoPop = new Chart(ctxPop, {
    type: 'line',
    data: {
        labels: ['2000', '2005', '2010', '2015', '2020', '2026', '2030', '2035'],
        datasets: [
            {
                label: 'País / Bloco',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: '#F58220', // Laranja
                borderWidth: 3,
                tension: 0.4
            },
            {
                label: 'Média Mundial',
                data: [22.5, 21.2, 19.8, 18.6, 17.4, 16.5, 15.8, 15.2], // Nascimentos por 1.000
                borderColor: '#3366CC', // Azul clássico
                borderWidth: 2,
                borderDash: [5, 5], // Linha tracejada
                tension: 0.4,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            title: { display: true, text: 'Taxa de Natalidade Comparada', font: {size: 14} }
        },
        scales: {
            y: {
                type: 'linear', display: true, position: 'left',
                title: { display: true, text: 'Nascimentos por 1.000 habitantes', color: '#555' }
            }
        }
    }
});

// ==========================================
// 2. GRÁFICO DO PIB (Produto Interno Bruto)
// ==========================================
const ctxPib = document.getElementById('pibGrafico').getContext('2d');
let graficoPib = new Chart(ctxPib, {
    type: 'bar',
    data: {
        labels: ['2000', '2005', '2010', '2015', '2020', '2026', '2030', '2035'],
        datasets: [{
            label: 'PIB (Bilhões US$)',
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(46, 125, 50, 0.8)', // Verde
            borderRadius: 4
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Evolução do PIB (Bilhões de Dólares)', font: {size: 14} }
        }
    }
});

// ==========================================
// 3. CARREGAMENTO DO MAPA E CLIQUE
// ==========================================
fetch("./sub/assets/africa.svg")
    .then(res => res.text())
    .then(svg => {
        document.getElementById("svg-container").innerHTML = svg;
        let paisAtivo = null;

        Object.keys(countries).forEach(country => {
            const element = document.getElementById(country);
            if (!element) return;
            const originalColor = element.style.fill || element.getAttribute("fill") || "#CFCFCF";

            element.addEventListener("mouseenter", () => {
                if (paisAtivo !== element) { element.style.fill = "#FFB677"; element.style.cursor = "pointer"; }
            });

            element.addEventListener("mouseleave", () => {
                if (paisAtivo !== element) element.style.fill = originalColor;
            });

            element.addEventListener("click", () => {
                if (paisAtivo && paisAtivo !== element) paisAtivo.style.fill = paisAtivo.getAttribute("data-cor-original");
                
                element.setAttribute("data-cor-original", originalColor);
                element.style.fill = "#F58220";
                paisAtivo = element;

                // Atualiza Textos
                document.getElementById("country-name").innerHTML = countries[country].name;
                document.getElementById("population").innerHTML = countries[country].population;
                document.getElementById("age").innerHTML = countries[country].age;
                document.getElementById("future").innerHTML = countries[country].future;

                // Atualiza Gráfico de População (Natalidade)
                if (countries[country].chartData) {
                    graficoPop.data.datasets[0].data = countries[country].chartData;
                }
                graficoPop.update();

                // Atualiza Gráfico de PIB
                if (countries[country].pibData) {
                    graficoPib.data.datasets[0].data = countries[country].pibData;
                } else {
                    graficoPib.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
                }
                graficoPib.update();
            });
        });
    });

// ==========================================
// 4. LÓGICA MATEMÁTICA DOS BLOCOS
// ==========================================
function destacarBloco(nomeBloco, paisesDoBloco) {
    // PROTEÇÃO: Se o botão HTML estiver desatualizado e enviar só a array
    if (paisesDoBloco === undefined) {
        paisesDoBloco = nomeBloco; 
        nomeBloco = "Região Selecionada";
    }

    let popTotal = 0;
    let somaIdades = 0;
    let qtdPaisesComIdade = 0;
    
    let mediaNatalidade = [0, 0, 0, 0, 0, 0, 0, 0];
    let somaPib = [0, 0, 0, 0, 0, 0, 0, 0];
    let qtdPaisesComGrafico = 0;

    Object.keys(countries).forEach(sigla => {
        const elementoPais = document.getElementById(sigla);
        if (elementoPais) {
            if (paisesDoBloco.includes(sigla)) {
                elementoPais.style.fill = "#F58220";

                const dados = countries[sigla];
                
                // Conversão inteligente de População (corrige o "600 mil")
                let popTexto = dados.population.toLowerCase().replace(',', '.');
                let popNum = parseFloat(popTexto);
                if (popTexto.includes("mil") && !popTexto.includes("milh")) {
                    popNum = popNum / 1000; // Transforma 600 em 0.6
                }
                if (!isNaN(popNum)) popTotal += popNum;

                // Média de idade
                let idadeNum = parseFloat(dados.age);
                if (!isNaN(idadeNum)) {
                    somaIdades += idadeNum;
                    qtdPaisesComIdade++;
                }

                // Soma dos Gráficos
                if (dados.chartData && dados.pibData) {
                    qtdPaisesComGrafico++;
                    for (let i = 0; i < 8; i++) {
                        mediaNatalidade[i] += dados.chartData[i];
                        somaPib[i] += dados.pibData[i];
                    }
                }
            } else {
                elementoPais.style.fill = "#E0E0E0"; 
            }
        }
    });

    // Fecha as médias matemáticas
    let idadeMediaFinal = qtdPaisesComIdade > 0 ? Math.round(somaIdades / qtdPaisesComIdade) : 0;
    
    for (let i = 0; i < 8; i++) {
        mediaNatalidade[i] = qtdPaisesComGrafico > 0 ? parseFloat((mediaNatalidade[i] / qtdPaisesComGrafico).toFixed(1)) : 0;
        somaPib[i] = parseFloat(somaPib[i].toFixed(1)); 
    }

    // Formata o texto final para Milhões ou Bilhões
    let popTextoFinal = popTotal > 1000 
        ? (popTotal / 1000).toFixed(2).replace('.', ',') + " bilhões" 
        : popTotal.toFixed(1).replace('.', ',') + " milhões";

    // Atualiza a tela com o resultado geopolítico
    document.getElementById("country-name").innerHTML = "🌍 Bloco: " + nomeBloco;
    document.getElementById("population").innerHTML = popTextoFinal;
    document.getElementById("age").innerHTML = idadeMediaFinal + " anos (média)";
    document.getElementById("future").innerHTML = "Desempenho consolidado dos " + paisesDoBloco.length + " países membros.";

    // Anima os gráficos
    graficoPop.data.datasets[0].data = mediaNatalidade;
    graficoPop.update();

    graficoPib.data.datasets[0].data = somaPib;
    graficoPib.update();
}

function resetarMapa() {
    Object.keys(countries).forEach(sigla => {
        const elementoPais = document.getElementById(sigla);
        if (elementoPais) {
            const corOriginal = elementoPais.getAttribute("data-cor-original") || "#CFCFCF";
            elementoPais.style.fill = corOriginal;
        }
    });

    document.getElementById("country-name").innerHTML = "Passe o mouse ou clique";
    document.getElementById("population").innerHTML = "—";
    document.getElementById("age").innerHTML = "—";
    document.getElementById("future").innerHTML = "Selecione um país ou bloco para visualizar os dados.";
    
    graficoPop.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
    graficoPop.update();
    graficoPib.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
    graficoPib.update();
}