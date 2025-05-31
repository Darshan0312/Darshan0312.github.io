document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links & Active link highlighting
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = document.querySelector('header').offsetHeight;
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  function setActiveLink() {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 50; // Adjusted offset
      if (window.pageYOffset >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
    // Fallback to home if no section is "current" (e.g., at the very top or bottom beyond sections)
    if (!currentSectionId && window.pageYOffset < sections[0].offsetTop - headerHeight) {
        const homeLink = document.querySelector('nav a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const elementPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        // Close mobile nav if open
        if (navList.classList.contains('nav-active')) {
          navList.classList.remove('nav-active');
          navToggle.classList.remove('active');
        }
      }
    });
  });

  // Hamburger menu toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('nav-active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile nav when a link is clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navList.classList.contains('nav-active')) {
            navList.classList.remove('nav-active');
            navToggle.classList.remove('active');
        }
    });
  });


  // Dynamically update copyright year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Initial active link set & on scroll
  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  // Scroll animations for sections
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% of the item is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // observer.unobserve(entry.target); // Optional: stop observing after animation
      } else {
         // Optional: remove class if you want animation to replay on scroll up/down
         // entry.target.classList.remove('visible');
      }
    });
  };

  const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Hide header on scroll down, show on scroll up
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > headerHeight) { // Scroll Down
      header.style.top = `-${headerHeight}px`;
    } else { // Scroll Up
      header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, false);

});