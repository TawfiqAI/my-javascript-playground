const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.links-container');
const navLinks = document.querySelectorAll('.links-container a');

// فتح وإغلاق القائمة عند الضغط على الزر
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // تحديث حالة الزر لقارئات الشاشة
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

// إغلاق القائمة تلقائياً عند الضغط على أي رابط بداخلها
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});