// ==========================================
// INICIALIZAÇÃO DO SCRIPT
// ==========================================
console.log("Script e Gráficos carregados com sucesso!");

// ==========================================
// 1. MENU INTELIGENTE (ESCONDE AO ROLAR)
// ==========================================
let lastScroll = 0;
const header = document.getElementById("header");

if (header) {
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
        lastScroll = currentScroll;
    });
}

// ==========================================
// 2. GRÁFICOS INTERATIVOS (CHART.JS)
// ==========================================
const ctxPop = document.getElementById('popGrafico')?.getContext('2d');
let graficoPop;
if (ctxPop) {
    graficoPop = new Chart(ctxPop, {
        type: 'line',
        data: {
            labels: ['2000', '2005', '2010', '2015', '2020', '2026', '2030', '2035'],
            datasets: [
                {
                    label: 'País / Bloco',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: '#F58220', // Laranja Institucional
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'Média Mundial',
                    data: [22.5, 21.2, 19.8, 18.6, 17.4, 16.5, 15.8, 15.2],
                    borderColor: '#3366CC',
                    borderWidth: 2,
                    borderDash: [5, 5],
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
}

const ctxPib = document.getElementById('pibGrafico')?.getContext('2d');
let graficoPib;
if (ctxPib) {
    graficoPib = new Chart(ctxPib, {
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
}

// ==========================================
// 3. CARREGAMENTO DO MAPA E INTERATIVIDADE
// ==========================================
let paisAtivo = null;
let chaveConexaoAtual = 'map_brazil_desc'; 

function obterChaveConexaoBrasil(sigla) {
    const palop = ['AO', 'MZ', 'GW', 'CV', 'ST'];
    const brics = ['ZA', 'EG', 'ET'];
    const cedeao = ['NG', 'GH', 'CI', 'SN', 'ML', 'NE', 'BF', 'TG', 'BJ', 'LR', 'SL', 'GN', 'GW', 'GM'];
    const eac = ['KE', 'TZ', 'UG', 'RW', 'BI', 'SS', 'CD', 'SO'];

    if (palop.includes(sigla)) return 'br_palop';
    if (brics.includes(sigla)) return 'br_brics';
    if (sigla === 'NG') return 'br_nigeria';
    if (cedeao.includes(sigla)) return 'br_cedeao';
    if (eac.includes(sigla)) return 'br_eac';
    return 'br_default';
}

fetch("./assets/africa.svg")
    .then(res => res.text())
    .then(svg => {
        const svgContainer = document.getElementById("svg-container");
        if (!svgContainer) return;
        
        svgContainer.innerHTML = svg;

        if (typeof countries !== 'undefined') {
            Object.keys(countries).forEach(country => {
                const element = document.getElementById(country);
                if (!element) return;
                
                const originalColor = element.style.fill || element.getAttribute("fill") || "#CFCFCF";
                element.setAttribute("data-cor-padrao", originalColor);
                element.setAttribute("data-cor-atual", originalColor);

                element.addEventListener("mouseenter", () => {
                    const corAtual = element.getAttribute("data-cor-atual");
                    if (paisAtivo !== element && corAtual !== "#F58220") { 
                        element.style.fill = "#FFB677"; 
                        element.style.cursor = "pointer"; 
                    } else if (corAtual === "#F58220") {
                        element.style.cursor = "pointer";
                    }
                });

                element.addEventListener("mouseleave", () => {
                    if (paisAtivo !== element) {
                        element.style.fill = element.getAttribute("data-cor-atual") || "#CFCFCF";
                    }
                });

                element.addEventListener("click", () => {
                    if (paisAtivo && paisAtivo !== element) {
                        paisAtivo.style.fill = paisAtivo.getAttribute("data-cor-atual") || "#CFCFCF";
                    }
                    
                    element.style.fill = "#F58220";
                    paisAtivo = element;

                    // Atualiza Textos (O future do país individual vem do data.js)
                    document.getElementById("country-name").innerHTML = countries[country].name;
                    document.getElementById("population").innerHTML = countries[country].population;
                    document.getElementById("age").innerHTML = countries[country].age;
                    document.getElementById("future").innerHTML = countries[country].future;

                    // Atualiza Conexão Brasil
                    chaveConexaoAtual = obterChaveConexaoBrasil(country);
                    const langAtual = localStorage.getItem('preferredLang') || 'pt';
                    if (translations[langAtual] && translations[langAtual][chaveConexaoAtual]) {
                        document.getElementById("brazil-connection").innerHTML = translations[langAtual][chaveConexaoAtual];
                    }

                    // Atualiza Gráficos
                    if (graficoPop && countries[country].chartData) {
                        graficoPop.data.datasets[0].data = countries[country].chartData;
                        graficoPop.update();
                    }
                    if (graficoPib && countries[country].pibData) {
                        graficoPib.data.datasets[0].data = countries[country].pibData;
                    } else if (graficoPib) {
                        graficoPib.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
                    }
                    if (graficoPib) graficoPib.update();
                });
            });
        }
    }).catch(err => console.error("Erro ao carregar o mapa SVG:", err));

// ==========================================
// 4. LÓGICA MATEMÁTICA DOS BLOCOS GEOPOLÍTICOS
// ==========================================
function destacarBloco(nomeBloco, paisesDoBloco) {
    if (typeof countries === 'undefined') return;
    
    if (paisesDoBloco === undefined) {
        paisesDoBloco = nomeBloco; 
        nomeBloco = "Região Selecionada";
    }

    if (paisesDoBloco === 'ALL') {
        paisesDoBloco = Object.keys(countries);
    }

    let popTotal = 0;
    let somaIdades = 0;
    let qtdPaisesComIdade = 0;
    let mediaNatalidade = [0, 0, 0, 0, 0, 0, 0, 0];
    let somaPib = [0, 0, 0, 0, 0, 0, 0, 0];
    let qtdPaisesComGrafico = 0;

    paisAtivo = null;

    Object.keys(countries).forEach(sigla => {
        const elementoPais = document.getElementById(sigla);
        if (elementoPais) {
            if (paisesDoBloco.includes(sigla)) {
                elementoPais.style.fill = "#F58220";
                elementoPais.setAttribute("data-cor-atual", "#F58220"); 
                
                const dados = countries[sigla];
                let popTexto = dados.population.toLowerCase().replace(',', '.');
                let popNum = parseFloat(popTexto);
                if (popTexto.includes("mil") && !popTexto.includes("milh")) {
                    popNum = popNum / 1000; 
                }
                if (!isNaN(popNum)) popTotal += popNum;

                let idadeNum = parseFloat(dados.age);
                if (!isNaN(idadeNum)) {
                    somaIdades += idadeNum;
                    qtdPaisesComIdade++;
                }

                if (dados.chartData && dados.pibData) {
                    qtdPaisesComGrafico++;
                    for (let i = 0; i < 8; i++) {
                        mediaNatalidade[i] += dados.chartData[i];
                        somaPib[i] += dados.pibData[i];
                    }
                }
            } else {
                elementoPais.style.fill = "#E0E0E0"; 
                elementoPais.setAttribute("data-cor-atual", "#E0E0E0"); 
            }
        }
    });

    let idadeMediaFinal = qtdPaisesComIdade > 0 ? Math.round(somaIdades / qtdPaisesComIdade) : 0;
    
    for (let i = 0; i < 8; i++) {
        mediaNatalidade[i] = qtdPaisesComGrafico > 0 ? parseFloat((mediaNatalidade[i] / qtdPaisesComGrafico).toFixed(1)) : 0;
        somaPib[i] = parseFloat(somaPib[i].toFixed(1)); 
    }

    // Puxa o idioma atual para formatar os dados dinamicamente
    const langAtual = localStorage.getItem('preferredLang') || 'pt';
    const t = translations[langAtual];

    let separador = langAtual === 'en' ? '.' : ',';
    let popTextoFinal = popTotal > 1000 
        ? (popTotal / 1000).toFixed(2).replace('.', separador) + t.map_billion 
        : popTotal.toFixed(1).replace('.', separador) + t.map_million;

    document.getElementById("country-name").innerHTML = t.map_bloc_prefix + nomeBloco;
    document.getElementById("population").innerHTML = popTextoFinal;
    document.getElementById("age").innerHTML = idadeMediaFinal + t.map_age_avg;
    document.getElementById("future").innerHTML = t.map_bloc_desc.replace('{n}', paisesDoBloco.length);

    // Define a análise do Bloco na Conexão Brasil
    if (nomeBloco === 'SADC') chaveConexaoAtual = 'br_sadc';
    else if (nomeBloco === 'CEDEAO') chaveConexaoAtual = 'br_cedeao';
    else if (nomeBloco === 'EAC') chaveConexaoAtual = 'br_eac';
    else if (nomeBloco === 'BRICS+') chaveConexaoAtual = 'br_brics';
    else if (nomeBloco === 'AfCFTA' || nomeBloco === 'ZCLC') chaveConexaoAtual = 'br_afcfta';
    else chaveConexaoAtual = 'br_default';

    if (t && t[chaveConexaoAtual]) {
        document.getElementById("brazil-connection").innerHTML = t[chaveConexaoAtual];
    }

    if (graficoPop) {
        graficoPop.data.datasets[0].data = mediaNatalidade;
        graficoPop.update();
    }
    if (graficoPib) {
        graficoPib.data.datasets[0].data = somaPib;
        graficoPib.update();
    }
}

function resetarMapa() {
    if (typeof countries === 'undefined') return;
    
    paisAtivo = null;

    Object.keys(countries).forEach(sigla => {
        const elementoPais = document.getElementById(sigla);
        if (elementoPais) {
            const corOriginal = elementoPais.getAttribute("data-cor-padrao") || "#CFCFCF";
            elementoPais.style.fill = corOriginal;
            elementoPais.setAttribute("data-cor-atual", corOriginal);
        }
    });

    const langAtual = localStorage.getItem('preferredLang') || 'pt';
    const t = translations[langAtual];

    document.getElementById("country-name").innerHTML = t.map_hover;
    document.getElementById("population").innerHTML = "—";
    document.getElementById("age").innerHTML = "—";
    document.getElementById("future").innerHTML = t.map_desc;
    
    chaveConexaoAtual = 'map_brazil_desc';
    if (t && t[chaveConexaoAtual]) {
        document.getElementById("brazil-connection").innerHTML = t[chaveConexaoAtual];
    }

    if (graficoPop) {
        graficoPop.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
        graficoPop.update();
    }
    if (graficoPib) {
        graficoPib.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
        graficoPib.update();
    }
}

// ==========================================
// 5. ENVIO INTELIGENTE DO FORMULÁRIO (NETLIFY)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contato');
    const btnEnviar = document.getElementById('btn-enviar');
    const feedback = document.getElementById('form-feedback');

    if (form && btnEnviar && feedback) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const textoOriginal = btnEnviar.innerText;
            btnEnviar.innerText = 'ENVIANDO... ⏳';
            btnEnviar.disabled = true;
            btnEnviar.style.opacity = '0.7';
            btnEnviar.style.cursor = 'not-allowed';
            feedback.style.display = 'none';

            const formData = new FormData(form);

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    feedback.className = 'feedback-msg sucesso';
                    feedback.innerText = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
                    feedback.style.display = 'block';
                    form.reset(); 
                } else {
                    throw new Error('Falha no envio.');
                }
            } catch (error) {
                feedback.className = 'feedback-msg erro';
                feedback.innerText = '⚠️ Ocorreu um erro no envio. Por favor, tente novamente mais tarde.';
                feedback.style.display = 'block';
            } finally {
                btnEnviar.innerText = textoOriginal;
                btnEnviar.disabled = false;
                btnEnviar.style.opacity = '1';
                btnEnviar.style.cursor = 'pointer';
            }
        });
    }
});

// ==========================================
// 6. SISTEMA MULTI-IDIOMAS INTELIGENTE (i18n)
// ==========================================
const translations = {
    pt: {
        nav_about: "SOBRE NÓS",
        nav_services: "SERVIÇOS",
        nav_press: "IMPRENSA",
        nav_team: "NOSSO GRUPO",
        nav_contact: "CONTATO",
        hero_quote: '"Os <strong>jovens</strong> devem estar na <strong>linha de frente</strong><br>da <strong>mudança</strong> e da <strong>inovação</strong> globais."',
        hero_author: "Ban Ki-moon, ex-Secretário-Geral da ONU",
        about_title: "SOBRE NÓS",
        about_subtitle: "Conectando o Brasil ao continente do futuro através da juventude e da inovação.",
        about_p1: "A <strong>Beyond Africa Generation</strong> é uma iniciativa da Beyond Africa Group para fortalecer as conexões entre o Brasil e África por meio da comunicação e informação.",
        about_p2: "Surgimos com o propósito de dialogar com a juventude africana, o grupo mais populoso do continente africano, cuja média de idade é, assim como a de nossos integrantes, 19 anos.",
        about_p3: "Acreditamos que o diálogo é capaz de construir as pontes necessárias para a integração, afirmando nosso compromisso em incentivar as novas gerações.",
        services_title: "SERVIÇOS",
        s1_title: "Pesquisa de Mercado",
        s1_desc: "Realizamos estudos e análises estratégicas sobre os mercados brasileiro e africano, identificando oportunidades, tendências e desafios para apoiar empresas e organizações na tomada de decisões.",
        s2_title: "Desenvolvimento de Negócios",
        s2_desc: "Conectamos empresas, investidores e instituições para criar parcerias estratégicas e desenvolver oportunidades de negócios entre Brasil e África, promovendo crescimento sustentável e expansão internacional.",
        s3_title: "Desenvolvimento Cultural",
        s3_desc: "Promovemos iniciativas que fortalecem o intercâmbio cultural entre Brasil e África por meio de eventos, projetos, conteúdos e ações que valorizam a diversidade, aproximam sociedades e incentivam a cooperação entre as novas gerações.",
        ticker_title: "Empresas e organizações que confiam no nosso trabalho",
        ticker_desc: "Construímos relações com instituições respeitadas em diversos setores ao redor do mundo.",
        team_title: "NOSSO GRUPO",
        bio_paulo: "Especialista em relações internacionais e estratégia global de negócios.",
        bio_ellen: "Lidera as iniciativas de cooperação jovem e desenvolvimento institucional.",
        role_heitor: "Analista de Relações Institucionais",
        bio_heitor: "Focado em desenvolvimento econômico, políticas públicas e parcerias estratégicas entre Brasil e África.",
        role_bia: "Analista de Pesquisa e Projetos",
        bio_bia: "Responsável pelo mapeamento de dados socioeconômicos e desenvolvimento de conteúdos acadêmicos.",
        role_isa: "Analista de Cooperação Cultural",
        bio_isa: "Atua no intercâmbio de iniciativas socioeducativas e na aproximação entre sociedades jovens.",
        role_camilly: "Analista de Comunicação Estratégica",
        bio_camilly: "Focada na articulação de mídia, difusão de informação e impacto social dos projetos do grupo.",
        map_filter_title: "Destacar Blocos:",
        map_btn_clear: "Limpar",
        map_hover: "Passe o mouse ou clique",
        map_pop: "População",
        map_age: "Idade Média",
        map_perspective: "Perspectiva",
        map_desc: "Selecione um país ou bloco para visualizar os dados e projeções econômicas da região.",
        map_brazil_title: "Conexão Brasil-África",
        map_brazil_desc: "Selecione uma região para descobrir os laços diplomáticos, comerciais e culturais com o Brasil.",
        br_sadc: "Forte cooperação em mineração, energia e infraestrutura, liderada pela diplomacia com a África do Sul (BRICS+), além de laços históricos e comerciais com Moçambique e Angola.",
        br_cedeao: "Destaque para a transferência de tecnologia agrícola tropical (Embrapa), intenso comércio de commodities energéticas e rotas aéreas diretas conectando São Paulo à África Ocidental.",
        br_eac: "Parcerias em rápida expansão no setor de energias renováveis, biocombustíveis e inovação em agronegócio para fortalecimento da segurança alimentar na África Oriental.",
        br_palop: "Parceria estratégica facilitada pela CPLP e identidade linguística, com intenso intercâmbio universitário, cultural e cooperação técnica em saúde, direito e educação.",
        br_brics: "Alinhamento geopolítico de peso no BRICS+ (África do Sul, Egito e Etiópia), impulsionando investimentos industriais, aviação civil (Embraer) e expansão do comércio do Sul Global.",
        br_afcfta: "Maior área de livre comércio do mundo. O Brasil e o Mercosul buscam articulação direta com a AfCFTA para criar um corredor comercial gigante entre a América do Sul e os 54 países africanos.",
        br_nigeria: "Um dos maiores parceiros comerciais do Brasil no continente, concentrado no setor petroquímico, energia e forte exportação brasileira de açúcar, cereais e manufaturados.",
        br_default: "Cooperação técnica em agricultura tropical, diálogo multilateral e grande potencial de expansão comercial através da Zona de Livre Comércio Continental Africana (AfCFTA).",
        contact_title: "FALE CONOSCO",
        contact_desc: "Tem alguma dúvida, proposta ou deseja colaborar com nosso projeto? Envie uma mensagem.",
        form_name: "Nome",
        form_lastname: "Sobrenome",
        form_email: "E-mail Corporativo",
        form_msg: "Mensagem",
        form_btn: "ENVIAR MENSAGEM",
        footer_rights: "&copy; 2026 Beyond Africa Group New Generation. Todos os direitos reservados.",
        chart_pop_title: "Taxa de Natalidade Comparada",
        chart_pop_y: "Nascimentos por 1.000 habitantes",
        chart_pop_ds0: "País / Bloco",
        chart_pop_ds1: "Média Mundial",
        chart_pib_title: "Evolução do PIB (Bilhões de Dólares)",
        chart_pib_ds0: "PIB (Bilhões US$)",
        map_bloc_prefix: "🌍 Bloco: ",
        map_bloc_desc: "Desempenho consolidado dos {n} países membros.",
        map_age_avg: " anos (média)",
        map_billion: " bilhões",
        map_million: " milhões"
    },
    en: {
        nav_about: "ABOUT US",
        nav_services: "SERVICES",
        nav_press: "PRESS",
        nav_team: "OUR TEAM",
        nav_contact: "CONTACT",
        hero_quote: '"<strong>Youth</strong> must be at the <strong>forefront</strong><br>of global <strong>change</strong> and <strong>innovation</strong>."',
        hero_author: "Ban Ki-moon, former UN Secretary-General",
        about_title: "ABOUT US",
        about_subtitle: "Connecting Brazil to the continent of the future through youth and innovation.",
        about_p1: "<strong>Beyond Africa Generation</strong> is an initiative by the Beyond Africa Group to strengthen connections between Brazil and Africa through communication and information.",
        about_p2: "We emerged with the purpose of engaging directly with African youth, the most populous group on the continent, whose average age is, like our members, just 19 years old.",
        about_p3: "We believe that dialogue builds the necessary bridges for integration, affirming our commitment to encouraging new generations.",
        services_title: "SERVICES",
        s1_title: "Market Research",
        s1_desc: "We conduct strategic studies and analyses on Brazilian and African markets, identifying opportunities, trends, and challenges to support companies and organizations in decision-making.",
        s2_title: "Business Development",
        s2_desc: "We connect companies, investors, and institutions to build strategic partnerships and develop business opportunities between Brazil and Africa, promoting sustainable growth and international expansion.",
        s3_title: "Cultural Development",
        s3_desc: "We promote initiatives that strengthen cultural exchange between Brazil and Africa through events, projects, content, and actions that value diversity, connect societies, and encourage youth cooperation.",
        ticker_title: "Companies and organizations that trust our work",
        ticker_desc: "We build relationships with respected institutions across diverse sectors around the globe.",
        team_title: "OUR TEAM",
        bio_paulo: "Specialist in international relations and global business strategy.",
        bio_ellen: "Leads youth cooperation initiatives and institutional development.",
        role_heitor: "Institutional Relations Analyst",
        bio_heitor: "Focused on economic development, public policy, and strategic partnerships between Brazil and Africa.",
        role_bia: "Research and Projects Analyst",
        bio_bia: "Responsible for mapping socioeconomic data and developing academic content.",
        role_isa: "Cultural Cooperation Analyst",
        bio_isa: "Works on the exchange of socio-educational initiatives and building bridges between young societies.",
        role_camilly: "Strategic Communications Analyst",
        bio_camilly: "Focused on media coordination, information dissemination, and the social impact of the group's projects.",
        map_filter_title: "Highlight Blocs:",
        map_btn_clear: "Clear",
        map_hover: "Hover or click",
        map_pop: "Population",
        map_age: "Average Age",
        map_perspective: "Perspective",
        map_desc: "Select a country or bloc to view regional data and economic projections.",
        map_brazil_title: "Brazil-Africa Connection",
        map_brazil_desc: "Select a region to discover diplomatic, commercial, and cultural ties with Brazil.",
        br_sadc: "Strong cooperation in mining, energy, and infrastructure, led by diplomacy with South Africa (BRICS+), alongside historic and commercial ties with Mozambique and Angola.",
        br_cedeao: "Highlighted by tropical agricultural technology transfer (Embrapa), intense energy commodity trading, and direct flight routes connecting São Paulo to West Africa.",
        br_eac: "Rapidly expanding partnerships in renewable energy, biofuels, and agribusiness innovation to strengthen food security in East Africa.",
        br_palop: "Strategic partnership facilitated by the CPLP and shared linguistic identity, featuring intense university exchange, cultural ties, and technical cooperation in health and education.",
        br_brics: "Major geopolitical alignment within BRICS+ (South Africa, Egypt, and Ethiopia), boosting industrial investments, civil aviation (Embraer), and Global South trade expansion.",
        br_afcfta: "The world's largest free trade area. Brazil and Mercosur seek direct integration with AfCFTA to build a massive trade corridor between South America and 54 African nations.",
        br_nigeria: "One of Brazil's largest trading partners on the continent, focused on petrochemicals, energy, and strong Brazilian exports of sugar, cereals, and manufactured goods.",
        br_default: "Technical cooperation in tropical agriculture, multilateral dialogue, and significant trade expansion potential through the African Continental Free Trade Area (AfCFTA).",
        contact_title: "CONTACT US",
        contact_desc: "Have a question, proposal, or want to collaborate with our project? Send us a message.",
        form_name: "First Name",
        form_lastname: "Last Name",
        form_email: "Corporate E-mail",
        form_msg: "Message",
        form_btn: "SEND MESSAGE",
        footer_rights: "&copy; 2026 Beyond Africa Group New Generation. All rights reserved.",
        chart_pop_title: "Compared Birth Rate",
        chart_pop_y: "Births per 1,000 inhabitants",
        chart_pop_ds0: "Country / Bloc",
        chart_pop_ds1: "World Average",
        chart_pib_title: "GDP Evolution (Billions USD)",
        chart_pib_ds0: "GDP (Billions USD)",
        map_bloc_prefix: "🌍 Bloc: ",
        map_bloc_desc: "Consolidated performance of the {n} member countries.",
        map_age_avg: " years (average)",
        map_billion: " billion",
        map_million: " million"
    },
    fr: {
        nav_about: "À PROPOS",
        nav_services: "SERVICES",
        nav_press: "PRESSE",
        nav_team: "NOTRE ÉQUIPE",
        nav_contact: "CONTACT",
        hero_quote: '"Les <strong>jeunes</strong> doivent être en <strong>première ligne</strong><br>du <strong>changement</strong> et de l\'<strong>innovation</strong> mondiaux."',
        hero_author: "Ban Ki-moon, ancien Secrétaire général de l'ONU",
        about_title: "À PROPOS",
        about_subtitle: "Connecter le Brésil au continent du futur par la jeunesse et l'innovation.",
        about_p1: "<strong>Beyond Africa Generation</strong> est une initiative du Beyond Africa Group visant à renforcer les connexions entre le Brésil et l'Afrique par la communication et l'information.",
        about_p2: "Nous sommes nés avec la volonté de dialoguer directement avec la jeunesse africaine, le groupe le plus peuplé du continent, dont l'âge moyen est, comme celui de nos membres, de seulement 19 ans.",
        about_p3: "Nous croyons que le dialogue permet de bâtir les ponts nécessaires à l'intégration, affirmant notre engagement à encourager les nouvelles générations.",
        services_title: "SERVICES",
        s1_title: "Études de Marché",
        s1_desc: "Nous réalisons des études et des analyses stratégiques sur les marchés brésiliens et africains, identifiant les opportunités, les tendances et les défis pour accompagner les entreprises dans leur prise de décision.",
        s2_title: "Développement Commercial",
        s2_desc: "Nous connectons entreprises, investisseurs et institutions pour créer des partenariats stratégiques et développer des opportunités d'affaires entre le Brésil et l'Afrique, favorisant une croissance durable.",
        s3_title: "Développement Culturel",
        s3_desc: "Nous promouvons des initiatives qui renforcent l'échange culturel entre le Brésil et l'Afrique à travers des événements, des projets et des actions qui valorisent la diversité et rapprochent les sociétés.",
        ticker_title: "Entreprises et organisations qui font confiance à notre travail",
        ticker_desc: "Nous tissons des relations avec des institutions respectées dans divers secteurs à travers le monde.",
        team_title: "NOTRE ÉQUIPE",
        bio_paulo: "Spécialiste en relations internationales et stratégie globale d'entreprise.",
        bio_ellen: "Dirige les initiatives de coopération de la jeunesse et le développement institutionnel.",
        role_heitor: "Analyste en Relations Institutionnelles",
        bio_heitor: "Axé sur le développement économique, les politiques publiques et les partenariats stratégiques entre le Brésil et l'Afrique.",
        role_bia: "Analyste de Recherche et Projets",
        bio_bia: "Responsable de la cartographie des données socio-économiques et du développement de contenus académiques.",
        role_isa: "Analyste en Coopération Culturelle",
        bio_isa: "Œuvre dans l'échange d'initiatives socio-éducatives et le rapprochement entre les jeunes sociétés.",
        role_camilly: "Analyste en Communication Stratégique",
        bio_camilly: "Axée sur la coordination des médias, la diffusion de l'information et l'impact social des projets du groupe.",
        map_filter_title: "Mettre en évidence:",
        map_btn_clear: "Effacer",
        map_hover: "Survolez ou cliquez",
        map_pop: "Population",
        map_age: "Âge Moyen",
        map_perspective: "Perspective",
        map_desc: "Sélectionnez un pays ou un bloc pour afficher les données et projections économiques régionales.",
        map_brazil_title: "Connexion Brésil-Afrique",
        map_brazil_desc: "Sélectionnez une région pour découvrir les liens diplomatiques, commerciaux et culturels avec le Brésil.",
        br_sadc: "Forte coopération dans les mines, l'énergie et les infrastructures, menée par la diplomatie avec l'Afrique du Sud (BRICS+), ainsi que des liens historiques avec le Mozambique et l'Angola.",
        br_cedeao: "Marquée par le transfert de technologie agricole tropicale (Embrapa), un commerce intense de matières premières énergétiques et des vols directs reliant São Paulo à l'Afrique de l'Ouest.",
        br_eac: "Partenariats en pleine expansion dans les énergies renouvelables, les biocarburants et l'innovation agroalimentaire pour renforcer la sécurité alimentaire en Afrique de l'Est.",
        br_palop: "Partenariat stratégique facilité par la CPLP et l'identité linguistique commune, avec de nombreux échanges universitaires, culturels et une coopération technique en santé et éducation.",
        br_brics: "Alignement géopolitique majeur au sein des BRICS+ (Afrique du Sud, Égypte et Éthiopie), stimulant les investissements industriels, l'aviation civile (Embraer) et le commerce du Sud Global.",
        br_afcfta: "La plus grande zone de libre-échange au monde. Le Brésil et le Mercosur recherchent une articulation directe avec la ZLECAf pour créer un géant corridor commercial entre l'Amérique du Sud et 54 pays africains.",
        br_nigeria: "L'un des plus grands partenaires commerciaux du Brésil sur le continent, axé sur la pétrochimie, l'énergie et de fortes exportations brésiliennes de sucre, de céréales et de produits manufacturés.",
        br_default: "Cooperation technique en agriculture tropicale, dialogue multilatéral et fort potentiel d'expansion commerciale grâce à la Zone de libre-échange continentale africaine (ZLECAf).",
        contact_title: "CONTACTEZ-NOUS",
        contact_desc: "Vous avez une question, une proposition ou souhaitez collaborer à notre projet ? Envoyez-nous un message.",
        form_name: "Prénom",
        form_lastname: "Nom",
        form_email: "E-mail Professionnel",
        form_msg: "Message",
        form_btn: "ENVOYER LE MESSAGE",
        footer_rights: "&copy; 2026 Beyond Africa Group New Generation. Tous droits réservés.",
        chart_pop_title: "Taux de Natalité Comparé",
        chart_pop_y: "Naissances pour 1 000 habitants",
        chart_pop_ds0: "Pays / Bloc",
        chart_pop_ds1: "Moyenne Mondiale",
        chart_pib_title: "Évolution du PIB (Milliards USD)",
        chart_pib_ds0: "PIB (Milliards USD)",
        map_bloc_prefix: "🌍 Bloc: ",
        map_bloc_desc: "Performance consolidée des {n} pays membres.",
        map_age_avg: " ans (moyenne)",
        map_billion: " milliards",
        map_million: " millions"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('preferredLang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    if (translations[lang] && translations[lang][chaveConexaoAtual]) {
        document.getElementById("brazil-connection").innerHTML = translations[lang][chaveConexaoAtual];
    }

    if (graficoPop && translations[lang]) {
        graficoPop.options.plugins.title.text = translations[lang].chart_pop_title;
        graficoPop.options.scales.y.title.text = translations[lang].chart_pop_y;
        graficoPop.data.datasets[0].label = translations[lang].chart_pop_ds0;
        graficoPop.data.datasets[1].label = translations[lang].chart_pop_ds1;
        graficoPop.update(); 
    }

    if (graficoPib && translations[lang]) {
        graficoPib.options.plugins.title.text = translations[lang].chart_pib_title;
        graficoPib.data.datasets[0].label = translations[lang].chart_pib_ds0;
        graficoPib.update(); 
    }

    document.querySelectorAll('.language-selector a').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.15)';
        } else {
            btn.style.opacity = '0.4';
            btn.style.transform = 'scale(1)';
        }
    });

    if (typeof resetarMapa === 'function') resetarMapa();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.language-selector a').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('preferredLang') || 'pt';
    changeLanguage(savedLang);
});