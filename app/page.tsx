"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Mail, FileDown, ArrowRight, CheckCircle2, Users2, Shield } from "lucide-react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

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
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
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
      className={`opacity-0 translate-y-3 transition-all duration-300 ease-out ${
        inView ? "opacity-100 translate-y-0" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ===================== Typewriter ===================== */
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
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    const begin = window.setTimeout(() => {
      const step = Math.max(1, Math.round(cps / 4));
      let t: number;
      const tick = () => {
        i = Math.min(text.length, i + step);
        setOut(text.slice(0, i));
        if (i < text.length) {
          t = window.setTimeout(tick, Math.max(8, 1000 / cps));
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);
    return () => clearTimeout(begin);
  }, [text, cps, startDelay]);

  return (
    <span className={className} aria-live="polite">
      {out}
      {!done && (
        <span
          className="inline-block w-[1px] h-[1em] bg-current ms-1 align-[-0.15em] animate-pulse"
          aria-hidden="true"
        />
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
    <span ref={ref} className={className}>
      <Typewriter text={text} cps={cps} startDelay={start ? delay : 1e9} />
    </span>
  );
}

/* ===================== Inline SVG Logo ===================== */
function FlaskIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  const sw = size >= 28 ? 1.8 : size <= 24 ? 1.6 : 1.7;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M9 3h6M11 3v4M13 3v4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
      <path
        d="M8 7L6.2 10.6c-1.1 2.2.3 4.9 2.7 6a15.5 15.5 0 0 0 6.2 0c2.4-1.1 3.8-3.8 2.7-6L16 7H8Z"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M7.6 13.2c2.2-1.3 6.6-1.3 8.8 0" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
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
    <Tag className={`rt-glass inline-block rounded-full px-4 py-2 font-bold ${className}`}>{children}</Tag>
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
    mission: {
      title: "Mission",
      items: [
        "Regulina-T™ aims to regenerate the thymus and fully restore immune function.",
        "> 2.5B patients addressable globally.",
        ">$500B yearly economic potential.",
        "Humanitarian effect: a healthier, more productive humanity.",
      ],
      kpi: { label: "KPI", value: "$500B+" },
    },
    infographic: {
      title: "Infographic — addressable segments",
      shortTitle: "Infographic — segments",
    },
    segments: {
      autoimmune: "Autoimmune",
      healthyAging: "Healthy aging",
      infectious: "Infectious",
      oncologyAdjacent: "Oncology-adjacent",
      transplantationTherapy: "Transplantation therapy",
    },
    lbl: {
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
    mission: {
      title: "Миссия",
      items: [
        "Regulina-T™ направлена на регенерацию тимуса и полное восстановление иммунной системы.",
        "> 2,5 млрд адресуемых пациентов по миру.",
        "Ежегодный экономический потенциал — >$500 млрд.",
        "Гуманитарный эффект: более здоровое и продуктивное человечество.",
      ],
      kpi: { label: "KPI", value: "$500B+" },
    },
    infographic: {
      title: "Инфографика — адресуемые сегменты",
      shortTitle: "Инфографика — сегменты",
    },
    segments: {
      autoimmune: "Аутоиммунные",
      healthyAging: "Здоровое старение",
      infectious: "Инфекционные",
      oncologyAdjacent: "Смежные с онкологией",
      transplantationTherapy: "Трансплантационная терапия",
    },
    lbl: {
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
    mission: {
      title: "الرسالة",
      items: [
        "تهدف Regulina-T™ إلى تجديد الغدة الزعترية واستعادة الوظيفة المناعية بالكامل.",
        "> 2.5 مليار مريض يمكن خدمتهم عالميًا.",
        "إمكانات اقتصادية سنوية تتجاوز 500 مليار دولار.",
        "أثر إنساني: مجتمع أصح وأكثر إنتاجًا.",
      ],
      kpi: { label: "مؤشر", value: "$500B+" },
    },
    infographic: {
      title: "إنفوجرافيك — الفئات القابلة للخدمة",
      shortTitle: "إنفوجرافيك — الفئات",
    },
    segments: {
      autoimmune: "المناعية الذاتية",
      healthyAging: "الشيخوخة الصحية",
      infectious: "الأمراض المعدية",
      oncologyAdjacent: "المجاورة للأورام",
      transplantationTherapy: "العلاج بالزرع",
    },
    lbl: {
      science: "الأساس العلمي",
      platform: "منصّة Regulina-T™",
      partnership: "الشراكة",
      contacts: "التواصل",
      ctaContact: "تواصل",
      ctaLicensee: "الترخيص",
      ctaDossier: "تنزيل الملف",
      footer: "© منصة تنظيم مناعة الغدة الزعترية — Regulina-T™",
    },
  },
} as const;

/* ===================== Mail & dossier ===================== */
function mailtoEncode(subject: string, body: string) {
  return `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
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

اسمي (الاسم الكامل)، وأتواصل معكم لاستكشاف إمكانية التعاون مع شركتكم.

الشركة/المنظمة: ___
الدولة: ___
الهاتف: ___
البريد الإلكتروني: ___

يرجى التواصل معي لمناقشة التفاصيل.

مع خالص التحية،
_______`,
  }[lang];

  return `mailto:${CONTACT_EMAIL}${mailtoEncode(subj, body)}`;
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

اسمي (الاسم الكامل)، وأتواصل معكم بخصوص الحصول على ترخيص لاستخدام منتج Regulina-T™.

الشركة: ___
الدولة: ___
الهاتف: ___
البريد الإلكتروني: ___

يرجى التواصل معي لمناقشة شروط الترخيص.

مع خالص التحية،
___`,
  }[lang];

  return `mailto:${CONTACT_EMAIL}${mailtoEncode(subj, body)}`;
}

function getDossierPath(lang: Lang) {
  // Подложите нужные файлы в /public/files/
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
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
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
      className={`mb-6 rounded-2xl border ${
        clickable ? "transition-shadow hover:shadow-cardHover" : ""
      } ${className} dark:bg-slate-900/60 dark:border-emerald-900/40`}
      style={{
        borderColor: brand.cardBorder,
        background: brand.cardBg,
        boxShadow: brand.cardShadow,
        color: "#111827",
      }}
    >
      {children}
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800/60 dark:bg-slate-900/40">
      <div className="mb-1 flex items-center gap-2 text-slate-800 dark:text-slate-100">
        {icon} <strong>{title}</strong>
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300">{desc}</div>
    </div>
  );
}

/* ===================== Infographic data ===================== */
type SegKey = "autoimmune" | "healthyAging" | "infectious" | "oncologyAdjacent" | "transplant";
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

/* ===================== Language Switcher (Dropdown) ===================== */
function LanguageSwitcher({
  lang,
  onChange,
  isRTL,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  isRTL: boolean;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const options: Lang[] = useMemo(() => (["EN", "RU", "AR"] as Lang[]).filter((l) => l !== lang), [lang]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!listRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  function applyLocale(l: Lang) {
    onChange(l);
    try {
      localStorage.setItem("NEXT_LOCALE", l);
    } catch {}
    setCookie("NEXT_LOCALE", l, 365);

    // если есть префиксы /en /ru /ar — корректно заменим URL
    const path = window.location.pathname;
    const m = path.match(/^\/(en|ru|ar)(\/.*)?$/i);
    if (m) {
      const rest = m[2] || "/";
      window.history.replaceState(null, "", `/${l.toLowerCase()}${rest}`);
    }
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        className="rounded-full px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white border border-transparent
                   focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {lang}
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className={`absolute ${isRTL ? "left-0" : "right-0"} mt-2 min-w-[160px] rounded-xl border border-slate-200 bg-white p-1 shadow-2xl ring-1 ring-black/5
                      dark:bg-slate-900 dark:border-slate-700`}
          style={{ transformOrigin: isRTL ? "top left" : "top right" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              role="option"
              aria-selected={false}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-xs
                         text-slate-800 hover:bg-slate-50 focus:outline-none
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500
                         dark:text-slate-100 dark:hover:bg-slate-800"
              onClick={() => applyLocale(opt)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") applyLocale(opt);
              }}
            >
              <span className="font-semibold">{opt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===================== Theme Toggle ===================== */
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const d = saved ? saved === "dark" : prefers;
      document.documentElement.classList.toggle("dark", d);
      setDark(d);
    } catch {}
  }, []);
  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="rounded-full p-2 ring-1 ring-slate-200 hover:bg-slate-100
                 dark:ring-slate-700 dark:hover:bg-slate-800"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={dark ? "text-amber-300" : "text-slate-700 dark:text-slate-200"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        {dark ? (
          <path d="M12 4v2m0 12v2m8-8h-2M6 12H4m12.95 5.657-1.414-1.414M6.464 7.05 5.05 5.636m12.9 0-1.415 1.414M6.464 16.95 5.05 18.364M12 8a4 4 0 100 8 4 4 0 000-8z" />
        ) : (
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        )}
      </svg>
    </button>
  );
}

/* ===================== Page ===================== */
export default function Page() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [ultraNarrow, setUltraNarrow] = useState(false);

  useEffect(() => {
    const fromCookie = getCookie("NEXT_LOCALE") as Lang | null;
    const fromLS = (typeof window !== "undefined" && localStorage.getItem("NEXT_LOCALE")) as Lang | null;
    const nav = (typeof navigator !== "undefined" && navigator.language) || "";
    const guess: Lang = fromCookie || fromLS || (nav.startsWith("ru") ? "RU" : nav.startsWith("ar") ? "AR" : "EN");
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

  const MenuLink = ({ label, target }: { label: string; target: string }) => (
    <button
      onClick={() => scrollToId(target)}
      className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 transition
                 dark:text-slate-200 dark:hover:text-emerald-300"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 selection:bg-emerald-200/60 dark:bg-slate-950 dark:text-slate-100">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 w-full bg-[#F9FAFB] border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="mx-auto max-w-[1200px] w-full px-6 py-2 flex items-center justify-between gap-4">
          {/* Logo + Brand */}
          <div className={`flex items-start gap-3 min-w-0 ${isRTL ? "flex-row-reverse" : ""}`}>
            <FlaskIcon
              size={28}
              className="text-[#0EA5E9] dark:text-[#14B8A6] mt-[1px] h-[24px] w-[24px] md:h-[28px] md:w-[28px]"
            />
            <div className={`flex flex-col leading-none ${isRTL ? "items-end" : "items-start"}`}>
              <span className="text-[20px] md:text-[24px] font-extrabold text-[#0B1220] dark:text-slate-100">
                Regulina-T™
              </span>
              <span
                className="mt-1 inline-flex items-center rounded-full border px-[6px] py-[1px]
                           text-[10px] md:text-[11px] leading-[12px] font-semibold text-[#047857] whitespace-nowrap
                           bg-[#E6FDF5] dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-900/60"
                style={{ borderColor: brand.pillBorder, height: "16px" }}
                aria-hidden="true"
              >
                RGN-T1™ IMMUNOREGULATOR
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="hidden items-center gap-1 md:flex">
            <MenuLink label={d.menu[0]} target="home" />
            <MenuLink label={d.menu[1]} target="science" />
            <MenuLink label={d.menu[2]} target="platform" />
            <MenuLink label={d.menu[3]} target="partnership" />
            <MenuLink label={d.menu[4]} target="contacts" />
          </nav>

          {/* Right: theme + lang */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher lang={lang} onChange={setLang} isRTL={isRTL} />
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* left */}
          <div>
            {/* Slogan */}
            <div className="max-w-[88%] md:max-w-[680px] lg:max-w-[720px]">
              <div
                key={lang}
                className="uppercase animate-[rt-fadeUp_.7s_ease-out_.25s_both]"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: "rgba(14,165,233,.85)",
                  minHeight: "2.5em",
                  fontSize: "clamp(16px,4.2vw,20px)",
                }}
              >
                <span className="block md:text-[clamp(20px,2.6vw,22px)] lg:text-[clamp(22px,2vw,24px)]">
                  {d.hero.pretitle}
                </span>
              </div>
            </div>

            {/* Titles */}
            <h1 className="mt-3 font-extrabold text-[36px] leading-[1.1] md:text-[60px] text-[#0B1220] dark:text-slate-100">
              {d.hero.title1}
            </h1>
            <div className="mt-1 font-bold text-[24px] leading-[1.2] opacity-90 md:text-[42px] text-[#0B1220] dark:text-slate-100">
              {d.hero.title2}
            </div>

            {/* Paragraph typing */}
            <p
              className="mt-4 max-w-[88%] md:max-w-[680px] lg:max-w-[720px] text-slate-700 dark:text-slate-300"
              style={{ fontSize: "18px", lineHeight: 1.6, minHeight: "3.2em" }}
            >
              <TypewriterOnView text={`Regulina-T™ — ${d.hero.paragraph}`} cps={24} delay={1000} />
            </p>

            {/* CTA */}
            <div
              className={`mt-5 flex ${isRTL ? "flex-row-reverse" : ""} gap-4 sm:flex-row sm:items-center max-sm:flex-col max-sm:items-stretch`}
            >
              <a
                href={buildContactMailto(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                style={{ background: "#16A34A", borderColor: "#16A34A", height: "46px" }}
              >
                <Mail size={16} />
                {d.lbl.ctaContact}
                <ArrowRight size={16} />
              </a>
              <a
                href={buildLicenseeMailto(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-slate-900 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300
                           dark:text-slate-100 dark:bg-slate-900/40 dark:border-slate-700"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0", height: "46px" }}
              >
                <Users2 size={16} />
                {d.lbl.ctaLicensee}
              </a>
            </div>
          </div>

          {/* right: YouTube */}
          <div>
            <Card className="relative aspect-video w-full overflow-hidden p-0 dark:bg-slate-900/40 dark:border-slate-800">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/SDnNofWX1YY?modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&controls=1"
                title="Regulina-T — overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* ===== Mission ===== */}
      <section id="mission" dir={isRTL ? "rtl" : "ltr"} className="px-4">
        <div className="mx-auto w-full max-w-[1200px]">
          <Card className="p-6 md:p-8">
            <div className="mb-3">
              <SectionTitle as="h2" className="text-[20px] md:text-[24px] text-slate-900 dark:text-slate-100">
                {d.mission.title}
              </SectionTitle>
            </div>

            <ul key={`m-items-${lang}`} className={`${isRTL ? "text-right" : ""} mt-3 space-y-2`}>
              {d.mission.items.map((text, i) => (
                <li key={`${lang}-m-${i}`} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                  <TypewriterOnView text={text} cps={26} delay={200 + i * 150} />
                </li>
              ))}
            </ul>

            <div key={`m-kpi-${lang}`} className="mt-6 grid grid-cols-2 gap-4 md:gap-6">
              <Card className="p-6 md:p-8">
                <RevealOnView>
                  <div className="text-emerald-700 font-semibold">{d.mission.kpi.label}</div>
                </RevealOnView>
              </Card>
              <Card className="p-6 md:p-8">
                <RevealOnView delay={120}>
                  <div className="text-emerald-700 font-semibold">{d.mission.kpi.value}</div>
                </RevealOnView>
              </Card>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== Science + Infographic ===== */}
      <section id="science" className="px-4">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2">
          {/* Science */}
          <Card className="p-6 md:p-8">
            <div className="mb-3">
              <SectionTitle as="h3" className="text-[20px] md:text-[24px] text-slate-900 dark:text-slate-100">
                {d.lbl.science}
              </SectionTitle>
            </div>
            <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 shrink-0 text-sky-600" size={18} />
                RGN-T1™ (recombinant Regucalcin / SMP30)
              </li>
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 shrink-0 text-sky-600" size={18} />
                Thymus regeneration, CD4/CD8 balance, cytokine network normalization (IL-7, TSLP)
              </li>
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 shrink-0 text-sky-600" size={18} />
                GMP/GLP-aligned platform
              </li>
            </ul>
          </Card>

          {/* Infographic */}
          <Card className="p-6 md:p-8 overflow-visible">
            <h3
              className="mb-4 mt-2 pr-4 font-normal text-[#0F172A] dark:text-slate-100
                         [text-wrap:balance] break-words [hyphens:auto]
                         text-[clamp(18px,4.5vw,24px)] md:text-[clamp(22px,2.6vw,28px)]"
            >
              {ultraNarrow ? d.infographic.shortTitle : d.infographic.title}
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Chart */}
              <div className="overflow-hidden rounded-xl p-2 bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                <div style={{ width: "100%", height: 240 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={(["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[]).map((k) => ({
                          key: k,
                          name:
                            k === "transplant"
                              ? d.segments.transplantationTherapy
                              : k === "autoimmune"
                              ? d.segments.autoimmune
                              : k === "healthyAging"
                              ? d.segments.healthyAging
                              : k === "infectious"
                              ? d.segments.infectious
                              : d.segments.oncologyAdjacent,
                          value: marketValues[k],
                        }))}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={90}
                        startAngle={90}
                        endAngle={-270}
                        isAnimationActive
                      >
                        {(["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[]).map(
                          (k, i) => <Cell key={i} fill={segmentPalette[k]} />
                        )}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Legend */}
              <div className={`grid gap-2 ${isRTL ? "text-right" : "text-left"}`}>
                {(
                  [
                    { k: "autoimmune", label: d.segments.autoimmune, color: segmentPalette.autoimmune },
                    { k: "healthyAging", label: d.segments.healthyAging, color: segmentPalette.healthyAging },
                    { k: "infectious", label: d.segments.infectious, color: segmentPalette.infectious },
                    { k: "oncologyAdjacent", label: d.segments.oncologyAdjacent, color: segmentPalette.oncologyAdjacent },
                    { k: "transplant", label: d.segments.transplantationTherapy, color: segmentPalette.transplant },
                  ] as { k: SegKey; label: string; color: string }[]
                ).map((s) => (
                  <button
                    key={s.k}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm
                               text-slate-800 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-900/40
                               border border-transparent"
                    style={{ minHeight: 36 }}
                    aria-label={s.label}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                      style={{ background: s.color }}
                      title={s.label}
                    />
                    <span className="leading-tight">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Illustrative split. Final segmentation to be refined with market research.
            </p>
          </Card>
        </div>
      </section>

      {/* ===== Platform ===== */}
      <section id="platform" className="px-4">
        <div className="mx-auto w-full max-w-[1200px]">
          <Card className="p-6 md:p-8">
            <div className="mb-3">
              <SectionTitle as="h3" className="text-[20px] md:text-[24px] text-slate-900 dark:text-slate-100">
                {d.lbl.platform}
              </SectionTitle>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              RGN-T1™ Platform — GMP/GLP, dosing safety margin &gt;1000× below endogenous, average schedule 9
              doses/year (~1.8 mg).
            </p>
          </Card>
        </div>
      </section>

      {/* ===== Partnership ===== */}
      <section id="partnership" className="px-4">
        <div className="mx-auto w-full max-w-[1200px]">
          <Card className="p-6 md:p-8">
            <div className="mb-3">
              <SectionTitle as="h3" className="text-[20px] md:text-[24px] text-slate-900 dark:text-slate-100">
                {d.lbl.partnership}
              </SectionTitle>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Partnerships with mega-pharma and sovereign programs; licensing opportunities available.
            </p>

            <div className={`mt-5 flex ${isRTL ? "flex-row-reverse" : ""} gap-3`}>
              <a
                href={buildContactMailto(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                style={{ background: "#16A34A", borderColor: "#16A34A", height: "44px" }}
              >
                <Mail size={16} />
                {d.lbl.ctaContact}
              </a>
              <a
                href={buildLicenseeMailto(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-slate-900 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300
                           dark:text-slate-100 dark:bg-slate-900/40 dark:border-slate-700"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0", height: "44px" }}
              >
                <Users2 size={16} />
                {d.lbl.ctaLicensee}
              </a>
              <a
                href={getDossierPath(lang)}
                download
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-slate-900 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300
                           dark:text-slate-100 dark:bg-slate-900/40 dark:border-slate-700"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0", height: "44px" }}
              >
                <FileDown size={16} />
                {d.lbl.ctaDossier}
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== Contacts ===== */}
      <section id="contacts" className="px-4">
        <div className="mx-auto w-full max-w-[1200px]">
          <Card className="p-6 md:p-8">
            <div className="mb-3">
              <SectionTitle as="h3" className="text-[20px] md:text-[24px] text-slate-900 dark:text-slate-100">
                {d.lbl.contacts}
              </SectionTitle>
            </div>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <div>
                Email: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                Phone (UK): <a className="underline" href="tel:+447440448317">+44 7440 448317</a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="px-4 pb-10 pt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {d.lbl.footer}
      </footer>

      {/* Global styles (glass + keyframes) */}
      <style jsx global>{`
        .rt-glass {
          background: linear-gradient(to bottom, rgba(226,232,240,.35), rgba(226,232,240,.2));
          border: 1px solid rgba(15,23,42,0.16);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 8px 24px rgba(2,6,23,0.08),
            0 18px 40px rgba(2,6,23,0.10);
          backdrop-filter: saturate(140%) blur(8px);
        }
        :root .dark .rt-glass {
          background: linear-gradient(to bottom, rgba(2,6,23,.55), rgba(2,6,23,.4));
          border-color: rgba(148,163,184,.24);
          box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 20px 60px rgba(0,0,0,.5);
        }
        @keyframes rt-fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
