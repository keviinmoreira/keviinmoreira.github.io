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
            title: "Sistema de Gestão de Clientes",
            description: "Uma aplicação full-stack para gerenciamento de clientes com CRUD completo, autenticação de usuários e relatórios.",
            image: "https://via.placeholder.com/400x200/0A192F/64FFDA?text=Projeto+1",
            tags: ["React", "Node.js", "Express", "MongoDB", "Auth0"],
            githubLink: "https://github.com/kevinmoreira/client-management-system",
            demoLink: "https://democms.netlify.app"
        },
        {
            id: 2,
            title: "E-commerce de Eletrônicos",
            description: "Plataforma de comércio eletrônico responsiva com carrinho de compras, sistema de pagamentos e painel administrativo.",
            image: "https://via.placeholder.com/400x200/0A192F/64FFDA?text=Projeto+2",
            tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
            githubLink: "https://github.com/kevinmoreira/e-commerce-electronics",
            demoLink: "https://demostore.vercel.app"
        },
        {
            id: 3,
            title: "API de Previsão do Tempo",
            description: "API RESTful que fornece dados de previsão do tempo em tempo real, com caching e tratamento de erros.",
            image: "https://via.placeholder.com/400x200/0A192F/64FFDA?text=Projeto+3",
            tags: ["Python", "Flask", "OpenWeatherMap API", "Redis"],
            githubLink: "https://github.com/kevinmoreira/weather-api",
            demoLink: "https://weather-api.heroku.com"
        },
        {
            id: 4,
            title: "Dashboard Analítico",
            description: "Dashboard interativo para visualização de dados de vendas, com gráficos e filtros dinâmicos.",
            image: "https://via.placeholder.com/400x200/0A192F/64FFDA?text=Projeto+4",
            tags: ["Vue.js", "D3.js", "Firebase", "Chart.js"],
            githubLink: "https://github.com/kevinmoreira/analytics-dashboard",
            demoLink: "https://analytics-dash.netlify.app"
        },
        {
            id: 5,
            title: "Aplicativo de Lista de Tarefas",
            description: "Um simples aplicativo de lista de tarefas com funcionalidades de adicionar, editar e remover tarefas, utilizando armazenamento local.",
            image: "https://via.placeholder.com/400x200/0A192F/64FFDA?text=Projeto+5",
            tags: ["JavaScript", "HTML", "CSS", "Local Storage"],
            githubLink: "https://github.com/kevinmoreira/todo-app",
            demoLink: "https://kevinmoreira.github.io/todo-app"
        },
        {
            id: 6,
            title: "Blog Pessoal com Markdown",
            description: "Blog responsivo onde posso escrever e publicar artigos utilizando formatação Markdown, com sistema de comentários.",
            image: "https://via.placeholder.com/400x200/0A192F/64FFDA?text=Projeto+6",
            tags: ["Gatsby", "GraphQL", "Markdown", "Netlify CMS"],
            githubLink: "https://github.com/kevinmoreira/markdown-blog",
            demoLink: "https://myblog.gatsbyjs.io"
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
                    <a href="${project.demoLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
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
        alert('Formulário enviado com sucesso! (Esta é apenas uma demonstração. Em um projeto real, você enviaria os dados para um backend.)');
        contactForm.reset();
    });
});