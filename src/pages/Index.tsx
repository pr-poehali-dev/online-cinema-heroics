import { useState, useEffect } from "react";
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

// ─── Программа Карусели ────────────────────────────────────
interface Show {
  time: string; // "HH:MM"
  title: string;
  desc?: string;
  age: string;
}

const KARUSEL_26: Show[] = [
  { time: "05:00", title: "Лунтик", desc: "Прятки — Икота — Отдых — Масло — Нора — Колодец — Маляры — Вешалка — Насолили — Тень — Вики-верт — Картошка — Меч — Симулянт — Шашки — Крылья", age: "0+" },
  { time: "07:00", title: "С добрым утром, малыши!", desc: "Герои легендарной программы «Спокойной ночи, малыши!» теперь не только укладывают детей спать. Они с лёгкостью разбудят каждого ребёнка в детский сад.", age: "0+" },
  { time: "07:30", title: "Погода", desc: "Актуальный прогноз погоды от ведущих программы «Спокойной ночи, малыши!»", age: "0+" },
  { time: "07:35", title: "Бэби Борн", desc: "Ночная сказка принцессы. Часть 2", age: "0+" },
  { time: "07:40", title: "Царевны", desc: "Урок волшебной ботаники — Любимая игрушка — Наша Даша — Волшебная мастерская — Философский вопрос — Знакомство с Арчи — Шкатулка", age: "0+" },
  { time: "10:00", title: "Вкусные рисунки. Создай и съешь", desc: "Ведущие Дарья Сагалова и её дочери, Стефания и Милослава будут готовить по рисункам!", age: "0+" },
  { time: "10:20", title: "Фиксики. Самое время!", desc: "Перьевой перевод — Шахта — Печатная машинка — Молниеотвод — Машинист — Викинги — Ветряная мельница — Скафандр — Артист — Пузырьки — Почка — Патент", age: "0+" },
  { time: "12:00", title: "Студия красоты", desc: "«Студия красоты» с Катей Долгоруковой — место, где создаются уникальные гармоничные образы для любого случая!", age: "0+" },
  { time: "12:15", title: "Маша и Медведь", desc: "Колесо дружбы — Три патача — Вишенка на торте — У страха глаза велики — Принцесса и чудовище — Много шума и ничего — Аттракцион — Штангу! Штангу!", age: "0+" },
  { time: "14:00", title: "У меня лапки", desc: "«У меня лапки» — это программа о домашних животных, их породах, видах, характере и привычках.", age: "0+" },
  { time: "14:30", title: "Простоквашино", desc: "Старая мента — Усатый нянь — Орех раздора — Фудтрактор — Папина отдушина — Палина мечта — Тушите свет — Дело о пропавшей лопате — Мубемоле", age: "0+" },
  { time: "16:00", title: "Это супер!", desc: "Тележурнал обо всём самом интересном и весёлом!", age: "0+" },
  { time: "16:15", title: "Барбоскины", desc: "Кто красивее — Проявить смелость — Немужское дело — День уступок — Шпионские каникулы — Двойной Дружок — Ни копейки не страшно — По закону", age: "0+" },
  { time: "19:30", title: "Чик-Чирикино", desc: "Клюв и магия — Влюблённый Микс — Дело привычки — Герои и деревья — Быть собой! — За покупками — Вкусная ловушка", age: "0+" },
  { time: "21:00", title: "Спокойной ночи, малыши!", desc: "Передача «Спокойной ночи, малыши!» — уникальное явление на телевидении. Программа существует с сентября 1964 года. Она никогда не переставала выходить.", age: "0+" },
  { time: "21:15", title: "Чик-Чирикино", desc: "Квест на курорте — Гнездо кукушки — Канал Василисы — Мамин отпуск — Папа дома — Кресло раздора — Родительское собрание — Монстр в коробке", age: "0+" },
  { time: "23:00", title: "Дикие Скричеры!", desc: "Катастрофа в Сайберсити", age: "6+" },
  { time: "23:15", title: "Приключения Пети и Волка", desc: "Дело о Снежной королеве — Дело о Сборище дуь — Дело Сфинкса — Дело о Двойниках — Дело о Свадьбе Русалии — Дело о Древомудрах — Дело о Внутренних", age: "12+" },
  { time: "02:00", title: "Маша и Медведь", desc: "Осторожно, ремонт! — Хит сезона — Витамин роста — Новая метла — Сладкая жизнь — Фотография 9 из 12", age: "0+" },
  { time: "02:35", title: "Маша и Медведь. Песенки для малышей", desc: "Если весел ты", age: "0+" },
  { time: "02:40", title: "Маша и Медведь", desc: "Трудно быть маленьким — Двое на одного — Большое путешествие — Нынче всё наоборот — Учитель танцев — Крик победы — Современное искусство", age: "0+" },
  { time: "04:05", title: "Маша и Медведь. Песенки для малышей", desc: "На ферме", age: "0+" },
  { time: "04:10", title: "Маша и Медведь", desc: "Есть контакт — Спокойность, только спокойность — Цирк, да и только — Квартет плюс — Сколько волка ни корми — Звезда с неба", age: "0+" },
];

const KARUSEL_27: Show[] = [
  { time: "05:00", title: "Лунтик", desc: "Звёздочка — Костюмы — Волшебный сироп — Хитрые гусеницы — Отважные путешественники — Кумыры — Не из пугливых — Мост — Самый-самый — Варение", age: "0+" },
  { time: "07:00", title: "С добрым утром, малыши!", desc: "Герои легендарной программы «Спокойной ночи, малыши!» теперь не только укладывают детей спать. Они с лёгкостью разбудят каждого ребёнка в детский сад.", age: "0+" },
  { time: "07:25", title: "Погода", desc: "Актуальный прогноз погоды от ведущих программы «Спокойной ночи, малыши!»", age: "0+" },
  { time: "07:30", title: "Маша и Медведь", desc: "Звезда с неба — Случай на рыбалке — Вот как бывает! — Не цирковое дело! — Вся жизнь — театр — Вокруг света за один час — Что-нибудь вкусненькое — Большой поход — Первая ласточка — Медовый день — Грибной дождь — Супергерои — Крути педали — Калинка-малинка — Лучшая няня на свете — Кто за старшего? — Макароны по-флотски", age: "0+" },
  { time: "10:15", title: "Супер Крылья. Электрические герои", desc: "Двойники", age: "0+" },
  { time: "10:30", title: "Робокар Поли и его друзья", desc: "Давайте следовать правилам!", age: "0+" },
  { time: "10:45", title: "Три кота", desc: "Мастер на все лапы — День рождении Карамельки — Папин видеоблог — Машинка — Арбузный день — Банковская карта Компота — Потерянный динозавр", age: "0+" },
  { time: "13:15", title: "Диностер", desc: "Город птерозавров", age: "0+" },
  { time: "13:30", title: "Джи-Джи Бонд: Супергонщик", desc: "Общая цель", age: "6+" },
  { time: "13:45", title: "Минифорс. Сила динозавров", desc: "Минифорс Триза", age: "6+" },
  { time: "14:00", title: "Инфинити Надо", desc: "Самый сильный в клане Огне — Король ночных псов", age: "6+" },
  { time: "14:30", title: "Навигатор. Новости", desc: "Эта программа — путеводитель по самым интересным событиям!", age: "6+" },
  { time: "14:35", title: "Погода", desc: "Актуальный прогноз погоды от ведущих программы «Спокойной ночи, малыши!»", age: "0+" },
  { time: "14:40", title: "Барбоскины", desc: "Идеальный пациент — Пицца — Клад — Сальмаганди — Шпинат, шоколад и условный рефлекс — Романс — Курорт — Главное — терпение! — Большие выходные", age: "0+" },
  { time: "16:40", title: "ЛОЛ Сюрпрайз. Фантазийные эпизоды", desc: "Русалки", age: "6+" },
  { time: "16:50", title: "Сказочный патруль", desc: "История 45. Сердце часов — История 46. Долгожданная встреча — История 47. Тайны Медузы Горгоны — История 48. Незваный обед — История 49. Новый Визирь", age: "0+" },
  { time: "19:45", title: "Снежная королева — 2: Перезаморозка", desc: "Продолжение мультфильма «Снежная королева».", age: "0+" },
  { time: "21:00", title: "Спокойной ночи, малыши!", desc: "Передача «Спокойной ночи, малыши!» — уникальное явление на телевидении.", age: "0+" },
  { time: "21:15", title: "Лео и Тиг", desc: "Долой пернатых — Подкидыш — Таинственный лес — Пропавшее вдохновение — Морской бой", age: "0+" },
  { time: "22:15", title: "Тобот. Герои Дэйдо", desc: "Спешим вам на помощь! — Тобот мега шесть, интеграция!", age: "0+" },
  { time: "22:45", title: "Метал Кард Бот", desc: "Возвращение — Пробуждение силы", age: "6+" },
  { time: "23:10", title: "Фьюжн Макс", desc: "Спасение малышей", age: "6+" },
  { time: "23:25", title: "Герои Энвелла", desc: "Летучий корабль — Королевство 4K-Филдор — Руины — Дворец Саламандры — Внешняя стена — Финал. Часть 1 — Финал. Часть 2 — Пауза", age: "6+" },
  { time: "01:00", title: "Приключения Пети и Волка", desc: "Дело о Мировом древе и дровосеке — Дело об Инерции жизни — Дело Наследного принца — Дело Оборотня — Дело об Эмпатии — Дело в Пушкине — Дело о Клонах", age: "12+" },
];

// ─── Вспомогательные функции для расписания ──────────────
function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getCurrentShow(shows: Show[]): number {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  let idx = -1;
  for (let i = 0; i < shows.length; i++) {
    const startMin = timeToMinutes(shows[i].time);
    const nextMin = i + 1 < shows.length ? timeToMinutes(shows[i + 1].time) : 24 * 60;
    if (nowMin >= startMin && nowMin < nextMin) { idx = i; break; }
  }
  return idx;
}

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

// ─── Компонент: живые часы ────────────────────────────────
function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 28, color: "var(--cinema-red)", letterSpacing: "0.05em" }}>
      {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
    </span>
  );
}

// ─── Компонент: расписание Карусели ──────────────────────
function KaruselSchedule() {
  const [day, setDay] = useState<"26" | "27">("26");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  const shows = day === "26" ? KARUSEL_26 : KARUSEL_27;
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const currentIdx = (() => {
    for (let i = 0; i < shows.length; i++) {
      const startMin = timeToMinutes(shows[i].time);
      const nextMin = i + 1 < shows.length ? timeToMinutes(shows[i + 1].time) : 24 * 60 + timeToMinutes(shows[0].time);
      if (nowMin >= startMin && nowMin < nextMin) return i;
    }
    return -1;
  })();

  const todayDate = now.getDate();
  const activeToday = todayDate === 26 && day === "26" || todayDate === 27 && day === "27";

  const dayNames: Record<string, string> = { "26": "26 апреля, воскресенье", "27": "27 апреля, понедельник" };

  return (
    <div className="animate-fade-in">
      {/* Заголовок с часами */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", color: "#f5f5f5", fontSize: 22, fontWeight: 700 }}>
            📺 Программа передач — Карусель
          </h2>
          <div className="text-sm mt-1" style={{ color: "var(--cinema-text-muted)" }}>{dayNames[day]}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <LiveClock />
          <div className="text-xs" style={{ color: "var(--cinema-text-muted)" }}>Москва</div>
        </div>
      </div>

      {/* Переключатель дней */}
      <div className="flex gap-2 mb-6">
        {(["26", "27"] as const).map(d => (
          <button key={d}
            onClick={() => setDay(d)}
            className="px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              background: day === d ? "var(--cinema-red)" : "var(--cinema-card)",
              color: day === d ? "#fff" : "var(--cinema-text-muted)",
              border: `1px solid ${day === d ? "var(--cinema-red)" : "var(--cinema-border)"}`,
            }}>
            {d === "26" ? "Вс, 26 апр" : "Пн, 27 апр"}
          </button>
        ))}
      </div>

      {/* Текущая передача */}
      {activeToday && currentIdx >= 0 && (
        <div className="flex items-center gap-3 mb-5 p-3.5 rounded-2xl" style={{ background: "var(--cinema-red-dim)", border: "1px solid var(--cinema-red)" }}>
          <div className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: "var(--cinema-red)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--cinema-red)" }}>
            Сейчас в эфире: {shows[currentIdx].time} — {shows[currentIdx].title}
          </span>
        </div>
      )}

      {/* Список передач */}
      <div className="space-y-2">
        {shows.map((show, i) => {
          const isNow = activeToday && i === currentIdx;
          const isPast = activeToday && (() => {
            const nextMin = i + 1 < shows.length ? timeToMinutes(shows[i + 1].time) : 24 * 60;
            return nowMin >= nextMin;
          })();
          return (
            <div key={i}
              className="rounded-2xl flex items-start gap-4 p-4 transition-all duration-200 animate-fade-in"
              style={{
                animationDelay: `${i * 20}ms`,
                background: isNow ? "var(--cinema-red-dim)" : "var(--cinema-card)",
                border: `1px solid ${isNow ? "var(--cinema-red)" : "var(--cinema-border)"}`,
                opacity: isPast ? 0.5 : 1,
              }}>
              <span className="text-sm font-black w-14 shrink-0 text-center pt-0.5"
                style={{ color: isNow ? "var(--cinema-red)" : isPast ? "#444" : "#777", fontFamily: "'Oswald', sans-serif", fontSize: 16 }}>
                {show.time}
              </span>
              <div className="w-px shrink-0 mt-1" style={{ height: 20, background: isNow ? "var(--cinema-red)" : "var(--cinema-border)" }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm" style={{ color: isNow ? "#fff" : isPast ? "#555" : "#e0e0e0" }}>
                    {show.title}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "#888", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {show.age}
                  </span>
                  {isNow && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "var(--cinema-red)", color: "#fff" }}>
                      В эфире
                    </span>
                  )}
                </div>
                {show.desc && (
                  <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: isPast ? "#444" : "var(--cinema-text-muted)" }}>
                    {show.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
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
          {activeSection === "schedule" && <KaruselSchedule />}

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