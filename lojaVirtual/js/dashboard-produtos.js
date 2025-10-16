AOS.init({ duration: 700, easing: "ease-in-out", once: true });

const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
if (sidebarToggle)
  sidebarToggle.addEventListener("click", () =>
    sidebar.classList.toggle("active")
  );

// Modal Novo Produto
function openModal(id) {
  document.getElementById(id).classList.add("active");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}
window.closeModal = closeModal;

const btnNovoProduto = document.getElementById("btnNovoProduto");
const modalNovoProduto = document.getElementById("modalNovoProduto");
if (btnNovoProduto)
  btnNovoProduto.addEventListener("click", () => openModal("modalNovoProduto"));
if (modalNovoProduto)
  modalNovoProduto
    .querySelector(".modal-close")
    .addEventListener("click", () => closeModal("modalNovoProduto"));

// Upload mock
const upload = document.querySelector(".file-upload");
if (upload) {
  upload.addEventListener("click", () =>
    upload.querySelector('input[type="file"]').click()
  );
  upload.querySelector('input[type="file"]').addEventListener("change", () => {
    upload.querySelector("p").textContent = "Arquivo selecionado!";
  });
}

// Event listener removido - estava conflitando com o listener real

function showToast(msg) {
  const el = document.createElement("div");
  el.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
  Object.assign(el.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
    background: "#10b981",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0,0,0,.3)",
  });
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-10px)";
  }, 2500);
  setTimeout(() => el.remove(), 3000);
}

// ===== IMAGE UPLOAD FUNCTIONALITY =====

// Toggle between URL and file input
document.addEventListener('DOMContentLoaded', function() {
    const imageUrlRadio = document.getElementById('imageUrl');
    const imageFileRadio = document.getElementById('imageFile');
    const urlInput = document.getElementById('urlInput');
    const fileInput = document.getElementById('fileInput');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const imagemFile = document.getElementById('imagemFile');
    const filePreview = document.getElementById('filePreview');
    const fileUploadContent = document.querySelector('.file-upload-content');
    const removeFileBtn = document.getElementById('removeFile');
    
    if (imageUrlRadio && imageFileRadio) {
        imageUrlRadio.addEventListener('change', function() {
            if (this.checked) {
                urlInput.style.display = 'block';
                fileInput.style.display = 'none';
                clearFileUpload();
            }
        });
        
        imageFileRadio.addEventListener('change', function() {
            if (this.checked) {
                urlInput.style.display = 'none';
                fileInput.style.display = 'block';
            }
        });
    }
    
    // File upload area click
    if (fileUploadArea && imagemFile) {
        fileUploadArea.addEventListener('click', function() {
            imagemFile.click();
        });
        
        // Drag and drop
        fileUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });
        
        // File input change
        imagemFile.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }
    
    // Remove file button
    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            clearFileUpload();
        });
    }
    
    function handleFileSelect(file) {
        // Validate file
        if (!file.type.startsWith('image/')) {
            showToast('Por favor, selecione apenas arquivos de imagem', 'error', 3000);
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) { // 5MB
            showToast('Arquivo muito grande. Máximo 5MB', 'error', 3000);
            return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('fileName').textContent = file.name;
            fileUploadContent.style.display = 'none';
            filePreview.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
    
    function clearFileUpload() {
        if (imagemFile) imagemFile.value = '';
        if (filePreview) filePreview.style.display = 'none';
        if (fileUploadContent) fileUploadContent.style.display = 'block';
    }
});

// Event listener removido - usando o do dashboard-data.js para evitar duplicação

async function atualizarEstoque(id, novoEstoque) {
  const fd = new FormData();
  fd.append("id", id);
  fd.append("estoque", novoEstoque);
  const res = await fetch("api/produto_update_estoque.php", {
    method: "POST",
    body: fd,
  });
  if (res.ok) {
    showToast("Estoque atualizado", "success", 3000);
    listarProdutosDashboard();
  } else {
    showToast("Erro ao atualizar estoque", "error", 3000);
  }
}
