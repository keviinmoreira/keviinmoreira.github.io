document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    const setActiveLink = () => {
        let currentActive = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    const projectsData = [
        {
            id: 1,
            title: "Ainda vazio!",
            description: "Volte quando houver projetos recentes!",
            image: "https://matteus.dev/curso/curso-online-zero-pro-desenvolvimento-web/",
            tags: ["software development"],
            githubLink: "https://github.com/keviinmoreira",
        }
    ];

    const projectGrid = document.getElementById('projectGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let projectsPerPage = 3;
    let currentProjectsDisplayed = 0;

    const createProjectCard = (project) => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                </div>
            </div>
        `;
        return card;
    };

    const loadProjects = () => {
        const projectsToLoad = projectsData.slice(currentProjectsDisplayed, currentProjectsDisplayed + projectsPerPage);
        projectsToLoad.forEach(project => {
            projectGrid.appendChild(createProjectCard(project));
        });
        currentProjectsDisplayed += projectsToLoad.length;

        if (currentProjectsDisplayed >= projectsData.length) {
            loadMoreBtn.style.display = 'none';
        }
    };

    loadProjects();

    loadMoreBtn.addEventListener('click', loadProjects);

    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado com sucesso!');
        contactForm.reset();
    });
});
