document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MODAL DE MAIORIDADE (IDADE)
       ========================================== */
    const ageModal = document.getElementById('age-modal');
    const btnAdult = document.getElementById('btn-adult');
    const btnExit = document.getElementById('btn-exit');

    // Verifica se o usuário já confirmou a idade anteriormente nesta sessão
    if (sessionStorage.getItem('ageVerified') === 'true') {
        ageModal.style.display = 'none';
    }

    btnAdult.addEventListener('click', () => {
        sessionStorage.setItem('ageVerified', 'true');
        ageModal.style.opacity = '0';
        setTimeout(() => {
            ageModal.style.display = 'none';
        }, 500);
    });

    btnExit.addEventListener('click', () => {
        alert('Acesso restrito a maiores de idade. Você será redirecionado.');
        window.location.href = 'https://www.google.com';
    });

    /* ==========================================
       2. HEADER FIXO COM MUDANÇA DE ESTILO NO SCROLL
       ========================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       3. MENU MOBILE (HAMBURGER)
       ========================================== */
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    /* ==========================================
       4. FILTRO DE PRODUTOS POR CATEGORIA
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active no botão clicado
            button.classList.add('active');

            const category = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================
       5. BOTÃO VOLTAR AO TOPO
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================
       6. ANIMAÇÕES DE ENTRADA AO ROLAR (INTERSECTION OBSERVER)
       ========================================== */
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

});

/* ==========================================
   7. MODAL DE DETALHES DO PRODUTO (FUNÇÕES GLOBAIS)
   ========================================== */
function openProductModal(title, description, brand) {
    const modal = document.getElementById('product-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-brand').innerText = `Marca: ${brand}`;
    
    modal.classList.add('active');
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('active');
}

// Fecha o modal ao clicar fora da caixa de conteúdo
window.addEventListener('click', (event) => {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeProductModal();
    }
});
