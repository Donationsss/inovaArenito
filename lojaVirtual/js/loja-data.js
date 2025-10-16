// js/loja-data.js
// Integra a LOJA com o back-end: carregar produtos, carrinho e finalização de compra.

(function () {
  // Estado de carrinho (usa localStorage)
  window.cart = JSON.parse(localStorage.getItem("cart") || "[]");

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(window.cart));
  }

  // Atualiza contador do carrinho no ícone
  window.updateCartCount = function () {
    const countEl = document.querySelector(".cart-count");
    if (countEl)
      countEl.textContent = String(
        window.cart.reduce((a, b) => a + (b.quantidade || 1), 0)
      );
  };

  // Render do carrinho em modal/lista (ajuste os seletores ao seu front)
  window.updateCartDisplay = function () {
    const list = document.querySelector(".cart-items");
    const totalEl = document.querySelector(".cart-total");
    if (!list || !totalEl) return;
    list.innerHTML = "";
    let total = 0;
    window.cart.forEach((item, idx) => {
      const li = document.createElement("div");
      li.className = "cart-item";
      const q = item.quantidade || 1;
      const sub = item.price * q;
      total += sub;
      li.innerHTML = `
        <div class="cart-item-left">
          <img src="${
            item.image || "https://picsum.photos/100?random=" + item.id
          }" alt="${item.name}">
          <div class="cart-item-info">
            <strong>${item.name}</strong>
            <span>R$ ${item.price.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="qty">
            <button class="qty-dec" data-idx="${idx}">-</button>
            <span>${q}</span>
            <button class="qty-inc" data-idx="${idx}">+</button>
          </div>
          <button class="remove" data-idx="${idx}"><i class="fas fa-trash"></i></button>
        </div>
      `;
      list.appendChild(li);
    });
    totalEl.textContent = "R$ " + total.toFixed(2).replace(".", ",");
  };

  // Eventos de qtd/remover no carrinho
  document.addEventListener("click", (e) => {
    const dec = e.target.closest(".qty-dec");
    const inc = e.target.closest(".qty-inc");
    const rem = e.target.closest(".remove");
    if (dec) {
      const idx = parseInt(dec.dataset.idx, 10);
      window.cart[idx].quantidade = Math.max(
        1,
        (window.cart[idx].quantidade || 1) - 1
      );
      saveCart();
      updateCartDisplay();
      updateCartCount();
    }
    if (inc) {
      const idx = parseInt(inc.dataset.idx, 10);
      window.cart[idx].quantidade = (window.cart[idx].quantidade || 1) + 1;
      saveCart();
      updateCartDisplay();
      updateCartCount();
    }
    if (rem) {
      const idx = parseInt(rem.dataset.idx, 10);
      window.cart.splice(idx, 1);
      saveCart();
      updateCartDisplay();
      updateCartCount();
    }
  });

  // Adicionar ao carrinho vindo do back (id é obrigatório)
  window.addToCartBacked = function (id, name, price, image) {
    const exists = window.cart.findIndex((i) => i.id === id);
    if (exists >= 0) {
      window.cart[exists].quantidade =
        (window.cart[exists].quantidade || 1) + 1;
    } else {
      window.cart.push({ id, name, price, image, quantidade: 1 });
    }
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showToast("Produto adicionado ao carrinho!", "success", 3000);
    // Se usar modal de carrinho:
    document.querySelector(".cart-modal")?.classList.add("active");
  };

  // Carregar produtos da API e montar cards
  window.carregarProdutos = async function (selectorGrid = ".produtos-grid") {
    try {
      const res = await fetch("api/produtos_list.php");
      const produtos = await res.json();
      const grid = document.querySelector(selectorGrid);
      if (!grid) return;
      grid.innerHTML = "";
      produtos.forEach((p) => {
        const foraEstoque = p.estoque <= 0;
        const preco =
          p.preco_promocional && p.preco_promocional > 0
            ? p.preco_promocional
            : p.preco;
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <div class="product-image">
            <img src="${
              p.imagem || "https://picsum.photos/400?random=" + p.id
            }" alt="${p.nome}">
            ${
              foraEstoque
                ? '<span class="stock-badge out-of-stock">Fora de estoque</span>'
                : ""
            }
          </div>
          <div class="product-info">
            <h3>${p.nome}</h3>
            <p class="product-category"><i class="fas fa-tag"></i> ${
              p.categoria
            }</p>
            <div class="product-stats">
              <div class="stat"><span class="label">Preço:</span><span class="value">R$ ${Number(
                preco
              )
                .toFixed(2)
                .replace(".", ",")}</span></div>
              <div class="stat"><span class="label">Estoque:</span><span class="value ${
                foraEstoque ? "danger" : ""
              }">${p.estoque} unid.</span></div>
            </div>
            <div class="product-actions">
              <button class="btn-icon-sm" ${
                foraEstoque ? "disabled" : ""
              } title="${
          foraEstoque ? "Indisponível" : "Adicionar"
        }" onclick="addToCartBacked(${p.id}, '${p.nome.replace(
          /'/g,
          "\\'"
        )}', ${preco}, '${p.imagem || ""}')">
                <i class="fas fa-cart-plus"></i>
              </button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (e) {
      showToast("Erro ao carregar produtos", "error", 3000);
    }
  };

  // Finalizar compra: envia para o back e zera carrinho
  window.finalizarCompra = async function () {
    if (!window.cart.length) {
      showToast("Seu carrinho está vazio!", "error", 3000);
      return;
    }
    const itens = window.cart.map((i) => ({
      id: i.id,
      nome: i.name,
      quantidade: i.quantidade || 1,
      preco: i.price,
    }));
    try {
      const res = await fetch("api/venda_create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens, cliente_email: null }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Erro ao finalizar");
      window.cart = [];
      saveCart();
      updateCartCount();
      updateCartDisplay();
      showToast("Compra finalizada com sucesso!", "success", 3000);
      document.querySelector(".cart-modal")?.classList.remove("active");
    } catch (e) {
      showToast(e.message || "Erro ao finalizar compra", "error", 3000);
    }
  };

  // Inicialização básica
  updateCartCount();
  // Chame carregarProdutos() nas páginas onde a grid existe
})();
