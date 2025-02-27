document.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll restoration on page refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    const titles = [
        "FULL STACK DEVELOPER",
        ".NET DEVELOPER",
        "UI DEVELOPER",
        "MOBILE DEVELOPER"
    ];
    
    let currentIndex = 0;
    const titleElement = document.querySelector('.title');
    const developerTitle = document.getElementById('developerTitle');
    
    function changeTitle() {
        titleElement.classList.add('fade-out');
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            titleElement.textContent = titles[currentIndex];
            titleElement.classList.remove('fade-out');
            titleElement.classList.add('fade-in');
        }, 500);
    }
    
    developerTitle.addEventListener('click', () => {
        changeTitle();
    });

    // Shapes animation
    const shapes = document.querySelectorAll('.shape');
    const hero = document.querySelector('.hero');
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = hero.getBoundingClientRect();
        
        const mouseX = clientX - left;
        const mouseY = clientY - top;
        
        shapes.forEach((shape, index) => {
            const moveX = (mouseX - width/2) * (0.02 + index * 0.01);
            const moveY = (mouseY - height/2) * (0.02 + index * 0.01);
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
        });
    });
    
    hero.addEventListener('mouseleave', () => {
        shapes.forEach(shape => {
            shape.style.transform = 'translate(0, 0) rotate(0)';
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
        github: "https://github.com/username/education-platform"
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
        github: "https://github.com/username/education-platform"
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
        github: "https://github.com/username/education-platform"
    },
    6: {
        title: "Kişsel Web Sitesi",
        description: "Sizde Bir Kişisel Bir Sayfa istiyorsanız benim ileişime geçin.",
        images: [
            "assets/images/project6.png"

        ],
        tech: ["Wordpress", "PHP", "MSSQL"],
        demo: "https://github.com/BurakSekmenn",
        github: "https://github.com/username/education-platform"
    }
};

let currentSlide = 0;
let totalSlides = 0;
let currentProject = null;

function openModal(projectId) {
    currentProject = projectData[projectId];
    const modal = document.getElementById('projectModal');
    const sliderContainer = document.getElementById('sliderContainer');
    const sliderNav = document.getElementById('sliderNav');
    
    // Reset slider
    currentSlide = 0;
    sliderContainer.innerHTML = '';
    sliderNav.innerHTML = '';
    
    // Add images to slider
    currentProject.images.forEach((image, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slider-image';
        slideDiv.innerHTML = `<img src="${image}" alt="Project Image ${index + 1}">`;
        sliderContainer.appendChild(slideDiv);
        
        // Add navigation dot
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        sliderNav.appendChild(dot);
    });
    
    totalSlides = currentProject.images.length;
    updateSlider();
    
    // Update modal content
    document.getElementById('modalTitle').textContent = currentProject.title;
    document.getElementById('modalDescription').textContent = currentProject.description;
    
    // Update tech stack
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = currentProject.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    // Update links
    const demoLink = document.getElementById('modalDemo');
    const githubLink = document.getElementById('modalGithub');
    demoLink.href = currentProject.demo;
    githubLink.href = currentProject.github;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
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
    
    switch(e.key) {
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

// Handle active class in navbar based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}
function sendEmail(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engeller

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    let mailtoLink = `mailto:burakskmn07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        "Ad: " + name + "\nE-posta: " + email + "\n\nMesaj: " + message
    )}`;

    window.location.href = mailtoLink;
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Update active class when clicking on nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});