const projectData = [
  {
    id: 1,
    title: 'Mohamed Reda Portfolio',
    category: 'web-development',
    description: 'A responsive portfolio website presenting an early-career profile, technical skills, career focus, and contact options.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    features: [
      'Responsive single-page layout',
      'Filterable project showcase',
      'Light and dark theme toggle',
      'Accessible navigation and contact message builder'
    ],
    tools: 'HTML, CSS, JavaScript, Bootstrap 5',
    results: 'This portfolio is the project website.',
    image: 'images/hero-illustration.svg'
  }
];

const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modalBody = document.getElementById('modalBody');
const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));

function renderProjects(filter = 'all') {
  const filteredProjects = filter === 'all'
    ? projectData
    : projectData.filter((project) => project.category === filter);

  projectGrid.innerHTML = filteredProjects.map((project) => `
    <article class="project-card" data-category="${project.category}">
      <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.onerror=null;this.src='hero-illustration.svg'" />
      <div class="project-body">
        <div class="project-meta">
          <span class="project-tag">${project.category.replace('-', ' ')}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-techs">
          ${project.technologies.slice(0, 3).map((tech) => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="view-btn" data-project-id="${project.id}">View Project</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.view-btn').forEach((button) => {
    button.addEventListener('click', () => openProjectModal(Number(button.dataset.projectId)));
  });
}

function openProjectModal(projectId) {
  const project = projectData.find((item) => item.id === projectId);

  if (!project) return;

  modalBody.innerHTML = `
    <div class="modal-project-body">
      <img src="${project.image}" alt="${project.title}" onerror="this.onerror=null;this.src='hero-illustration.svg'" />
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div>
        <h4>Technologies</h4>
        <div class="project-techs">
          ${project.technologies.map((tech) => `<span>${tech}</span>`).join('')}
        </div>
      </div>
      <div>
        <h4>Features</h4>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h4>Tools</h4>
        <p>${project.tools}</p>
      </div>
      <div>
        <h4>Results</h4>
        <p>${project.results}</p>
      </div>
      <div class="project-actions">
      </div>
    </div>
  `;

  projectModal.show();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.filter);
  });
});

renderProjects();

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme('light');
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', nextTheme);
  applyTheme(nextTheme);
});

const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const sections = document.querySelectorAll('main section[id]');
  let current = 'home';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === `#${current}`;
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  setActiveLink();
  const backToTop = document.getElementById('backToTop');
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const typedText = document.getElementById('typingText');
const textArray = [
  'Data Analyst',
  'Junior Data Scientist',
  'Web Developer',
  'Python & SQL Specialist'
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  const currentText = textArray[textIndex];

  if (!deleting) {
    charIndex += 1;
    typedText.textContent = currentText.slice(0, charIndex);
    if (charIndex === currentText.length) {
      deleting = true;
      setTimeout(typeWriter, 1200);
      return;
    }
  } else {
    charIndex -= 1;
    typedText.textContent = currentText.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      textIndex = (textIndex + 1) % textArray.length;
    }
  }

  const speed = deleting ? 60 : 110;
  setTimeout(typeWriter, speed);
}

if (typedText) {
  typeWriter();
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.getElementById('contactForm');

function copyMessage(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise((resolve, reject) => {
    const messageField = document.createElement('textarea');
    messageField.value = text;
    messageField.style.position = 'fixed';
    messageField.style.opacity = '0';
    document.body.appendChild(messageField);
    messageField.select();
    const copied = document.execCommand('copy');
    messageField.remove();
    copied ? resolve() : reject(new Error('Clipboard copy failed'));
  });
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name')?.trim();
  const email = formData.get('email')?.trim();
  const subject = formData.get('subject')?.trim();
  const message = formData.get('message')?.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill in all required fields before sending your message.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const messageText = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
  const contactStatus = document.getElementById('contactStatus');

  if (navigator.share) {
    navigator.share({ title: subject, text: messageText })
      .then(() => {
        contactStatus.textContent = 'Message shared.';
        contactForm.reset();
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          contactStatus.textContent = 'Unable to share the message from this device.';
        }
      });
    return;
  }

  copyMessage(messageText)
    .then(() => {
      contactStatus.textContent = 'Message copied. You can paste it into your preferred messaging app.';
      contactForm.reset();
    })
    .catch(() => {
      contactStatus.textContent = 'Unable to copy the message from this browser.';
    });
});

const currentYear = document.getElementById('currentYear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const navScript = document.querySelectorAll('.nav-link[href^="#"]');
navScript.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
