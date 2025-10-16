// Variáveis globais
let allProducts = [];
let currentProducts = [];

// Função para formatar moeda
const moeda = (v) => "R$ " + Number(v || 0).toFixed(2).replace(".", ",");

// Carregar produtos do backend
async function carregarProdutos() {
    try {
        const res = await fetch("api/produtos_list.php");
        allProducts = await res.json();
        currentProducts = [...allProducts];
        renderizarProdutos();
        atualizarContadores();
    } catch (e) {
        console.error("Erro ao carregar produtos:", e);
        showToast("Erro ao carregar produtos", "error", 3000);
    }
}

// Renderizar produtos na grid
function renderizarProdutos(produtos = currentProducts) {
    const grid = document.querySelector('.produtos-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    produtos.forEach((p, index) => {
        const foraEstoque = p.estoque <= 0;
        const preco = p.preco_promocional && p.preco_promocional > 0 ? p.preco_promocional : p.preco;
        const precoOriginal = p.preco;
        const temPromocao = p.preco_promocional && p.preco_promocional < p.preco;
        
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.setAttribute('data-category', p.categoria.toLowerCase());
        card.setAttribute('data-price', preco);
        card.setAttribute('data-brand', p.marca || '');
        
        let badge = '';
        if (foraEstoque) {
            badge = '<div class="produto-badge out-of-stock">Fora de Estoque</div>';
        } else if (temPromocao) {
            const desconto = Math.round(((precoOriginal - preco) / precoOriginal) * 100);
            badge = `<div class="produto-badge sale">-${desconto}%</div>`;
        }
        
        card.innerHTML = `
            ${badge}
            <div class="produto-image">
                <img src="${p.imagem || `https://picsum.photos/400?random=${p.id}`}" alt="${p.nome}">
                <div class="produto-overlay">
                    <button class="btn-quick-view">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="produto-info">
                <h3 class="produto-title">${p.nome}</h3>
                <p class="produto-category"><i class="fas fa-tag"></i> ${p.categoria}</p>
                <div class="produto-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span>(4.5)</span>
                </div>
                <div class="produto-footer">
                    ${temPromocao ? 
                        `<div class="price-group">
                            <span class="produto-price-old">${moeda(precoOriginal)}</span>
                            <span class="produto-price">${moeda(preco)}</span>
                        </div>` :
                        `<span class="produto-price">${moeda(preco)}</span>`
                    }
                    ${foraEstoque ? 
                        `<div class="out-of-stock-message"><i class="fas fa-exclamation-triangle"></i> Produto fora de estoque</div>` :
                        `<button class="btn-add-cart" onclick="addToCartBacked(${p.id}, '${p.nome.replace(/'/g, "\\'").replace(/"/g, '&quot;')}', ${preco}, '${(p.imagem || '').replace(/'/g, "\\'")}')"> 
                            <i class="fas fa-cart-plus"></i>
                        </button>`
                    }
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Atualizar contadores de categoria
function atualizarContadores() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        let count = 0;
        
        if (category === 'all') {
            count = allProducts.length;
        } else {
            count = allProducts.filter(p => p.categoria.toLowerCase() === category).length;
        }
        
        const countElement = item.querySelector('.count');
        if (countElement) {
            countElement.textContent = count;
        }
    });
}

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
document.addEventListener('click', (e) => {
    const categoryItem = e.target.closest('.category-item');
    if (!categoryItem) return;
    
    e.preventDefault();
    
    // Remover active de todos
    document.querySelectorAll('.category-item').forEach(cat => cat.classList.remove('active'));
    categoryItem.classList.add('active');
    
    const category = categoryItem.getAttribute('data-category');
    
    if (category === 'all') {
        currentProducts = [...allProducts];
    } else {
        currentProducts = allProducts.filter(p => p.categoria.toLowerCase() === category);
    }
    
    renderizarProdutos(currentProducts);
    
    // Atualizar contador
    const countElement = document.querySelector('.produtos-count strong');
    if (countElement) {
        countElement.textContent = currentProducts.length;
    }
});

// Filtro de Preço
const btnFilter = document.querySelector('.btn-filter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

if (btnFilter) {
    btnFilter.addEventListener('click', () => {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        
        const cards = document.querySelectorAll('.produto-card');
        cards.forEach(card => {
            const priceElement = card.querySelector('.produto-price');
            if (priceElement) {
                const priceText = priceElement.textContent.replace('R$', '').replace('.', '').replace(',', '.');
                const price = parseFloat(priceText);
                
                if (price >= minPrice && price <= maxPrice) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        if (typeof showToast === 'function') {
            showToast('Filtro de preço aplicado!', 'success', 2000);
        }
    });
}

// Limpar Filtros
const btnClearFilters = document.querySelector('.btn-clear-filters');

if (btnClearFilters) {
    btnClearFilters.addEventListener('click', () => {
        // Resetar categoria  
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(cat => cat.classList.remove('active'));
        if (categoryItems[0]) categoryItems[0].classList.add('active');
        
        // Resetar preços
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '';
        
        // Resetar checkboxes
        document.querySelectorAll('.rating-filter input, .brand-filter input').forEach(input => {
            input.checked = false;
        });
        
        // Recarregar todos os produtos
        currentProducts = [...allProducts];
        renderizarProdutos();
        
        const countElement = document.querySelector('.produtos-count strong');
        if (countElement) {
            countElement.textContent = currentProducts.length;
        }
        if (typeof showToast === 'function') {
            showToast('Filtros limpos!', 'success', 2000);
        }
    });
}

// Ordenação
const sortSelect = document.querySelector('.sort-select');

if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        
        // Ordenar os dados do produto
        currentProducts.sort((a, b) => {
            const precoA = a.preco_promocional && a.preco_promocional > 0 ? a.preco_promocional : a.preco;
            const precoB = b.preco_promocional && b.preco_promocional > 0 ? b.preco_promocional : b.preco;
            
            switch(sortValue) {
                case 'price-low':
                    return precoA - precoB;
                case 'price-high':
                    return precoB - precoA;
                case 'rating':
                    return 0; // Rating é o mesmo para todos por enquanto
                default:
                    return 0;
            }
        });
        
        renderizarProdutos();
        if (typeof showToast === 'function') {
            showToast('Produtos ordenados!', 'success', 2000);
        }
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
            currentProducts = [...allProducts];
        } else {
            // Por enquanto, manter todos os produtos já que não temos rating real
            currentProducts = [...allProducts];
        }
        
        renderizarProdutos();
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
            currentProducts = [...allProducts];
        } else {
            currentProducts = allProducts.filter(p => {
                const nome = p.nome.toLowerCase();
                const marca = (p.marca || '').toLowerCase();
                return selectedBrands.some(brand => nome.includes(brand) || marca.includes(brand));
            });
        }
        
        renderizarProdutos();
    });
});

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.produtos-grid')) {
        carregarProdutos();
    }
});
