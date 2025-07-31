document.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll restoration on page refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Loading Animation
    showLoadingAnimation();

    // Initialize animations after loading
    setTimeout(() => {
        hideLoadingAnimation();
        initializeAnimations();
        initializeTypingEffect();
        initializeScrollAnimations();
    }, 2000);

    const titles = [
        "FULL STACK DEVELOPER",
        ".NET DEVELOPER",
        "UI DEVELOPER",
        "MOBILE DEVELOPER"
    ];

    let currentIndex = 0;
    let isTyping = false;

    function initializeTypingEffect() {
        const titleElement = document.querySelector('.title');
        const developerTitle = document.getElementById('developerTitle');

        // Auto typing effect
        function typeTitle(text, callback) {
            if (isTyping) return;
            isTyping = true;

            titleElement.textContent = '';
            let i = 0;

            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    titleElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    isTyping = false;
                    if (callback) callback();
                }
            }, 100);
        }

        function changeTitle() {
            if (isTyping) return;

            // Erase current text
            const currentText = titleElement.textContent;
            let i = currentText.length;

            const eraseInterval = setInterval(() => {
                if (i > 0) {
                    titleElement.textContent = currentText.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(eraseInterval);
                    currentIndex = (currentIndex + 1) % titles.length;
                    typeTitle(titles[currentIndex]);
                }
            }, 50);
        }

        // Initial typing
        typeTitle(titles[currentIndex]);

        // Auto change every 4 seconds
        setInterval(changeTitle, 4000);

        // Manual change on click
        developerTitle.addEventListener('click', changeTitle);
    }

    // Enhanced shapes animation with parallax
    function initializeAnimations() {
        const shapes = document.querySelectorAll('.shape');
        const hero = document.querySelector('.hero');

        // Mouse parallax effect
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = hero.getBoundingClientRect();

            const mouseX = clientX - left;
            const mouseY = clientY - top;

            shapes.forEach((shape, index) => {
                const moveX = (mouseX - width / 2) * (0.02 + index * 0.01);
                const moveY = (mouseY - height / 2) * (0.02 + index * 0.01);

                shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
            });


        });

        hero.addEventListener('mouseleave', () => {
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0) rotate(0)';
            });


        });

        // Animate elements on page load
        animateOnLoad();

        // Initialize interactive particles
        initializeParticles();

        // Initialize tech icons
        initializeTechIcons();
    }

    // Loading Animation Functions
    function showLoadingAnimation() {
        const loadingHTML = `
            <div id="loading-screen" class="loading-screen">
                <div class="loading-content">
                    <div class="loading-logo">
                        <div class="loading-circle"></div>
                        <div class="loading-text">BS</div>
                    </div>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                    <p class="loading-message">Yükleniyor...</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);

        // Animate loading bar
        setTimeout(() => {
            document.querySelector('.loading-progress').style.width = '100%';
        }, 500);
    }

    function hideLoadingAnimation() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }

    // Scroll Animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Special animations for specific elements
                    if (entry.target.classList.contains('skill-card')) {
                        animateSkillCard(entry.target);
                    }

                    if (entry.target.classList.contains('project-card')) {
                        animateProjectCard(entry.target);
                    }

                    if (entry.target.classList.contains('timeline-item')) {
                        animateTimelineItem(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-info-item, .section-title');
        animatedElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    }

    function animateOnLoad() {
        // Hero section animation
        const heroElements = document.querySelectorAll('.greeting, .name, .description, .hero-buttons, .hero-image');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';

            setTimeout(() => {
                el.style.transition = 'all 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
    }

    function animateSkillCard(card) {
        const icon = card.querySelector('.skill-icon');
        const tags = card.querySelectorAll('.skill-tag');

        // Icon bounce animation
        setTimeout(() => {
            icon.style.animation = 'bounceIn 0.6s ease';
        }, 200);

        // Tags stagger animation
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) scale(1)';
            }, 400 + (index * 100));
        });
    }

    function animateProjectCard(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';

        // Add hover effect enhancement
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }

    function animateTimelineItem(item) {
        const content = item.querySelector('.timeline-content');
        const date = item.querySelector('.timeline-date');

        setTimeout(() => {
            date.style.opacity = '1';
            date.style.transform = 'translateX(0)';
        }, 200);

        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateX(0)';
        }, 400);
    }

    // Smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax scroll effect and scroll indicator
    function createScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);

        return scrollIndicator;
    }

    const scrollIndicator = createScrollIndicator();

    // Throttled scroll listener for performance
    let scrollAnimationFrame;
    window.addEventListener('scroll', () => {
        if (scrollAnimationFrame) {
            cancelAnimationFrame(scrollAnimationFrame);
        }

        scrollAnimationFrame = requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min((scrolled / maxHeight) * 100, 100);

            // Update scroll indicator
            scrollIndicator.style.transform = `scaleX(${scrollProgress / 100})`;

            // Parallax effect for shapes (reduced for performance)
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                if (index % 2 === 0) { // Only animate every other shape
                    const speed = 0.2 + (index * 0.03);
                    const yPos = -(scrolled * speed);
                    const rotation = scrolled * 0.02;
                    shape.style.transform = `translate(0, ${yPos}px) rotate(${rotation}deg)`;
                }
            });


        });
    });
});

// Project data with multiple images
const projectData = {
    1: {
        title: "Rezervasyon Sistemi",
        description: "Rezervasyon sistemi, kullanıcıların belirli tarihlerde ve saatlerde hizmet almalarını sağlayan bir platformdur. Bu sistem, kullanıcıların hizmetleri önceden seçmelerine olanak tanırken, işletmelerin ise müşteri taleplerini daha iyi yönetmelerine olanak tanır.",
        images: [
            "assets/images/project1.png",

        ],
        tech: ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe"],
        demo: "https://github.com/BurakSekmenn",
        github: "https://github.com/BurakSekmenn"
    },
    2: {
        title: "Araç Takip Uygulaması",
        description: "Tek Bir platformda tüm araçlarınızı takip edin. Gelişmiş harita entegrasyonu, bildirimler, raporlama ve yönetim aracılığıyla tam kontrol sağlar.",
        images: [
            "assets/images/project2.png",
            "assets/images/project2-1.png",
            "assets/images/project2-2.png",

        ],
        tech: [".Net", "C#", "REST API", "WPF", "Mysql"],
        demo: "#",
        github: "https://github.com/BurakSekmenn"
    },
    3: {
        title: "Araba Kiralama Sistemi",
        description: "Araba kiralama sistemi, kullanıcıların araba kiralama hizmeti almalarını sağlayan bir platformdur. Bu sistem, kullanıcıların araba kiralama taleplerini göndermelerine olanak tanırken, işletmelerin ise müşteri taleplerini daha iyi yönetmelerine olanak tanır.",
        images: [
            "assets/images/project3.png",
            "assets/images/project3-1.png",
            "assets/images/project3-2.png",
            "assets/images/project3-3.png",

        ],
        tech: ["React", ".Net", "MSSQL", "Redis", "Docker"],
        demo: "https://github.com/BurakSekmenn",
        github: "https://github.com/BurakSekmenn"
    },
    4: {
        title: "Mağaza Ürün Otomasyonu",
        description: "Mağazalar için stok takibi, ürün yönetimi ve satış süreçlerini optimize eden kapsamlı bir otomasyon sistemi.",
        images: [
            "assets/images/project4.png",
            "assets/images/project4-1.jpg",
            "assets/images/project4-2.jpg",
            "assets/images/project4-3.jpg",

        ],
        tech: ["WPF", "C#", "SQLLite", "Barkod"],
        demo: "https://github.com/BurakSekmenn",
        github: "https://github.com/BurakSekmenn"
    },
    5: {
        title: "Mağaza Ürün Otomasyonu",
        description: "Mağazalar için stok takibi, ürün yönetimi ve satış süreçlerini optimize eden kapsamlı bir otomasyon sistemi, Barkodlu satış yapılan bir otomasyon sistemidir.",
        images: [
            "assets/images/project55.png",
            "assets/images/project5-1.png",
            "assets/images/project5-2.png",
            "assets/images/project5-3.png",
            "assets/images/project5-4.png",


        ],
        tech: ["React", ".Net", "MSSQL", "Redis", "Docker"],
        demo: "https://github.com/BurakSekmenn",
        github: "https://github.com/BurakSekmenn"
    },
    6: {
        title: "Kişsel Web Sitesi",
        description: "Sizde Bir Kişisel Bir Sayfa istiyorsanız benim ileişime geçin.",
        images: [
            "assets/images/project6.png"

        ],
        tech: ["Wordpress", "PHP", "MSSQL"],
        demo: "https://github.com/BurakSekmenn",
        github: "https://github.com/BurakSekmenn"
    }
};

let currentSlide = 0;
let totalSlides = 0;
let currentProject = null;

function openModal(projectId) {
    currentProject = projectData[projectId];
    const modal = document.getElementById('projectModal');

    // Update modal header
    document.getElementById('modalCategory').textContent = getProjectCategory(projectId);
    document.getElementById('modalTitle').textContent = currentProject.title;
    document.getElementById('modalDescription').textContent = currentProject.description;

    // Update status
    const statusIcon = document.getElementById('modalStatusIcon');
    const statusText = document.getElementById('modalStatus');
    const isActive = Math.random() > 0.5; // Random for demo, you can set this per project

    if (isActive) {
        statusIcon.className = 'fas fa-circle active';
        statusText.textContent = 'Aktif';
    } else {
        statusIcon.className = 'fas fa-circle completed';
        statusText.textContent = 'Tamamlandı';
    }

    document.getElementById('modalDate').textContent = '2024';

    // Update main image and thumbnails
    const mainImage = document.getElementById('mainModalImage');
    const thumbnailsContainer = document.getElementById('galleryThumbnails');

    if (currentProject.images && currentProject.images.length > 0) {
        mainImage.src = currentProject.images[0];
        mainImage.alt = currentProject.title;

        // Clear and populate thumbnails
        thumbnailsContainer.innerHTML = '';
        currentProject.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;
            thumbnail.onclick = () => changeMainImage(image, index);
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Update tech stack
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = currentProject.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    // Update features
    const featuresContainer = document.getElementById('modalFeatures');
    const features = getProjectFeatures(projectId);
    featuresContainer.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');

    // Update stats
    const stats = getProjectStats(projectId);
    document.getElementById('modalLines').textContent = stats.lines;
    document.getElementById('modalDuration').textContent = stats.duration;
    document.getElementById('modalUsers').textContent = stats.users;
    document.getElementById('modalRating').textContent = stats.rating;

    // Update links
    const demoLink = document.getElementById('modalDemo');
    const githubLink = document.getElementById('modalGithub');
    demoLink.href = currentProject.demo;
    githubLink.href = currentProject.github;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add ESC key listener
    document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;

    // Remove ESC key listener
    document.removeEventListener('keydown', handleModalKeydown);
}

// Helper functions for modal
function getProjectCategory(projectId) {
    const categories = {
        1: 'Web Application',
        2: 'Desktop Application',
        3: 'Web Platform',
        4: 'Desktop Application',
        5: 'Web Application',
        6: 'Website'
    };
    return categories[projectId] || 'Project';
}

function getProjectFeatures(projectId) {
    const features = {
        1: [
            'Kullanıcı dostu arayüz tasarımı',
            'Gerçek zamanlı rezervasyon sistemi',
            'E-posta bildirimleri',
            'Admin paneli',
            'Mobil uyumlu tasarım'
        ],
        2: [
            'Gerçek zamanlı araç takibi',
            'Harita entegrasyonu',
            'Raporlama sistemi',
            'Kullanıcı yönetimi',
            'Veri analizi'
        ],
        3: [
            'Araç kiralama sistemi',
            'Ödeme entegrasyonu',
            'Kullanıcı paneli',
            'Admin yönetimi',
            'Responsive tasarım'
        ],
        4: [
            'Stok yönetimi',
            'Satış takibi',
            'Raporlama',
            'Kullanıcı yetkilendirme',
            'Veri yedekleme'
        ],
        5: [
            'Ürün yönetimi',
            'Satış analizi',
            'Müşteri takibi',
            'Envanter kontrolü',
            'Otomatik raporlama'
        ],
        6: [
            'Modern tasarım',
            'SEO optimizasyonu',
            'Hızlı yükleme',
            'Mobil uyumlu',
            'İçerik yönetimi'
        ]
    };
    return features[projectId] || ['Modern tasarım', 'Kullanıcı dostu', 'Responsive'];
}

function getProjectStats(projectId) {
    const stats = {
        1: { lines: '15K+', duration: '3 Ay', users: '500+', rating: '4.8' },
        2: { lines: '12K+', duration: '2 Ay', users: '200+', rating: '4.6' },
        3: { lines: '18K+', duration: '4 Ay', users: '300+', rating: '4.7' },
        4: { lines: '10K+', duration: '2 Ay', users: '150+', rating: '4.5' },
        5: { lines: '20K+', duration: '5 Ay', users: '800+', rating: '4.9' },
        6: { lines: '5K+', duration: '1 Ay', users: '1K+', rating: '4.4' }
    };
    return stats[projectId] || { lines: '10K+', duration: '2 Ay', users: '100+', rating: '4.5' };
}

function changeMainImage(imageSrc, index) {
    const mainImage = document.getElementById('mainModalImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    mainImage.src = imageSrc;

    // Update active thumbnail
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function toggleFullscreen() {
    const mainImage = document.getElementById('mainModalImage');
    if (mainImage.requestFullscreen) {
        mainImage.requestFullscreen();
    } else if (mainImage.webkitRequestFullscreen) {
        mainImage.webkitRequestFullscreen();
    } else if (mainImage.msRequestFullscreen) {
        mainImage.msRequestFullscreen();
    }
}

function shareProject() {
    if (navigator.share && currentProject) {
        navigator.share({
            title: currentProject.title,
            text: currentProject.description,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Proje linki kopyalandı!');
        });
    }
}

// Handle ESC key press to close modal
function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

function updateSlider() {
    const container = document.getElementById('sliderContainer');
    const dots = document.querySelectorAll('.slider-dot');

    container.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlider();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Close modal when clicking outside
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('projectModal').classList.contains('active')) return;

    switch (e.key) {
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case 'Escape':
            closeModal();
            break;
    }
});

// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const sidebar = document.querySelector('.sidebar');

mobileNavToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileNavToggle.classList.toggle('active');
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileNavToggle.contains(e.target) && window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        mobileNavToggle.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        mobileNavToggle.classList.remove('active');
    }
});

// Close mobile nav when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            mobileNavToggle.classList.remove('active');
        }
    });
});

// Enhanced scroll navigation with Intersection Observer
let currentActiveSection = 'home';

function updateActiveNavLink(sectionId = null) {
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sectionId) {
        currentActiveSection = sectionId;
    }

    // Update active states
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === currentActiveSection) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for better section detection
function initializeSectionObserver() {
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                updateActiveNavLink(sectionId);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}
function sendEmail(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('.modern-submit-btn');
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate processing time for better UX
    setTimeout(() => {
        const mailtoLink = `mailto:burakskmn07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Ad: ${name}\nE-posta: ${email}\n\nMesaj: ${message}`
        )}`;

        window.location.href = mailtoLink;

        // Reset form after a delay
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            showFormMessage('Mesajınız başarıyla hazırlandı! E-posta uygulamanız açılacak.', 'success');

            // Reset form
            event.target.reset();
        }, 1000);
    }, 800);
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Insert message
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Enhanced scroll navigation with smooth scrolling
function initializeScrollNavigation() {
    // Initialize section observer
    initializeSectionObserver();

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calculate offset for fixed sidebar
                const offset = 80;
                const targetPosition = targetSection.offsetTop - offset;

                // Update active state immediately for better UX
                updateActiveNavLink(targetId);

                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const sidebar = document.querySelector('.sidebar');
                    const mobileToggle = document.querySelector('.mobile-nav-toggle');
                    if (sidebar && mobileToggle) {
                        sidebar.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Initialize active link on load
    setTimeout(() => {
        updateActiveNavLink('home');
    }, 500);
}

// Initialize scroll navigation
setTimeout(() => {
    initializeScrollNavigation();
}, 2600);

// Enhanced contact form animation
function initializeContactFormAnimation() {
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelectorAll('.contact-info-item');

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.add('animate-in');
                }

                if (entry.target.classList.contains('contact-info-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 200);
                }
            }
        });
    }, { threshold: 0.3 });

    if (contactForm) contactObserver.observe(contactForm);
    contactInfo.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        contactObserver.observe(item);
    });
}

// Initialize contact form animation
setTimeout(() => {
    initializeContactFormAnimation();
}, 2500);

// Add click ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .submit-button');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize ripple effect
setTimeout(() => {
    addRippleEffect();
}, 2500);

// Enhanced Theme Toggle System
function initializeEnhancedThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const transitionOverlay = document.getElementById('theme-transition-overlay');

    // Initialize theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }

    // Enhanced theme toggle with smooth transition
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();

        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Get click position for ripple effect
        const rect = themeToggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Create expanding circle transition
        createThemeTransition(x, y, newTheme);

        // Add button animation
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 300);

        // Dispatch theme change event for particles
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { newTheme, oldTheme: currentTheme }
        }));
    });

    function createThemeTransition(x, y, newTheme) {
        // Show overlay
        transitionOverlay.style.display = 'block';
        transitionOverlay.style.background = newTheme === 'dark' ? '#1a1a1a' : '#ffffff';

        // Calculate the maximum radius needed to cover the entire screen
        const maxRadius = Math.sqrt(
            Math.pow(Math.max(x, window.innerWidth - x), 2) +
            Math.pow(Math.max(y, window.innerHeight - y), 2)
        );

        // Create expanding circle animation
        transitionOverlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        transitionOverlay.style.opacity = '1';

        // Animate the circle expansion
        requestAnimationFrame(() => {
            transitionOverlay.style.transition = 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            transitionOverlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;
        });

        // Change theme after half the animation
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Trigger theme change effects
            triggerThemeChangeEffects(newTheme);
        }, 300);

        // Hide overlay after animation
        setTimeout(() => {
            transitionOverlay.style.opacity = '0';
            setTimeout(() => {
                transitionOverlay.style.display = 'none';
                transitionOverlay.style.transition = '';
            }, 300);
        }, 600);
    }

    function triggerThemeChangeEffects(newTheme) {
        // Add subtle shake animation to cards
        const cards = document.querySelectorAll('.skill-card, .project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'themeChangeShake 0.4s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 400);
            }, index * 50);
        });

        // Animate shapes with new theme colors
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            setTimeout(() => {
                shape.style.animation = 'themeChangeFloat 0.8s ease';
                setTimeout(() => {
                    shape.style.animation = '';
                }, 800);
            }, index * 100);
        });

        // Update scroll indicator color smoothly
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.transition = 'background 0.5s ease';
        }
    }

    // Auto theme based on time (optional feature)
    function autoThemeByTime() {
        const hour = new Date().getHours();
        const shouldBeDark = hour < 6 || hour > 18;
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if ((shouldBeDark && currentTheme === 'light') || (!shouldBeDark && currentTheme === 'dark')) {
            // Only auto-change if user hasn't manually set a preference recently
            const lastManualChange = localStorage.getItem('lastThemeChange');
            const now = Date.now();

            if (!lastManualChange || (now - parseInt(lastManualChange)) > 3600000) { // 1 hour
                setTimeout(() => {
                    themeToggle.click();
                }, 1000);
            }
        }
    }

    // Track manual theme changes
    themeToggle.addEventListener('click', () => {
        localStorage.setItem('lastThemeChange', Date.now().toString());
    });

    // Initialize auto theme (uncomment if you want this feature)
    // autoThemeByTime();
}

// Initialize enhanced theme toggle
setTimeout(() => {
    initializeEnhancedThemeToggle();
}, 100);

// Prevent transitions on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('no-transition');

    setTimeout(() => {
        document.body.classList.remove('no-transition');
    }, 100);
});

// Add system theme preference detection
function detectSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('theme');
        const lastManualChange = localStorage.getItem('lastThemeChange');
        const now = Date.now();

        // Only auto-change if user hasn't manually changed theme in the last hour
        if (!lastManualChange || (now - parseInt(lastManualChange)) > 3600000) {
            const systemTheme = e.matches ? 'dark' : 'light';
            const currentTheme = document.documentElement.getAttribute('data-theme');

            if (systemTheme !== currentTheme) {
                document.documentElement.setAttribute('data-theme', systemTheme);
                localStorage.setItem('theme', systemTheme);
            }
        }
    });
}

// Initialize system theme detection
setTimeout(() => {
    detectSystemTheme();
}, 200);

// Enhanced Floating Particles System
function createFloatingParticles() {
    const particlesContainer = document.getElementById('floating-particles');
    const particleCount = 30; // Reduced count for better performance

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random horizontal positioning (avoid edges)
        const leftPosition = Math.random() * 80 + 10;
        particle.style.left = leftPosition + '%';

        // Staggered animation delays for natural flow
        particle.style.animationDelay = (Math.random() * 25) + 's';
        particle.style.animationDuration = (Math.random() * 20 + 25) + 's';

        // Subtle horizontal drift
        const randomX = (Math.random() - 0.5) * 50;
        particle.style.setProperty('--random-x', randomX + 'px');

        // Smaller, more subtle sizes
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Lower opacity for subtlety
        const opacity = Math.random() * 0.3 + 0.1;
        particle.style.setProperty('--particle-opacity', opacity);

        particlesContainer.appendChild(particle);
    }

    // Add subtle mouse interaction
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        particles.forEach((particle, index) => {
            const influence = 0.5 + (index % 3) * 0.2;
            const offsetX = (mouseX - 0.5) * influence * 20;
            const offsetY = (mouseY - 0.5) * influence * 10;

            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// Enhanced card interactions
function enhanceCardInteractions() {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Create ripple effect on hover
            const rect = card.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(65, 105, 225, 0.1)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-hover 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';

            card.style.position = 'relative';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize floating particles and enhanced interactions
setTimeout(() => {
    createFloatingParticles();
    enhanceCardInteractions();
}, 2500);

// Interactive Particles System
function initializeParticles() {
    // Only initialize on desktop for performance
    if (window.innerWidth <= 968) return;

    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.life = Math.random() * 100 + 100;
            this.maxLife = this.life;

            // Theme-aware colors
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const colors = isDark
                ? ['#60A5FA', '#8B5CF6', '#F472B6', '#34D399']
                : ['#4169E1', '#6c5ce7', '#f093fb', '#4facfe'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force * 0.5;
                    this.vy += Math.sin(angle) * force * 0.5;
                }
            }

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // Boundary collision
            if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8;

            // Keep particles in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));

            // Friction
            this.vx *= 0.99;
            this.vy *= 0.99;

            // Life cycle
            this.life--;
            this.opacity = (this.life / this.maxLife) * 0.7;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;

            // Glow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.restore();
        }

        isDead() {
            return this.life <= 0;
        }
    }

    // Create initial particles
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = (100 - distance) / 100 * 0.3;
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            // Remove dead particles
            if (particles[i].isDead()) {
                particles.splice(i, 1);
            }
        }

        // Add new particles to maintain count
        while (particles.length < 50) {
            particles.push(new Particle());
        }

        // Draw connections
        drawConnections();

        animationId = requestAnimationFrame(animate);
    }

    // Mouse events
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Start animation
    createParticles();
    animate();

    // Cleanup function
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resizeCanvas);
    };
}

// Animated Tech Icons System
function initializeTechIcons() {
    // Only initialize on desktop for performance
    if (window.innerWidth <= 968) return;

    const techIcons = document.querySelectorAll('.tech-icon');

    techIcons.forEach(icon => {
        // Click ripple effect
        icon.addEventListener('click', (e) => {
            createRipple(e, icon);

            // Bounce animation
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'bounce 0.6s ease, float 12s ease-in-out infinite';
            }, 10);
        });

        // Hover particle burst effect
        icon.addEventListener('mouseenter', () => {
            createParticleBurst(icon);
        });

        // Enhanced hover effects
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.animationPlayState = 'paused';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.animationPlayState = 'running';
        });
    });
}

// Create ripple effect on tech icon click
function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create particle burst effect on hover
function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = getComputedStyle(element).color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.boxShadow = `0 0 6px ${getComputedStyle(element).color}`;

        document.body.appendChild(particle);

        // Animate particle
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Theme change handler for particles
function handleThemeChange() {
    // Reinitialize particles with new colors if needed
    const canvas = document.getElementById('particlesCanvas');
    if (canvas && window.innerWidth > 968) {
        // Particles will automatically use new theme colors on next creation
    }
}

// Listen for theme changes
document.addEventListener('themeChanged', handleThemeChange);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Cancel any running animations
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});