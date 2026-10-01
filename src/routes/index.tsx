import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft, Bell, BookOpen, Camera, Check, CheckCircle2, ChevronRight,
  CircleUserRound, Flame, Flag, Home, Image, LockOpen, Medal, Menu,
  MoreVertical, Palette, PenLine, Plus, Rocket, Send, Settings, Share2,
  ShieldCheck, Sparkles, Star, Trophy, UserPlus, Users, X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Challenge — Hábitos sociais" },
      { name: "description", content: "Crie desafios, acompanhe hábitos e evolua junto com seus amigos." },
      { property: "og:title", content: "Challenge — Hábitos sociais" },
      { property: "og:description", content: "Crie desafios, acompanhe hábitos e evolua junto com seus amigos." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: ChallengeApp,
});

type Screen = "home" | "detail" | "create" | "profile";
type Tab = "ranking" | "feed" | "rules";

const avatars = {
  sofia: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  lucas: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  amanda: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80",
  pedro: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
};
const readingImage = "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85";

function ChallengeApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [toast, setToast] = useState("");
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="app-stage">
      <div className="phone-shell">
        {screen === "home" && <HomeScreen onNavigate={setScreen} onNotify={notify} />}
        {screen === "detail" && <DetailScreen onBack={() => setScreen("home")} onNotify={notify} />}
        {screen === "create" && <CreateScreen onClose={() => setScreen("home")} onPublish={() => { notify("Desafio publicado com sucesso!"); setScreen("home"); }} />}
        {screen === "profile" && <ProfileScreen onNavigate={setScreen} onNotify={notify} />}
        {toast && <div className="toast"><CheckCircle2 size={17} />{toast}</div>}
      </div>
    </div>
  );
}

function IconButton({ label, children, onClick, dark = false }: { label: string; children: ReactNode; onClick?: () => void; dark?: boolean }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className={dark ? "icon-button icon-button-dark" : "icon-button"}>{children}</button>;
}

function BottomNav({ active, onNavigate }: { active: Screen; onNavigate: (screen: Screen) => void }) {
  const item = (screen: Screen, label: string, icon: ReactNode) => (
    <button type="button" className={`nav-item ${active === screen ? "active" : ""}`} onClick={() => onNavigate(screen)}>{icon}<span>{label}</span></button>
  );
  return <nav className="bottom-nav" aria-label="Navegação principal">
    {item("home", "Início", <Home />)}
    {item("detail", "Desafios", <Trophy />)}
    <button type="button" className="nav-create" aria-label="Criar desafio" onClick={() => onNavigate("create")}><Plus /></button>
    <button type="button" className="nav-item" onClick={() => onNavigate("home")}><Users /><span>Amigos</span></button>
    {item("profile", "Perfil", <CircleUserRound />)}
  </nav>;
}

function Avatar({ src, alt, size = "md" }: { src: string; alt: string; size?: "sm" | "md" | "lg" }) {
  return <img className={`avatar avatar-${size}`} src={src} alt={alt} />;
}

function HomeScreen({ onNavigate, onNotify }: { onNavigate: (s: Screen) => void; onNotify: (m: string) => void }) {
  return <div className="screen with-nav">
    <header className="topbar brandbar">
      <div className="brand"><div className="brand-mark"><Sparkles /></div><div><strong>Challenge</strong><span>Social Habits</span></div></div>
      <div className="top-actions"><IconButton label="Notificações"><Bell /><i /></IconButton><Avatar src={avatars.sofia} alt="Sofia" /></div>
    </header>
    <main className="content">
      <section className="weekly-panel">
        <div className="weekly-top"><div><span className="eyebrow pale">Painel Semanal</span><h1>Olá, Sofia! <span>👋</span></h1><p>Você completou 85% das metas previstas para esta semana.</p></div><div className="streak"><b><Flame /> 6</b><span>Dias Seguidos</span></div></div>
        <div className="weekly-stats"><Stat value="4" label="Em andamento"/><Stat value="1.450" label="Pontos XP"/><Stat value="#2" label="No Ranking"/></div>
      </section>
      <section className="create-promo"><div className="promo-icon"><Rocket /></div><div className="grow"><h2>Desafie seus amigos!</h2><p>Crie um grupo de leitura, fotos ou hábitos.</p></div><button className="button small" onClick={() => onNavigate("create")}>Criar <ChevronRight /></button></section>
      <section>
        <SectionHeading icon={<Flag />} title="Seus Desafios em Andamento" action="Ver todos (4)" onAction={() => onNavigate("detail")} />
        <div className="stack">
          <article className="challenge-card clickable" onClick={() => onNavigate("detail")}>
            <div className="card-line"><div className="challenge-main"><div className="emoji-box reading">📚</div><div><div><span className="pill indigo">Leitura</span><span className="deadline">• Restam 7 dias</span></div><h3>Leitura de 20 min diários</h3></div></div><span className="live-dot" /></div>
            <Progress label="Progresso: 14 de 21 dias" value="67%" percent={67} />
            <div className="card-footer"><div className="friends"><div className="avatar-stack"><Avatar src={avatars.amanda} alt="Amanda" size="sm"/><Avatar src={avatars.pedro} alt="Pedro" size="sm"/><span>+6</span></div><small>8 amigos</small></div><button className="button success small" onClick={(e) => { e.stopPropagation(); onNotify("Check-in registrado! +50 XP"); }}><CheckCircle2 /> Check-in</button></div>
          </article>
          <article className="challenge-card">
            <div className="card-line"><div className="challenge-main"><div className="emoji-box photo">📷</div><div><div><span className="pill orange">Fotografia</span><span className="deadline urgent">• Termina amanhã!</span></div><h3>1 Foto Criativa da Cidade</h3></div></div><span className="xp-chip">+300 XP</span></div>
            <Progress label="Progresso: 4 de 5 fotos" value="80%" percent={80} orange />
            <div className="card-footer"><small>Criado por <b>Lucas Silva</b></small><button className="button subtle small" onClick={() => onNavigate("detail")}>Ver Detalhes</button></div>
          </article>
        </div>
      </section>
      <section><SectionHeading icon={<Users />} title="Populares entre Amigos" action="Explorar" onAction={() => onNotify("Novos desafios em breve")} accent /><div className="popular-grid"><Popular emoji="🎨" kind="Arte" title="30 Dias de Desenho" friends="14 amigos ativos" onJoin={() => onNotify("Você entrou no desafio de desenho!")} /><Popular emoji="🧘" kind="Saúde" title="10 Min Meditação" friends="9 amigos ativos" onJoin={() => onNotify("Você entrou no desafio de meditação!")} /></div></section>
    </main>
    <BottomNav active="home" onNavigate={onNavigate} />
  </div>;
}

function DetailScreen({ onBack, onNotify }: { onBack: () => void; onNotify: (m: string) => void }) {
  const [tab, setTab] = useState<Tab>("ranking");
  const [liked, setLiked] = useState(false);
  return <div className="screen detail-screen with-detail-footer">
    <section className="detail-hero" style={{ backgroundImage: `url(${readingImage})` }}><div className="hero-shade" /><div className="hero-actions"><IconButton label="Voltar" dark onClick={onBack}><ArrowLeft /></IconButton><div><IconButton label="Compartilhar" dark onClick={() => onNotify("Link copiado!")}><Share2 /></IconButton><IconButton label="Mais opções" dark><MoreVertical /></IconButton></div></div><div className="hero-title"><div><span>Hábito & Leitura</span><span className="active-pill">Ativo • Restam 7 dias</span></div><h1>Leitura de 20 min diários</h1></div></section>
    <main className="content compact">
      <section className="panel host-card"><div className="host-line"><div className="person"><Avatar src={avatars.lucas} alt="Lucas Silva"/><div><b>Lucas Silva <CheckCircle2 /></b><small>Criador do Desafio</small></div></div><button className="button subtle small" onClick={() => onNotify("Convite pronto para compartilhar")}>+ Convidar</button></div><div className="metric-grid"><Stat value="18" label="Participantes"/><Stat value="84%" label="Conclusão Média" success/><Stat value="500 XP" label="Recompensa" accent/></div></section>
      <section className="progress-panel"><div><span className="eyebrow pale">Seu Progresso Individual</span><b>14 / 21 Dias</b></div><div className="progress-track dark"><i style={{ width: "67%" }} /></div><div><span>Meta de hoje: 20 páginas lidas</span><button className="check-done" onClick={() => onNotify("Check-in de hoje confirmado!")}><CheckCircle2 /> Check-in Feito!</button></div></section>
      <section><div className="tabs"><button className={tab === "ranking" ? "active" : ""} onClick={() => setTab("ranking")}><Trophy/>Ranking</button><button className={tab === "feed" ? "active" : ""} onClick={() => setTab("feed")}><Menu/>Feed ao Vivo</button><button className={tab === "rules" ? "active" : ""} onClick={() => setTab("rules")}><BookOpen/>Regras</button></div>
        {tab === "ranking" && <div className="ranking"><Rank place="1º" avatar={avatars.amanda} name="Amanda Costa" detail="16 dias perfeitos 🔥" points="950 pts"/><Rank place="2º" avatar={avatars.sofia} name="Você (Sofia) ⭐" detail="14 dias seguidos" points="880 pts" current/><Rank place="3º" avatar={avatars.pedro} name="Pedro Santos" detail="13 dias seguidos" points="820 pts"/></div>}
        {tab === "feed" && <FeedCard liked={liked} onLike={() => setLiked(!liked)} />}
        {tab === "rules" && <div className="panel rules"><h3>Regras do desafio</h3><p>Leia por pelo menos 20 minutos todos os dias. Registre seu progresso com uma nota ou foto e mantenha a sequência até o fim.</p><div><ShieldCheck />Atividades devem ser seguras e respeitosas.</div></div>}
      </section>
      {tab !== "feed" && <FeedCard liked={liked} onLike={() => setLiked(!liked)} />}
    </main>
    <footer className="detail-footer"><div><small>Status</small><b><i /> Inscrito no Desafio</b></div><div><button className="button icon-only" aria-label="Compartilhar"><Share2 /></button><button className="button" onClick={() => onNotify("Check-in de hoje confirmado!")}><Check /> Fazer check-in</button></div></footer>
  </div>;
}

const categories = [["📚","Leitura"],["🧠","Estudo"],["📷","Fotos"],["🎨","Desenho"],["🧩","Quizzes"],["🧘","Saúde"],["💡","Criativo"],["🎯","Hábitos"]];
function CreateScreen({ onClose, onPublish }: { onClose: () => void; onPublish: () => void }) {
  const [category, setCategory] = useState("Leitura"); const [duration, setDuration] = useState(21); const [isPublic, setPublic] = useState(true);
  return <div className="screen create-screen with-cta"><header className="topbar"><div className="title-row"><IconButton label="Fechar" onClick={onClose}><X /></IconButton><h1>Criar Novo Desafio</h1></div><span className="step-pill">Passo 1 de 2</span></header><main className="content compact">
    <section className="info-banner"><div><Sparkles /></div><span><b>Crie hábitos saudáveis e divertidos</b><small>Convide seus amigos para competir de forma amigável com pontuações e troféus.</small></span></section>
    <FormPanel label="Nome do Desafio *"><input aria-label="Nome do desafio" defaultValue="21 Dias Lendo 15 Páginas" /></FormPanel>
    <section className="panel form-panel"><div className="label-row"><label>Categoria *</label><span>{category} selecionada</span></div><div className="category-grid">{categories.map(([emoji,name]) => <button type="button" key={name} className={category === name ? "selected" : ""} onClick={() => setCategory(name)}><span>{emoji}</span>{name}</button>)}</div></section>
    <section className="panel form-panel"><label>Duração do Desafio</label><div className="duration-grid">{[7,14,21,30].map(d => <button type="button" key={d} className={duration === d ? "selected" : ""} onClick={() => setDuration(d)}>{d} Dias</button>)}</div><div className="date-grid"><div><small>Início</small><b>Hoje, 24 de Out</b></div><div><small>Término</small><b>{duration === 7 ? "31 de Out" : duration === 14 ? "07 de Nov" : duration === 21 ? "14 de Nov" : "23 de Nov"} ({duration}d)</b></div></div></section>
    <section className="panel form-panel"><label>Regras e Tarefas Diárias</label><textarea aria-label="Regras do desafio" rows={3} defaultValue="Ler pelo menos 15 páginas pela manhã ou antes de dormir e enviar foto ou nota no feed diário."/><div className="points-grid"><div><span><small>Check-in diário</small><b>+50 XP</b></span><CheckCircle2/></div><div><span><small>Conclusão final</small><b className="orange-text">+500 XP</b></span><Trophy/></div></div></section>
    <section className="panel privacy"><div><LockOpen/><span><b>Desafio Público</b><small>Qualquer amigo da sua rede pode participar</small></span><button type="button" role="switch" aria-checked={isPublic} className={`switch ${isPublic ? "on" : ""}`} onClick={() => setPublic(!isPublic)}><i /></button></div><p><ShieldCheck/>Diretriz Segura: Este desafio incentiva aprendizado e hábitos saudáveis. Atividades perigosas são proibidas.</p></section>
  </main><div className="fixed-cta"><button className="button wide" onClick={onPublish}><Send/>Publicar e Convidar Amigos</button></div></div>;
}

function ProfileScreen({ onNavigate, onNotify }: { onNavigate: (s: Screen) => void; onNotify: (m: string) => void }) {
  return <div className="screen with-nav"><header className="topbar"><h1>Meu Perfil</h1><div className="top-actions"><IconButton label="Configurações"><Settings /></IconButton><IconButton label="Compartilhar" onClick={() => onNotify("Perfil pronto para compartilhar")}><Share2 /></IconButton></div></header><main className="content compact">
    <section className="panel profile-card"><div className="profile-head"><div className="profile-avatar"><Avatar src={avatars.sofia} alt="Sofia Mendes" size="lg"/><span><Check /></span></div><div><div className="profile-name"><h2>Sofia Mendes</h2><span>Nível 5</span></div><small>@sofia.mendes</small><p>Construindo hábitos melhores um dia de cada vez ✨ Leitura, fotografia & café 📚☕</p></div></div><div className="profile-actions"><button onClick={() => onNotify("Edição de perfil aberta")}>Editar Perfil</button><button onClick={() => onNotify("Convite pronto para compartilhar")}><UserPlus/>Convidar</button></div><div className="profile-stats"><Stat value="12" label="Concluídos"/><Stat value="3" label="Criados"/><Stat value="1.450" label="Total XP" accent/><Stat value="48" label="Amigos"/></div></section>
    <section className="panel achievements"><SectionHeading icon={<Medal/>} title="Conquistas Desbloqueadas (5 de 8)" action="Ver todas" onAction={() => onNotify("Todas as conquistas exibidas")} /><div className="badge-grid"><Badge emoji="🥇" name="1º Desafio" detail="Ganho"/><Badge emoji="👑" name="Criador" detail="Ganho" indigo/><Badge emoji="🔥" name="Imparável" detail="7d streak" orange/><Badge emoji="🎯" name="Perfeito" detail="24/30d" locked/></div></section>
    <section className="panel history"><SectionHeading icon={<CheckCircle2/>} title="Desafios Concluídos Recentemente" action="12 no total" muted/><History emoji="🧘" title="14 Dias de Meditação Guiada" detail="Finalizado em 18 de Out • 100% frequência" xp="+350 XP"/><History emoji="💧" title="2L de Água por 21 Dias" detail="Finalizado em 02 de Out • Grupo de 8 amigos" xp="+500 XP"/></section>
  </main><BottomNav active="profile" onNavigate={onNavigate}/></div>;
}

function Stat({ value, label, success, accent }: { value: string; label: string; success?: boolean; accent?: boolean }) { return <div className={`stat ${success ? "success-text" : ""} ${accent ? "orange-text" : ""}`}><b>{value}</b><span>{label}</span></div>; }
function SectionHeading({ icon, title, action, onAction, accent, muted }: { icon: ReactNode; title: string; action: string; onAction?: () => void; accent?: boolean; muted?: boolean }) { return <div className={`section-heading ${accent ? "accent-icon" : ""}`}><h2>{icon}{title}</h2><button type="button" className={muted ? "muted-action" : ""} onClick={onAction}>{action}</button></div>; }
function Progress({ label, value, percent, orange }: { label: string; value: string; percent: number; orange?: boolean }) { return <div className="progress"><div><span>{label}</span><b className={orange ? "orange-text" : ""}>{value}</b></div><div className={`progress-track ${orange ? "orange" : ""}`}><i style={{ width: `${percent}%` }}/></div></div>; }
function Popular({ emoji, kind, title, friends, onJoin }: { emoji: string; kind: string; title: string; friends: string; onJoin: () => void }) { return <article className="popular-card"><div><span className="popular-emoji">{emoji}</span><small>{kind}</small><h3>{title}</h3><p>{friends}</p></div><button onClick={onJoin}>Participar</button></article>; }
function Rank({ place, avatar, name, detail, points, current }: { place: string; avatar: string; name: string; detail: string; points: string; current?: boolean }) { return <div className={`rank-row ${current ? "current" : ""}`}><span className="place">{place}</span><Avatar src={avatar} alt={name} size="sm"/><div className="grow"><b>{name}</b><small>{detail}</small></div><strong>{points}</strong></div>; }
function FeedCard({ liked, onLike }: { liked: boolean; onLike: () => void }) { return <section className="panel feed-card"><div className="feed-title"><h3><Menu/>Último Check-in no Feed</h3><span>Há 15 min</span></div><div className="feed-body"><Avatar src={avatars.amanda} alt="Amanda" size="sm"/><div><b>Amanda Costa</b><p>“Capítulo 4 terminado! Essa leitura matinal realmente mudou meu foco.” ☕📖</p><div><button onClick={onLike}>{liked ? "❤️ 6" : "♡ 5"}</button><button>🔥 3</button><button>💬 Responder</button></div></div></div></section>; }
function FormPanel({ label, children }: { label: string; children: ReactNode }) { return <section className="panel form-panel"><label>{label}</label>{children}</section>; }
function Badge({ emoji, name, detail, indigo, orange, locked }: { emoji: string; name: string; detail: string; indigo?: boolean; orange?: boolean; locked?: boolean }) { return <div className={`badge ${indigo ? "indigo" : ""} ${orange ? "orange" : ""} ${locked ? "locked" : ""}`}><span>{emoji}</span><b>{name}</b><small>{detail}</small></div>; }
function History({ emoji, title, detail, xp }: { emoji: string; title: string; detail: string; xp: string }) { return <div className="history-row"><span>{emoji}</span><div className="grow"><b>{title}</b><small>{detail}</small></div><strong>{xp}</strong></div>; }