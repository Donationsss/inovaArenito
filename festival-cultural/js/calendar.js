// ===========================
// DADOS DA AGENDA POR DIA
// =========================== 

const agendaData = {
    // FESTIVAL CULTURAL PRINCIPAL (Novembro 2025)
    '2025-11-20': {
        date: '20 de Novembro de 2025',
        dayName: 'Quinta-feira',
        events: [
            {
                time: '19:00',
                title: 'Abertura Oficial',
                description: 'Cerimônia de abertura com discursos e apresentações',
                location: 'Teatro Principal'
            },
            {
                time: '20:30',
                title: 'Show de Abertura',
                description: 'Apresentação musical especial',
                location: 'Palco Central'
            },
            {
                time: '22:00',
                title: 'Coquetel de Boas-Vindas',
                description: 'Networking e confraternização',
                location: 'Salão Nobre'
            }
        ]
    },
    '2025-11-21': {
        date: '21 de Novembro de 2025',
        dayName: 'Sexta-feira',
        events: [
            {
                time: '14:00',
                title: 'Mostra de Cinema - Sessão 1',
                description: 'Filmes independentes nacionais',
                location: 'Cine Teatro'
            },
            {
                time: '16:30',
                title: 'Workshop de Fotografia',
                description: 'Técnicas de fotografia artística',
                location: 'Sala 3'
            },
            {
                time: '19:00',
                title: 'Mostra de Cinema - Sessão 2',
                description: 'Filmes internacionais premiados',
                location: 'Cine Teatro'
            },
            {
                time: '21:30',
                title: 'Debate com Cineastas',
                description: 'Bate-papo sobre cinema independente',
                location: 'Auditório'
            }
        ]
    },
    '2025-11-22': {
        date: '22 de Novembro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '15:00',
                title: 'Workshop de Dança',
                description: 'Aula aberta de dança contemporânea',
                location: 'Sala de Ensaio'
            },
            {
                time: '18:00',
                title: 'Festival de Dança - Parte 1',
                description: 'Grupos de dança contemporânea',
                location: 'Palco Central'
            },
            {
                time: '20:00',
                title: 'Festival de Dança - Parte 2',
                description: 'Danças tradicionais e folclóricas',
                location: 'Palco Central'
            },
            {
                time: '22:00',
                title: 'After Party',
                description: 'Festa pós-apresentações',
                location: 'Área Externa'
            }
        ]
    },
    '2025-11-23': {
        date: '23 de Novembro de 2025',
        dayName: 'Domingo',
        events: [
            {
                time: '10:00',
                title: 'Abertura da Exposição',
                description: 'Exposição de arte visual e esculturas',
                location: 'Galeria Arte'
            },
            {
                time: '11:30',
                title: 'Visita Guiada',
                description: 'Tour pela exposição com curador',
                location: 'Galeria Arte'
            },
            {
                time: '15:00',
                title: 'Palestra com Artistas',
                description: 'Bate-papo sobre processo criativo',
                location: 'Auditório'
            },
            {
                time: '17:00',
                title: 'Performance de Arte ao Vivo',
                description: 'Artistas criando obras em tempo real',
                location: 'Praça Central'
            }
        ]
    },
    '2025-11-24': {
        date: '24 de Novembro de 2025',
        dayName: 'Segunda-feira',
        events: [
            {
                time: '18:00',
                title: 'Abertura dos Portões',
                description: 'Início da entrada do público',
                location: 'Arena Principal'
            },
            {
                time: '19:00',
                title: 'Banda de Abertura',
                description: 'Show de artista revelação',
                location: 'Arena Principal'
            },
            {
                time: '20:00',
                title: 'Show Nacional - Atração Principal',
                description: 'Grande show com artistas renomados',
                location: 'Arena Principal'
            },
            {
                time: '22:30',
                title: 'Encerramento do Show',
                description: 'Últimas apresentações da noite',
                location: 'Arena Principal'
            }
        ]
    },
    '2025-11-25': {
        date: '25 de Novembro de 2025',
        dayName: 'Terça-feira',
        events: [
            {
                time: '18:00',
                title: 'Exposição Final',
                description: 'Última chance de ver as obras',
                location: 'Galeria Arte'
            },
            {
                time: '20:00',
                title: 'Apresentação de Talentos Locais',
                description: 'Artistas da região se apresentam',
                location: 'Palco Alternativo'
            },
            {
                time: '21:00',
                title: 'Festa de Encerramento',
                description: 'DJ e fogos de artifício',
                location: 'Praça Central'
            },
            {
                time: '23:30',
                title: 'Encerramento Oficial',
                description: 'Agradecimentos e show de fogos',
                location: 'Palco Central'
            }
        ]
    },
    
    // OUTUBRO 2025 - Eventos Preparatórios
    '2025-10-18': {
        date: '18 de Outubro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '10:00',
                title: 'Reunião de Planejamento',
                description: 'Alinhamento final da equipe organizadora',
                location: 'Centro Cultural'
            },
            {
                time: '14:00',
                title: 'Workshop para Voluntários',
                description: 'Treinamento e orientações gerais',
                location: 'Auditório'
            }
        ]
    },
    '2025-10-25': {
        date: '25 de Outubro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '15:00',
                title: 'Coletiva de Imprensa',
                description: 'Apresentação oficial do Festival Cultural',
                location: 'Sala de Imprensa'
            },
            {
                time: '18:00',
                title: 'Lançamento da Programação',
                description: 'Divulgação completa dos eventos',
                location: 'Teatro Principal'
            }
        ]
    },
    '2025-10-31': {
        date: '31 de Outubro de 2025',
        dayName: 'Sexta-feira',
        events: [
            {
                time: '20:00',
                title: 'Festa de Halloween Cultural',
                description: 'Evento temático com música e arte',
                location: 'Praça Central'
            }
        ]
    },
    
    // NOVEMBRO 2025 - Eventos Extras
    '2025-11-01': {
        date: '01 de Novembro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '10:00',
                title: 'Feira de Artesanato',
                description: 'Exposição e venda de artesanato local',
                location: 'Praça Central'
            }
        ]
    },
    '2025-11-08': {
        date: '08 de Novembro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '14:00',
                title: 'Oficina de Teatro',
                description: 'Workshop de interpretação teatral',
                location: 'Teatro Principal'
            },
            {
                time: '19:00',
                title: 'Sarau Poético',
                description: 'Noite de poesia e música acústica',
                location: 'Café Cultural'
            }
        ]
    },
    '2025-11-15': {
        date: '15 de Novembro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '16:00',
                title: 'Show Pré-Festival',
                description: 'Apresentação especial de aquecimento',
                location: 'Palco Alternativo'
            }
        ]
    },
    
    // DEZEMBRO 2025
    '2025-12-06': {
        date: '06 de Dezembro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '17:00',
                title: 'Retrospectiva do Festival',
                description: 'Exposição de fotos e vídeos dos melhores momentos',
                location: 'Galeria Arte'
            }
        ]
    },
    '2025-12-13': {
        date: '13 de Dezembro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '18:00',
                title: 'Concerto de Natal',
                description: 'Apresentação musical natalina',
                location: 'Teatro Principal'
            }
        ]
    },
    '2025-12-20': {
        date: '20 de Dezembro de 2025',
        dayName: 'Sábado',
        events: [
            {
                time: '19:00',
                title: 'Festa de Fim de Ano',
                description: 'Celebração de encerramento do ano cultural',
                location: 'Centro Cultural'
            }
        ]
    },
    '2025-12-31': {
        date: '31 de Dezembro de 2025',
        dayName: 'Quarta-feira',
        events: [
            {
                time: '22:00',
                title: 'Réveillon Cultural',
                description: 'Festa de ano novo com shows e fogos',
                location: 'Praça Central'
            }
        ]
    },
    
    // JANEIRO 2026
    '2026-01-10': {
        date: '10 de Janeiro de 2026',
        dayName: 'Sábado',
        events: [
            {
                time: '10:00',
                title: 'Feira de Arte Urbana',
                description: 'Exposição de grafite e arte de rua',
                location: 'Área Externa'
            }
        ]
    },
    '2026-01-17': {
        date: '17 de Janeiro de 2026',
        dayName: 'Sábado',
        events: [
            {
                time: '15:00',
                title: 'Festival de Verão',
                description: 'Música, dança e cultura ao ar livre',
                location: 'Praça Central'
            }
        ]
    },
    '2026-01-24': {
        date: '24 de Janeiro de 2026',
        dayName: 'Sábado',
        events: [
            {
                time: '18:00',
                title: 'Noite de Jazz',
                description: 'Apresentações de jazz ao vivo',
                location: 'Café Cultural'
            }
        ]
    },
    
    // FEVEREIRO 2026
    '2026-02-07': {
        date: '07 de Fevereiro de 2026',
        dayName: 'Sábado',
        events: [
            {
                time: '16:00',
                title: 'Bloco Cultural',
                description: 'Pré-carnaval com muita música e dança',
                location: 'Praça Central'
            }
        ]
    },
    '2026-02-14': {
        date: '14 de Fevereiro de 2026',
        dayName: 'Sábado',
        events: [
            {
                time: '19:00',
                title: 'Sarau do Amor',
                description: 'Noite romântica com música e poesia',
                location: 'Teatro Principal'
            }
        ]
    },
    '2026-02-21': {
        date: '21 de Fevereiro de 2026',
        dayName: 'Sábado',
        events: [
            {
                time: '15:00',
                title: 'Oficina de Samba',
                description: 'Aprenda a tocar instrumentos de samba',
                location: 'Sala de Música'
            }
        ]
    }
};

// ===========================
// VARIÁVEIS GLOBAIS
// ===========================

let currentMonth = 9; // Outubro (0-indexado) - Mês atual
let currentYear = 2025;
const today = new Date(2025, 9, 15); // 15 de Outubro de 2025

const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const dayNamesComplete = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
];

// ===========================
// INICIALIZAÇÃO
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initializeYearSelector();
    initializeSelectors();
    renderCalendar();
});

function initializeYearSelector() {
    const yearSelect = document.getElementById('yearSelect');
    const startYear = 2020;
    const endYear = 2030;
    
    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYear) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }
}

function initializeSelectors() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    
    monthSelect.addEventListener('change', () => {
        currentMonth = parseInt(monthSelect.value);
        renderCalendar();
    });
    
    yearSelect.addEventListener('change', () => {
        currentYear = parseInt(yearSelect.value);
        renderCalendar();
    });
}

// ===========================
// RENDERIZAÇÃO DO CALENDÁRIO
// ===========================

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    
    // Atualiza os seletores
    document.getElementById('monthSelect').value = currentMonth;
    document.getElementById('yearSelect').value = currentYear;
    
    // Limpa o calendário
    calendarGrid.innerHTML = '';
    
    // Adiciona os nomes dos dias
    dayNames.forEach(day => {
        const dayNameElement = document.createElement('div');
        dayNameElement.className = 'calendar-day-name';
        dayNameElement.textContent = day;
        calendarGrid.appendChild(dayNameElement);
    });
    
    // Calcula o primeiro dia do mês e total de dias
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Dias do mês anterior
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = createDayElement(
            daysInPrevMonth - i,
            currentMonth - 1,
            currentYear,
            'other-month'
        );
        calendarGrid.appendChild(dayElement);
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createDayElement(day, currentMonth, currentYear);
        calendarGrid.appendChild(dayElement);
    }
    
    // Dias do próximo mês
    const totalCells = calendarGrid.children.length - 7;
    const remainingCells = 42 - totalCells - 7;
    
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = createDayElement(
            day,
            currentMonth + 1,
            currentYear,
            'other-month'
        );
        calendarGrid.appendChild(dayElement);
    }
}

function createDayElement(day, month, year, extraClass = '') {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (extraClass) {
        dayElement.classList.add(extraClass);
    }
    
    // Ajusta mês e ano para meses anteriores/posteriores
    let adjustedMonth = month;
    let adjustedYear = year;
    
    if (month < 0) {
        adjustedMonth = 11;
        adjustedYear = year - 1;
    } else if (month > 11) {
        adjustedMonth = 0;
        adjustedYear = year + 1;
    }
    
    // Verifica se é hoje
    const isToday = day === today.getDate() && 
                    adjustedMonth === today.getMonth() && 
                    adjustedYear === today.getFullYear();
    
    if (isToday) {
        dayElement.classList.add('today');
    }
    
    // Cria a chave da data
    const dateKey = `${adjustedYear}-${String(adjustedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Adiciona atributo data-date para estilização CSS
    dayElement.setAttribute('data-date', dateKey);
    
    // Verifica se tem evento
    if (agendaData[dateKey]) {
        dayElement.classList.add('event-day');
        dayElement.onclick = () => openCalendarModal(dateKey);
    }
    
    const dayNumber = document.createElement('span');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    
    dayElement.appendChild(dayNumber);
    
    return dayElement;
}


// ===========================
// NAVEGAÇÃO
// ===========================

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function goToToday() {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar();
}

// ===========================
// MODAL
// ===========================

function openCalendarModal(dateKey) {
    const modal = document.getElementById('calendarModal');
    const data = agendaData[dateKey];
    
    if (!data) return;

    // Preenche o cabeçalho
    const modalHeader = modal.querySelector('.modal__header');
    modalHeader.setAttribute('data-date', dateKey);
    
    document.getElementById('modalDate').textContent = data.date;
    document.getElementById('modalDayName').textContent = data.dayName;

    // Preenche os eventos
    const eventsContainer = document.getElementById('modalEvents');
    eventsContainer.innerHTML = '';

    data.events.forEach((event, index) => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.style.animation = `fadeInUp 0.4s ease ${index * 0.1}s forwards`;
        eventItem.style.opacity = '0';
        
        eventItem.innerHTML = `
            <div class="event-time">🕐 ${event.time}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description}</div>
            <div class="event-location">📍 ${event.location}</div>
        `;
        
        eventsContainer.appendChild(eventItem);
    });

    // Abre o modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}


function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Fecha modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCalendarModal();
    }
});

// Previne propagação de cliques dentro do container
document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.querySelector('.modal__container--calendar');
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
