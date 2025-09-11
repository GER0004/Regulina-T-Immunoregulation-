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

/* ===================== Inline SVG Logo (Flask) ===================== */
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

/* ===================== Section Title (pill) — компактный ===================== */
function SectionTitle({
  as = "h2",
  className = "",
  children,
}: {
  as?: "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as as any;
  return (
    <Tag
      className={[
        "inline-block rounded-full border",
        "px-[12px] md:px-[14px] py-[6px] md:py-[8px]",
        "text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-extrabold leading-tight text-[#0F172A]",
        className,
      ].join(" ")}
      style={{
        background: "rgba(15,23,42,0.12)",
        borderColor: "rgba(15,23,42,0.16)",
      }}
    >
      {children}
    </Tag>
  );
}

/* ===================== i18n ===================== */
const dict = {
  EN: {
    langLabel: "EN",
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
    blocks: {
      missionTitle: "Mission",
      missionBullets: [
        "Regulina-T™ aims to regenerate the thymus and fully restore immune function.",
        "> 2.5B patients addressable globally.",
        ">$500B yearly economic potential.",
        "Humanitarian effect: a healthier, more productive humanity.",
      ],
      scienceTitle: "Scientific basis",
      scienceMain: [
        "RGN-T1™ is a recombinant form of Regucalcin (SMP30).",
        "Its level declines with age → thymic atrophy, CD4/CD8 imbalance, cytokine dysregulation.",
        "Regulina-T™ restores:",
      ],
      scienceList: [
        "Thymus regeneration",
        "CD4/CD8 balance",
        "Cytokine network normalization (IL-7, TSLP)",
        "Immune homeostasis & healthy longevity",
      ],
      dosingTitle: "Dosing principles",
      dosingBullets: [
        "Single microgram dose is >1000× below physiological level → maximal safety.",
        "Typical regimen: 9 doses/year (~1.8 mg).",
      ],
      platformTitle: "Regulina-T™ Platform",
      platformBullets: [
        "Targeted thymic regeneration and T-cell repertoire renewal.",
        "GMP/GLP-ready processes, scalable bioreactors.",
        "Biodegradable, favorable safety profile.",
        "Compatibility with combo-therapies and standard of care.",
      ],
      marketStats: { patients: ">2.5B patients", size: ">$500B annual market" },
      partnerTitle: "Partnership",
      partnerLead: "We seek strategic partnerships with mega-pharma and sovereign programs:",
      partnerBullets: [
        "Licensing / co-development / JV",
        "Clinical programs (Ph I–III)",
        "Manufacturing localization (GMP)",
        "Global market access with public health impact",
      ],
      ctas: { contact: "Contact", licensee: "Licensee", dossier: "Download dossier" },
      contactsTitle: "Contacts",
      form: { name: "Your name", email: "Business email", org: "Organization", msg: "Message", send: "Send" },
      positioningCard: "Regulina-T™ is a God-given key: the unity of faith, science, and biotechnology.",
      footer: "© Regulina-T™ Thymus Immunoregulator Platform",
    },
  },
  RU: {
    langLabel: "RU",
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
    blocks: {
      missionTitle: "Миссия",
      missionBullets: [
        "Regulina-T™ направлена на регенерацию тимуса и полное восстановление иммунной системы.",
        "> 2,5 млрд пациентов во всём мире.",
        "> 500 млрд $ годовой экономический потенциал.",
        "Гуманитарный эффект: здоровое и продуктивное человечество.",
      ],
      scienceTitle: "Научная основа",
      scienceMain: [
        "RGN-T1™ — рекомбинантная форма Regucalcin (SMP30).",
        "Его уровень снижается с возрастом → атрофия тимуса, дисбаланс CD4/CD8, нарушение цитокиновой сети.",
        "Regulina-T™ восстанавливает:",
      ],
      scienceList: [
        "Регенерацию тимуса",
        "Баланс CD4/CD8",
        "Нормализацию цитокиновой сети (IL-7, TSLP)",
        "Иммунный гомеостаз и здоровое долголетие",
      ],
      dosingTitle: "Принципы дозирования",
      dosingBullets: [
        "Однократная доза в мкг >1000× ниже физиологического уровня → максимальная безопасность.",
        "Средняя схема: 9 доз в год (~1,8 мг).",
      ],
      platformTitle: "Платформа Regulina-T™",
      platformBullets: [
        "Таргетированная регенерация тимуса и обновление T-клеточного репертуара.",
        "Процессы GMP/GLP, масштабирование в биореакторах.",
        "Биодеградация, благоприятный профиль безопасности.",
        "Совместимость с комбинированной терапией и стандартами лечения.",
      ],
      marketStats: { patients: ">2,5 млрд пациентов", size: ">500 млрд $ в год" },
      partnerTitle: "Партнёрство",
      partnerLead:
        "Мы открыты к стратегическим партнёрствам с мегапарма и государственными программами:",
      partnerBullets: [
        "Лицензирование / ко-разработка / JV",
        "Клинические программы (Ph I–III)",
        "Локализация производства (GMP)",
        "Глобальный доступ на рынок с общественным эффектом",
      ],
      ctas: { contact: "Связаться", licensee: "Лицензиат", dossier: "Скачать досье" },
      contactsTitle: "Контакты",
      form: { name: "Ваше имя", email: "Рабочая почта", org: "Организация", msg: "Сообщение", send: "Отправить" },
      positioningCard:
        "Regulina-T™ — ключ, дарованный Богом: единство веры, науки и биотехнологий.",
      footer: "© Regulina-T™ Платформа иммунорегуляции тимуса",
    },
  },
  AR: {
    langLabel: "AR",
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
    blocks: {
      missionTitle: "الرسالة",
      missionBullets: [
        "تهدف Regulina-T™ إلى تجديد الزُعْتُر واستعادة وظيفة المناعة بالكامل.",
        "> 2.5 مليار مريض يمكن خدمتهم عالميًا.",
        "> 500 مليار دولار إمكانات اقتصادية سنوية.",
        "أثر إنساني: بشرية أكثر صحة وإنتاجية.",
      ],
      scienceTitle: "الأساس العلمي",
      scienceMain: [
        "RGN-T1™ هو شكل مُعاد التركيب من Regucalcin (SMP30).",
        "ينخفض مستواه مع التقدّم في العمر → ضمور الزُعْتُر، اختلال CD4/CD8، واضطراب شبكات السيتوكينات.",
        "تُعيد Regulina-T™ ما يلي:",
      ],
      scienceList: [
        "تجديد الغدة الزعترية",
        "توازن CD4/CD8",
        "تطبيع شبكة السيتوكينات (IL-7, TSLP)",
        "اتّزان مناعي وطول عمر صحي",
      ],
      dosingTitle: "مبادئ الجرعات",
      dosingBullets: ["جرعة ميكروية مفردة أقل بأكثر من 1000× → أمانٌ مُطلق.", "نظام معتاد: 9 جرعات/سنة (~1.8 ملغ)."],
      platformTitle: "منصّة Regulina-T™",
      platformBullets: [
        "تجديد موجّه للزُعْتُر وتحديث مخزون الخلايا T.",
        "عمليات وفق GMP/GLP، قابلة للتوسّع.",
        "قابلة للتحلّل الحيوي وبروفايل أمان مُواتٍ.",
        "توافق مع العلاجات المركّبة ومعايير الرعاية.",
      ],
      marketStats: { patients: ">2.5 مليار مريض", size: ">500 مليار$ سنويًا" },
      partnerTitle: "الشراكة",
      partnerLead: "نبحث عن شراكات استراتيجية مع شركات الأدوية العملاقة والبرامج السيادية:",
      partnerBullets: [
        "ترخيص / تطوير مشترك / مشاريع مشتركة",
        "برامج سريرية (المرحلة الأولى–الثالثة)",
        "توطين التصنيع (GMP)",
        "وصول للأسواق عالميًا مع أثرٍ للصحة العامة",
      ],
      ctas: { contact: "تواصل", licensee: "الترخيص", dossier: "تنزيل الملف" },
      contactsTitle: "التواصل",
      form: { name: "الاسم", email: "البريد المهني", org: "المؤسسة", msg: "الرسالة", send: "إرسال" },
      positioningCard: "ريغولينا-تي™ هو مفتاح منحه الله: وحدة الإيمان والعلم والتقنيات الحيوية.",
      footer: "© منصة تنظيم مناعة الغدة الزعترية — Regulina-T™",
    },
  },
};

/* ===================== Mail builders + files ===================== */
function buildContactMailto(lang: Lang) {
  const subject = {
    EN: "Collaboration request with Regulina-T",
    RU: "Запрос на сотрудничество с Regulina-T",
    AR: "طلب تعاون مع ريغولينا-تي",
  }[lang];
  const bodyText = {
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
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
}
function buildLicenseeMailto(lang: Lang) {
  const subject = {
    EN: "License application for Regulina-T",
    RU: "Заявка на лицензию Regulina-T",
    AR: "طلب ترخيص لمنتج ريغولينا-تي",
  }[lang];
  const bodyText = {
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
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
}
function getDossierPath(lang: Lang) {
  const map = { EN: "Regulina-T_License_(en).pdf", RU: "Regulina-T_License_(ru).pdf", AR: "Regulina-T_License_(ar).pdf" } as const;
  return `/files/${map[lang]}`;
}

/* ===================== Utilities ===================== */
function setCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===================== UI Primitives ===================== */
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
      className={`mb-6 rounded-2xl border ${clickable ? "transition-shadow" : ""} ${className}`}
      style={{ borderColor: brand.cardBorder, background: brand.cardBg, boxShadow: brand.cardShadow, color: "#111827" }}
    >
      {children}
    </div>
  );
}
function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-700">{label}</span>
      <input
        type={type}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-emerald-500/0 transition focus:ring-emerald-500/50"
      />
    </label>
  );
}
function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{
        borderColor: brand.cardBorder,
        background: "#FFFFFF",
        backgroundImage: "linear-gradient(180deg, rgba(2,132,199,0.02), rgba(2,132,199,0))",
        boxShadow: "0 2px 6px rgba(2,6,23,0.04), 0 12px 24px rgba(2,6,23,0.06)",
      }}
    >
      <div className="mb-1 flex items-center gap-2 text-slate-900">
        <span className="text-emerald-600">{icon}</span>
        <span className="font-semibold">{title}</span>
      </div>
      <div className="text-sm text-slate-600">{desc}</div>
    </div>
  );
}

/* ===================== Market Pie (Infographic) ===================== */
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
function lighten(hex: string, amt = 28) {
  const h = hex.replace("#", "");
  const num = parseInt(h, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0xff) + amt;
  let b = (num & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`;
}
function SegmentTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const name = payload[0]?.name as string | undefined;
  if (!name) return null;
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-800 shadow">
      {name}
    </div>
  );
}

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
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const options: Lang[] = useMemo(() => (["EN", "RU", "AR"] as Lang[]).filter((l) => l !== lang), [lang]);
  const listId = "lang-listbox";

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

    const path = window.location.pathname;
    const m = path.match(/^\/(en|ru|ar)(\/.*)?$/i);
    if (m) {
      const rest = m[2] || "/";
      const target = `/${l.toLowerCase()}${rest}`;
      window.history.replaceState(null, "", target);
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
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        {lang}
      </button>

      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          className={`absolute ${isRTL ? "left-0" : "right-0"} mt-2 min-w-[160px]
                      rounded-xl border border-slate-200 bg-white p-1 shadow-2xl ring-1 ring-black/5`}
          style={{ transformOrigin: isRTL ? "top left" : "top right" }}
        >
          {(["EN","RU","AR"] as Lang[])
            .filter((x)=>x!==lang)
            .map((opt) => (
            <button
              key={opt}
              role="option"
              aria-selected={false}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-xs
                         text-slate-800 hover:bg-slate-50 focus:outline-none
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
              onClick={() => applyLocale(opt)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") applyLocale(opt);
              }}
            >
              <span className="font-semibold">{opt}</span>
              <Check size={14} className="opacity-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===================== Typewriter (для абзаца) ===================== */
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
  const [out, setOut] = React.useState("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) { setOut(text); setDone(true); return; }

    let i = 0;
    const startT = window.setTimeout(() => {
      const step = Math.max(1, Math.round(cps / 4));
      let timer: number;
      const tick = () => {
        i = Math.min(text.length, i + step);
        setOut(text.slice(0, i));
        if (i < text.length) {
          timer = window.setTimeout(tick, Math.max(8, 1000 / cps));
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);

    return () => { clearTimeout(startT); };
  }, [text, cps, startDelay]);

  return (
    <span className={className} aria-live="polite">
      {out}
      {!done && <span className="rt-caret" aria-hidden="true" />}
    </span>
  );
}

/* ===================== Page ===================== */
export default function Page() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [ultraNarrow, setUltraNarrow] = useState<boolean>(false);

  useEffect(() => {
    const fromCookie = getCookie("NEXT_LOCALE") as Lang | null;
    const fromLS = (typeof window !== "undefined" && localStorage.getItem("NEXT_LOCALE")) as Lang | null;
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
    document.documentElement.lang = d.langLabel.toLowerCase();
  }, [d.dir, d.langLabel]);

  const MenuLink = ({ label, target }: { label: string; target: string }) => (
    <button
      onClick={() => scrollToId(target)}
      className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 transition"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-200/60" style={{ fontFamily: "var(--font-sans)" }}>
      {/* ===================== Header ===================== */}
      <header className="sticky top-0 z-40 w-full bg-[#F9FAFB] border-b border-slate-200">
        <div className="mx-auto max-w-[1200px] w-full px-6 py-2 flex items-center justify-between gap-4">
          <div className={`flex items-start gap-3 min-w-0 ${isRTL ? "flex-row-reverse" : ""}`}>
            <FlaskIcon size={28} className="text-[#0EA5E9] dark:text-[#14B8A6] mt-[1px] h-[24px] w-[24px] md:h-[28px] md:w-[28px]" />
            <div className={`flex flex-col leading-none ${isRTL ? "items-end" : "items-start"}`}>
              <span className="text-[20px] md:text-[24px] font-extrabold text-[#0B1220]">Regulina-T™</span>
              <span
                className="mt-1 inline-flex items-center rounded-full border px-[6px] py-[1px]
                           text-[10px] md:text-[11px] leading-[12px]
                           font-semibold text-[#047857] whitespace-nowrap"
                style={{ background: "#E6FDF5", borderColor: brand.pillBorder, height: "16px" }}
                aria-hidden="true"
              >
                RGN-T1™ IMMUNOREGULATOR
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <MenuLink label={d.menu[0]} target="home" />
            <MenuLink label={d.menu[1]} target="science" />
            <MenuLink label={d.menu[2]} target="platform" />
            <MenuLink label={d.menu[3]} target="partnership" />
            <MenuLink label={d.menu[4]} target="contacts" />
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <LanguageSwitcher lang={lang} onChange={setLang} isRTL={isRTL} />
          </div>
        </div>
      </header>

      {/* ===================== Hero ===================== */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* left */}
          <div>
            {/* Slogan with fade + slide-up; переносы разрешены; ширина ограничена */}
            <div className="rt-fadeUp max-w-[88%] md:max-w-[680px] lg:max-w-[720px]">
              <div
                key={lang}
                className="uppercase"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: "rgba(14,165,233,.85)",
                  minHeight: "2.5em",
                  fontSize: "clamp(16px,4.2vw,20px)", // mobile
                }}
              >
                <span className="block md:text-[clamp(20px,2.6vw,22px)] lg:text=[clamp(22px,2vw,24px)]">
                  {d.hero.pretitle}
                </span>
              </div>
            </div>

            <h1 className="mt-3 font-extrabold" style={{ color: brand.ink, fontSize: "36px", lineHeight: 1.1 }}>
              <span className="block md:text-[60px]" style={{ fontSize: "36px", lineHeight: 1.1 }}>
                {d.hero.title1}
              </span>
            </h1>
            <div className="mt-1 font-bold" style={{ color: brand.ink, opacity: 0.9, fontSize: "24px", lineHeight: 1.2 }}>
              <span className="block md:text-[42px]">{d.hero.title2}</span>
            </div>

            {/* Paragraph with typewriter; ширина синхронизирована со слоганом */}
            <p
              className="mt-4 max-w-[88%] md:max-w-[680px] lg:max-w-[720px]"
              style={{ fontSize: "18px", lineHeight: 1.6, color: "rgba(11,18,32,.72)", minHeight: "3.2em" }}
            >
              <Typewriter text={`Regulina-T™ — ${d.hero.paragraph}`} cps={24} startDelay={1000} />
            </p>

            {/* CTA */}
            <div className={`mt-5 flex ${isRTL ? "flex-row-reverse" : ""} gap-4 sm:flex-row sm:items-center max-sm:flex-col max-sm:items-stretch`}>
              <a
                href={buildContactMailto(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                style={{ background: "#16A34A", borderColor: "#16A34A", height: "46px" }}
              >
                <Mail size={16} /> {dict[lang].blocks.ctas.contact} <ArrowRight size={16} />
              </a>
              <a
                href={buildLicenseeMailto(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-slate-900 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0", height: "46px" }}
              >
                <Users2 size={16} /> {dict[lang].blocks.ctas.licensee}
              </a>
            </div>
          </div>

          {/* right — YouTube */}
          <div>
            <Card className="relative aspect-video w-full overflow-hidden p-0">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/SDnNofWX1YY?modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&controls=1"
                title="Regulina-T — overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ border: 0 }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-500/30" />
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== Mission ===================== */}
      <section className="border-y border-slate-200">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-4 pt-8 md:pt-10 pb-4 md:pb-5 md:grid-cols-2 md:gap-6">
          <Card className="p-6 md:p-8">
            <SectionTitle as="h3" className="mb-4">{dict[lang].blocks.missionTitle}</SectionTitle>
            <ul className={`${isRTL ? "text-right" : ""} mt-3 space-y-2`}>
              {dict[lang].blocks.missionBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Card className="p-6 md:p-8">
              <div className="text-emerald-700">{dict[lang].blocks.marketStats.patients}</div>
            </Card>
            <Card className="p-6 md:p-8">
              <div className="text-emerald-700">{dict[lang].blocks.marketStats.size}</div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== Science + Infographic ===================== */}
      <section id="science" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 pt-8 md:pt-10 pb-4 md:pb-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="p-6 md:p-8">
              <SectionTitle as="h2" className="mb-4">{dict[lang].blocks.scienceTitle}</SectionTitle>
              {dict[lang].blocks.scienceMain.map((p, i) => (
                <p key={i} className="text-[#111827]">
                  {p}
                </p>
              ))}
              <ul className={`mt-4 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 ${isRTL ? "text-right" : ""}`}>
                {dict[lang].blocks.scienceList.map((li, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <Shield className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200">
                <div className="text-sm font-semibold">{dict[lang].blocks.dosingTitle}</div>
                <ul className={`mt-2 list-disc space-y-1 pl-5 ${isRTL ? "pl-0 pr-5" : ""}`}>
                  {dict[lang].blocks.dosingBullets.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Инфографика */}
            <Card className="p-6 md:p-8 overflow-visible">
              <h3
                className="mb-4 mt-7 pr-4 md:pr-5 font-normal text-[#0F172A]
                           whitespace-nowrap [word-break:keep-all] [hyphens:none]
                           text-[clamp(18px,5vw,22px)] md:text-[clamp(24px,2.6vw,32px)]"
              >
                {ultraNarrow ? dict[lang].infographic.shortTitle : dict[lang].infographic.title}
              </h3>

              <div className="overflow-hidden rounded-xl">
                <figure role="group" aria-label="Market segments donut chart" className={`${isRTL ? "text-right" : ""}`}>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          {( ["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[] ).map((k) => (
                            <linearGradient id={`grad-${k}`} key={k} x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor={lighten(segmentPalette[k], 28)} />
                              <stop offset="100%" stopColor={segmentPalette[k]} />
                            </linearGradient>
                          ))}
                        </defs>

                        <Pie
                          data={(["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[]).map((k) => ({
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
                          }))}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={90}
                          innerRadius={40}
                          stroke="rgba(15,23,42,0.12)"
                          strokeWidth={1}
                          isAnimationActive
                        >
                          {( ["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[] ).map((k) => {
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
                              <Cell key={`cell-${k}`} fill={`url(#grad-${k})`}>
                                <title>{label}</title>
                              </Cell>
                            );
                          })}
                        </Pie>

                        <Tooltip content={<SegmentTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div
                    className={`mx-auto mt-3 grid max-w-[520px] grid-cols-1 gap-x-4 gap-y-2 text-xs sm:grid-cols-2 ${
                      isRTL ? "text-right" : ""
                    }`}
                    aria-label="Legend"
                  >
                    {( ["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[] ).map((k) => {
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
                        <button
                          key={k}
                          type="button"
                          className="group flex min-h-8 items-center gap-3 rounded-md px-2 py-1 hover:bg-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          aria-label={label}
                        >
                          <span
                            className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: segmentPalette[k] }}
                            aria-hidden="true"
                          />
                          <span className="text-[#111827]">{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <figcaption className="sr-only">
                    {(["autoimmune","healthyAging","infectious","oncologyAdjacent","transplant"] as SegKey[])
                      .map((k) => {
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
                        return label;
                      })
                      .join("; ")}
                  </figcaption>
                </figure>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Illustrative split. Final segmentation to be refined with market research.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== Platform ===================== */}
      <section id="platform" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 pt-8 md:pt-10 pb-4 md:pb-5">
          <Card className="p-6 md:p-8">
            <SectionTitle as="h2" className="mb-4">{dict[lang].blocks.platformTitle}</SectionTitle>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <ul className={`mt-4 space-y-2 ${isRTL ? "text-right" : ""}`}>
                  {dict[lang].blocks.platformBullets.map((x, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <FlaskConical className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <Feature icon={<Shield />} title="GMP/GLP" desc="Quality by design, audit-ready." />
                <Feature icon={<Users2 />} title="T-cell focus" desc="Repertoire renewal." />
                <Feature icon={<FlaskConical />} title="Bioreactors" desc="Scalable upstream." />
                <Feature icon={<Shield />} title="Access" desc="Global health impact." />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ===================== Partnership ===================== */}
      <section id="partnership" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 pt-8 md:pt-10 pb-4 md:pb-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <Card className="p-6 md:p-8 md:col-span-1">
              <SectionTitle as="h2" className="mb-4">{dict[lang].blocks.partnerTitle}</SectionTitle>
              <p className="mt-3 text-slate-700">{dict[lang].blocks.partnerLead}</p>
            </Card>

            <div className="md:col-span-2 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
              {dict[lang].blocks.partnerBullets.map((x, i) => (
                <Card key={i} className="p-4" clickable>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{x.split(" ")[0]}</div>
                      <div className="text-sm text-slate-600">{x}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className={`mt-5 flex ${isRTL ? "flex-row-reverse" : ""} items-center gap-3 md:col-span-3`}>
              <a
                href={buildContactMailto(lang)}
                className="inline-flex items-center gap-2 rounded-[14px] px-4 py-2 text-sm font-semibold text-white"
                style={{ background: "#16A34A" }}
              >
                <Users2 size={16} /> {dict[lang].blocks.ctas.contact}
              </a>
              <a
                href={getDossierPath(lang)}
                download
                className="inline-flex items-center gap-2 rounded-[14px] border px-4 py-2 text-sm font-semibold text-slate-900"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                <FileDown size={16} /> {dict[lang].blocks.ctas.dossier}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Contacts ===================== */}
      <section id="contacts" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 pt-8 md:pt-10 pb-28 md:pb-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <Card className="p-6 md:p-8">
              <SectionTitle as="h2" className="mb-4">{dict[lang].blocks.contactsTitle}</SectionTitle>
              <p className="mt-3 text-slate-700">
                Email:{" "}
                <a className="font-semibold text-emerald-700 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-[#111827]">
                Phone:{" "}
                <a className="hover:underline" href="tel:+447440448317">
                  +44 7440 448317
                </a>
              </p>

              <div className="mt-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = buildContactMailto(lang);
                  }}
                  className="space-y-3"
                >
                  <Input label={dict[lang].blocks.form.name} />
                  <Input label={dict[lang].blocks.form.email} type="email" />
                  <Input label={dict[lang].blocks.form.org} />
                  <label className="block text-sm">
                    <span className="mb-1 block text-slate-700">{dict[lang].blocks.form.msg}</span>
                    <textarea
                      rows={5}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-emerald-500/0 transition focus:ring-emerald-500/50"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-[14px] px-4 py-2 text-sm font-semibold text-white"
                    style={{ background: "#16A34A" }}
                  >
                    <Mail size={16} /> {dict[lang].blocks.form.send}
                  </button>
                </form>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <div className="rounded-xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200">
                {dict[lang].blocks.positioningCard}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== Sticky CTA ===================== */}
      <div className="fixed inset-x-0 bottom-3 z-40 px-4">
        <div
          className="mx-auto max-w-3xl rounded-2xl border"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderColor: brand.pillBorder,
            boxShadow: "0 8px 24px rgba(2,6,23,0.08), 0 18px 40px rgba(2,6,23,0.10)",
          }}
        >
          <div className={`flex ${isRTL ? "flex-row-reverse" : ""} flex-wrap items-center justify-between gap-3 p-3`}>
            <div className="text-sm font-semibold text-slate-900">Regulina-T™ — RGN-T1™ Platform</div>
            <div className={`flex ${isRTL ? "flex-row-reverse" : ""} items-center gap-2`}>
              <a
                href={buildContactMailto(lang)}
                className="rounded-[14px] px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: "#16A34A" }}
              >
                {dict[lang].blocks.ctas.contact}
              </a>
              <a
                href={buildLicenseeMailto(lang)}
                className="rounded-[14px] border px-3 py-1.5 text-xs font-semibold text-slate-900"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                {dict[lang].blocks.ctas.licensee}
              </a>
              <a
                href={getDossierPath(lang)}
                download
                className="rounded-[14px] border px-3 py-1.5 text-xs font-semibold text-slate-900"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                {dict[lang].blocks.ctas.dossier}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Footer ===================== */}
      <footer className="border-t border-slate-200" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-6 text-xs text-slate-500">
          <div>{dict[lang].blocks.footer}</div>
          <div>EN / RU / AR</div>
        </div>
      </footer>
    </div>
  );
}
