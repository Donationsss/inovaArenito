// ===========================
// DADOS DOS EVENTOS
// ===========================

const eventsData = {
    // EVENTOS ORIGINAIS (Festival Principal)
    1: {
        tag: '20 NOV',
        title: 'Abertura Oficial',
        description: 'Cerimônia de abertura com apresentações especiais e shows musicais',
        time: '19h00',
        location: 'Teatro Principal',
        ticket: 'Gratuita',
        capacity: '500 pessoas',
        fullDescription: `
            <p>A cerimônia de abertura do Festival Cultural 2025 marca o início de uma semana intensa de celebração artística e cultural. O evento contará com a presença de autoridades locais, artistas renomados e representantes da comunidade cultural.</p>
            <p>A programação especial inclui apresentações musicais exclusivas, performances de dança e uma exposição prévia das principais atrações que serão apresentadas durante todo o festival.</p>
            <p>Não perca essa oportunidade única de fazer parte do início dessa celebração inesquecível! A entrada é gratuita, mas as vagas são limitadas.</p>
        `,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    2: {
        tag: '21 NOV',
        title: 'Mostra de Cinema',
        description: 'Filmes independentes nacionais e internacionais premiados',
        time: '14h00',
        location: 'Cine Teatro',
        ticket: 'R$ 20,00',
        capacity: '200 pessoas',
        fullDescription: `
            <p>A Mostra de Cinema apresenta uma seleção cuidadosa de filmes independentes que conquistaram prêmios em festivais nacionais e internacionais. São produções que abordam temas relevantes com narrativas inovadoras e cinematografia excepcional.</p>
            <p>Serão duas sessões: às 14h com filmes nacionais e às 19h com produções internacionais. Após cada sessão, haverá um debate com críticos de cinema e, quando possível, com os próprios diretores das obras exibidas.</p>
            <p>Uma experiência imperdível para os amantes da sétima arte!</p>
        `,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    3: {
        tag: '22 NOV',
        title: 'Festival de Dança',
        description: 'Apresentações de grupos de dança contemporânea e tradicional',
        time: '18h00',
        location: 'Palco Central',
        ticket: 'Gratuita',
        capacity: '1000 pessoas',
        fullDescription: `
            <p>O Festival de Dança reúne grupos locais e visitantes em uma celebração do movimento e da expressão corporal. Serão apresentados diversos estilos, desde dança contemporânea até manifestações tradicionais da cultura popular brasileira.</p>
            <p>O evento está dividido em duas partes: a primeira apresenta grupos de dança contemporânea com coreografias inovadoras, e a segunda parte celebra as danças tradicionais e folclóricas que fazem parte da nossa rica herança cultural.</p>
            <p>Prepare-se para ser emocionado por performances que misturam técnica, paixão e cultura!</p>
        `,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    4: {
        tag: '23 NOV',
        title: 'Exposição de Arte',
        description: 'Obras de artistas locais e visitantes em diversas linguagens',
        time: '10h00',
        location: 'Galeria Arte',
        ticket: 'Gratuita',
        capacity: 'Livre',
        fullDescription: `
            <p>A Exposição de Arte Visual apresenta obras de artistas locais e convidados em diversas linguagens: pintura, escultura, fotografia, instalações e arte digital. São mais de 50 obras que exploram temas contemporâneos e tradicionais.</p>
            <p>A exposição ficará aberta durante todo o dia, com visitas guiadas às 11h e às 15h. Haverá também uma palestra especial com os artistas participantes, onde eles compartilharão seus processos criativos e inspirações.</p>
            <p>Uma oportunidade única de conhecer e apreciar o talento dos artistas da nossa região e de outras localidades!</p>
        `,
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    5: {
        tag: '24 NOV',
        title: 'Show Nacional',
        description: 'Grande show com artistas renomados da música brasileira',
        time: '20h00',
        location: 'Arena Principal',
        ticket: 'R$ 80,00',
        capacity: '3000 pessoas',
        fullDescription: `
            <p>O Show Nacional é o ponto alto do Festival Cultural 2025! Artistas renomados da música brasileira se apresentarão em um espetáculo inesquecível que celebra a diversidade musical do nosso país.</p>
            <p>O repertório incluirá clássicos da MPB, ritmos regionais, rock brasileiro e muito mais. Será uma noite mágica de celebração da música nacional com produção de alto nível, efeitos visuais impressionantes e uma estrutura de som de primeira qualidade.</p>
            <p>Os ingressos são limitados e a venda será realizada exclusivamente online. Garanta já o seu!</p>
        `,
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    6: {
        tag: '25 NOV',
        title: 'Encerramento',
        description: 'Festa de encerramento com DJ e fogos de artifício',
        time: '21h00',
        location: 'Praça Central',
        ticket: 'Gratuita',
        capacity: '5000 pessoas',
        fullDescription: `
            <p>A grande festa de encerramento do Festival Cultural 2025 promete ser épica! Com DJs renomados, estrutura completa de som e iluminação, e um show pirotécnico espetacular para fechar com chave de ouro.</p>
            <p>A festa contará com múltiplos ambientes musicais, praça de alimentação especial e diversas atrações simultâneas. Será o momento perfeito para celebrar tudo que vivenciamos durante essa semana incrível de cultura e arte.</p>
            <p>O encerramento oficial acontecerá às 23h30 com agradecimentos e um show de fogos de artifício que iluminará toda a cidade. Não perca!</p>
        `,
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    
    // NOVOS EVENTOS - OUTUBRO
    7: {
        tag: '18 OUT',
        title: 'Reunião de Planejamento',
        description: 'Alinhamento final da equipe organizadora do festival',
        time: '10h00',
        location: 'Centro Cultural',
        ticket: 'Restrito',
        capacity: '50 pessoas',
        fullDescription: `
            <p>Reunião estratégica com toda a equipe organizadora do Festival Cultural 2025 para o alinhamento final de todos os detalhes operacionais e artísticos do evento.</p>
            <p>Serão discutidos cronogramas, logística, segurança, programação artística e todas as demandas necessárias para garantir o sucesso do festival.</p>
        `,
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    },
    8: {
        tag: '25 OUT',
        title: 'Coletiva de Imprensa',
        description: 'Apresentação oficial do Festival Cultural 2025',
        time: '15h00',
        location: 'Sala de Imprensa',
        ticket: 'Credenciados',
        capacity: '100 pessoas',
        fullDescription: `
            <p>Coletiva de imprensa para a apresentação oficial do Festival Cultural 2025, com a presença de organizadores, patrocinadores e artistas confirmados.</p>
            <p>Será revelada a programação completa, detalhes sobre ingressos, acessibilidade e todas as novidades desta edição histórica do festival.</p>
        `,
        gradient: 'linear-gradient(135deg, #fa8bff 0%, #2bd2ff 90%, #2bff88 100%)'
    },
    9: {
        tag: '31 OUT',
        title: 'Halloween Cultural',
        description: 'Festa temática com música e arte',
        time: '20h00',
        location: 'Praça Central',
        ticket: 'Gratuita',
        capacity: '2000 pessoas',
        fullDescription: `
            <p>Celebre o Halloween com muito arte, música e cultura! Uma festa temática especial que mistura terror, fantasia e expressões artísticas diversas.</p>
            <p>Haverá apresentações teatrais de horror, DJ tocando músicas sombrias, exposições de arte gótica e muito mais. Fantasias são bem-vindas!</p>
        `,
        gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)'
    },
    
    // NOVOS EVENTOS - NOVEMBRO (PRÉ-FESTIVAL)
    10: {
        tag: '01 NOV',
        title: 'Feira de Artesanato',
        description: 'Exposição e venda de artesanato local',
        time: '10h00',
        location: 'Praça Central',
        ticket: 'Gratuita',
        capacity: 'Livre',
        fullDescription: `
            <p>Feira especial de artesanato com trabalhos de artesãos locais e regionais. Uma oportunidade para conhecer e adquirir peças únicas feitas à mão.</p>
            <p>Você encontrará cerâmica, bordados, esculturas em madeira, joias artesanais, cestaria e muito mais. Apoie a economia criativa local!</p>
        `,
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    11: {
        tag: '08 NOV',
        title: 'Oficina de Teatro',
        description: 'Workshop de interpretação teatral',
        time: '14h00',
        location: 'Teatro Principal',
        ticket: 'R$ 30,00',
        capacity: '30 pessoas',
        fullDescription: `
            <p>Workshop intensivo de técnicas de interpretação teatral ministrado por renomados diretores e atores. Uma oportunidade única de aprendizado e desenvolvimento artístico.</p>
            <p>Os participantes terão aulas práticas sobre expressão corporal, voz, improvisação e construção de personagens. Inclui certificado de participação.</p>
        `,
        gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
    },
    12: {
        tag: '15 NOV',
        title: 'Show Pré-Festival',
        description: 'Apresentação especial de aquecimento',
        time: '16h00',
        location: 'Palco Alternativo',
        ticket: 'Gratuita',
        capacity: '800 pessoas',
        fullDescription: `
            <p>Show especial de aquecimento para o Festival Cultural 2025! Bandas e artistas locais se apresentam em uma tarde de muita música e energia.</p>
            <p>Uma prévia do que está por vir no festival principal, com muito rock, pop, MPB e músicas autorais. Venha sentir o clima que tomará conta da cidade!</p>
        `,
        gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    },
    
    // NOVOS EVENTOS - DEZEMBRO
    13: {
        tag: '06 DEZ',
        title: 'Retrospectiva do Festival',
        description: 'Exposição de fotos e vídeos dos melhores momentos',
        time: '17h00',
        location: 'Galeria Arte',
        ticket: 'Gratuita',
        capacity: 'Livre',
        fullDescription: `
            <p>Exposição fotográfica e audiovisual com os melhores momentos do Festival Cultural 2025. Reviva a magia dos shows, apresentações e toda a energia que tomou conta da cidade.</p>
            <p>A exposição conta com fotos profissionais, vídeos exclusivos, depoimentos de artistas e público, além de um painel interativo com as redes sociais do festival.</p>
        `,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    14: {
        tag: '13 DEZ',
        title: 'Concerto de Natal',
        description: 'Apresentação musical natalina especial',
        time: '18h00',
        location: 'Teatro Principal',
        ticket: 'R$ 40,00',
        capacity: '500 pessoas',
        fullDescription: `
            <p>Concerto especial de Natal com orquestra sinfônica e coral. Uma noite mágica celebrando o espírito natalino com músicas clássicas e contemporâneas.</p>
            <p>O repertório inclui clássicos natalinos internacionais e brasileiros, além de surpresas especiais. Um presente para toda a família!</p>
        `,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    15: {
        tag: '20 DEZ',
        title: 'Festa de Fim de Ano',
        description: 'Celebração de encerramento do ano cultural',
        time: '19h00',
        location: 'Centro Cultural',
        ticket: 'Gratuita',
        capacity: '1500 pessoas',
        fullDescription: `
            <p>Grande festa de encerramento do ano cultural! Celebre conosco todas as conquistas e realizações de 2025 com música ao vivo, performances artísticas e muita alegria.</p>
            <p>Será uma noite especial de confraternização, agradecimento ao público e expectativas para o próximo ano. Venha fazer parte dessa celebração!</p>
        `,
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    16: {
        tag: '31 DEZ',
        title: 'Réveillon Cultural',
        description: 'Festa de ano novo com shows e fogos de artifício',
        time: '22h00',
        location: 'Praça Central',
        ticket: 'Gratuita',
        capacity: '10000 pessoas',
        fullDescription: `
            <p>Celebre a chegada de 2026 no maior Réveillon Cultural da cidade! Uma noite épica com shows de grandes artistas, DJs, estrutura gigante e show pirotécnico espetacular à meia-noite.</p>
            <p>Múltiplos palcos, food trucks, área kids e muita energia positiva para começar o ano novo em grande estilo. Traga sua família e amigos!</p>
        `,
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    
    // NOVOS EVENTOS - 2026
    17: {
        tag: '10 JAN',
        title: 'Feira de Arte Urbana',
        description: 'Exposição de grafite e arte de rua',
        time: '10h00',
        location: 'Área Externa',
        ticket: 'Gratuita',
        capacity: 'Livre',
        fullDescription: `
            <p>Feira especial dedicada à arte urbana com exposições de grafite, stencil, lambe-lambe e outras expressões artísticas das ruas.</p>
            <p>Artistas ao vivo criando murais, venda de obras, workshops de técnicas urbanas e muita cultura de rua. Uma celebração da arte que pulsa nas cidades!</p>
        `,
        gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    18: {
        tag: '17 JAN',
        title: 'Festival de Verão',
        description: 'Música, dança e cultura ao ar livre',
        time: '15h00',
        location: 'Praça Central',
        ticket: 'Gratuita',
        capacity: '3000 pessoas',
        fullDescription: `
            <p>Festival de verão com muita música, dança, arte e cultura ao ar livre! Aproveite a estação mais quente do ano com apresentações incríveis e muita energia positiva.</p>
            <p>Shows de reggae, samba, pop, apresentações de dança, food trucks e área kids. Um dia perfeito para toda a família curtir o verão!</p>
        `,
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    19: {
        tag: '24 JAN',
        title: 'Noite de Jazz',
        description: 'Apresentações de jazz ao vivo',
        time: '18h00',
        location: 'Café Cultural',
        ticket: 'R$ 50,00',
        capacity: '150 pessoas',
        fullDescription: `
            <p>Noite intimista de jazz com músicos renomados em um ambiente aconchegante. Uma experiência sofisticada para os apreciadores do bom jazz.</p>
            <p>Repertório eclético passando por standards, jazz brasileiro, bebop e fusão. Inclui welcome drink e petiscos especiais.</p>
        `,
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    20: {
        tag: '07 FEV',
        title: 'Bloco Cultural',
        description: 'Pré-carnaval com muita música e dança',
        time: '16h00',
        location: 'Praça Central',
        ticket: 'Gratuita',
        capacity: '5000 pessoas',
        fullDescription: `
            <p>Bloco de rua para esquentar o carnaval com muita música, dança e alegria! Venha fantasiado e celebre a cultura popular brasileira.</p>
            <p>Marchinhas, sambas, frevo e muito mais. Bateria ao vivo, trio elétrico e muita animação. O carnaval começa aqui!</p>
        `,
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    21: {
        tag: '14 FEV',
        title: 'Sarau do Amor',
        description: 'Noite romântica com música e poesia',
        time: '19h00',
        location: 'Teatro Principal',
        ticket: 'R$ 60,00 (casal)',
        capacity: '300 pessoas',
        fullDescription: `
            <p>Celebre o Dia dos Namorados com uma noite especial de poesia, música ao vivo e romantismo. Um sarau intimista para casais apaixonados.</p>
            <p>Apresentações de poemas românticos, música acústica, iluminação especial e um ambiente perfeito para celebrar o amor.</p>
        `,
        gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
    },
    22: {
        tag: '21 FEV',
        title: 'Oficina de Samba',
        description: 'Aprenda a tocar instrumentos de samba',
        time: '15h00',
        location: 'Sala de Música',
        ticket: 'R$ 40,00',
        capacity: '40 pessoas',
        fullDescription: `
            <p>Oficina prática de instrumentos de samba ministrada por sambistas experientes. Aprenda a tocar pandeiro, tamborim, surdo, cuíca e cavaquinho.</p>
            <p>Inclui material didático, instrumentos para prática e certificado. Uma oportunidade única de mergulhar na cultura do samba brasileiro!</p>
        `,
        gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    }
};

// ===========================
// FUNÇÕES DO MODAL
// ===========================

function openModal(eventId) {
    const modal = document.getElementById('eventModal');
    const event = eventsData[eventId];
    
    if (!event) return;

    // Preenche os dados do modal
    document.getElementById('modalTag').textContent = event.tag;
    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalDescription').textContent = event.description;
    document.getElementById('modalTime').textContent = event.time;
    document.getElementById('modalLocation').textContent = event.location;
    document.getElementById('modalTicket').textContent = event.ticket;
    document.getElementById('modalCapacity').textContent = event.capacity;
    document.getElementById('modalFullDescription').innerHTML = '<h3>Sobre o Evento</h3>' + event.fullDescription;
    
    // Aplica o gradiente da imagem
    const modalImage = document.getElementById('modalImage');
    modalImage.style.background = event.gradient;
    
    // Abre o modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Adiciona animação suave
    setTimeout(() => {
        modal.querySelector('.modal__container').style.animation = 'slideUp 0.4s ease';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    
    // Fecha o modal
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Fecha modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Previne propagação de cliques dentro do container
document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.querySelector('.modal__container');
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
