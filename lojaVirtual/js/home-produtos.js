// js/home-produtos.js
// Carrega produtos dinâmicos para a página inicial

(function () {
  const moeda = (v) =>
    "R$ " +
    Number(v || 0)
      .toFixed(2)
      .replace(".", ",");

  async function carregarProdutosDestaque() {
    try {
      const res = await fetch("api/produtos_list.php");
      const produtos = await res.json();
      const grid = document.getElementById("produtos-destaque");

      if (!grid) return;

      grid.innerHTML = "";

      // Pegar apenas os primeiros 3 produtos para destaque
      const produtosDestaque = produtos.slice(0, 3);

      produtosDestaque.forEach((p, index) => {
        const foraEstoque = p.estoque <= 0;
        const preco =
          p.preco_promocional && p.preco_promocional > 0
            ? p.preco_promocional
            : p.preco;
        const precoOriginal = p.preco;
        const temPromocao =
          p.preco_promocional && p.preco_promocional < p.preco;

        const card = document.createElement("div");
        card.className = "produto-card";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", (index * 100).toString());

        let badge = "";
        if (foraEstoque) {
          badge =
            '<div class="produto-badge out-of-stock">Fora de Estoque</div>';
        } else if (temPromocao) {
          const desconto = Math.round(
            ((precoOriginal - preco) / precoOriginal) * 100
          );
          badge = `<div class="produto-badge sale">-${desconto}%</div>`;
        } else if (index === 0) {
          badge = '<div class="produto-badge">Destaque</div>';
        }
        const nomeEscapado = (p.nome || "").replace(/'/g, "\\'");
        const imagemEscapada = (p.imagem || "").replace(/'/g, "\\'");
        card.innerHTML = `
  ${badge}
  <div class="produto-image">
    <img src="${p.imagem || `https://picsum.photos/400?random=${p.id}`}" alt="${
          p.nome
        }">
    <div class="produto-overlay">
      <button class="btn-quick-view">
        <i class="fas fa-eye"></i>
      </button>
    </div>
  </div>
  <div class="produto-info">
    <h3 class="produto-title">${p.nome}</h3>
    <p class="produto-description">${p.marca || p.categoria}</p>
    <div class="produto-rating">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star-half-alt"></i>
      <span>(4.5)</span>
    </div>
    <div class="produto-footer">
      ${
        temPromocao
          ? `<div class="price-group">
           <span class="produto-price-old">${moeda(precoOriginal)}</span>
           <span class="produto-price">${moeda(preco)}</span>
         </div>`
          : `<span class="produto-price">${moeda(preco)}</span>`
      }
      ${
        foraEstoque
          ? '<div class="out-of-stock-message"><i class="fas fa-exclamation-triangle"></i> Produto fora de estoque</div>'
          : `<button class="btn-add-cart" onclick="addToCartBacked(${p.id}, '${nomeEscapado}', ${preco}, '${imagemEscapada}')">
             <i class="fas fa-cart-plus"></i>
           </button>`
      }
    </div>
  </div>
`;

        grid.appendChild(card);
      });

      // Reinicializar AOS para os novos elementos
      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    } catch (e) {
      console.error("Erro ao carregar produtos:", e);
      const grid = document.getElementById("produtos-destaque");
      if (grid) {
        grid.innerHTML =
          '<p class="error-message">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
      }
    }
  }

  // Carregar produtos quando a página carrega
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("produtos-destaque")) {
      carregarProdutosDestaque();
    }
  });
})();
