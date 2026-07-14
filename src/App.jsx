import React, { useState, useEffect } from 'react'

function App() {
  // Dynamic typing animation text
  const titles = ['Prompt Engineer', 'AI Product Creator', 'AI Operator', 'AI Co-Creator'];
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Projects data (Customized for AI Operator / Prompt Engineer)
  const initialProjects = [
    {
      id: 1,
      title: 'Prompt-Crafted Portfolio',
      desc: 'Интерактивное веб-портфолио (этот сайт), созданное в соавторстве с ИИ-агентом. Спроектировано через промпты, протестировано и развернуто полностью силами ИИ под моим руководством.',
      category: 'AI Products',
      tags: ['React', 'Prompt Engineering', 'AI Co-Creation', 'Vite'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      demoUrl: '#',
      gitUrl: '#'
    },
    {
      id: 2,
      title: 'Interactive Web Synth',
      desc: 'Музыкальный синтезатор в браузере. Код полностью сгенерирован ИИ по детальным текстовым описаниям, баги устранены через итеративную отладку промптами.',
      category: 'AI Products',
      tags: ['Web Audio API', 'HTML5', 'AI Coding', 'QA Testing'],
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      demoUrl: '#',
      gitUrl: '#'
    },
    {
      id: 3,
      title: 'AI-Generated API Service',
      desc: 'Набор бэкенд-микросервисов для обработки медиафайлов, написанный нейросетью по моим архитектурным промптам и спецификациям.',
      category: 'Microservices',
      tags: ['FastAPI', 'Python', 'Docker', 'Prompt Design'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      demoUrl: '#',
      gitUrl: '#'
    },
    {
      id: 4,
      title: 'Automated Content Workflow',
      desc: 'Скрипты автоматизации для постинга контента, созданные нейросетью. Управление процессом разработки велось через фидбек-лупы и исправление ошибок ИИ.',
      category: 'Automations',
      tags: ['Python', 'LLM Automation', 'Product Management', 'API'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      demoUrl: '#',
      gitUrl: '#'
    }
  ];

  const [projects] = useState(initialProjects);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  // Contact form state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle typing effect
  useEffect(() => {
    let timer;
    const handleType = () => {
      const fullTitle = titles[titleIndex];
      if (!isDeleting) {
        setCurrentText(fullTitle.substring(0, currentText.length + 1));
        setTypingSpeed(100);
        
        if (currentText === fullTitle) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before start deleting
          return;
        }
      } else {
        setCurrentText(fullTitle.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        
        if (currentText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="bg-grid"></div>

      <header>
        <div className="nav-container">
          <a href="#" className="logo">PORTFOLIO</a>
          <nav className="nav-links">
            <a href="#hero" className="nav-link">Главная</a>
            <a href="#projects" className="nav-link">Проекты</a>
            <a href="#contact" className="nav-link">Контакты</a>
          </nav>
        </div>
      </header>

      <div className="container">
        {/* Hero Section */}
        <section id="hero">
          <div className="hero-content">
            <div className="hero-subtitle">Приветствую, я разработчик</div>
            <h1 className="hero-title">
              Создаю <span className="gradient-text">{currentText || '\u00A0'}</span>
              <span style={{ borderRight: '2px solid var(--neon-cyan)', animation: 'blink 0.7s infinite' }}></span>
            </h1>
            <p className="hero-desc">
              Специализируюсь на создании IT-продуктов с помощью нейросетей: проектирую архитектуру, пишу точные промпты, тестирую готовые решения и устраняю баги.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">Мои работы</a>
              <a href="#contact" className="btn btn-secondary">Связаться</a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <div className="section-header">
            <h2 className="section-title">Портфолио проектов</h2>
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['All', 'AI Products', 'Microservices', 'Automations'].map((cat) => (
              <button
                key={cat}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <input
              type="text"
              placeholder="Поиск по тегам или названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '0.8rem 1.2rem',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-card)',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-info">
                  <div className="project-title">{project.title}</div>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.demoUrl} className="project-link">
                      Демо <span>→</span>
                    </a>
                    <a href={project.gitUrl} className="project-link" style={{ opacity: 0.7 }}>
                      GitHub <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                Проекты не найдены.
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="section-header">
            <h2 className="section-title">Контакты</h2>
          </div>

          <div className="contact-container">
            <div className="contact-info">
              <h3>Обсудим проект?</h3>
              <p>
                Я всегда открыт для новых предложений, совместных проектов и интересных задач в веб-разработке. Напишите мне сообщение или свяжитесь удобным способом.
              </p>
              <div className="contact-methods">
                <a href="mailto:mega_work@example.com" className="contact-method">
                  <span className="contact-icon">✉</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>Email</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>mega_work@example.com</div>
                  </div>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-method">
                  <span className="contact-icon">📂</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>GitHub</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>github.com/mega_work</div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Имя</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Сообщение</label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Привет! Есть интересная задача..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ border: 'none' }}>
                  Отправить
                </button>

                {formSubmitted && (
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid var(--neon-cyan)',
                    color: 'var(--neon-cyan)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginTop: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} PORTFOLIO. Разработано на React & Vite.</p>
        </div>
      </footer>
    </>
  )
}

export default App

