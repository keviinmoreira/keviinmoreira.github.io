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
            title: "Currently empty!",
            description: "Return when new projects are added.",
            image: "https://triadelab.com/wp-content/uploads/2024/07/GIF-MOTION-001.gif", 
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

    const showToast = (message, isError = false) => {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (isError) toast.style.borderLeftColor = '#f44336';
        
        toast.innerHTML = `
            <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}" style="color: ${isError ? '#f44336' : '#4CAF50'}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    };

    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'ENVIANDO...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formspree.io/f/mzdbgaak', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToast('Mensagem enviada com sucesso!');
                contactForm.reset();
            } else {
                const errorData = await response.json();
                showToast(errorData.error || 'Erro ao enviar. Tente novamente!', true);
            }
        } catch (error) {
            showToast('Erro de conexão com o servidor.', true);
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});