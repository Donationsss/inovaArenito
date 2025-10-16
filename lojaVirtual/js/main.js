// Inicializar AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

// Scroll ativo no menu
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Carrinho de Compras
const cartModal = document.getElementById("cartModal");
const cartBtn = document.querySelector(".cart-btn");
const closeCart = document.querySelector(".close-cart");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Atualizar contador do carrinho
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Atualizar display do carrinho
function updateCartDisplay() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    cartTotal.textContent = "R$ 0,00";
  } else {
    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
      total += item.price;
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">R$ ${item.price
                      .toFixed(2)
                      .replace(".", ",")}</p>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
            `;
      cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

function addToCartBacked(id, name, price, image) {
  const item = { id, name, price, image, quantidade: 1 };
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
  showToast("Produto adicionado ao carrinho!", "success", 3000);
  cartModal.classList.add("active");
}

// Remover do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
  showNotification("Produto removido do carrinho!");
}

async function finalizarCompra() {
  if (cart.length === 0) {
    showToast("Seu carrinho está vazio!", "error", 3000);
    return;
  }
  const itens = cart.map((i) => ({
    id: i.id, // garanta que o cart tenha id do produto!
    nome: i.name,
    quantidade: i.quantidade || 1, // ajuste ao seu modelo
    preco: i.price,
  }));
  const payload = { itens, cliente_email: null };
  const res = await fetch("api/venda_create.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    showToast(data.error || "Erro ao finalizar compra", "error", 3000);
    return;
  }
  // Limpa carrinho local
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
  showToast("Compra finalizada com sucesso!", "success", 3000);
  cartModal.classList.remove("active");
}

// Gerar ID único
function generateId() {
  return "#" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Mostrar notificação
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
    `;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Event Listeners
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    cartModal.classList.toggle("active");
  });
}

if (closeCart) {
  closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active");
  });
}

// Fechar carrinho ao clicar fora
document.addEventListener("click", (e) => {
  if (
    cartModal &&
    !cartModal.contains(e.target) &&
    !cartBtn.contains(e.target)
  ) {
    cartModal.classList.remove("active");
  }
});

// Inicializar carrinho
updateCartCount();
updateCartDisplay();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animação CSS adicional
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }

    .cart-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid var(--border);
        align-items: center;
    }

    .cart-item-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }

    .cart-item-info {
        flex: 1;
    }

    .cart-item-info h4 {
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
    }

    .cart-item-price {
        color: var(--accent-blue);
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }

    .remove-item {
        background: var(--danger);
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.85rem;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        transition: all 0.3s ease;
    }

    .remove-item:hover {
        background: #dc2626;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Dropdown de perfil
document.addEventListener("click", (e) => {
  const dd = e.target.closest(".nav-user.dropdown");
  // Fecha todos primeiro
  document.querySelectorAll(".nav-user.dropdown.open").forEach((el) => {
    if (el !== dd) el.classList.remove("open");
  });
  if (dd && e.target.closest(".dropdown-toggle")) {
    dd.classList.toggle("open");
  } else if (!dd) {
    // clique fora fecha qualquer dropdown aberto
    document
      .querySelectorAll(".nav-user.dropdown.open")
      .forEach((el) => el.classList.remove("open"));
  }
});

async function carregarProdutos() {
  const res = await fetch("api/produtos_list.php");
  const produtos = await res.json();
  const grid = document.querySelector(".produtos-grid"); // adapte ao seu seletor
  grid.innerHTML = "";
  produtos.forEach((p) => {
    const foraEstoque = p.estoque <= 0;
    const preco =
      p.preco_promocional && p.preco_promocional > 0
        ? p.preco_promocional
        : p.preco;
    const card = document.createElement("div");
    card.className = "produto-card";
    card.setAttribute("data-category", p.categoria.toLowerCase());
    card.innerHTML = `
      <div class="produto-image">
        <img src="${
          p.imagem || "https://picsum.photos/400?random=" + p.id
        }" alt="${p.nome}">
        ${
          foraEstoque
            ? '<span class="stock-badge out-of-stock">Fora de estoque</span>'
            : ""
        }
      </div>
      <div class="produto-info">
        <h3 class="produto-title">${p.nome}</h3>
        <p class="produto-category"><i class="fas fa-tag"></i> ${
          p.categoria
        }</p>
        <div class="produto-price">R$ ${preco
          .toFixed(2)
          .replace(".", ",")}</div>
        <div class="produto-footer">
          <button class="btn btn-primary" ${foraEstoque ? "disabled" : ""}
            onclick="addToCartBacked(${p.id}, '${p.nome.replace(
      /'/g,
      "\\'"
    )}', ${preco}, '${p.imagem || ""}')">
            ${foraEstoque ? "Indisponível" : "Adicionar"}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
// Substitua seu fluxo atual de montagem por carregarProdutos();
