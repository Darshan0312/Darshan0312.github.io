// Simple smooth scrolling for nav links

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetID);
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Update active nav link styling
    document.querySelectorAll('nav a').forEach(navLink => {
      navLink.classList.remove('active');
    });
    link.classList.add('active');
  });
});
