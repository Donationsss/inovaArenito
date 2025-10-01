// setup.js - gerencia a página de configuração (setup.html)
document.addEventListener("DOMContentLoaded", () => {
  const fotoWrapper = document.getElementById("fotoWrapper");
  const fotoInput = document.getElementById("fotoInput");
  const salvarBtn = document.getElementById("salvarPerfil");

  // click no wrapper abre o file picker
  fotoWrapper.addEventListener("click", (e) => {
    // evita disparar quando clica no próprio input (segurança)
    if (e.target === fotoInput) return;
    fotoInput.click();
  });

  // Preview da imagem dentro do círculo sem remover o input
  fotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      // se já existe preview, atualiza src. Senão, cria imagem e esconde o placeholder
      let img = fotoWrapper.querySelector(".preview-foto");
      const placeholder = fotoWrapper.querySelector(".foto-circle");
      if (img) {
        img.src = ev.target.result;
      } else {
        img = document.createElement("img");
        img.className = "preview-foto";
        img.src = ev.target.result;
        // insere antes do input para manter input no DOM
        fotoWrapper.insertBefore(img, fotoInput);
        if (placeholder) placeholder.style.display = "none";
      }
    };
    reader.readAsDataURL(file);
  });

  // Salvar perfil
  salvarBtn.addEventListener("click", () => {
    const nome = document.getElementById("nomeInput").value.trim();
    const titulo = document.getElementById("tituloInput").value.trim();
    const descricao = document.getElementById("descricaoInput").value.trim();
    const imagem = document.querySelector(".preview-foto")?.src || "";

    const data = { nome, titulo, descricao, imagem };
    localStorage.setItem("portfolioData", JSON.stringify(data));
    // Redirect para index
    window.location.href = "index.html";
  });
});
