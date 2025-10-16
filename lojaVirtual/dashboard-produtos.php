<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos - Dashboard TechStore</title>
    <link rel="stylesheet" href="css/dashboard.css">
    <link rel="stylesheet" href="css/dashboard-pages.css">
    <link rel="stylesheet" href="./css/pagination.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <i class="fas fa-store"></i>
                <span>TechStore</span>
            </div>
        </div>
        <nav class="sidebar-nav">
            <a href="dashboard.php" class="nav-item">
                <i class="fas fa-chart-line"></i>
                <span>Dashboard</span>
            </a>
            <a href="dashboard-vendas.php" class="nav-item">
                <i class="fas fa-shopping-bag"></i>
                <span>Vendas</span>
            </a>
            <a href="dashboard-produtos.php" class="nav-item active">
                <i class="fas fa-box"></i>
                <span>Produtos</span>
            </a>
            <a href="dashboard-clientes.php" class="nav-item">
                <i class="fas fa-users"></i>
                <span>Clientes</span>
            </a>
            <a href="dashboard-relatorios.php" class="nav-item">
                <i class="fas fa-chart-bar"></i>
                <span>Relatórios</span>
            </a>
            <a href="dashboard-configuracoes.php" class="nav-item">
                <i class="fas fa-cog"></i>
                <span>Configurações</span>
            </a>
        </nav>
        <div class="sidebar-footer">
            <a href="index.php" class="nav-item">
                <i class="fas fa-arrow-left"></i>
                <span>Voltar à Loja</span>
            </a>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Top Bar -->
        <header class="topbar">
            <div class="topbar-left">
                <button class="sidebar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
                <h1>Produtos</h1>
            </div>
            <div class="topbar-right">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar produtos...">
                </div>
                <button class="theme-toggle" id="themeToggleDash">
                    <i class="fas fa-moon"></i>
                </button>
                <div class="notifications">
                    <i class="fas fa-bell"></i>
                    <span class="badge">3</span>
                </div>
                <div class="user-menu">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff" alt="User">
                    <span>Admin</span>
                </div>
            </div>
        </header>

        <!-- Dashboard Content -->
        <div class="dashboard-content">
            <!-- Quick Stats -->
            <div class="quick-stats-grid" data-aos="fade-up">
                <div class="quick-stat-card">
                    <div class="stat-icon blue">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Total de Produtos</span>
                        <h3 class="stat-value">370</h3>
                        <span class="stat-change positive">+23 novos</span>
                    </div>
                </div>
                <div class="quick-stat-card">
                    <div class="stat-icon green">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Em Estoque</span>
                        <h3 class="stat-value">342</h3>
                        <span class="stat-change positive">92.4%</span>
                    </div>
                </div>
                <div class="quick-stat-card">
                    <div class="stat-icon orange">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Estoque Baixo</span>
                        <h3 class="stat-value">18</h3>
                        <span class="stat-change negative">Atenção</span>
                    </div>
                </div>
                <div class="quick-stat-card">
                    <div class="stat-icon red">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-label">Sem Estoque</span>
                        <h3 class="stat-value">10</h3>
                        <span class="stat-change negative">Crítico</span>
                    </div>
                </div>
            </div>

            <!-- Page Header -->
            <div class="page-header" data-aos="fade-up">
                <div class="header-left">
                    <button class="btn-primary" id="btnNovoProduto">
                        <i class="fas fa-plus"></i>
                        Novo Produto
                    </button>
                    <button class="btn-outline">
                        <i class="fas fa-upload"></i>
                        Importar
                    </button>
                </div>
                <div class="header-right">
                    <select class="filter-select">
                        <option>Todas as Categorias</option>
                        <option>Hardware</option>
                        <option>Periféricos</option>
                        <option>Notebooks</option>
                        <option>Smartphones</option>
                    </select>
                    <button class="btn-icon">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>

            <!-- Products Grid -->
            <div class="products-grid dashboard-products-grid" data-aos="fade-up">
                <!-- Produtos serão carregados via JavaScript -->
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Carregando produtos...</p>
                </div>

                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" alt="Produto">
                        <span class="stock-badge in-stock">Em Estoque</span>
                    </div>
                    <div class="product-info">
                        <h3>Smartphone XZ Plus</h3>
                        <p class="product-category"><i class="fas fa-tag"></i> Smartphones</p>
                        <div class="product-stats">
                            <div class="stat">
                                <span class="label">Preço:</span>
                                <span class="value">R$ 2.549,00</span>
                            </div>
                            <div class="stat">
                                <span class="label">Estoque:</span>
                                <span class="value">82 unid.</span>
                            </div>
                            <div class="stat">
                                <span class="label">Vendas:</span>
                                <span class="value">203</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn-icon-sm" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon-sm" title="Visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon-sm danger" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" alt="Produto">
                        <span class="stock-badge low-stock">Estoque Baixo</span>
                    </div>
                    <div class="product-info">
                        <h3>Fone Wireless Pro</h3>
                        <p class="product-category"><i class="fas fa-tag"></i> Periféricos</p>
                        <div class="product-stats">
                            <div class="stat">
                                <span class="label">Preço:</span>
                                <span class="value">R$ 899,00</span>
                            </div>
                            <div class="stat">
                                <span class="label">Estoque:</span>
                                <span class="value warning">8 unid.</span>
                            </div>
                            <div class="stat">
                                <span class="label">Vendas:</span>
                                <span class="value">156</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn-icon-sm" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon-sm" title="Visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon-sm danger" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300" alt="Produto">
                        <span class="stock-badge out-of-stock">Sem Estoque</span>
                    </div>
                    <div class="product-info">
                        <h3>Notebook Gamer X</h3>
                        <p class="product-category"><i class="fas fa-tag"></i> Notebooks</p>
                        <div class="product-stats">
                            <div class="stat">
                                <span class="label">Preço:</span>
                                <span class="value">R$ 7.899,00</span>
                            </div>
                            <div class="stat">
                                <span class="label">Estoque:</span>
                                <span class="value danger">0 unid.</span>
                            </div>
                            <div class="stat">
                                <span class="label">Vendas:</span>
                                <span class="value">98</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn-icon-sm" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon-sm" title="Visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon-sm danger" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1592286927505-2c1c8a8f6493?w=300" alt="Produto">
                        <span class="stock-badge in-stock">Em Estoque</span>
                    </div>
                    <div class="product-info">
                        <h3>Smartphone Pro Max</h3>
                        <p class="product-category"><i class="fas fa-tag"></i> Smartphones</p>
                        <div class="product-stats">
                            <div class="stat">
                                <span class="label">Preço:</span>
                                <span class="value">R$ 3.499,00</span>
                            </div>
                            <div class="stat">
                                <span class="label">Estoque:</span>
                                <span class="value">67 unid.</span>
                            </div>
                            <div class="stat">
                                <span class="label">Vendas:</span>
                                <span class="value">142</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn-icon-sm" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon-sm" title="Visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon-sm danger" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300" alt="Produto">
                        <span class="stock-badge in-stock">Em Estoque</span>
                    </div>
                    <div class="product-info">
                        <h3>Smartwatch Elite</h3>
                        <p class="product-category"><i class="fas fa-tag"></i> Periféricos</p>
                        <div class="product-stats">
                            <div class="stat">
                                <span class="label">Preço:</span>
                                <span class="value">R$ 1.199,00</span>
                            </div>
                            <div class="stat">
                                <span class="label">Estoque:</span>
                                <span class="value">53 unid.</span>
                            </div>
                            <div class="stat">
                                <span class="label">Vendas:</span>
                                <span class="value">89</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn-icon-sm" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon-sm" title="Visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon-sm danger" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="pagination-container" data-aos="fade-up">
                <div class="pagination-info">
                    Mostrando 1-6 de 370 produtos
                </div>
                <div class="pagination">
                    <button class="page-btn" disabled>
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">3</button>
                    <span>...</span>
                    <button class="page-btn">62</button>
                    <button class="page-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal Novo Produto -->
    <div class="modal" id="modalNovoProduto">
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2><i class="fas fa-box"></i> Novo Produto</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="formNovoProduto">
                    <div class="form-row">
                        <div class="form-group col-8">
                            <label>Nome do Produto *</label>
                            <input type="text" name="nome" class="form-control" placeholder="Ex: Notebook Ultra Pro" required>
                        </div>
                        <div class="form-group col-4">
                            <label>SKU</label>
                            <input type="text" name="sku" class="form-control" placeholder="Ex: NB-001">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-6">
                            <label>Categoria *</label>
                            <select name="categoria" class="form-control" required>
                                <option value="">Selecione</option>
                                <option value="hardware">Hardware</option>
                                <option value="perifericos">Periféricos</option>
                                <option value="notebooks">Notebooks</option>
                                <option value="smartphones">Smartphones</option>
                                <option value="tablets">Tablets</option>
                            </select>
                        </div>
                        <div class="form-group col-6">
                            <label>Marca</label>
                            <input type="text" name="marca" class="form-control" placeholder="Ex: Dell">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-4">
                            <label>Preço *</label>
                            <input type="number" name="preco" step="0.01" class="form-control" placeholder="0.00" required>
                        </div>
                        <div class="form-group col-4">
                            <label>Preço Promocional</label>
                            <input type="number" name="preco_promocional" step="0.01" class="form-control" placeholder="0.00">
                        </div>
                        <div class="form-group col-4">
                            <label>Estoque *</label>
                            <input type="number" name="estoque" class="form-control" placeholder="0" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Descrição</label>
                        <textarea class="form-control" rows="4" placeholder="Descreva o produto..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Imagem do Produto</label>
                        <div class="image-upload-options">
                            <div class="upload-option">
                                <input type="radio" id="imageUrl" name="image_type" value="url" checked>
                                <label for="imageUrl">URL da Imagem</label>
                            </div>
                            <div class="upload-option">
                                <input type="radio" id="imageFile" name="image_type" value="file">
                                <label for="imageFile">Enviar do PC</label>
                            </div>
                        </div>
                        
                        <div id="urlInput" class="image-input-group">
                            <input type="url" name="imagem_url" class="form-control" placeholder="https://exemplo.com/imagem.jpg">
                            <small class="form-text text-muted">Cole o link da imagem aqui</small>
                        </div>
                        
                        <div id="fileInput" class="image-input-group" style="display: none;">
                            <div class="file-upload-area" id="fileUploadArea">
                                <input type="file" name="imagem_file" id="imagemFile" accept="image/*" style="display: none;">
                                <div class="file-upload-content">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Clique aqui ou arraste uma imagem</p>
                                    <small>PNG, JPG, JPEG até 5MB</small>
                                </div>
                                <div class="file-preview" id="filePreview" style="display: none;">
                                    <img id="previewImage" src="" alt="Preview">
                                    <p id="fileName"></p>
                                    <button type="button" class="btn-remove" id="removeFile">×</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal('modalNovoProduto')">Cancelar</button>
                        <button type="submit" class="btn-primary">Salvar Produto</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/toast.js"></script>
    <script src="js/theme-switcher.js"></script>
    <script src="js/dashboard-data.js"></script>
    <script src="js/dashboard-produtos.js"></script>
</body>

</html>