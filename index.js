document.addEventListener('DOMContentLoaded', function () {

    const primaryButton = document.querySelector('.primary__button');
    const secondaryButton = document.querySelector('.secondary__button');
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'asu.edu'];

    const toastNotification = document.createElement('div');
    document.body.appendChild(toastNotification);

    let currentLanguage = 'en';

    function showToast(messageKey, type, data = {}) {
        let message = messageKey;

        if (typeof translations !== 'undefined' &&
            translations[currentLanguage] &&
            translations[currentLanguage][messageKey]) {
            message = translations[currentLanguage][messageKey];
        } else {
            console.warn(`Toast translation not found for key: "${messageKey}" in language: "${currentLanguage}". Using key as message.`);
        }

        for (const placeholder in data) {
            if (data.hasOwnProperty(placeholder)) {
                const regex = new RegExp(`{${placeholder}}`, 'g');
                message = message.replace(regex, data[placeholder]);
            }
        }

        let iconClass = '';
        if (type === 'success') {
            iconClass = 'fa fa-check-circle';
        } else if (type === 'error') {
            iconClass = 'fa fa-exclamation-circle';
        } else if (type === 'info') {
            iconClass = 'fa fa-info-circle';
        }

        toastNotification.innerHTML = `
      ${iconClass ? `<i class="${iconClass}"></i>` : ''}
      <span>${message}</span>
      <button class="toast__close"><i class="fa fa-times"></i></button>
    `;
        toastNotification.className = 'toast__notification';
        toastNotification.classList.add('show', type);

        const closeBtn = toastNotification.querySelector('.toast__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                toastNotification.classList.remove('show');
            });
        }

        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    function validateEmail(inputSelector, button) {
        const emailInput = document.querySelector(inputSelector);
        if (!emailInput) {
            console.error("Email input not found with selector:", inputSelector);
            return;
        }
        const inputValue = emailInput.value.trim();

        if (inputValue) {
            if (inputValue.includes('@')) {
                const emailDomain = inputValue.split('@')[1];
                if (emailDomain && validDomains.includes(emailDomain.toLowerCase())) {
                    showToast('toast_email_success', 'success');
                    if (button) {
                        button.classList.add('animate');
                        setTimeout(() => {
                            button.classList.remove('animate');
                        }, 500);
                    }
                } else {
                    showToast('toast_email_error_provider', 'error');
                }
            } else {
                showToast('toast_email_error_at_symbol', 'error');
            }
        } else {
            showToast('toast_email_error_no_email', 'error');
        }
    }

    if (primaryButton) {
        primaryButton.addEventListener('click', function () {
            validateEmail('.hero__card .email__input', primaryButton);
        });
    }

    const faqEmailInput = document.querySelector('.FAQ__get__started__email .email__input');
    const faqGetStartedButton = document.querySelector('.FAQ__get__started__email .primary__button');

    if (faqGetStartedButton && faqEmailInput) {
        faqGetStartedButton.addEventListener('click', function () {
            validateEmail('.FAQ__get__started__email .email__input', faqGetStartedButton);
        });
    } else if (secondaryButton && document.querySelector('.Email__input')) {
        secondaryButton.addEventListener('click', function () {
            validateEmail('.Email__input', secondaryButton);
        });
    }

    let accordions = document.getElementsByClassName("FAQ__title");
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function () {
            this.parentElement.classList.toggle('active');
            const icon = this.querySelector("i");
            if (icon) {
                if (icon.classList.contains("fa-plus")) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-times");
                } else {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-plus");
                }
            }

            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                const wasHidden = content.style.maxHeight === '0px' || !content.style.maxHeight;
                if (wasHidden) {
                    content.style.transition = 'none';
                    content.style.maxHeight = 'auto';
                    const scrollHeight = content.scrollHeight;
                    content.style.maxHeight = '0px';
                    content.offsetHeight;
                    content.style.transition = '';
                    content.style.maxHeight = scrollHeight + "px";
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    }

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const features = document.querySelectorAll('.feature');
    if (features.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.3 });

        features.forEach(feature => {
            observer.observe(feature);
        });
    }

    const navbar_el = document.querySelector('.navbar');
    if (navbar_el) {
        const mobileMenuBtn = navbar_el.querySelector('.mobile__menu__btn') || document.createElement('button');
        if (!mobileMenuBtn.classList.contains('mobile__menu__btn') && !navbar_el.querySelector('.mobile__menu__btn')) {
            mobileMenuBtn.classList.add('mobile__menu__btn');
            mobileMenuBtn.innerHTML = `<span></span><span></span><span></span>`;
            navbar_el.appendChild(mobileMenuBtn);
        }

        let mobileMenu = document.querySelector('.mobile__menu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.classList.add('mobile__menu');
            document.body.appendChild(mobileMenu);
        }

        if (mobileMenu.innerHTML.trim() === '') {
            const navItemsContainer = navbar_el.querySelector('.navbar__nav__items');
            if (navItemsContainer) {
                const langDropdownClone = navItemsContainer.querySelector('.dropdown__container');
                const signInButtonClone = navItemsContainer.querySelector('.signin__button');

                if (langDropdownClone) {
                    const clonedDropdown = langDropdownClone.cloneNode(true);
                    const selectInClone = clonedDropdown.querySelector('select');
                    if (selectInClone) selectInClone.id = "languagesSelectMobile";
                    mobileMenu.appendChild(clonedDropdown);
                }
                if (signInButtonClone) {
                    mobileMenu.appendChild(signInButtonClone.cloneNode(true));
                }
            }
        }

        let overlay = document.querySelector('.mobile__menu__overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('mobile__menu__overlay');
            document.body.appendChild(overlay);
        }

        if (mobileMenuBtn && mobileMenu && overlay) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            overlay.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    function applyTranslations(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) {
            console.error(`Translations for language "${lang}" not found.`);
            return;
        }

        document.documentElement.setAttribute('lang', lang);
        const elementsToTranslate = document.querySelectorAll('[data-translate-key]');

        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate-key');
            const translationValue = translations[lang][key];

            if (translationValue !== undefined) {
                if (element.tagName === 'OPTION' && key.startsWith('language_dropdown_')) {
                    element.textContent = translationValue;
                } else {
                    element.innerHTML = translationValue;
                }
            } else {
            }
        });
    }

    function updateLanguageSelectors(lang) {
        const navbarSelect = document.getElementById('languagesSelectNavbar');
        const footerSelect = document.getElementById('languagesSelectFooter');
        const mobileSelect = document.getElementById('languagesSelectMobile');

        if (navbarSelect) navbarSelect.value = lang;
        if (footerSelect) footerSelect.value = lang;
        if (mobileSelect) mobileSelect.value = lang;
    }

    function changeLanguage(lang) {
        if (typeof translations === 'undefined') {
            console.error("Translations object not loaded. Make sure translations.js is included and correct.");
            showToast('toast_error_language_data_missing', 'error');
            return;
        }

        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);

        applyTranslations(lang);
        updateLanguageSelectors(lang);

        let languageName = lang;
        if (translations[currentLanguage] && translations[currentLanguage][`language_dropdown_${lang}`]) {
            languageName = translations[currentLanguage][`language_dropdown_${lang}`];
        } else {
            if (lang === 'en') languageName = 'English';
            else if (lang === 'hi') languageName = 'हिन्दी';
            else if (lang === 'fr') languageName = 'Français';
        }

        showToast('toast_language_changed_to', 'info', { languageName: languageName });
    }

    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLanguage);

    const navbarLangSelect = document.getElementById('languagesSelectNavbar');
    const footerLangSelect = document.getElementById('languagesSelectFooter');

    if (navbarLangSelect) {
        navbarLangSelect.addEventListener('change', function () {
            changeLanguage(this.value);
        });
    }

    if (footerLangSelect) {
        footerLangSelect.addEventListener('change', function () {
            changeLanguage(this.value);
        });
    }

    document.body.addEventListener('change', function (event) {
        if (event.target.matches('.mobile__menu .language__drop__down, .mobile__menu #languagesSelectMobile')) {
            changeLanguage(event.target.value);
        }
    });

    const addFontAwesome = () => {
        if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="fontawesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(link);
        }
    };
    addFontAwesome();

});
