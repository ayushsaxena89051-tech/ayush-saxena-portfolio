import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, Github, Linkedin, Menu, X, Code2, GraduationCap, MapPin, Braces, Terminal, Award, BookOpen, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import cube from "@/assets/developer-cube.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Ayush Saxena — CSE Student & Aspiring Developer" },
    { name: "description", content: "Meet Ayush Saxena, a first-year BTech CSE Core student at JECRC University. Explore his education, learning journey, skills, and portfolio." },
    { property: "og:title", content: "Ayush Saxena — CSE Student & Aspiring Developer" },
    { property: "og:description", content: "A curious mind. A builder in the making. Explore Ayush's personal portfolio." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const sections = ["Home", "About", "Education", "Skills", "Projects", "Certificates", "Contact"];
const projects = [
  { name: "Personal Portfolio", category: "WEB DEVELOPMENT", description: "A little corner of the internet to share my journey, interests, and work.", tags: ["HTML", "CSS", "JavaScript"], status: "You're viewing it", detail: "This portfolio brings together my education and learning journey in a clean, accessible website. Built with React and modern CSS, with smooth section navigation and layouts for every screen." },
  { name: "Campus Taskboard", category: "PROJECT CONCEPT", description: "An idea for keeping classes, assignments, and everyday student tasks in one place.", tags: ["JavaScript", "UI Design"], status: "On the drawing board", detail: "A future learning project: a simple student task organizer with subjects, due dates, and completion tracking. This is a concept, not a completed application." },
  { name: "Code Playground", category: "PROJECT CONCEPT", description: "A space for small coding experiments, problem solving, and learning by doing.", tags: ["C / C++", "Problem Solving"], status: "On the drawing board", detail: "A future collection of beginner programming exercises and experiments. The goal is to practice the fundamentals and document what I learn. No published repository is available yet." },
];

function SectionTitle({ number, label, title }: { number: string; label: string; title: string }) {
  return <div><p className="eyebrow text-muted-foreground"><span className="section-number">{number}</span>{label}</p><h2 className="section-heading">{title}</h2></div>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [project, setProject] = useState<(typeof projects)[number] | null>(null);
  const [social, setSocial] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    sections.forEach(name => { const element = document.getElementById(name.toLowerCase()); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  return <>
    <header className="site-header">
      <div className="portfolio-container flex h-20 items-center justify-between gap-6">
        <a href="#home" className="wordmark" aria-label="Ayush Saxena home">AS<span className="text-primary">.</span></a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">{sections.map(name => <a key={name} href={`#${name.toLowerCase()}`} className={`nav-link ${active === name.toLowerCase() ? "active" : ""}`}>{name}</a>)}</nav>
        <Button asChild variant="navigation" className="hidden sm:inline-flex"><a href="#contact">Let’s talk <ArrowUpRight /></a></Button>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav className="portfolio-container grid gap-5 pb-6 lg:hidden" aria-label="Mobile navigation">{sections.map(name => <a className="nav-link" key={name} href={`#${name.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>}
    </header>

    <main>
      <section id="home" className="hero">
        <img src={cube} className="hero-art" alt="Sculptural glass cube with a glowing green core" width={1024} height={1024} />
        <div className="portfolio-container">
          <div className="hero-copy enter">
            <div className="flex items-center gap-2.5"><span className="status-dot" /><span className="eyebrow text-primary">A curious mind. A builder in the making.</span></div>
            <h1 className="hero-title">Ayush<br /><span className="text-primary">Saxena<span className="text-foreground">.</span></span></h1>
            <p className="font-display text-xl font-medium sm:text-2xl">Student today. Problem solver for life.</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">First-year BTech CSE student at JECRC University.<br className="hidden sm:block" /> Exploring technology, turning curiosity into code, and<br className="hidden sm:block" /> building something meaningful along the way.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="portfolio" className="h-12 px-6"><a href="#projects">Explore my work <ArrowUpRight /></a></Button><Button asChild variant="navigation" className="h-12 px-6"><a href="#contact">Get in touch <ArrowRight /></a></Button></div>
          </div>
          <div className="hero-bottom"><div className="portfolio-container flex items-center justify-between"><div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={14} /> JECRC University, Jaipur</div><a href="#about" className="flex items-center gap-3 text-xs text-muted-foreground">A little more about me <ArrowDown size={15} /></a></div></div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="portfolio-container grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div><SectionTitle number="01" label="About me" title="Driven by curiosity. Grounded in learning." /><p className="mt-5 section-lead">Every great journey starts with a first step.<br />This is mine.</p></div>
          <div><p className="text-base leading-8">Hi, I’m Ayush — a first-year Computer Science student at <span className="text-primary">JECRC University</span>, taking my first steps into the world of technology.</p><p className="mt-4 section-lead">I’m interested in how things work, how code can solve everyday problems, and how a simple idea can become something useful. My focus right now is building a strong foundation, exploring new tools, and learning one step at a time.</p><div className="mt-7 flex flex-wrap gap-3"><span className="tag"><Code2 size={13} className="mr-2 text-primary" /> Aspiring developer</span><span className="tag"><BookOpen size={13} className="mr-2 text-signal" /> Lifelong learner</span><span className="tag"><Sparkles size={13} className="mr-2 text-signal-secondary" /> Curious thinker</span></div></div>
        </div>
      </section>

      <section id="education" className="section"><div className="portfolio-container"><SectionTitle number="02" label="Education" title="Where it all begins." /><div className="mt-9 flex flex-col gap-6 border-l-2 border-primary pl-7 sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-5"><GraduationCap className="mt-1 shrink-0 text-primary" size={29} /><div><h3 className="font-display text-xl font-medium">JECRC University</h3><p className="mt-2 text-sm text-muted-foreground">Bachelor of Technology · Computer Science & Engineering (Core)</p><p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={13} /> Jaipur, Rajasthan, India</p></div></div><span className="tag self-start text-primary">First year · Currently studying</span></div></div></section>

      <section id="skills" className="section"><div className="portfolio-container"><div className="flex flex-wrap items-end justify-between gap-5"><SectionTitle number="03" label="Skills & interests" title="Building my toolkit." /><p className="section-lead">The foundations I’m exploring.</p></div><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ icon: <Braces size={22} />, title: "Web Development", tools: "HTML · CSS · JavaScript", color: "text-primary" }, { icon: <Terminal size={22} />, title: "Programming", tools: "C / C++ · Fundamentals", color: "text-signal" }, { icon: <Github size={22} />, title: "Developer Tools", tools: "Git · GitHub · VS Code", color: "text-foreground" }, { icon: <Layers size={22} />, title: "Problem Solving", tools: "Logic · Algorithms · Curiosity", color: "text-signal-secondary" }].map(skill => <div className="info-card p-6" key={skill.title}><div className={`skill-icon ${skill.color}`}>{skill.icon}</div><h3 className="mt-5 font-display text-base font-medium">{skill.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{skill.tools}</p><p className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Learning & exploring</p></div>)}</div></div></section>

      <section id="projects" className="section"><div className="portfolio-container"><div className="flex flex-wrap items-end justify-between gap-5"><SectionTitle number="04" label="Projects" title="Ideas into possibilities." /><p className="section-lead">My first build, and what could come next.</p></div><div className="mt-9 grid gap-5 md:grid-cols-3">{projects.map((item, index) => <article key={item.name} className="info-card overflow-hidden"><div className="project-visual" aria-hidden="true"><div className="mini-browser"><div className="mini-toolbar"><i /><i /><i /></div><div className="mini-content">{index === 0 ? <><div className="text-[8px] text-primary">HELLO, WORLD.</div><div className="mt-2 text-2xl leading-tight">Ayush<br /><span className="text-primary">Saxena.</span></div><div className="mt-3 h-1 w-24 bg-muted" /><div className="mt-2 h-1 w-16 bg-muted" /><div className="mt-3 h-4 w-16 rounded-sm bg-primary" /></> : index === 1 ? <><div className="mb-4 flex items-center justify-between text-xs">My taskboard <span className="text-signal">＋</span></div>{["Finish assignment", "Practice coding", "Read a chapter"].map((task, i) => <div key={task} className="mt-2 flex gap-2 rounded-sm bg-secondary p-2 text-[8px]"><span className={i === 0 ? "text-primary" : "text-muted-foreground"}>{i === 0 ? "☑" : "□"}</span>{task}</div>)}</> : <><div className="mb-3 text-[9px] text-muted-foreground">hello_world.cpp</div><div className="font-mono text-[10px] leading-6"><span className="text-signal-secondary">#include</span> &lt;iostream&gt;<br /><span className="text-signal">int</span> main() {'{'}<br />&nbsp; cout &lt;&lt; <span className="text-primary">"Hello, world!"</span>;<br />&nbsp; return <span className="text-signal-secondary">0</span>;<br />{'}'}</div></>}</div></div></div><div className="p-6"><p className="eyebrow text-primary">{item.category}</p><div className="mt-3 flex items-center justify-between"><h3 className="font-display text-xl font-medium">{item.name}</h3><Button variant="ghost" size="icon" aria-label={`View ${item.name}`} onClick={() => setProject(item)}><ArrowUpRight /></Button></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p><div className="mt-5 flex flex-wrap gap-2">{item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">{item.status}</p></div></article>)}</div></div></section>

      <section id="certificates" className="section"><div className="portfolio-container"><SectionTitle number="05" label="Certificates" title="Learning worth celebrating." /><div className="mt-9 flex flex-col items-start gap-5 border-y border-border py-8 sm:flex-row sm:items-center"><div className="skill-icon shrink-0 text-signal-secondary"><Award size={24} /></div><div><h3 className="font-display text-lg">The journey is just getting started.</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A space for future course certificates, milestones, and achievements.</p></div><span className="tag sm:ml-auto">Coming soon</span></div></div></section>

      <section id="contact" className="section"><div className="portfolio-container grid items-center gap-10 md:grid-cols-[1.4fr_1fr]"><div><p className="eyebrow text-muted-foreground"><span className="section-number">06</span>Get in touch</p><h2 className="contact-heading mt-5">Good things start<br />with a <span className="text-primary">hello.</span></h2><p className="mt-5 max-w-md section-lead">Have an idea, a learning opportunity, or just want to talk tech? I’d love to connect.</p></div><div className="md:pl-12"><p className="mb-5 text-xs text-muted-foreground">Personal contact and profile links coming soon.</p>{[{ name: "GitHub", icon: <Github size={21} />, text: "Code, experiments & new ideas" }, { name: "LinkedIn", icon: <Linkedin size={21} />, text: "Let’s grow our network" }].map(item => <Button key={item.name} variant="ghost" className="h-auto w-full justify-between rounded-none border-b border-border px-0 py-5" onClick={() => setSocial(item.name)}><span className="flex items-center gap-4">{item.icon}<span className="text-left"><span className="block font-display text-base">{item.name}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{item.text}</span></span></span><ArrowUpRight /></Button>)}</div></div></section>
    </main>

    <footer className="border-t border-border"><div className="portfolio-container flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between"><a className="wordmark" href="#home">AS<span className="text-primary">.</span></a><p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ayush Saxena. Built with curiosity.</p><div className="flex items-center gap-4"><Button variant="ghost" size="icon" aria-label="GitHub profile" onClick={() => setSocial("GitHub")}><Github /></Button><Button variant="ghost" size="icon" aria-label="LinkedIn profile" onClick={() => setSocial("LinkedIn")}><Linkedin /></Button><Button asChild variant="navigation" size="icon"><a href="#home" aria-label="Back to top"><ArrowRight className="-rotate-90" /></a></Button></div></div></footer>
    <Dialog open={project !== null} onOpenChange={open => { if (!open) setProject(null); }}><DialogContent><DialogHeader><DialogTitle>{project?.name}</DialogTitle><DialogDescription className="pt-4 leading-7">{project?.detail}</DialogDescription></DialogHeader><div className="flex flex-wrap gap-2">{project?.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></DialogContent></Dialog>
    <Dialog open={social !== null} onOpenChange={open => { if (!open) setSocial(null); }}><DialogContent><DialogHeader><DialogTitle>Connect on {social}</DialogTitle><DialogDescription className="pt-3 leading-7">Ayush’s personal {social} link hasn’t been added yet. Check back soon.</DialogDescription></DialogHeader><Button asChild variant="portfolio"><a href={social === "GitHub" ? "https://github.com" : "https://www.linkedin.com"} target="_blank" rel="noopener noreferrer">Visit {social} <ArrowUpRight /></a></Button></DialogContent></Dialog>
  </>;
}
