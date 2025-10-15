// ===========================
// SISTEMA DE FILTROS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.destaque-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active no botão clicado
            button.classList.add('active');

            // Filtra os cards
            eventCards.forEach(card => {
                const month = card.getAttribute('data-month');

                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else if (month === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Reativa animações nos cards visíveis
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.destaque-card:not(.hidden)');
                visibleCards.forEach((card, index) => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                    }, 10);
                });
            }, 50);
        });
    });
});

// ===========================
// SISTEMA DE DESTAQUE DE EVENTO
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se há parâmetro de destaque na URL
    const urlParams = new URLSearchParams(window.location.search);
    const highlightId = urlParams.get('highlight');

    if (highlightId) {
        // Aguarda um momento para garantir que a página carregou
        setTimeout(() => {
            highlightEvent(highlightId);
        }, 500);
    }
});

function highlightEvent(eventId) {
    // Encontra o card correspondente
    const targetCard = document.querySelector(`[data-event="${eventId}"]`);
    
    if (!targetCard) return;

    // Adiciona a classe de destaque
    targetCard.classList.add('highlight');

    // Scroll suave até o card
    targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Remove o destaque após 3 segundos
    setTimeout(() => {
        targetCard.classList.remove('highlight');
        
        // Remove o parâmetro da URL sem recarregar a página
        const url = new URL(window.location);
        url.searchParams.delete('highlight');
        window.history.replaceState({}, '', url);
    }, 3000);
}

// ===========================
// FILTROS (Código já existente)
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.destaque-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active no botão clicado
            button.classList.add('active');

            // Filtra os cards
            eventCards.forEach(card => {
                const month = card.getAttribute('data-month');

                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else if (month === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Reativa animações nos cards visíveis
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.destaque-card:not(.hidden)');
                visibleCards.forEach((card, index) => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                    }, 10);
                });
            }, 50);
        });
    });
});
