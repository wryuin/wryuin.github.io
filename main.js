// Элементы DOM
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const filterButtons = document.querySelectorAll('.filter-btn');
const demonItems = document.querySelectorAll('.demon-item');
const header = document.querySelector('header');

// Обработчик мобильного меню
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Закрывать меню при клике на пункт меню на мобильных
document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Фильтрация демонов по сложности
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем класс active у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Добавляем класс active на нажатую кнопку
        button.classList.add('active');
        
        // Получаем значение фильтра
        const filterValue = button.getAttribute('data-filter');
        
        // Фильтруем демоны
        demonItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'flex';
            } else if (item.classList.contains(filterValue)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Плавная прокрутка к якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация элементов при прокрутке
function fadeInElements() {
    const elements = document.querySelectorAll('.feature-box, .demon-item, .download-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('fade-in');
        }
    });
}

// Изменение прозрачности шапки при прокрутке
function handleHeaderOpacity() {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(14, 16, 22, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(14, 16, 22, 0.8)';
    }
}

// Активное состояние меню при прокрутке
function handleActiveMenu() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        } else if (current === undefined && link.getAttribute('href') === '#') {
            link.classList.add('active');
        }
    });
}

// Счетчики статистики
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 секунды
    const interval = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 100 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target > 100 ? '+' : '');
        }
    }, interval);
}

// Запуск анимации счетчиков при появлении в поле зрения
function handleCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    
    statNumbers.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            const target = parseInt(element.textContent);
            animateCounter(element, target);
        }
    });
}

// Обработчики событий
window.addEventListener('scroll', () => {
    handleHeaderOpacity();
    handleActiveMenu();
    fadeInElements();
    handleCounters();
});

// Отслеживание загрузок
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-card a.btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.closest('.download-card').querySelector('h3').textContent;
            console.log(`Загрузка для платформы: ${platform} начата`);
            
            // Здесь можно добавить аналитику или счетчик загрузок
            // Например, увеличить счетчик загрузок в локальном хранилище
            const downloads = localStorage.getItem('downloads') ? parseInt(localStorage.getItem('downloads')) : 0;
            localStorage.setItem('downloads', downloads + 1);
            
            // Уведомление о начале загрузки
            if (platform === 'Android') {
                // Визуальный эффект при скачивании
                this.classList.add('downloading');
                setTimeout(() => {
                    this.classList.remove('downloading');
                }, 3000);
            }
        });
    });
});

// Запускаем функции при загрузке страницы
window.addEventListener('load', () => {
    fadeInElements();
    handleActiveMenu();
    
    // Добавляем классы для CSS анимаций
    document.body.classList.add('loaded');
});
