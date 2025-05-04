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

    // Сортировка демонов по сложности
    const sortBtn = document.getElementById('sort-difficulty-btn');
    if (sortBtn) {
        let isAscending = false; // По умолчанию сортировка по убыванию (от экстрим до изи)
        
        sortBtn.addEventListener('click', () => {
            // Меняем направление сортировки при каждом клике
            isAscending = !isAscending;
            sortBtn.classList.toggle('desc', !isAscending);
            
            // Вызываем функцию сортировки
            sortDemonsByDifficulty(isAscending);
            
            // Добавляем анимацию для наглядности изменений
            const demonItems = document.querySelectorAll('.demon-item');
            demonItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('sorted');
                    
                    // Удаляем класс через некоторое время для возможности повторной анимации
                    setTimeout(() => {
                        item.classList.remove('sorted');
                    }, 500);
                }, index * 50);
            });
        });
    }
});

// Запускаем функции при загрузке страницы
window.addEventListener('load', () => {
    fadeInElements();
    handleActiveMenu();
    
    // Добавляем классы для CSS анимаций
    document.body.classList.add('loaded');
    
    // Автоматическая сортировка демонов при загрузке страницы
    sortDemonsByDifficulty();
});

// Функция сортировки демонов по сложности
function sortDemonsByDifficulty(ascending = false) {
    const demonsContainer = document.querySelector('.demons-container');
    const demonItems = Array.from(document.querySelectorAll('.demon-item'));
    
    if (demonItems.length === 0 || !demonsContainer) return;
    
    // Порядок сложности от высшего к низшему
    const difficultyOrder = ['extreme', 'insane', 'hard', 'medium', 'easy'];
    
    // Функция для получения уровня сложности
    const getDifficultyLevel = (item) => {
        for (const className of item.classList) {
            if (difficultyOrder.includes(className)) {
                return difficultyOrder.indexOf(className);
            }
        }
        return -1;
    };
    
    // Сортируем элементы
    demonItems.sort((a, b) => {
        const diffA = getDifficultyLevel(a);
        const diffB = getDifficultyLevel(b);
        
        return ascending ? diffA - diffB : diffB - diffA;
    });
    
    // Обновляем номера демонов
    demonItems.forEach((item, index) => {
        item.querySelector('.demon-number').textContent = `#${index + 1}`;
    });
    
    // Удаляем все элементы из контейнера
    while (demonsContainer.firstChild) {
        demonsContainer.removeChild(demonsContainer.firstChild);
    }
    
    // Добавляем отсортированные элементы обратно
    demonItems.forEach(item => {
        demonsContainer.appendChild(item);
    });
}

// Модальное окно с инструкцией
const instructionsBtn = document.getElementById('instructions-btn');
const instructionsModal = document.getElementById('instructions-modal');
const closeModal = document.querySelector('.close-modal');

// Открытие модального окна
instructionsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    instructionsModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
});

// Закрытие модального окна при клике на крестик
closeModal.addEventListener('click', () => {
    instructionsModal.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем прокрутку страницы
});

// Закрытие модального окна при клике вне содержимого
instructionsModal.addEventListener('click', (e) => {
    if (e.target === instructionsModal) {
        instructionsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Закрытие модального окна при нажатии ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && instructionsModal.classList.contains('active')) {
        instructionsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Копирование адреса сервера
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-btn');
    const serverUrl = document.getElementById('server-url');
    
    if (copyBtn && serverUrl) {
        copyBtn.addEventListener('click', () => {
            // Копируем текст
            navigator.clipboard.writeText(serverUrl.textContent.trim())
                .then(() => {
                    // Успешное копирование
                    copyBtn.classList.add('copied');
                    
                    // Удаляем класс через 2 секунды
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Ошибка при копировании: ', err);
                    
                    // Альтернативный метод копирования (для старых браузеров)
                    const range = document.createRange();
                    range.selectNode(serverUrl);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();
                    
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
        });
    }
});
