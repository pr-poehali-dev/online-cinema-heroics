import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "movies" | "cartoons" | "tv" | "schedule" | "search";

interface ContentItem {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating?: number;
  ageRating: string;
  duration?: string;
  type: "movie" | "cartoon";
  seasons?: number;
  image: string;
  description: string;
  tag?: string;
}

interface TvChannel {
  id: number;
  name: string;
  emoji: string;
  currentShow: string;
  nextShow: string;
  color: string;
  freq: string;
}

// ─── Постеры ─────────────────────────────────────────────
const POSTER_SERIES = "https://cdn.poehali.dev/projects/ae08516f-4ac8-4aee-bca4-e58cd1c99557/files/655f7335-9b5d-4ad2-8b26-018eca1bcccc.jpg";
const POSTER_MOVIE  = "https://cdn.poehali.dev/projects/ae08516f-4ac8-4aee-bca4-e58cd1c99557/files/8f1a684d-9344-416d-bb64-5096a8a92f1f.jpg";

// ─── Контент ─────────────────────────────────────────────
const CONTENT: ContentItem[] = [
  {
    id: 1,
    title: "Геройчики",
    year: "2022–2023",
    genre: "Мультсериал",
    ageRating: "0+",
    type: "cartoon",
    seasons: 2,
    image: POSTER_SERIES,
    tag: "2 сезона",
    description: "Мальчик Рома очень любит играть, поэтому в его комнате полным-полно разных игрушек. Кого здесь только нет: и загадочный пушистый инопланетянин Бублик, и отважный петух-тянучка Ко-Ко, и благородная ящерица-самурай О-Раш, и милая куколка Пинки, и воинственный плюшевый заяц Генерал Де-Кроль со своими роботами, и, конечно, отважные супергерои Флай и Глория. Все эти игрушки обожают игры, веселье, соревнования, приключения и вечеринки. Когда Ромы нет в комнате, они живут собственной увлекательной игрушечной жизнью.",
  },
  {
    id: 2,
    title: "Геройчики: Незваный гость",
    year: "2025",
    genre: "Мультфильм",
    ageRating: "0+",
    duration: "1 ч 20 мин",
    type: "movie",
    image: POSTER_MOVIE,
    tag: "Новинка",
    description: "Рома планирует выступить на школьном конкурсе и показать огромный звездолёт, собранный из конструктора. Игрушка, оборудованная по последнему слову техники, тут же привлекает внимание непрошеных гостей — таинственных космических пиратов. Друзьям Ромы — Пинки, Бублику, Генералу Де Кролю, Флаю, Глории, Ко-Ко и ящерице-ниндзя О-Раш — предстоит сразиться с пришельцами, а ещё проверить дружбу на прочность, поразмышлять о взаимопомощи, смелости, отваге и умении прощать.",
  },
];

// ─── ТВ-каналы ────────────────────────────────────────────
const TV_CHANNELS: TvChannel[] = [
  { id: 1, name: "Первый канал",  emoji: "🔵", currentShow: "Время. Новости",        nextShow: "Поле чудес",           color: "#3B82F6", freq: "1" },
  { id: 2, name: "Россия 1",      emoji: "🔴", currentShow: "Вести в 20:00",          nextShow: "Голос",                color: "#EF4444", freq: "2" },
  { id: 3, name: "Матч ТВ",       emoji: "⚽", currentShow: "Футбол. Прямой эфир",   nextShow: "Обзор матчей",          color: "#22C55E", freq: "3" },
  { id: 4, name: "НТВ",           emoji: "🟡", currentShow: "Следствие вели…",       nextShow: "Новости",               color: "#EAB308", freq: "4" },
  { id: 5, name: "Пятый канал",   emoji: "🟢", currentShow: "Место происшествия",    nextShow: "Открытая студия",       color: "#10B981", freq: "5" },
  { id: 6, name: "Россия К",      emoji: "🎭", currentShow: "Большой балет",         nextShow: "Документальный фильм",  color: "#8B5CF6", freq: "6" },
  { id: 7, name: "Россия 24",     emoji: "📡", currentShow: "Новости 24/7",           nextShow: "Специальный репортаж",  color: "#F97316", freq: "7" },
  { id: 8, name: "Карусель",      emoji: "🎠", currentShow: "Весёлые мультфильмы",   nextShow: "Смешарики",             color: "#EC4899", freq: "8" },
];

// ─── Программа передач ────────────────────────────────────
const SCHEDULE = [
  { time: "07:00", title: "Доброе утро",           channel: "Первый канал",  duration: 180, type: "Утренняя передача" },
  { time: "09:00", title: "Весёлые мультфильмы",   channel: "Карусель",      duration: 60,  type: "Мультфильмы" },
  { time: "10:00", title: "Россия. Кремль. Путин", channel: "Россия 24",     duration: 50,  type: "Документальный" },
  { time: "11:00", title: "Геройчики: Незваный гость", channel: "Карусель",  duration: 80,  type: "Мультфильм" },
  { time: "13:00", title: "Вести",                 channel: "Россия 1",      duration: 30,  type: "Новости" },
  { time: "14:00", title: "Большой балет",         channel: "Россия К",      duration: 120, type: "Культура" },
  { time: "16:00", title: "Геройчики (1 сезон)",   channel: "Карусель",      duration: 130, type: "Мультсериал" },
  { time: "18:00", title: "Место происшествия",    channel: "Пятый канал",   duration: 60,  type: "Криминальная хроника" },
  { time: "19:00", title: "Футбол. Ла Лига",       channel: "Матч ТВ",       duration: 105, type: "Спорт" },
  { time: "20:00", title: "Вести в 20:00",         channel: "Россия 1",      duration: 40,  type: "Новости" },
  { time: "21:00", title: "Следствие вели…",       channel: "НТВ",           duration: 60,  type: "Криминальный" },
  { time: "23:00", title: "Поздние новости",       channel: "Первый канал",  duration: 30,  type: "Новости" },
];

// ─── Helpers ──────────────────────────────────────────────
function AgeBadge({ age }: { age: string }) {
  return (
    <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.1)", color: "#ccc", border: "1px solid rgba(255,255,255,0.15)" }}>
      {age}
    </span>
  );
}

function TagBadge({ label, red }: { label: string; red?: boolean }) {
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={red ? { background: "var(--cinema-red)", color: "#fff" } : { background: "var(--cinema-red-dim)", color: "var(--cinema-red)" }}>
      {label}
    </span>
  );
}

function ContentCard({ item }: { item: ContentItem }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="cinema-card rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(v => !v)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}>
            <button className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "var(--cinema-red)", boxShadow: "0 0 32px rgba(232,23,58,0.6)" }}>
              <Icon name="Play" size={26} className="text-white ml-1" />
            </button>
          </div>
        )}

        <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
          {item.tag && <TagBadge label={item.tag} red={item.tag === "Новинка"} />}
          <AgeBadge age={item.ageRating} />
        </div>
      </div>

      <div className="p-3.5">
        <h3 className="font-bold text-sm leading-snug mb-1" style={{ color: "#f5f5f5" }}>{item.title}</h3>
        <div className="flex items-center gap-2 text-xs mb-2" style={{ color: "var(--cinema-text-muted)" }}>
          <span>{item.year}</span>
          <span>·</span>
          <span>{item.genre}</span>
          {item.seasons && <><span>·</span><span>{item.seasons} сезона</span></>}
          {item.duration && <><span>·</span><span>{item.duration}</span></>}
        </div>
        {expanded && (
          <p className="text-xs leading-relaxed animate-fade-in" style={{ color: "#888" }}>
            {item.description}
          </p>
        )}
        <button
          className="mt-3 w-full py-2 rounded-xl font-semibold text-xs transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--cinema-red)", color: "#fff" }}
          onClick={e => { e.stopPropagation(); }}
        >
          <Icon name="Play" size={12} className="inline mr-1" />
          Смотреть
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-end gap-3 mb-6">
      <h2 style={{ fontFamily: "'Oswald', sans-serif", color: "#f5f5f5", fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {sub && <span className="text-xs pb-0.5" style={{ color: "var(--cinema-text-muted)" }}>{sub}</span>}
      <div className="flex-1 h-px ml-1" style={{ background: "var(--cinema-border)" }} />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────
export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");

  const movies   = CONTENT.filter(c => c.type === "movie");
  const cartoons = CONTENT.filter(c => c.type === "cartoon");

  const searchResults = searchQuery.length > 1
    ? CONTENT.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home",     label: "Главная",          icon: "Home"     },
    { id: "movies",   label: "Фильмы",           icon: "Film"     },
    { id: "cartoons", label: "Мультсериалы",     icon: "Tv2"      },
    { id: "tv",       label: "ТВ-каналы",        icon: "Radio"    },
    { id: "schedule", label: "Программа передач",icon: "Calendar" },
    { id: "search",   label: "Поиск",            icon: "Search"   },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--cinema-dark)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 flex flex-col py-7"
        style={{ width: 230, background: "rgba(8,8,8,0.98)", borderRight: "1px solid var(--cinema-border)" }}>

        {/* Логотип */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--cinema-red)" }}>
              <Icon name="Play" size={18} className="text-white ml-0.5" />
            </div>
            <div>
              <div className="font-black text-xl leading-none" style={{ fontFamily: "'Oswald', sans-serif", color: "#fff" }}>
                ПОЕХАЛИ
              </div>
              <div className="text-xs" style={{ color: "var(--cinema-text-muted)", letterSpacing: "0.08em" }}>онлайн-кинотеатр</div>
            </div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map(item => {
            const active = activeSection === item.id;
            return (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: active ? "var(--cinema-red-dim)" : "transparent",
                  color: active ? "var(--cinema-red)" : "var(--cinema-text-muted)",
                  borderLeft: active ? "2px solid var(--cinema-red)" : "2px solid transparent",
                }}>
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Подпись */}
        <div className="px-6 pt-4" style={{ borderTop: "1px solid var(--cinema-border)" }}>
          <p className="text-xs" style={{ color: "#444" }}>© 2025 Поехали Медиа</p>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ marginLeft: 230, minHeight: "100vh" }}>

        {/* Шапка */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{ background: "rgba(8,8,8,0.94)", borderBottom: "1px solid var(--cinema-border)", backdropFilter: "blur(16px)" }}>
          <h1 className="text-lg font-bold" style={{ fontFamily: "'Oswald', sans-serif", color: "#f0f0f0", letterSpacing: "0.02em" }}>
            {navItems.find(n => n.id === activeSection)?.label}
          </h1>
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl"
            style={{ background: "var(--cinema-card)", border: "1px solid var(--cinema-border)", width: 300 }}>
            <Icon name="Search" size={14} style={{ color: "var(--cinema-text-muted)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Поиск по каталогу..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); if (e.target.value.length > 1) setActiveSection("search"); }}
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: "#e0e0e0" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ color: "var(--cinema-text-muted)" }}>
                <Icon name="X" size={13} />
              </button>
            )}
          </div>
        </header>

        <div className="px-8 py-8">

          {/* ── ГЛАВНАЯ ── */}
          {activeSection === "home" && (
            <div className="space-y-12 animate-fade-in">

              {/* Герой — Незваный гость */}
              <div className="relative rounded-3xl overflow-hidden" style={{ height: 420 }}>
                <img src={POSTER_MOVIE} alt="Геройчики: Незваный гость" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <TagBadge label="Новинка" red />
                    <TagBadge label="Мультфильм" />
                    <AgeBadge age="0+" />
                  </div>
                  <h2 className="font-black mb-1" style={{ fontFamily: "'Oswald', sans-serif", color: "#fff", fontSize: 42, lineHeight: 1.1 }}>
                    Геройчики:<br/>Незваный гость
                  </h2>
                  <p className="text-sm mb-5 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Рома планирует выступить на школьном конкурсе со звездолётом из конструктора. Но таинственные космические пираты уже точат зубы на его корабль...
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 hover:scale-105"
                      style={{ background: "var(--cinema-red)", color: "#fff" }}>
                      <Icon name="Play" size={16} />
                      Смотреть
                    </button>
                    <button className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                      style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}>
                      <Icon name="Info" size={16} />
                      Подробнее
                    </button>
                    <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>2025 · 1 ч 20 мин</span>
                  </div>
                </div>
              </div>

              {/* Мультсериалы */}
              <div>
                <SectionTitle title="Мультсериалы" />
                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                  {cartoons.map((item, i) => (
                    <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <ContentCard item={item} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Фильмы */}
              <div>
                <SectionTitle title="Фильмы" />
                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                  {movies.map((item, i) => (
                    <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <ContentCard item={item} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ТВ сейчас */}
              <div>
                <SectionTitle title="ТВ сейчас в эфире" />
                <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                  {TV_CHANNELS.slice(0, 4).map((ch, i) => (
                    <div key={ch.id} className="cinema-card rounded-xl p-4 cursor-pointer flex items-center gap-4 animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: `${ch.color}18`, border: `1px solid ${ch.color}40` }}>
                        {ch.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate" style={{ color: "#f0f0f0" }}>{ch.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ch.color }} />
                          <span className="text-xs truncate" style={{ color: ch.color }}>{ch.currentShow}</span>
                        </div>
                      </div>
                      <button className="w-9 h-9 flex items-center justify-center rounded-lg shrink-0"
                        style={{ background: "var(--cinema-red)", color: "#fff" }}>
                        <Icon name="Play" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ФИЛЬМЫ ── */}
          {activeSection === "movies" && (
            <div className="animate-fade-in">
              <SectionTitle title="Фильмы" sub={`${movies.length} позиции`} />
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                {movies.map((item, i) => (
                  <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <ContentCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── МУЛЬТСЕРИАЛЫ ── */}
          {activeSection === "cartoons" && (
            <div className="animate-fade-in">
              <SectionTitle title="Мультсериалы" sub={`${cartoons.length} позиции`} />
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                {cartoons.map((item, i) => (
                  <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <ContentCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ТВ-КАНАЛЫ ── */}
          {activeSection === "tv" && (
            <div className="animate-fade-in">
              <SectionTitle title="ТВ-каналы" sub="8 каналов" />
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
                {TV_CHANNELS.map((ch, i) => (
                  <div key={ch.id} className="cinema-card rounded-2xl p-5 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${i * 55}ms` }}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                        style={{ background: `${ch.color}18`, border: `1px solid ${ch.color}40` }}>
                        {ch.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base" style={{ color: "#f0f0f0" }}>{ch.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: ch.color }} />
                          <span className="text-xs font-medium" style={{ color: ch.color }}>В прямом эфире</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs whitespace-nowrap"
                        style={{ background: "var(--cinema-red)", color: "#fff" }}>
                        <Icon name="Play" size={12} />
                        Смотреть
                      </button>
                    </div>
                    <div className="space-y-2 pt-3" style={{ borderTop: "1px solid var(--cinema-border)" }}>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                          style={{ background: `${ch.color}22`, color: ch.color }}>Сейчас</span>
                        <span className="text-sm truncate" style={{ color: "#ddd" }}>{ch.currentShow}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: "rgba(255,255,255,0.05)", color: "#555" }}>Далее</span>
                        <span className="text-sm truncate" style={{ color: "#555" }}>{ch.nextShow}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ПРОГРАММА ПЕРЕДАЧ ── */}
          {activeSection === "schedule" && (
            <div className="animate-fade-in">
              <SectionTitle title="Программа передач" sub="26 апреля 2025" />

              {/* Текущее время */}
              <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl" style={{ background: "var(--cinema-red-dim)", border: "1px solid var(--cinema-red)" }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--cinema-red)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--cinema-red)" }}>Сейчас в эфире — 19:00: Футбол. Ла Лига (Матч ТВ)</span>
              </div>

              <div className="space-y-2">
                {SCHEDULE.map((item, i) => {
                  const isNow = item.time === "19:00";
                  return (
                    <div key={i}
                      className="rounded-2xl flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 animate-fade-in"
                      style={{
                        animationDelay: `${i * 35}ms`,
                        background: isNow ? "var(--cinema-red-dim)" : "var(--cinema-card)",
                        border: `1px solid ${isNow ? "var(--cinema-red)" : "var(--cinema-border)"}`,
                      }}>
                      <span className="text-sm font-black w-14 shrink-0 text-center"
                        style={{ color: isNow ? "var(--cinema-red)" : "#555", fontFamily: "'Oswald', sans-serif", fontSize: 16 }}>
                        {item.time}
                      </span>
                      <div className="w-px h-8 self-stretch shrink-0" style={{ background: isNow ? "var(--cinema-red)" : "var(--cinema-border)" }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm" style={{ color: isNow ? "#fff" : "#e0e0e0" }}>{item.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--cinema-text-muted)" }}>
                          {item.channel} · {item.duration} мин
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: isNow ? "var(--cinema-red)" : "var(--cinema-card-hover)", color: isNow ? "#fff" : "#777", border: isNow ? "none" : "1px solid var(--cinema-border)" }}>
                        {item.type}
                      </span>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0 transition-all hover:scale-110"
                        style={{ background: isNow ? "var(--cinema-red)" : "var(--cinema-card-hover)", color: isNow ? "#fff" : "#666" }}>
                        <Icon name="Bell" size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── ПОИСК ── */}
          {activeSection === "search" && (
            <div className="animate-fade-in">
              <div className="max-w-xl mb-8">
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                  style={{ background: "var(--cinema-card)", border: "1px solid var(--cinema-border)" }}>
                  <Icon name="Search" size={18} style={{ color: "var(--cinema-text-muted)" }} />
                  <input
                    type="text"
                    placeholder="Название фильма или сериала..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-base"
                    style={{ color: "#e0e0e0" }}
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} style={{ color: "var(--cinema-text-muted)" }}>
                      <Icon name="X" size={15} />
                    </button>
                  )}
                </div>
              </div>

              {searchQuery.length < 2 ? (
                <div>
                  <SectionTitle title="Весь каталог" />
                  <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                    {CONTENT.map((item, i) => (
                      <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                        <ContentCard item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <SectionTitle title={`«${searchQuery}»`} sub={`${searchResults.length} результата`} />
                  <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                    {searchResults.map((item, i) => (
                      <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                        <ContentCard item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 gap-3" style={{ color: "var(--cinema-text-muted)" }}>
                  <Icon name="SearchX" size={44} />
                  <p className="text-sm">Ничего не найдено по запросу «{searchQuery}»</p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
