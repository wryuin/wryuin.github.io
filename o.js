        // Глобальные переменные для профиля
        let savedUsername = localStorage.getItem('gdrs-username');
        
        // Функция для анимации появления элементов
        function fadeInElements() {
            const fadeElements = document.querySelectorAll('.feature-box, .demon-item, .download-card, .stat-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }
        
        // Подсветка активного пункта меню
        function handleActiveMenu() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav ul li a');
            
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}` || (current === '' && link.getAttribute('href') === '#')) {
                        link.classList.add('active');
                    }
                });
            });
        }
        
        // Фильтрация демонов
        const filterButtons = document.querySelectorAll('.filter-btn');
        const demonItems = document.querySelectorAll('.demon-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Убираем активный класс со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Добавляем активный класс нажатой кнопке
                button.classList.add('active');
                
                // Получаем значение фильтра
                const filterValue = button.getAttribute('data-filter');
                
                // Фильтруем демоны
                demonItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Мобильное меню
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Модальное окно с инструкцией
        const instructionsBtn = document.getElementById('instructions-btn');
        const instructionsModal = document.getElementById('instructions-modal');
        const closeModalBtn = document.querySelector('.close-modal');
        
        if (instructionsBtn && instructionsModal) {
            instructionsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                instructionsModal.classList.add('active');
            });
            
            // Закрытие модального окна инструкций
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', () => {
                    instructionsModal.classList.remove('active');
                });
            }
            
            instructionsModal.addEventListener('click', (e) => {
                if (e.target === instructionsModal) {
                    instructionsModal.classList.remove('active');
                }
            });
        }
        
        // Функция копирования адреса сервера
        window.copyServerUrl = function() {
            const serverUrl = document.getElementById('server-url');
            const copyBtn = document.querySelector('.copy-btn');
            
            navigator.clipboard.writeText(serverUrl.textContent)
                .then(() => {
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Не удалось скопировать текст: ', err);
                });
        };
        
        // Обработчик для кнопки профиля
        document.addEventListener('DOMContentLoaded', () => {
            const profileBtn = document.getElementById('profile-btn');
            if (profileBtn) {
                profileBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'https://eizgdrs.ps.fhgdps.com/dashboard/login/register.php';
                });
            }
            
            // Кнопки авторизации в шапке
            const loginBtn = document.getElementById('login-link');
            const registerBtn = document.getElementById('register-link');
            
            if (loginBtn) {
                loginBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'https://eizgdrs.ps.fhgdps.com/dashboard/login/register.php';
                });
            }
            
            if (registerBtn) {
                registerBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'https://eizgdrs.ps.fhgdps.com/dashboard/login/register.php';
                });
            }
        });
        
        // Инициализация основных функций при загрузке страницы
        document.addEventListener('DOMContentLoaded', () => {
            fadeInElements();
            handleActiveMenu();
        });