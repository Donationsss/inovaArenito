// Toggle Sidebar Mobile
const btnToggleSidebar = document.querySelector('.btn-toggle-sidebar');
const sidebar = document.querySelector('.produtos-sidebar');

if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Fechar sidebar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !btnToggleSidebar.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Filtro de Categorias
const categoryItems = document.querySelectorAll('.category-item');
const produtoCards = document.querySelectorAll('.produto-card');

categoryItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover active de todos
        categoryItems.forEach(cat => cat.classList.remove('active'));
        item.classList.add('active');
        
        const category = item.getAttribute('data-category');
        
        produtoCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Atualizar contador
        const visibleCards = document.querySelectorAll('.produto-card[style*="display: block"]').length;
        document.querySelector('.produtos-count strong').textContent = visibleCards;
    });
});

// Filtro de Preço
const btnFilter = document.querySelector('.btn-filter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

if (btnFilter) {
    btnFilter.addEventListener('click', () => {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        
        produtoCards.forEach(card => {
            const priceElement = card.querySelector('.produto-price');
            const priceText = priceElement.textContent.replace('R$', '').replace('.', '').replace(',', '.');
            const price = parseFloat(priceText);
            
            if (price >= minPrice && price <= maxPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        showNotification('Filtro de preço aplicado!');
    });
}

// Limpar Filtros
const btnClearFilters = document.querySelector('.btn-clear-filters');

if (btnClearFilters) {
    btnClearFilters.addEventListener('click', () => {
        // Resetar categoria
        categoryItems.forEach(cat => cat.classList.remove('active'));
        categoryItems[0].classList.add('active');
        
        // Resetar preços
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '';
        
        // Resetar checkboxes
        document.querySelectorAll('.rating-filter input, .brand-filter input').forEach(input => {
            input.checked = false;
        });
        
        // Mostrar todos os produtos
        produtoCards.forEach(card => {
            card.style.display = 'block';
        });
        
        document.querySelector('.produtos-count strong').textContent = produtoCards.length;
        showNotification('Filtros limpos!');
    });
}

// Ordenação
const sortSelect = document.querySelector('.sort-select');

if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const grid = document.querySelector('.produtos-grid');
        const cards = Array.from(produtoCards);
        
        cards.sort((a, b) => {
            switch(sortValue) {
                case 'price-low':
                    return getPrice(a) - getPrice(b);
                case 'price-high':
                    return getPrice(b) - getPrice(a);
                case 'rating':
                    return getRating(b) - getRating(a);
                default:
                    return 0;
            }
        });
        
        cards.forEach(card => grid.appendChild(card));
        showNotification('Produtos ordenados!');
    });
}

// Funções auxiliares
function getPrice(card) {
    const priceText = card.querySelector('.produto-price').textContent;
    return parseFloat(priceText.replace('R$', '').replace('.', '').replace(',', '.'));
}

function getRating(card) {
    const stars = card.querySelectorAll('.produto-rating .fas.fa-star').length;
    return stars;
}

// Toggle de Visualização (Grid/List)
const viewButtons = document.querySelectorAll('.view-btn');
const produtosGrid = document.querySelector('.produtos-grid');

viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const view = btn.getAttribute('data-view');
        
        if (view === 'list') {
            produtosGrid.style.gridTemplateColumns = '1fr';
        } else {
            produtosGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        }
    });
});

// Filtro de Avaliação
const ratingCheckboxes = document.querySelectorAll('.rating-filter input');

ratingCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedRatings = Array.from(ratingCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => parseInt(cb.value));
        
        if (selectedRatings.length === 0) {
            produtoCards.forEach(card => card.style.display = 'block');
            return;
        }
        
        produtoCards.forEach(card => {
            const rating = getRating(card);
            if (selectedRatings.includes(rating)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Filtro de Marcas
const brandCheckboxes = document.querySelectorAll('.brand-filter input');

brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedBrands = Array.from(brandCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.toLowerCase());
        
        if (selectedBrands.length === 0) {
            produtoCards.forEach(card => card.style.display = 'block');
            return;
        }
        
        produtoCards.forEach(card => {
            const title = card.querySelector('.produto-title').textContent.toLowerCase();
            const hasBrand = selectedBrands.some(brand => title.includes(brand));
            
            if (hasBrand) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
