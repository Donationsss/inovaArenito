<?php
session_start();
$isLogged = isset($_SESSION['usuario_id']);
$isAdmin  = !empty($_SESSION['is_admin']);
$username = $_SESSION['usuario_nome'] ?? 'Usuário';
?>


<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Loja Virtual Premium</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/carrinho.css">
    <link rel="stylesheet" href="./css/out-of-stock.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar container">
            <div style="display: flex; align-items: center; justify-content:space-between">
            </div>
            <div class="logo" data-aos="fade-right">
                <i class="fas fa-store"></i>
                <span>TechStore</span>
            </div>
            <ul class="nav-menu" data-aos="fade-left">
                <li><a href="index.php" class="nav-link active">Home</a></li>
                <li><a href="produtos.php" class="nav-link">Produtos</a></li>
                <li><a href="sobre.php" class="nav-link">Sobre</a></li>
            </ul>
            <div class="nav-actions" data-aos="fade-left" data-aos-delay="100">
                <div class="nav-actions">
                    <button class="theme-toggle" id="themeToggle">
                        <i class="fas fa-moon"></i>
                    </button>

                    <button class="cart-btn">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </button>

                    <?php if (!$isLogged): ?>
                        <a href="login.php" class="btn btn-outline nav-login">
                            <i class="fas fa-sign-in-alt"></i> Entrar
                        </a>
                    <?php else: ?>
                        <div class="nav-user dropdown">
                            <button class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                                <img
                                    src="https://ui-avatars.com/api/?name=<?= urlencode($username) ?>&background=2563eb&color=fff&size=64"
                                    alt="Avatar" class="nav-avatar">
                                <span class="nav-username"><?= htmlspecialchars($username) ?></span>
                                <i class="fas fa-chevron-down dropdown-caret"></i>
                            </button>
                            <div class="dropdown-menu">
                                <?php if ($isAdmin): ?>
                                    <a href="dashboard.php" class="dropdown-item">
                                        <i class="fas fa-chart-line"></i> Voltar ao Dashboard
                                    </a>
                                <?php endif; ?>
                                <a href="logout.php" class="dropdown-item">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </a>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>


                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content" data-aos="fade-up">
                <h1 class="hero-title">Bem-vindo à <span class="gradient-text">TechStore</span></h1>
                <p class="hero-subtitle">Encontre os melhores produtos de tecnologia com os melhores preços do mercado
                </p>
                <div class="hero-buttons">
                    <a href="produtos.php" class="btn btn-primary">
                        <i class="fas fa-shopping-bag"></i>
                        Ver Produtos
                    </a>
                    <a href="dashboard.php" class="btn btn-outline">
                        <i class="fas fa-chart-line"></i>
                        Dashboard
                    </a>
                </div>
            </div>
            <div class="hero-stats" data-aos="fade-up" data-aos-delay="200">
                <div class="stat-card">
                    <i class="fas fa-box"></i>
                    <h3>500+</h3>
                    <p>Produtos</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3>10k+</h3>
                    <p>Clientes</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-star"></i>
                    <h3>4.9</h3>
                    <p>Avaliação</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Destaques Section -->
    <section class="produtos-destaque">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Produtos em <span class="gradient-text">Destaque</span></h2>
                <p class="section-subtitle">Confira nossa seleção especial de produtos</p>
            </div>

            <div class="produtos-grid" id="produtos-destaque">
                <!-- Produtos serão carregados via JavaScript -->
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Carregando produtos...</p>
                </div>
                <div class="produto-overlay">
                    <button class="btn-quick-view">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="produto-info">
                <h3 class="produto-title">Fone Wireless Pro</h3>
                <p class="produto-description">Cancelamento de ruído, 30h bateria</p>
                <div class="produto-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <span>(4.0)</span>
                </div>
                <div class="produto-footer">
                    <span class="produto-price">R$ 899,00</span>
                    <button class="btn-add-cart"
                        onclick="addToCart('Fone Wireless Pro', 899, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400')">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        </div>

        <div class="ver-mais-container" data-aos="fade-up">
            <a href="produtos.html" class="btn btn-primary btn-large">
                Ver Todos os Produtos
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
        <div class="container">
            <div class="features-grid" data-aos="fade-up">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <h3>Entrega Rápida</h3>
                    <p>Entregamos em todo o Brasil com agilidade e segurança</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Compra Segura</h3>
                    <p>Seus dados protegidos com certificado SSL</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3>Suporte 24/7</h3>
                    <p>Atendimento sempre disponível para você</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-undo"></i>
                    </div>
                    <h3>Troca Grátis</h3>
                    <p>7 dias para trocar seu produto sem custo</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-col" data-aos="fade-up">
                    <div class="logo">
                        <i class="fas fa-store"></i>
                        <span>TechStore</span>
                    </div>
                    <p>Sua loja de tecnologia de confiança</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div class="footer-col" data-aos="fade-up" data-aos-delay="100">
                    <h3>Links Rápidos</h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="produtos.html">Produtos</a></li>
                        <li><a href="sobre.html">Sobre</a></li>
                        <li><a href="dashboard.html">Dashboard</a></li>
                    </ul>
                </div>
                <div class="footer-col" data-aos="fade-up" data-aos-delay="200">
                    <h3>Suporte</h3>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Política de Privacidade</a></li>
                        <li><a href="#">Termos de Uso</a></li>
                        <li><a href="#">Contato</a></li>
                    </ul>
                </div>
                <div class="footer-col" data-aos="fade-up" data-aos-delay="300">
                    <h3>Newsletter</h3>
                    <p>Receba nossas ofertas exclusivas</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Seu e-mail">
                        <button type="submit"><i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TechStore. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Cart Modal -->
    <div class="cart-modal" id="cartModal">
        <div class="cart-content">
            <div class="cart-header">
                <h2><i class="fas fa-shopping-cart"></i> Carrinho</h2>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items" id="cartItems">
                <p class="empty-cart">Seu carrinho está vazio</p>
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span id="cartTotal">R$ 0,00</span>
                </div>
                <button class="btn btn-primary" onclick="finalizarCompra()">
                    <i class="fas fa-check"></i> Finalizar Compra
                </button>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/toast.js"></script>
    <script src="js/loja-data.js"></script>
    <script src="js/cart.js"></script>
    <script src="js/home-produtos.js"></script>
    <script src="js/theme-switcher.js"></script>
    <script src="js/main.js"></script>
</body>

</html>