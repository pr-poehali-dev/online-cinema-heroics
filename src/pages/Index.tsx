import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Types ───────────────────────────────────────────────
type Section = "home" | "movies" | "cartoons" | "tv" | "schedule" | "favorites" | "search" | "history";

interface ContentItem {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration: number;
  type: "movie" | "cartoon" | "series";
  image: string;
  progress?: number;
  isFavorite?: boolean;
  description: string;
}

interface TvChannel {
  id: number;
  name: string;
  logo: string;
  currentShow: string;
  nextShow: string;
  color: string;
}

// ─── Mock Data ────────────────────────────────────────────
const POSTER_BASE = "https://cdn.poehali.dev/projects/ae08516f-4ac8-4aee-bca4-e58cd1c99557/files/dec0fa21-b0cb-4e07-9715-b1de5ed3dc75.jpg";

const CONTENT: ContentItem[] = [
  { id: 1, title: "Дюна: Часть вторая", year: 2024, genre: "Фантастика", rating: 8.6, duration: 166, type: "movie", image: POSTER_BASE, description: "Продолжение эпической саги о далёком будущем", isFavorite: true },
  { id: 2, title: "Оппенгеймер", year: 2023, genre: "Биография", rating: 8.9, duration: 180, type: "movie", image: POSTER_BASE, description: "История создателя атомной бомбы", progress: 67, isFavorite: false },
  { id: 3, title: "Мальчик и птица", year: 2023, genre: "Анимация", rating: 9.0, duration: 124, type: "cartoon", image: POSTER_BASE, description: "Шедевр Хаяо Миядзаки о поиске себя", isFavorite: true },
  { id: 4, title: "Аватар: Путь воды", year: 2022, genre: "Фантастика", rating: 7.6, duration: 192, type: "movie", image: POSTER_BASE, description: "Джейк Салли защищает свой новый дом", progress: 30 },
  { id: 5, title: "Гравити Фолз", year: 2012, genre: "Мультсериал", rating: 9.0, duration: 22, type: "cartoon", image: POSTER_BASE, description: "Близнецы раскрывают тайны маленького городка", progress: 85, isFavorite: true },
  { id: 6, title: "Стражи Галактики 3", year: 2023, genre: "Боевик", rating: 8.0, duration: 150, type: "movie", image: POSTER_BASE, description: "Финальная миссия стражей галактики" },
  { id: 7, title: "Человек-паук: Паутина вселенных", year: 2023, genre: "Анимация", rating: 9.0, duration: 140, type: "cartoon", image: POSTER_BASE, description: "Майлз Моралес против многовселенной", isFavorite: true },
  { id: 8, title: "Бедные-несчастные", year: 2023, genre: "Драма", rating: 8.3, duration: 141, type: "movie", image: POSTER_BASE, description: "Женщина открывает мир заново с чистого листа" },
  { id: 9, title: "Симпсоны", year: 1989, genre: "Мультсериал", rating: 8.6, duration: 22, type: "cartoon", image: POSTER_BASE, description: "Легендарный мультсериал о семье из Спрингфилда", progress: 12 },
  { id: 10, title: "Джон Уик 4", year: 2023, genre: "Боевик", rating: 7.7, duration: 169, type: "movie", image: POSTER_BASE, description: "Уик против Высшего Совета", isFavorite: false },
  { id: 11, title: "Рик и Морти", year: 2013, genre: "Мультсериал", rating: 9.2, duration: 22, type: "cartoon", image: POSTER_BASE, description: "Дед и внук путешествуют по мультивселенной" },
  { id: 12, title: "Вонка", year: 2023, genre: "Фэнтези", rating: 7.2, duration: 116, type: "movie", image: POSTER_BASE, description: "Молодой Вилли Вонка и его первый шоколад", progress: 50, isFavorite: true },
];

const TV_CHANNELS: TvChannel[] = [
  { id: 1, name: "Первый канал", logo: "📺", currentShow: "Новости", nextShow: "Поле чудес", color: "#E8173A" },
  { id: 2, name: "Россия 1", logo: "📻", currentShow: "Вести", nextShow: "Концерт", color: "#2563EB" },
  { id: 3, name: "НТВ", logo: "🎬", currentShow: "Следствие вели", nextShow: "Новости", color: "#7C3AED" },
  { id: 4, name: "ТНТ", logo: "🎭", currentShow: "Comedy Club", nextShow: "Универ", color: "#EA580C" },
  { id: 5, name: "СТС", logo: "🌟", currentShow: "Кино", nextShow: "Сериал", color: "#16A34A" },
  { id: 6, name: "РЕН ТВ", logo: "🔍", currentShow: "Документальный", nextShow: "Ток-шоу", color: "#CA8A04" },
];

const SCHEDULE = [
  { time: "08:00", title: "Доброе утро", channel: "Первый", duration: 180, type: "Передача" },
  { time: "11:00", title: "Дюна: Часть вторая", channel: "Россия 1", duration: 166, type: "Фильм" },
  { time: "13:46", title: "Новости", channel: "Первый", duration: 30, type: "Новости" },
  { time: "14:30", title: "Гравити Фолз", channel: "СТС", duration: 22, type: "Мультфильм" },
  { time: "15:00", title: "Оппенгеймер", channel: "НТВ", duration: 180, type: "Фильм" },
  { time: "18:00", title: "Вечерние новости", channel: "Первый", duration: 30, type: "Новости" },
  { time: "19:00", title: "Человек-паук", channel: "ТНТ", duration: 140, type: "Мультфильм" },
  { time: "21:30", title: "Джон Уик 4", channel: "РЕН ТВ", duration: 169, type: "Фильм" },
];

// ─── Sub-components ───────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#F59E0B" }}>
      <Icon name="Star" size={12} />
      {rating.toFixed(1)}
    </span>
  );
}

function ContentCard({ item, onFavoriteToggle }: { item: ContentItem; onFavoriteToggle: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cinema-card rounded-xl overflow-hidden cursor-pointer group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center animate-scale-in" style={{ background: "rgba(0,0,0,0.6)" }}>
            <button
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "var(--cinema-red)", boxShadow: "0 0 24px rgba(232,23,58,0.5)" }}
            >
              <Icon name="Play" size={22} className="text-white ml-1" />
            </button>
          </div>
        )}

        <div className="absolute top-2 left-2">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0,0,0,0.7)", color: "#aaa", border: "1px solid rgba(255,255,255,0.1)" }}>
            {item.type === "movie" ? "Фильм" : item.type === "cartoon" ? "Мультфильм" : "Сериал"}
          </span>
        </div>

        <button
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: item.isFavorite ? "var(--cinema-red)" : "rgba(0,0,0,0.6)" }}
          onClick={(e) => { e.stopPropagation(); onFavoriteToggle(item.id); }}
        >
          <Icon name="Heart" size={12} className="text-white" />
        </button>

        {item.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full progress-glow"
              style={{ width: `${item.progress}%`, background: "var(--cinema-red)" }}
            />
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <StarRating rating={item.rating} />
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2" style={{ color: "#f0f0f0" }}>
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--cinema-text-muted)" }}>
          <span>{item.year}</span>
          <span>·</span>
          <span>{item.genre}</span>
        </div>

        {item.progress !== undefined && (
          <button
            className="mt-2 w-full text-xs py-1.5 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--cinema-red-dim)", color: "var(--cinema-red)", border: "1px solid var(--cinema-red)" }}
          >
            Продолжить · {item.progress}%
          </button>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Oswald', sans-serif", color: "#f0f0f0" }}>
        {title}
      </h2>
      {count !== undefined && (
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--cinema-red-dim)", color: "var(--cinema-red)" }}>
          {count}
        </span>
      )}
      <div className="flex-1 h-px" style={{ background: "var(--cinema-border)" }} />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────
export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [content, setContent] = useState<ContentItem[]>(CONTENT);

  const toggleFavorite = (id: number) => {
    setContent(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  const movies = content.filter(c => c.type === "movie");
  const cartoons = content.filter(c => c.type === "cartoon" || c.type === "series");
  const favorites = content.filter(c => c.isFavorite);
  const history = content.filter(c => c.progress !== undefined);
  const searchResults = searchQuery.length > 1
    ? content.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "movies", label: "Фильмы", icon: "Film" },
    { id: "cartoons", label: "Мультсериалы", icon: "Tv2" },
    { id: "tv", label: "ТВ-каналы", icon: "Radio" },
    { id: "schedule", label: "Программа", icon: "Calendar" },
    { id: "favorites", label: "Избранное", icon: "Heart" },
    { id: "search", label: "Поиск", icon: "Search" },
  ];

  return (
    <div className="min-h-screen noise-bg" style={{ background: "var(--cinema-dark)" }}>
      {/* ── SIDEBAR ── */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-40 flex flex-col py-6"
        style={{ width: 220, background: "rgba(10,10,10,0.97)", borderRight: "1px solid var(--cinema-border)" }}
      >
        {/* Logo */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--cinema-red)" }}>
              <Icon name="Play" size={16} className="text-white ml-0.5" />
            </div>
            <span className="font-black text-lg tracking-tight" style={{ fontFamily: "'Oswald', sans-serif", color: "#fff" }}>
              КИНО<span style={{ color: "var(--cinema-red)" }}>ПОРТАЛ</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeSection === item.id ? "var(--cinema-red-dim)" : "transparent",
                color: activeSection === item.id ? "var(--cinema-red)" : "var(--cinema-text-muted)",
                borderLeft: activeSection === item.id ? "2px solid var(--cinema-red)" : "2px solid transparent",
              }}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
              {item.id === "favorites" && favorites.length > 0 && (
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full" style={{ background: "var(--cinema-red)", color: "#fff" }}>
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* History shortcut */}
        <div className="px-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--cinema-border)" }}>
          <button
            onClick={() => setActiveSection("history")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeSection === "history" ? "var(--cinema-red-dim)" : "transparent",
              color: activeSection === "history" ? "var(--cinema-red)" : "var(--cinema-text-muted)",
              borderLeft: activeSection === "history" ? "2px solid var(--cinema-red)" : "2px solid transparent",
            }}
          >
            <Icon name="History" size={16} />
            История
            {history.length > 0 && (
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "#999" }}>
                {history.length}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ marginLeft: 220, minHeight: "100vh" }}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4" style={{ background: "rgba(15,15,15,0.92)", borderBottom: "1px solid var(--cinema-border)", backdropFilter: "blur(20px)" }}>
          <h1 className="text-lg font-bold" style={{ fontFamily: "'Oswald', sans-serif", color: "#f0f0f0" }}>
            {activeSection === "history" ? "История просмотров" : navItems.find(n => n.id === activeSection)?.label}
          </h1>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--cinema-card)", border: "1px solid var(--cinema-border)", width: 280 }}>
            <Icon name="Search" size={14} style={{ color: "var(--cinema-text-muted)" }} />
            <input
              type="text"
              placeholder="Поиск фильмов..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); if (e.target.value.length > 1) setActiveSection("search"); }}
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: "#e0e0e0" }}
            />
          </div>
        </header>

        <div className="px-8 py-8">

          {/* ── HOME ── */}
          {activeSection === "home" && (
            <div className="animate-fade-in space-y-10">
              {/* Hero */}
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 340 }}>
                <img src={POSTER_BASE} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "var(--cinema-red)" }}>Новинка недели</span>
                  <h2 className="text-4xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif", color: "#fff" }}>Дюна: Часть вторая</h2>
                  <p className="text-sm mb-4 max-w-md" style={{ color: "rgba(255,255,255,0.7)" }}>Пол Атрейдес объединяется с фременами и начинает путь мести против тех, кто уничтожил его семью.</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105" style={{ background: "var(--cinema-red)", color: "#fff" }}>
                      <Icon name="Play" size={16} />
                      Смотреть
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                      <Icon name="Plus" size={16} />
                      В избранное
                    </button>
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <StarRating rating={8.6} />
                      <span className="ml-1">· 2024 · 2 ч 46 мин</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue watching */}
              {history.length > 0 && (
                <div>
                  <SectionTitle title="Продолжить просмотр" count={history.length} />
                  <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                    {history.map((item, i) => (
                      <div key={item.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-in">
                        <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New movies */}
              <div>
                <SectionTitle title="Новые фильмы" />
                <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                  {movies.slice(0, 6).map((item, i) => (
                    <div key={item.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-in">
                      <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cartoons */}
              <div>
                <SectionTitle title="Мультсериалы" />
                <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                  {cartoons.slice(0, 4).map((item, i) => (
                    <div key={item.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-in">
                      <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MOVIES ── */}
          {activeSection === "movies" && (
            <div className="animate-fade-in">
              <SectionTitle title="Все фильмы" count={movies.length} />
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                {movies.map((item, i) => (
                  <div key={item.id} style={{ animationDelay: `${i * 50}ms` }} className="animate-fade-in">
                    <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CARTOONS ── */}
          {activeSection === "cartoons" && (
            <div className="animate-fade-in">
              <SectionTitle title="Мультсериалы и анимация" count={cartoons.length} />
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                {cartoons.map((item, i) => (
                  <div key={item.id} style={{ animationDelay: `${i * 50}ms` }} className="animate-fade-in">
                    <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TV ── */}
          {activeSection === "tv" && (
            <div className="animate-fade-in">
              <SectionTitle title="ТВ-каналы" count={TV_CHANNELS.length} />
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {TV_CHANNELS.map((channel, i) => (
                  <div
                    key={channel.id}
                    className="cinema-card rounded-xl p-5 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${channel.color}22`, border: `1px solid ${channel.color}44` }}>
                        {channel.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: "#f0f0f0" }}>{channel.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: channel.color }} />
                          <span className="text-xs font-medium" style={{ color: channel.color }}>В эфире</span>
                        </div>
                      </div>
                      <button className="ml-auto w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ background: "var(--cinema-red)", color: "#fff" }}>
                        <Icon name="Play" size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${channel.color}22`, color: channel.color }}>Сейчас</span>
                        <span className="text-sm" style={{ color: "#d0d0d0" }}>{channel.currentShow}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#666" }}>Далее</span>
                        <span className="text-sm" style={{ color: "#666" }}>{channel.nextShow}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SCHEDULE ── */}
          {activeSection === "schedule" && (
            <div className="animate-fade-in">
              <SectionTitle title="Программа передач" />
              <div className="space-y-2">
                {SCHEDULE.map((item, i) => (
                  <div
                    key={i}
                    className="cinema-card rounded-xl flex items-center gap-4 p-4 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <span className="text-sm font-bold w-14 shrink-0 text-center" style={{ color: "var(--cinema-red)", fontFamily: "'Oswald', sans-serif" }}>
                      {item.time}
                    </span>
                    <div className="w-px h-10 self-stretch" style={{ background: "var(--cinema-border)" }} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm" style={{ color: "#f0f0f0" }}>{item.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs" style={{ color: "var(--cinema-text-muted)" }}>
                        <span>{item.channel}</span>
                        <span>·</span>
                        <span>{item.duration} мин</span>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--cinema-card-hover)", color: "#999", border: "1px solid var(--cinema-border)" }}>
                      {item.type}
                    </span>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg transition-all hover:scale-110" style={{ background: "var(--cinema-red-dim)", color: "var(--cinema-red)" }}>
                      <Icon name="Bell" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAVORITES ── */}
          {activeSection === "favorites" && (
            <div className="animate-fade-in">
              <SectionTitle title="Избранное" count={favorites.length} />
              {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-3" style={{ color: "var(--cinema-text-muted)" }}>
                  <Icon name="Heart" size={40} />
                  <p className="text-sm">Нет избранных фильмов. Нажми ❤ на любом постере!</p>
                </div>
              ) : (
                <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                  {favorites.map((item, i) => (
                    <div key={item.id} style={{ animationDelay: `${i * 50}ms` }} className="animate-fade-in">
                      <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── HISTORY ── */}
          {activeSection === "history" && (
            <div className="animate-fade-in">
              <SectionTitle title="История просмотров" count={history.length} />
              <div className="space-y-3">
                {history.map((item, i) => (
                  <div
                    key={item.id}
                    className="cinema-card rounded-xl flex items-center gap-4 p-4 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <img src={item.image} alt={item.title} className="rounded-lg object-cover shrink-0" style={{ width: 60, height: 80 }} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-0.5 truncate" style={{ color: "#f0f0f0" }}>{item.title}</h3>
                      <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "var(--cinema-text-muted)" }}>
                        <span>{item.year}</span>
                        <span>·</span>
                        <span>{item.genre}</span>
                        <span>·</span>
                        <span>{Math.floor(item.duration * (item.progress ?? 0) / 100)} / {item.duration} мин</span>
                      </div>
                      <div className="relative h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div
                          className="h-full rounded-full progress-glow transition-all duration-500"
                          style={{ width: `${item.progress}%`, background: "var(--cinema-red)" }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs" style={{ color: "var(--cinema-text-muted)" }}>Просмотрено {item.progress}%</span>
                        <span className="text-xs" style={{ color: "var(--cinema-text-muted)" }}>Осталось ~{Math.ceil(item.duration * (100 - (item.progress ?? 0)) / 100)} мин</span>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all hover:opacity-90 hover:scale-105"
                      style={{ background: "var(--cinema-red)", color: "#fff" }}
                    >
                      <Icon name="Play" size={14} />
                      Продолжить
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SEARCH ── */}
          {activeSection === "search" && (
            <div className="animate-fade-in">
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm" style={{ background: "var(--cinema-card)", border: "1px solid var(--cinema-border)" }}>
                  <Icon name="Search" size={18} style={{ color: "var(--cinema-text-muted)" }} />
                  <input
                    type="text"
                    placeholder="Введите название фильма, мультфильма или сериала..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-base"
                    style={{ color: "#e0e0e0" }}
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} style={{ color: "var(--cinema-text-muted)" }}>
                      <Icon name="X" size={16} />
                    </button>
                  )}
                </div>
              </div>

              {searchQuery.length < 2 ? (
                <div>
                  <SectionTitle title="Популярное" />
                  <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                    {content.slice(0, 8).map((item, i) => (
                      <div key={item.id} style={{ animationDelay: `${i * 40}ms` }} className="animate-fade-in">
                        <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <SectionTitle title={`Результаты по «${searchQuery}»`} count={searchResults.length} />
                  <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                    {searchResults.map((item, i) => (
                      <div key={item.id} style={{ animationDelay: `${i * 40}ms` }} className="animate-fade-in">
                        <ContentCard item={item} onFavoriteToggle={toggleFavorite} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 space-y-2" style={{ color: "var(--cinema-text-muted)" }}>
                  <Icon name="SearchX" size={40} />
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