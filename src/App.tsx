import { useEffect, useMemo, useState } from 'react'
import './App.css'

import fotoPerfil from './assets/Elionardo - blusa preta.jpg'
import printSiteInvictos from './assets/print-invictosportas-com-br.png'
import printWeather from './assets/prints-weather-app.png'
import printSistemaJava from './assets/print-sistema-invictos-java-react.png'
import printRecomendacoes from './assets/print-sistema-recomendacoes-zeiss.png'
import printSistemaPhp from './assets/print-sistema-invictos-php.png'
import printLastClue from './assets/print-the-last-clue.png'
import printTechbox from './assets/electronics-store-print.png'
import printTheWall from './assets/theWall4-print.png'
import printAmorosa from './assets/amorosa-fashion.png'

/* ============ DATA ============ */

const LINKS = {
  linkedin: 'https://br.linkedin.com/in/elionardo-s-santos',
  github: 'https://github.com/elionardosantos',
  invictosSite: 'https://invictosportas.com.br/',
  invictosPost:
    'https://www.linkedin.com/posts/elionardo-s-santos_java-springboot-react-ugcPost-7503523954347888641-paHF',
  phpVideo: 'https://www.youtube.com/watch?v=nng0cwJzRpw',
  iaVideo: 'https://www.youtube.com/watch?v=eHMcwWnN_n0&t=963s',
  lastClue: 'https://lnkd.in/dw6jEuvV',
  weather: 'https://lnkd.in/dXT_G6KX',
  techbox: 'https://lojatechbox.lojavirtualnuvem.com.br/',
  thewall: 'https://thewall4.lojavirtualnuvem.com.br/',
  amorosa: 'https://amorosafashion.lojavirtualnuvem.com.br/',
  whatsapp: 'https://wa.me/5521985926004?text=Ol%C3%A1%20Elionardo!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.',
}

type Kind = 'Cliente real' | 'Residência' | 'Demo'

type Project = {
  title: string
  kind: Kind
  year: string
  description: string
  inProduction?: boolean
  teamProject?: boolean
  ecommerce?: boolean
  bullets?: string[]
  stack: string[]
  image?: string
  demo?: string
  demoLabel?: string
  youtubeId?: string
  youtubeStart?: number
  linkedinEmbed?: string
}

const FEATURED: Project = {
  title: 'Sistema Invictos - Orçamentos e Ordens de Serviço',
  kind: 'Cliente real',
  year: '2026',
  inProduction: true,
  description:
    'Sistema para cálculo automático de orçamentos de portas automáticas, com geração de PDF e exportação de pedidos para o Bling ERP via API. O sistema foi desenvolvido com Java + Spring Boot no backend, React + TypeScript no frontend e PostgreSQL como banco de dados.',
  bullets: [
    'Cálculo automático por dimensões, materiais e instalação',
    'Geração de PDF + controle de status do orçamento',
    'Autenticação JWT com rotas protegidas',
    'Integração com Bling API v3 + consulta de CNPJ e CEP',
  ],
  stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'JWT', 'Bling API', 'GitHub', 'Render', 'Vercel'],
  image: printSistemaJava,
  demo: LINKS.invictosPost,
  demoLabel: 'Ver demonstração',
  linkedinEmbed:
    'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7503523954347888641?compact=1',
}

const PROJECTS: Project[] = [
  {
    title: 'Assistente de Recomendações com IA - ZEISS',
    kind: 'Residência',
    year: '2026',
    teamProject: true,
    description:
      'Agente que utiliza IA para recomendar produtos baseado no perfil do cliente, com integração via n8n e RAG. O sistema também possui um painel administrativo para gerenciar usuários, produtos, lojas e atendimentos.',
    stack: ['Java / Spring Boot', 'React / TypeScript', 'PostgreSQL', 'n8n', 'RAG', 'GitHub'],
    image: printRecomendacoes,
    demo: LINKS.iaVideo,
    demoLabel: 'Assistir no YouTube',
    youtubeId: 'eHMcwWnN_n0',
    youtubeStart: 963,
  },
  {
    title: 'The Last Clue - Jogo alimentado por IA',
    kind: 'Residência',
    year: '2026',
    teamProject: true,
    description:
      'Jogo de investigação com casos, pistas, suspeitos e testemunhas gerados por IA, onde o jogador pode desbloquear pistas, entrevistar testemunhas e tem apenas uma chance para acusar um dos suspeitos baseado nas evidências coletadas.',
    stack: ['Node Express', 'React / TypeScript', 'APIs REST', 'IA Generativa', 'Local Storage', 'GitHub'],
    image: printLastClue,
    demo: LINKS.lastClue,
    demoLabel: 'Ver publicação',
    linkedinEmbed:
      'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7476285701995753472?compact=1',
  },
  {
    title: 'Orçamentos em PHP + Bling',
    kind: 'Cliente real',
    year: '2025',
    inProduction: true,
    description:
      'Cálculo de preço e material para fabricação, com importação do orçamento via OAuth 2.0 para o Bling.',
    stack: ['PHP', 'JavaScript', 'Bootstrap', 'MySQL', 'OAuth 2.0', 'Bling API v3', 'GitHub', 'Hostinger'],
    image: printSistemaPhp,
    demo: LINKS.phpVideo,
    demoLabel: 'Assistir no YouTube',
    youtubeId: 'nng0cwJzRpw',
  },
  {
    title: 'WeatherApp',
    kind: 'Residência',
    year: '2026',
    teamProject: true,
    description:
      'App mobile de previsão do tempo com consumo de API externa.',
    stack: ['React Native', 'Expo', 'TypeScript', 'OpenWeather API', 'GitHub'],
    image: printWeather,
    demo: LINKS.weather,
    demoLabel: 'Ver publicação',
  },
  {
    title: 'Site institucional — Invictos',
    kind: 'Cliente real',
    year: '2025',
    inProduction: true,
    description:
      'Site institucional responsivo em WordPress, com área editável para a equipe do cliente.',
    stack: ['WordPress', 'Elementor', 'HTML', 'CSS'],
    image: printSiteInvictos,
    demo: LINKS.invictosSite,
    demoLabel: 'Visitar site',
  },
  {
    title: 'TechBox — Loja de eletrônicos',
    kind: 'Demo',
    year: '2026',
    ecommerce: true,
    description:
      'Loja demo de eletrônicos desenvolvida por mim na plataforma Nuvemshop, com catálogo, checkout e gestão de pedidos. Apesar de ser demonstração, é 100% funcional.',
      stack: ['Nuvemshop', 'E-commerce', 'Configuração de loja', 'Pagamentos', 'Envios', 'Marketplaces',  'ERPs'],
      image: printTechbox,
    demo: LINKS.techbox,
    demoLabel: 'Visitar loja',
  },
  {
    title: 'The Wall — Moda e vestuário',
    kind: 'Demo',
    year: '2026',
    ecommerce: true,
    description:
      'Loja demo de moda e vestuário desenvolvida por mim na plataforma Nuvemshop, com vitrine, catálogo e checkout configurados. Apesar de ser demonstração, é 100% funcional.',
    stack: ['Nuvemshop', 'E-commerce', 'Configuração de loja', 'Pagamentos', 'Envios', 'Marketplaces',  'ERPs'],
    image: printTheWall,
    demo: LINKS.thewall,
    demoLabel: 'Visitar loja',
  },
  {
    title: 'Amorosa Fashion — Moda e vestuário',
    kind: 'Demo',
    year: '2026',
    ecommerce: true,
    description:
      'Loja demo de moda feminina desenvolvida por mim na plataforma Nuvemshop, com vitrine, catálogo e checkout configurados. Apesar de ser demonstração, é 100% funcional.',
    stack: ['Nuvemshop', 'E-commerce', 'Configuração de loja', 'Pagamentos', 'Envios', 'Marketplaces',  'ERPs'],
    image: printAmorosa,
    demo: LINKS.amorosa,
    demoLabel: 'Visitar loja',
  },
]

const STACK = [
  { title: 'Backend', items: ['Java 21', 'Spring Boot', 'JPA / Hibernate', 'Security + JWT', 'REST APIs'] },
  { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Bootstrap'] },
  { title: 'Dados & Integrações', items: ['PostgreSQL', 'MySQL', 'SQL', 'OAuth 2.0', 'Swagger', 'APIs REST', 'Bling API'] },
  { title: 'IA & Deploy', items: ['n8n', 'RAG', 'LLMs', 'Docker', 'Git', 'GitHub', 'Render', 'Vercel', 'Railway'] },
]

const TECH_STRIP = [
  'Java', 'Spring Boot', 'PHP', 'React', 'TypeScript', 'PostgreSQL', 'MySQL', 'REST API',
  'JWT', 'Bling API', 'Docker', 'n8n', 'Git', 'Vercel'
]

/* ============ HOOKS ============ */

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('on')),
      { threshold: 0.1 },
    )
    const observeAll = () => {
      document.querySelectorAll('.rv:not(.on)').forEach((el) => io.observe(el))
    }
    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/* ============ ICONS ============ */

const Play = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5z" />
  </svg>
)
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
)

/* ============ MODAL ============ */

function VideoModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const isYt = Boolean(p.youtubeId)
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className={`modal${isYt ? '' : ' narrow'}`}
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top">
          <strong>{p.title}</strong>
          <button type="button" className="x" onClick={onClose} aria-label="Fechar" autoFocus>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className={`modal-frame${isYt ? '' : ' tall'}`}>
          {isYt ? (
            <iframe
              src={`https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&rel=0${p.youtubeStart ? `&start=${p.youtubeStart}` : ''}`}
              title={`Demonstração em vídeo de ${p.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <iframe src={p.linkedinEmbed} title={`${p.title} — publicação no LinkedIn`} />
          )}
        </div>
        {p.demo && (
          <div className="modal-bottom">
            <a className="link" href={p.demo} target="_blank" rel="noreferrer">
              {p.youtubeId ? 'Abrir vídeo original no YouTube' : 'Abrir publicação original no LinkedIn'} <Arrow />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

/* ============ SECTIONS ============ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-bar">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <img className="brand-avatar" src={fotoPerfil} alt="Foto de Elionardo Santos" />
          <span>
            Elionardo Santos
            <span className="brand-sub">Full Stack Júnior</span>
          </span>
        </a>
        <nav className={`nav-menu${open ? ' open' : ''}`} aria-label="Navegação principal">
          <a href="#projetos" onClick={() => setOpen(false)}>Projetos</a>
          <a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
          <a href="#stack" onClick={() => setOpen(false)}>Stack</a>
          <a href="#formacao" onClick={() => setOpen(false)}>Formação</a>
          <a href="#contato" className="btn btn-dark btn-sm" onClick={() => setOpen(false)}>Contato</a>
        </nav>
        <button type="button" className="hamburger" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
          <span style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined} />
          <span style={open ? { opacity: 0 } : undefined} />
          <span style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined} />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="badge rv">
            <span className="badge-dot" aria-hidden="true"><i /></span>
            Disponível • Magé/RJ • Remoto
          </span>
          <h1 className="rv">
            Full Stack Júnior<br />
            <em>com entrega real.</em>
          </h1>
          <p className="hero-desc rv">
            Olá, eu sou <strong>Elionardo Silva dos Santos</strong>. Formação de 770h na Residência
            TIC Software (Firjan SENAI - Serratec). Construo com <strong>Java • Spring Boot • React • PostgreSQL</strong>,
            e consumo APIs REST — hoje já tenho sistemas em ambiente de produção sendo utilizados pelo cliente.
          </p>
          <div className="hero-actions rv">
            <a href="#projetos" className="btn btn-dark">Ver projetos</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn btn-light">LinkedIn <Arrow /></a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn-light">GitHub <Arrow /></a>
          </div>
          <dl className="hero-meta rv">
            <div><dt className="sr-only">Formação</dt><dd><strong>770h</strong><span>Residência Serratec</span></dd></div>
            <div><dt className="sr-only">Projetos</dt><dd><strong>9</strong><span>Projetos publicados</span></dd></div>
            <div><dt className="sr-only">Clientes</dt><dd><strong>3</strong><span>Entregas para cliente real</span></dd></div>
          </dl>
        </div>

        <aside className="hero-card rv" aria-label="Resumo profissional">
          <img className="hero-photo" src={fotoPerfil} alt="Foto de Elionardo Silva dos Santos" />
          <div className="hero-card-body">
            <div className="hero-card-top">
              <div>
                <div className="hero-name">Elionardo S. Santos</div>
                <div className="hero-role">Java • Spring Boot • React • PostgreSQL</div>
              </div>
              <span className="avail"><span aria-hidden="true">●</span> Aberto a vagas</span>
            </div>
            <div className="hero-tags">
              <span className="tag">Backend + APIs</span>
              <span className="tag">Integração ERP</span>
              <span className="tag">JWT / Auth</span>
            </div>
            <div className="float-row">
              <div className="float"><strong>E-commerce</strong><span>Experiência prévia com implantação e operação de e-commerce e marketplaces</span></div>
              <div className="float"><strong>Logística</strong><span>Mais de 10 anos de experiência com operações e processos logísticos</span></div>
            </div>
          </div>
        </aside>
      </div>

      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          {[0, 1].map((n) => (
            <span key={n}>{TECH_STRIP.join('   •   ') + '   •   '}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedRow({ p, isMain = false, onPlay }: { p: Project; isMain?: boolean; onPlay: (p: Project) => void }) {
  const playable = Boolean(p.youtubeId || p.linkedinEmbed)
  return (
    <article className={`featured rv${isMain ? '' : ' featured-light'}`}>
      <div className="featured-media">
        {p.image && <img src={p.image} alt={`Print do projeto ${p.title}`} loading="lazy" />}
        {playable ? (
          <button type="button" className="featured-play" onClick={() => onPlay(p)} aria-label={`Assistir à demonstração de ${p.title}`}>
            <span className="play-circle"><Play /></span>
          </button>
        ) : p.demo ? (
          <a className="featured-play featured-link-overlay" href={p.demo} target="_blank" rel="noreferrer" aria-label={`Abrir ${p.title}`} />
        ) : null}
      </div>
      <div className="featured-body">
        <div className="pill-row">
          {isMain && <span className="pill pill-client">★ Projeto em destaque</span>}
          <span className={p.kind === 'Cliente real' ? 'pill pill-real' : p.kind === 'Demo' ? 'pill pill-demo' : 'pill pill-res'}>{p.kind}</span>
          <span className="pill pill-soft">{p.year}</span>
          {p.inProduction && <span className="pill pill-prod"><i className="prod-dot" />Em produção</span>}
          {p.teamProject && <span className="pill pill-team">Desenvolvido em equipe</span>}
          {p.ecommerce && <span className="pill pill-ecom">E-commerce</span>}
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {p.bullets && p.bullets.length > 0 && (
          <div className="feat-list">
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>
                  <span className="check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="stack-dark">
          {p.stack.map((s) => <span key={s}>{s}</span>)}
        </div>
        <div className="featured-actions">
          {playable ? (
            <>
              <button type="button" className="btn btn-white btn-sm" onClick={() => onPlay(p)}>
                <Play /> {p.demoLabel ?? 'Assistir à demo'}
              </button>
              {p.demo && (
                <a className="btn btn-ghost btn-sm" href={p.demo} target="_blank" rel="noreferrer">
                  {p.youtubeId ? 'Abrir no YouTube' : 'Abrir publicação'} <Arrow />
                </a>
              )}
            </>
          ) : (
            p.demo && p.demoLabel && (
              <a className="btn btn-white btn-sm" href={p.demo} target="_blank" rel="noreferrer">
                {p.demoLabel} <Arrow />
              </a>
            )
          )}
        </div>
      </div>
    </article>
  )
}

function FeaturedBlock({ onPlay }: { onPlay: (p: Project) => void }) {
  return <FeaturedRow p={FEATURED} isMain onPlay={onPlay} />
}

function ProjectsSection() {
  const [modal, setModal] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'Todos' | Kind>('Todos')

  const list = useMemo(
    () => (filter === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.kind === filter)),
    [filter],
  )

  return (
    <section className="section">
      <div className="container">
        <p id="projetos" className="kicker rv">Portfólio</p>
        <div className="sec-head">
          <div>
            <h2 className="h2 rv">Projetos em destaque</h2>
            <p className="lead rv">9 trabalhos: 3 entregas para cliente real, 3 projetos da Residência Serratec e 3 lojas demo.</p>
          </div>
          <div className="filters rv" role="group" aria-label="Filtrar projetos">
            {(['Todos', 'Cliente real', 'Residência', 'Demo'] as const).map((f) => (
              <button key={f} type="button" className={`filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)} aria-pressed={filter === f}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {(filter === 'Todos' || filter === FEATURED.kind) && <FeaturedBlock onPlay={setModal} />}

        <div className="project-list">
          {list.map((p) => (
            <FeaturedRow key={p.title} p={p} onPlay={setModal} />
          ))}
        </div>
      </div>
      {modal && (modal.youtubeId || modal.linkedinEmbed) && (
        <VideoModal p={modal} onClose={() => setModal(null)} />
      )}
    </section>
  )
}

function AboutStack() {
  return (
    <section className="section section-soft">
      <div className="container split">
        <div id="sobre" className="panel rv">
          <p className="kicker">Sobre</p>
          <h3>Do e-commerce para o código</h3>
          <p>
            Com mais de <strong>10 anos</strong> em <strong>operações logísticas</strong>, e experiência prévia como <strong>analista de e-commerce</strong>, decidi migrar para a área de desenvolvimento de software. A vivência em processos e sistemas me deu base para entender melhor, e propor melhorias às necessidades de negócio de cada cliente.
          </p>
          <p>
            Hoje sou <strong>desenvolvedor Full Stack Júnior</strong> formado na <strong>Residência Serratec (770h)</strong>,
            <strong> com sistemas em ambiente de produção</strong> para um cliente real, onde pude por em prática minha experiência prévia, e aplicar meus conhecimentos de desenvolvimento para entregar uma <strong>solução completa</strong>.
          </p>
          <div className="timeline">
            <div className="tl">
              <div>
                <small>2026 • FREELANCE</small>
                <strong>Desenvolvedor Full Stack - Invictos Portas</strong>
                <span>Desenvolvi um sistema automatizado de gerenciamento de orçamentos, integrando tecnologias modernas. <br></br> • Java • Spring Boot • Spring Security • JWT • React • TypeScript • PostgreSQL • APIs REST • GitHub • Bling API </span>
              </div>
            </div>
            <div className="tl">
              <div>
                <small>ANTERIOR • E-COMMERCE</small>
                <strong>Analista de E-commerce</strong>
                <span>Implantei operações de ecommerce com lojas virtuais, marketplaces, integração de sistemas, automação de processos e gestão de estoques. <br></br> • Vendas • Marketplaces • Operações Logísticas • WMS • Notas Fiscais • Relatórios em planilhas</span>
              </div>
            </div>
          </div>
        </div>

        <div id="stack" className="panel rv">
          <p className="kicker">Stack</p>
          <h3>Tecnologias que utilizo</h3>
          <p>Foco em backend Java, sem abrir mão do frontend. APIs, integrações e deploy de ponta a ponta.</p>
          <div className="stack-grid">
            {STACK.map((g) => (
              <div key={g.title} className="stack-box">
                <h4>{g.title}</h4>
                <div className="chips">
                  {g.items.map((i) => <span key={i}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="section">
      <div className="container">
        <p id="formacao" className="kicker rv">Formação</p>
        <h2 className="h2 rv">Formação e base técnica</h2>
        <p className="lead rv journey-lead" style={{ marginBottom: 26 }}>
          Formação intensiva em software, com base prática de negócio vinda do <span className="nowrap">e-commerce</span>.
        </p>
        <div className="journey">
          <div className="j-card rv">
            <h3>Residência em TIC Software — Serratec</h3>
            <p className="sub">770h de aulas práticas • Conclusão em 2026 • Firjan SENAI - SERRATEC</p>
            <ul className="j-list">
              <li>Backend: Java, POO, Spring Boot, APIs REST e PostgreSQL</li>
              <li>Frontend e mobile: React, React Native e TypeScript</li>
              <li>Ferramentas: Git, Docker, n8n, IA aplicada e metodologias ágeis</li>
            </ul>
          </div>
          <div className="j-card rv">
            <h3>Idiomas e diferenciais</h3>
            <p className="sub">Base que sustenta o dia a dia</p>
            <ul className="j-list">
              <li>Inglês intermediário — leitura de documentação técnica</li>
              <li>Operação de e-commerce: marketplaces, ERP e logística</li>
              <li>Aprendizado contínuo e forte motivação para evoluir como desenvolvedor</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contato" className="section section-cta">
      <div className="container">
        <div className="cta-banner rv">
          <p className="kicker kicker-center">Contato</p>
          <h2>Vamos conversar?</h2>
          <p>Sou desenvolvedor Full Stack Júnior com foco em backend Java. Busco oportunidades remotas ou híbridas — respondo rapidamente no LinkedIn.</p>
          <div className="cta-row">
            <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="btn btn-white">WhatsApp <Arrow /></a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn <Arrow /></a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub <Arrow /></a>
          </div>
          <p className="cta-note mono">Magé • RJ • Java • Spring Boot • React • PostgreSQL</p>
        </div>
      </div>
    </section>
  )
}

/* ============ APP ============ */

export default function App() {
  useReveal()
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <ProjectsSection />
        <AboutStack />
        <Journey />
        <Contact />
      </main>
      <footer>
        <div className="container foot">
          <small>© 2026 Elionardo S. Santos — Magé/RJ</small>
          <nav aria-label="Links de rodapé">
            <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#top">Voltar ao topo <span aria-hidden="true">↑</span></a>
          </nav>
        </div>
      </footer>
      <a
        href={LINKS.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        aria-label="Conversar no WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.9 1 1.9 2.7 3.7 4.7 4.7 1.7.9 2.5.9 3.4.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.5-.2z" />
        </svg>
      </a>
    </>
  )
}
