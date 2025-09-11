"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Mail,
  FileDown,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Users2,
  Shield,
  Check,
} from "lucide-react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";

/* ===================== Brand / Theme ===================== */
const brand = {
  ink: "#0B1220",
  headerBg: "#F9FAFB",
  pillBorder: "#BBF7D0",
  cardBorder: "#D1FAE5",
  cardBg: "#ECFDF5",
  cardShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const CONTACT_EMAIL = "official.regulina.t@gmail.com";

type Lang = "EN" | "RU" | "AR";
const DEFAULT_LANG: Lang = "EN";

/* ===================== Helpers: in-view once & reveal wrappers ===================== */
function useInViewOnce(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setInView(true);
      return;
    }
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      options ?? { threshold: 0.18 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

function RevealOnView({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce();
  return (
    <div
      ref={ref}
      className={`transition duration-700 will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Typewriter({
  text,
  cps = 24,
  startDelay = 800,
  className = "",
}: {
  text: string;
  cps?: number;
  startDelay?: number;
  className?: string;
}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    const begin = window.setTimeout(() => {
      const step = Math.max(1, Math.round(cps / 4));
      const tick = () => {
        i = Math.min(text.length, i + step);
        setOut(text.slice(0, i));
        if (i < text.length) window.setTimeout(tick, 40);
        else setDone(true);
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(begin);
    };
  }, [text, cps, startDelay]);

  return (
    <span className={className}>
      {out}
      {!done && (
        <span className="inline-block w-2 h-5 align-baseline bg-emerald-500 ml-1 animate-pulse" />
      )}
    </span>
  );
}

function TypewriterOnView({
  text,
  cps = 24,
  delay = 200,
  className = "",
}: {
  text: string;
  cps?: number;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce({ threshold: 0.2 });
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);
  return (
    <div ref={ref}>
      {start ? (
        <Typewriter text={text} cps={cps} startDelay={delay} className={className} />
      ) : (
        <span className={className} />
      )}
    </div>
  );
}

/* ===================== Inline SVG Logo ===================== */
function FlaskIcon({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const sw = size >= 28 ? 1.8 : size <= 24 ? 1.6 : 1.7;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M9 2h6M10 2v5l-5.2 8.6A4 4 0 0 0 8.2 21h7.6a4 4 0 0 0 3.2-4.4L14 7V2"
        fill="none"
        stroke="#0CA678"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ===================== Section Title (glass pill) ===================== */
function SectionTitle({
  as = "h2",
  children,
  className = "",
}: {
  as?: "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  const Tag = as as any;
  return (
    <Tag
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold shadow-sm
        border-[${brand.pillBorder}] bg-white/60 text-slate-800 backdrop-blur-sm ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ===================== i18n ===================== */
const dict = {
  EN: {
    dir: "ltr" as const,
    menu: ["Home", "Science", "Platform", "Partnership", "Contacts"],
    hero: {
      pretitle: "A UNIQUE BREAKTHROUGH UNITING SCIENCE AND FAITH",
      title1: "Regulina-T™",
      title2: "Thymus regeneration & immunoregulator",
      paragraph:
        "a solution uniting faith, science, and modern biotech — opening a new era in immunology and medicine.",
    },
    infographic: {
      title: "Infographic\u00A0—\u00A0addressable\u00A0segments",
      shortTitle: "Infographic\u00A0—\u00A0segments",
    },
    segments: {
      autoimmune: "Autoimmune",
      healthyAging: "Healthy aging",
      infectious: "Infectious",
      oncologyAdjacent: "Oncology-adjacent",
      transplantationTherapy: "Transplantation therapy",
    },
    mission: {
      bullets: (fmt: (n: number) => string) => [
        "Regulina-T™ aims to regenerate the thymus and fully restore immune function.",
        `> ${fmt(2_500_000_000)} patients addressable globally.`,
        `>$${fmt(500_000_000_000)} yearly economic potential.`,
        "Humanitarian effect: a healthier, more productive humanity.",
      ],
      kpiPatients: (fmt: (n: number) => string) => `${fmt(2_500_000_000)} patients`,
      kpiMoney: (fmt: (n: number) => string) => `$${fmt(500_000_000_000)}+`,
    },
    lbl: {
      mission: "Mission",
      science: "Scientific basis",
      platform: "Regulina-T™ Platform",
      partnership: "Partnership",
      contacts: "Contacts",
      ctaContact: "Contact",
      ctaLicensee: "Licensee",
      ctaDossier: "Download dossier",
      footer: "© Regulina-T™ Thymus Immunoregulator Platform",
    },
  },
  RU: {
    dir: "ltr" as const,
    menu: ["Главная", "Наука", "Платформа", "Партнёрство", "Контакты"],
    hero: {
      pretitle: "УНИКАЛЬНЫЙ ПРОРЫВ, ОБЪЕДИНЯЮЩИЙ НАУКУ И ВЕРУ",
      title1: "Regulina-T™",
      title2: "Регенерация тимуса & иммунорегулятор",
      paragraph:
        "решение, соединяющее веру, науку и современные биотехнологии — открывая новую эпоху в иммунологии и медицине.",
    },
    infographic: {
      title: "Инфографика\u00A0—\u00A0адресуемые\u00A0сегменты",
      shortTitle: "Инфографика\u00A0—\u00A0сегменты",
    },
    segments: {
      autoimmune: "Аутоиммунные",
      healthyAging: "Здоровое старение",
      infectious: "Инфекционные",
      oncologyAdjacent: "Смежные с онкологией",
      transplantationTherapy: "Трансплантационная терапия",
    },
    mission: {
      bullets: (fmt: (n: number) => string) => [
        "Regulina-T™ направлена на регенерацию тимуса и полное восстановление иммунной системы.",
        `> ${fmt(2_500_000_000)} пациентов потенциально адресуемых.`,
        `>$${fmt(500_000_000_000)} ежегодный экономический потенциал.`,
        "Гуманитарный эффект: более здоровое и продуктивное человечество.",
      ],
      kpiPatients: (fmt: (n: number) => string) => `${fmt(2_500_000_000)} пациентов`,
      kpiMoney: (fmt: (n: number) => string) => `$${fmt(500_000_000_000)}+`,
    },
    lbl: {
      mission: "Миссия",
      science: "Научная основа",
      platform: "Платформа Regulina-T™",
      partnership: "Партнёрство",
      contacts: "Контакты",
      ctaContact: "Связаться",
      ctaLicensee: "Лицензиат",
      ctaDossier: "Скачать досье",
      footer: "© Regulina-T™ Платформа иммунорегуляции тимуса",
    },
  },
  AR: {
    dir: "rtl" as const,
    menu: ["الرئيسية", "العِلم", "المنصّة", "الشراكة", "التواصل"],
    hero: {
      pretitle: "اختراق فريد يجمع العِلم والإيمان",
      title1: "Regulina-T™",
      title2: "تجديد الغدة الزعترية ومنظِّم مناعي",
      paragraph:
        "حلٌ يجمع الإيمان والعِلم والتقنيات الحيوية الحديثة، لفتح عصرٍ جديد في المناعة والطب.",
    },
    infographic: {
      title: "إنفوجرافيك\u00A0—\u00A0الفئات\u00A0القابلة\u00A0للخدمة",
      shortTitle: "إنفوجرافيك\u00A0—\u00A0الفئات",
    },
    segments: {
      autoimmune: "المناعية الذاتية",
      healthyAging: "الشيخوخة الصحية",
      infectious: "الأمراض المعدية",
      oncologyAdjacent: "المجاورة للأورام",
      transplantationTherapy: "العلاج بالزرع",
    },
    mission: {
      bullets: (fmt: (n: number) => string) => [
        "تهدف Regulina-T™ إلى تجديد الغدة الزعترية واستعادة الوظيفة المناعية بالكامل.",
        `> ${fmt(2_500_000_000)} من المرضى قابلة للوصول عالميًا.`,
        `>$${fmt(500_000_000_000)} إمكانات اقتصادية سنوية.`,
        "أثر إنساني: بشرٌ أصحّ وأكثر إنتاجية.",
      ],
      kpiPatients: (fmt: (n: number) => string) => `${fmt(2_500_000_000)} مرضى`,
      kpiMoney: (fmt: (n: number) => string) => `$${fmt(500_000_000_000)}+`,
    },
    lbl: {
      mission: "الرسالة",
      science: "الأساس العلمي",
      platform: "منصّة Regulina-T™",
      partnership: "الشراكة",
      contacts: "التواصل",
      ctaContact: "تواصل",
      ctaLicensee: "الترخيص",
      ctaDossier: "تنزيل الملف",
      footer: "© منصة تنظيم مناعة الزعترية — Regulina-T™",
    },
  },
} as const;

/* ===================== Mail & dossier ===================== */
function mailtoEncode(subject: string, body: string) {
  return `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`;
}
const CONTACT = "official.regulina.t@gmail.com";

function buildContactMailto(lang: Lang) {
  const subj = {
    EN: "Collaboration request with Regulina-T",
    RU: "Запрос на сотрудничество с Regulina-T",
    AR: "طلب تعاون مع ريغولينا-تي",
  }[lang];
  const body = {
    EN: `Dear Regulina-T team,

My name is (Full Name), and I am reaching out to explore potential collaboration with your company.
Company/Organization: ___
Country: ___
Phone: ___
Email: ___

Please contact me to discuss the details.

Best regards,
_______`,
    RU: `Уважаемая команда Regulina-T,

Меня зовут (ФИО), я обращаюсь по вопросу сотрудничества с вашей компанией.
Компания/Организация: ___
Страна: ___
Телефон: ___
Электронная почта: ___

Прошу связаться со мной для обсуждения деталей.

С уважением,
_______`,
    AR: `فريق ريغولينا-تي المحترم،

اسمي (الاسم الكامل)، وأتواصل لاستكشاف إمكانات التعاون مع شركتكم.
الشركة/المنظمة: ___
الدولة: ___
الهاتف: ___
البريد الإلكتروني: ___

يرجى التواصل معي لمناقشة التفاصيل.

مع خالص التحية،
_______`,
  }[lang];
  return `mailto:${CONTACT}${mailtoEncode(subj, body)}`;
}

function buildLicenseeMailto(lang: Lang) {
  const subj = {
    EN: "License application for Regulina-T",
    RU: "Заявка на лицензию Regulina-T",
    AR: "طلب ترخيص لمنتج ريغولينا-تي",
  }[lang];
  const body = {
    EN: `Dear Regulina-T team,

My name is (Full Name), and I am contacting you regarding obtaining a license to use the product Regulina-T™.
Company: ___
Country: ___
Phone: ___
Email: ___

Please contact me to discuss the licensing terms.

Best regards,
___`,
    RU: `Уважаемая компания Regulina-T,

Я, (ФИО), обращаюсь по вопросу получения лицензии на использование продукта Regulina-T™.
Компания: ___
Страна: ___
Телефон: ___
Электронная почта: ___

Прошу связаться со мной для обсуждения условий.

С уважением,
___`,
    AR: `فريق ريغولينا-تي المحترم،

اسمي (الاسم الكامل)، وأتواصل بخصوص الحصول على ترخيص لاستخدام منتج Regulina-T™.
الشركة: ___
الدولة: ___
الهاتف: ___
البريد الإلكتروني: ___

يرجى التواصل معي لمناقشة شروط الترخيص.

مع خالص التحية،
___`,
  }[lang];
  return `mailto:${CONTACT}${mailtoEncode(subj, body)}`;
}

function getDossierPath(lang: Lang) {
  const m = {
    EN: "Regulina-T_License_(en).pdf",
    RU: "Regulina-T_License_(ru).pdf",
    AR: "Regulina-T_License_(ar).pdf",
  } as const;
  return `/files/${m[lang]}`;
}

/* ===================== Utils ===================== */
function setCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===================== Small UI ===================== */
function Card({
  children,
  className = "",
  clickable = false,
}: {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border shadow-sm ${clickable ? "cursor-pointer" : ""}`}
      style={{
        background: brand.cardBg,
        borderColor: brand.cardBorder,
        boxShadow: brand.cardShadow,
      }}
    >
      <div className={`p-4 sm:p-6 ${className}`}>{children}</div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl bg-white/60 border border-emerald-100 p-4">
      <div className="flex items-center gap-2 text-emerald-700 font-semibold">
        {icon} <span>{title}</span>
      </div>
      <p className="mt-2 text-slate-700/80 text-sm">{desc}</p>
    </div>
  );
}

/* ===================== Infographic data ===================== */
type SegKey =
  | "autoimmune"
  | "healthyAging"
  | "infectious"
  | "oncologyAdjacent"
  | "transplant";

const segmentPalette: Record<SegKey, string> = {
  autoimmune: "#1E88E5",
  healthyAging: "#0CA678",
  infectious: "#F59E0B",
  oncologyAdjacent: "#C62828",
  transplant: "#7C3AED",
};

const marketValues: Record<SegKey, number> = {
  autoimmune: 20,
  healthyAging: 20,
  infectious: 20,
  oncologyAdjacent: 20,
  transplant: 20,
};

function lighten(hex: string, amt = 28) {
  const h = hex.replace("#", "");
  const num = parseInt(h, 16);
  let r = (num >> 16) + amt,
    g = ((num >> 8) & 255) + amt,
    b = (num & 255) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function SegmentTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const name = payload[0]?.name as string | undefined;
  if (!name) return null;
  return (
    <div className="rounded-md bg-white border border-slate-200 px-2 py-1 text-xs shadow">
      {name}
    </div>
  );
}

/* ===================== Page ===================== */
export default function Page() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [ultraNarrow, setUltraNarrow] = useState(false);

  useEffect(() => {
    const fromCookie = getCookie("NEXT_LOCALE") as Lang | null;
    const fromLS =
      (typeof window !== "undefined" &&
        (localStorage.getItem("NEXT_LOCALE") as Lang | null)) || null;
    const nav = (typeof navigator !== "undefined" && navigator.language) || "";
    const guess: Lang =
      fromCookie || fromLS || (nav.startsWith("ru") ? "RU" : nav.startsWith("ar") ? "AR" : "EN");
    setLang(guess);
  }, []);

  useEffect(() => {
    const check = () => setUltraNarrow(window.innerWidth <= 330);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const d = dict[lang];
  const isRTL = d.dir === "rtl";

  useEffect(() => {
    document.documentElement.dir = d.dir;
    document.documentElement.lang = lang.toLowerCase();
  }, [d.dir, lang]);

  const toLocale = (l: Lang) => (l === "EN" ? "en" : l === "RU" ? "ru" : "ar-SA");
  const fmtCompact = (l: Lang) => (n: number) =>
    new Intl.NumberFormat(toLocale(l), {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);

  const MenuLink = ({ label, target }: { label: string; target: string }) => (
    <button
      onClick={() => scrollToId(target)}
      className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 transition"
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen text-slate-900">
      {/* ===== Header ===== */}
      <header
        className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-100"
        style={{ background: brand.headerBg }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskIcon />
            <div className="font-semibold">Regulina-T™</div>
            <div className="text-xs text-slate-600 ml-2">RGN-T1™ IMMUNOREGULATOR</div>
          </div>

          <nav className="hidden sm:flex items-center">
            <MenuLink label={d.menu[1]} target="science" />
            <MenuLink label={d.menu[2]} target="platform" />
            <MenuLink label={d.menu[3]} target="partnership" />
            <MenuLink label={d.menu[4]} target="contacts" />
          </nav>

          {/* Language switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next: Lang = lang === "EN" ? "RU" : lang === "RU" ? "AR" : "EN";
                setLang(next);
                try {
                  localStorage.setItem("NEXT_LOCALE", next);
                } catch {}
                setCookie("NEXT_LOCALE", next, 365);
              }}
              className="rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs"
              aria-label="Switch language"
              title="Switch language"
            >
              {lang}
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* left */}
        <div>
          <p className="text-emerald-700 font-semibold tracking-wide uppercase text-xs mb-2">
            {d.hero.pretitle}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">{d.hero.title1}</h1>
          <h2 className="mt-1 text-lg text-slate-700">{d.hero.title2}</h2>

          <TypewriterOnView
            key={lang}
            text={d.hero.paragraph}
            cps={28}
            delay={300}
            className="block mt-4 text-slate-700/90"
          />

          <div className="mt-6 flex gap-3">
            <a
              href={buildContactMailto(lang)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2"
            >
              <Mail size={16} /> {d.lbl.ctaContact}
            </a>
            <a
              href={buildLicenseeMailto(lang)}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2"
            >
              <Shield size={16} /> {d.lbl.ctaLicensee}
            </a>
          </div>
        </div>

        {/* right: placeholder video block */}
        <div className="rounded-2xl border border-slate-200 bg-white h-64 md:h-auto flex items-center justify-center text-slate-400">
          YouTube
        </div>
      </section>

      {/* ===== Mission ===== */}
      <section className="mx-auto max-w-6xl px-4" id="mission">
        <SectionTitle as="h3">{d.lbl.mission}</SectionTitle>

        <Card className="mt-4">
          <ul className={`grid gap-3 ${isRTL ? "text-right" : ""}`} key={`bullets-${lang}`}>
            {d.mission.bullets(fmtCompact(lang)).map((b: string, i: number) => (
              <RevealOnView key={`${lang}-${i}`} delay={100 * i}>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 text-emerald-600" size={16} />
                  <span className="text-slate-800">{b}</span>
                </li>
              </RevealOnView>
            ))}
          </ul>

          {/* KPI chips */}
          <div
            className={`mt-5 flex flex-wrap gap-3 ${isRTL ? "justify-end" : ""}`}
            key={`kpi-${lang}`}
          >
            <RevealOnView delay={50}>
              <div className="rounded-2xl px-4 py-3 text-sm font-semibold bg-white/70 border-2 border-emerald-200">
                {d.mission.kpiPatients(fmtCompact(lang))}
              </div>
            </RevealOnView>

            <RevealOnView delay={120}>
              <div
                className="rounded-2xl px-4 py-3 text-sm font-semibold bg-white/70 border-2 border-emerald-200"
                aria-label="$500B+"
              >
                {d.mission.kpiMoney(fmtCompact(lang))}
              </div>
            </RevealOnView>
          </div>
        </Card>
      </section>

      {/* ===== Science + Infographic ===== */}
      <section className="mx-auto max-w-6xl px-4 mt-10 grid gap-6 md:grid-cols-2" id="science">
        <div>
          <SectionTitle as="h3">{d.lbl.science}</SectionTitle>

          <ul className={`mt-4 space-y-2 ${isRTL ? "text-right" : ""}`}>
            {(lang === "EN"
              ? [
                  "RGN-T1™ is a recombinant form of Regucalcin (SMP30).",
                  "Its level declines with age → thymic atrophy, CD4/CD8 imbalance, cytokine dysregulation.",
                  "Regulina-T™ restores:",
                ]
              : lang === "RU"
              ? [
                  "RGN-T1™ — рекомбинантная форма Regucalcin (SMP30).",
                  "Его уровень снижается с возрастом → атрофия тимуса, дисбаланс CD4/CD8, нарушение цитокиновой сети.",
                  "Regulina-T™ восстанавливает:",
                ]
              : [
                  "RGN-T1™ هو شكل مُعاد التركيب من Regucalcin (SMP30).",
                  "ينخفض مستواه مع التقدّم → ضمور الزعتر واختلال CD4/CD8 وشبكات السيتوكينات.",
                  "تُعيد Regulina-T™ ما يلي:",
                ]
            ).map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 text-emerald-600" size={16} />
                <span>{t}</span>
              </li>
            ))}

            {(lang === "EN"
              ? [
                  "Thymus regeneration",
                  "CD4/CD8 balance",
                  "Cytokine normalization (IL-7, TSLP)",
                  "Immune homeostasis & healthy longevity",
                ]
              : lang === "RU"
              ? [
                  "Регенерацию тимуса",
                  "Баланс CD4/CD8",
                  "Нормализацию цитокиновой сети (IL-7, TSLP)",
                  "Иммунный гомеостаз и здоровое долголетие",
                ]
              : [
                  "تجديد الغدة الزعترية",
                  "توازن CD4/CD8",
                  "تطبيع شبكة السيتوكينات (IL-7, TSLP)",
                  "اتّزان مناعي وطول عمر صحي",
                ]
            ).map((t, i) => (
              <li key={`b-${i}`} className="ml-6 list-disc text-slate-800" dir={isRTL ? "rtl" : "ltr"}>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Инфографика — фикс: overflow-hidden и без отрицательных отступов */}
        <div>
          <SectionTitle as="h3">
            {ultraNarrow ? dict[lang].infographic.shortTitle : dict[lang].infographic.title}
          </SectionTitle>

          <Card className="mt-4 overflow-hidden">
            <div className="grid gap-5">
              <div className="w-full min-w-0">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <defs>
                      {(Object.keys(segmentPalette) as SegKey[]).map((k) => (
                        <linearGradient id={`grad-${k}`} key={k} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={lighten(segmentPalette[k], 24)} />
                          <stop offset="100%" stopColor={segmentPalette[k]} />
                        </linearGradient>
                      ))}
                    </defs>

                    <Pie
                      data={(["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[]).map(
                        (k) => ({
                          key: k,
                          name:
                            k === "transplant"
                              ? dict[lang].segments.transplantationTherapy
                              : k === "autoimmune"
                              ? dict[lang].segments.autoimmune
                              : k === "healthyAging"
                              ? dict[lang].segments.healthyAging
                              : k === "infectious"
                              ? dict[lang].segments.infectious
                              : dict[lang].segments.oncologyAdjacent,
                          value: marketValues[k],
                          fill: `url(#grad-${k})`,
                        })
                      )}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={92}
                      innerRadius={42}
                      stroke="rgba(15,23,42,0.12)"
                      strokeWidth={1}
                      isAnimationActive
                    >
                      {(Object.keys(segmentPalette) as SegKey[]).map((k) => (
                        <Cell key={k} fill={`url(#grad-${k})`} />
                      ))}
                    </Pie>
                    <Tooltip content={<SegmentTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Легенда — без отрицательных отступов */}
              <div className={`flex flex-wrap gap-3 ${isRTL ? "justify-end" : ""}`}>
                {(Object.keys(segmentPalette) as SegKey[]).map((k) => {
                  const label =
                    k === "transplant"
                      ? dict[lang].segments.transplantationTherapy
                      : k === "autoimmune"
                      ? dict[lang].segments.autoimmune
                      : k === "healthyAging"
                      ? dict[lang].segments.healthyAging
                      : k === "infectious"
                      ? dict[lang].segments.infectious
                      : dict[lang].segments.oncologyAdjacent;

                  return (
                    <div
                      key={k}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/70 border border-slate-200 px-3 py-2 min-h-[32px]"
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ background: segmentPalette[k] }}
                      />
                      <span className="text-sm text-slate-800">{label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-xs text-slate-600/80">
                Illustrative split. Final segmentation to be refined with market research.
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== Platform ===== */}
      <section className="mx-auto max-w-6xl px-4 mt-10" id="platform">
        <SectionTitle as="h3">{d.lbl.platform}</SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Feature
            icon={<Shield className="text-emerald-600" size={18} />}
            title="GMP/GLP"
            desc="Quality by design, audit-ready."
          />
          <Feature
            icon={<Users2 className="text-emerald-600" size={18} />}
            title="T-cell focus"
            desc="Repertoire renewal."
          />
          <Feature
            icon={<FlaskConical className="text-emerald-600" size={18} />}
            title="Bioreactors"
            desc="Scalable upstream."
          />
          <Feature
            icon={<CheckCircle2 className="text-emerald-600" size={18} />}
            title="Access"
            desc="Global health impact."
          />
        </div>
      </section>

      {/* ===== Partnership / Contacts ===== */}
      <section className="mx-auto max-w-6xl px-4 mt-12" id="partnership">
        <SectionTitle as="h3">{d.lbl.partnership}</SectionTitle>
      </section>

      <section className="mx-auto max-w-6xl px-4 mt-10" id="contacts">
        <SectionTitle as="h3">{d.lbl.contacts}</SectionTitle>
        <Card className="mt-4">
          <div className={`grid sm:grid-cols-2 gap-4 ${isRTL ? "text-right" : ""}`}>
            <div>Email: {CONTACT_EMAIL}</div>
            <div>Phone: +44 7440 448317</div>
          </div>
          <div className="mt-3 text-slate-700/90">
            {lang === "EN"
              ? "Regulina-T™ is a God-given key: the unity of faith, science, and biotechnology."
              : lang === "RU"
              ? "Regulina-T™ — ключ, дарованный Богом: единство веры, науки и биотехнологий."
              : "ريغولينا-تي™ هو مفتاح منحه الله: وحدة الإيمان والعلم والتقنيات الحيوية."}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={buildContactMailto(lang)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2"
            >
              <Mail size={16} /> {d.lbl.ctaContact}
            </a>
            <a
              href={getDossierPath(lang)}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2"
            >
              <FileDown size={16} /> {d.lbl.ctaDossier}
            </a>
          </div>
        </Card>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
        <div className="border-t border-slate-100 pt-6">{d.lbl.footer}</div>
        <div className="mt-2 text-xs">EN / RU / AR</div>
      </footer>
    </main>
  );
}
