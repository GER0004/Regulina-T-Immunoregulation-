"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  Mail,
  FileDown,
  ArrowRight,
  CheckCircle2,
  Globe2,
  FlaskConical,
  Users2,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================================================
   Brand palette
========================================================= */
const brand = {
  blue: "#0B1E3B",
  emerald: "#0CA678",
  sky: "#0EA5E9",
  ink: "#0B1220",
  headerBg: "#F8FAFC",     // bg-slate-50
  pillBg: "#BBF7D0",       // emerald-100
  pillText: "#047857",     // emerald-700
  pillBorder: "#BBF7D0",
  cardBorder: "#D1FAE5",
  cardBg: "#ECFDF5",
  cardShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const HEADER_BADGE = "Regulina-T™ | RGN-T1™ IMMUNOREGULATOR";
const CONTACT_EMAIL = "official.regulina.t@gmail.com";

type Lang = "EN" | "RU" | "AR";
const DEFAULT_LANG: Lang = "EN";

/* =========================================================
   i18n
========================================================= */
const dict = {
  EN: {
    langLabel: "EN",
    dir: "ltr" as const,
    menu: ["Home", "Science", "Platform", "Partnership", "Contacts"],
    hero: {
      pretitle: "A UNIQUE BREAKTHROUGH UNITING SCIENCE AND FAITH",
      title1: "Regulina-T™",
      title2: "Thymus regeneration & immunoregulator",
      badge: HEADER_BADGE,
      paragraph:
        "a solution uniting faith, science, and modern biotech — opening a new era in immunology and medicine.",
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
      partnerLead:
        "We seek strategic partnerships with mega-pharma and sovereign programs:",
      partnerBullets: [
        "Licensing / co-development / JV",
        "Clinical programs (Ph I–III)",
        "Manufacturing localization (GMP)",
        "Global market access with public health impact",
      ],
      ctas: {
        contact: "Contact",
        licensee: "Licensee",
        dossier: "Download dossier",
      },
      contactsTitle: "Contacts",
      form: {
        name: "Your name",
        email: "Business email",
        org: "Organization",
        msg: "Message",
        send: "Send",
      },
      positioningCard:
        "Regulina-T™ is a God-given key: the unity of faith, science, and biotechnology.",
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
      badge: HEADER_BADGE,
      paragraph:
        "решение, соединяющее веру, науку и современные биотехнологии — открывая новую эпоху в иммунологии и медицине.",
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
      ctas: {
        contact: "Связаться",
        licensee: "Лицензиат",
        dossier: "Скачать досье",
      },
      contactsTitle: "Контакты",
      form: {
        name: "Ваше имя",
        email: "Рабочая почта",
        org: "Организация",
        msg: "Сообщение",
        send: "Отправить",
      },
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
      badge: HEADER_BADGE,
      paragraph:
        "حلٌ يجمع الإيمان والعِلم والتقنيات الحيوية الحديثة، لفتح عصرٍ جديد في المناعة والطب.",
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
      dosingBullets: [
        "الجرعة الميكروية المفردة أقل بأكثر من 1000× من المستوى الفيزيولوجي → أمانٌ مُطلق.",
        "نظام معتاد: 9 جرعات/سنة (~1.8 ملغ).",
      ],
      platformTitle: "منصّة Regulina-T™",
      platformBullets: [
        "تجديد موجّه للزُعْتُر وتحديث مخزون الخلايا T.",
        "عمليات وفق GMP/GLP، قابلة للتوسّع في المفاعلات الحيوية.",
        "قابلة للتحلّل الحيوي وبروفايل أمان مُواتٍ.",
        "توافق مع العلاجات المركّبة ومعايير الرعاية.",
      ],
      marketStats: { patients: ">2.5 مليار مريض", size: ">500 مليار$ سنويًا" },
      partnerTitle: "الشراكة",
      partnerLead:
        "نبحث عن شراكات استراتيجية مع شركات الأدوية العملاقة والبرامج السيادية:",
      partnerBullets: [
        "ترخيص / تطوير مشترك / مشاريع مشتركة",
        "برامج سريرية (المرحلة الأولى–الثالثة)",
        "توطين التصنيع (GMP)",
        "وصول للأسواق عالميًا مع أثرٍ للصحة العامة",
      ],
      ctas: { contact: "تواصل", licensee: "الترخيص", dossier: "تنزيل الملف" },
      contactsTitle: "التواصل",
      form: {
        name: "الاسم",
        email: "البريد المهني",
        org: "المؤسسة",
        msg: "الرسالة",
        send: "إرسال",
      },
      positioningCard:
        "ريغولينا-تي™ هو مفتاح منحه الله: وحدة الإيمان والعلم والتقنيات الحيوية.",
      footer: "© منصة تنظيم مناعة الغدة الزعترية — Regulina-T™",
    },
  },
};

/* =========================================================
   helpers
========================================================= */
function buildContactMailto(lang: Lang) {
  const subject = {
    EN: "Collaboration request with Regulina-T",
    RU: "Запрос на сотрудничество с Regulina-T",
    AR: "طلب تعاون مع ريغولينا-تي",
  }[lang];
  const body = {
    EN: "Dear Regulina-T team,%0D%0A%0D%0AMy name is (Full Name), and I am reaching out to explore potential collaboration with your company.%0D%0A%0D%0ACompany/Organization: ___%0D%0ACountry: ___%0D%0APhone: ___%0D%0AEmail: ___%0D%0A%0D%0APlease contact me to discuss the details.%0D%0A%0D%0ABest regards,%0D%0A_______",
    RU: "Уважаемая команда Regulina-T,%0D%0A%0D%0AМеня зовут (ФИО), я обращаюсь по вопросу сотрудничества с вашей компанией.%0D%0A%0D%0AКомпания/Организация: ___%0D%0AСтрана: ___%0D%0АТелефон: ___%0D%0AЭлектронная почта: ___%0D%0A%0D%0АПрошу связаться со мной для обсуждения деталей.%0D%0A%0D%0AС уважением,%0D%0A_______",
    AR: "فريق ريغولينا-تي المحترم،%0D%0A%0D%0Aاسمي (الاسم الكامل)، وأتواصل معكم لاستكشاف إمكانية التعاون مع شركتكم.%0D%0A%0D%0Aالشركة/المنظمة: ___%0D%0Aالدولة: ___%0D%0Aالهاتف: ___%0D%0Aالبريد الإلكتروني: ___%0D%0A%0D%0Aيرجى التواصل معي لمناقشة التفاصيل.%0D%0A%0D%0Aمع خالص التحية،%0D%0A_______",
  }[lang];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${body}`;
}

function buildLicenseeMailto(lang: Lang) {
  const subject = {
    EN: "License application for Regulina-T",
    RU: "Заявка на лицензию Regulina-T",
    AR: "طلب ترخيص لمنتج ريغولينا-تي",
  }[lang];
  const body = {
    EN: "Dear Regulina-T team,%0D%0A%0D%0AMy name is (Full Name), and I am contacting you regarding obtaining a license to use the product Regulina-T™.%0D%0A%0D%0ACompany: ___%0D%0ACountry: ___%0D%0APhone: ___%0D%0AEmail: ___%0D%0A%0D%0APlease contact me to discuss the licensing terms.%0D%0A%0D%0ABest regards,%0D%0A___",
    RU: "Уважаемая компания Regulina-T,%0D%0A%0D%0AЯ, (ФИО), обращаюсь по вопросу получения лицензии на использование продукта Regulina-T™.%0D%0A%0D%0AКомпания: ___%0D%0AСтрана: ___%0D%0АТелефон: ___%0D%0AЭлектронная почта: ___%0D%0A%0D%0AПрошу связаться со мной для обсуждения условий.%0D%0A%0D%0AС уважением,%0D%0A___",
    AR: "فريق ريغولينا-تي المحترم،%0D%0A%0D%0Aاسمي (الاسم الكامل)، وأتواصل معكم بخصوص الحصول على ترخيص لاستخدام منتج Regulina-T™.%0D%0A%0D%0Aالشركة: ___%0D%0Aالدولة: ___%0D%0Aالهاتف: ___%0D%0Aالبريد الإلكتروني: ___%0D%0A%0D%0Aيرجى التواصل معي لمناقشة شروط الترخيص.%0D%0A%0D%0Aمع خالص التحية،%0D%0A___",
  }[lang];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${body}`;
}

function getDossierPath(lang: Lang) {
  const map = {
    EN: "Regulina-T_License_(en).pdf",
    RU: "Regulina-T_License_(ru).pdf",
    AR: "Regulina-T_License_(ar).pdf",
  } as const;
  return `/files/${map[lang]}`;
}

const marketPie = [
  { key: "autoimmune", name: "Autoimmune", value: 40, color: "#1E88E5" },
  { key: "aging", name: "Healthy aging", value: 15, color: "#0CA678" },
  { key: "infectious", name: "Infectious", value: 20, color: "#F59E0B" },
  { key: "oncology", name: "Oncology-adjacent", value: 25, color: "#C62828" },
] as const;

function lighten(hex: string, amt = 28) {
  const h = hex.replace("#", "");
  const num = parseInt(h, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0xff) + amt;
  let b = (num & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================================================
   UI primitives (declared BEFORE Page)
========================================================= */
function BrandLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-9 w-9 rounded-md shadow-lg ring-1 ring-emerald-400/30"
      aria-label="Regulina-T Logo"
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#29A3E5" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g1)" />
      <path
        d="M40 18h20c2 0 3 1.3 3 3v6l6 12c8 15-3 33-21 33s-29-18-21-33l6-12v-6c0-1.7 1-3 3-3z"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M45 18h10" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

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

function Input({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
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
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{
        borderColor: brand.cardBorder,
        background: "#FFFFFF",
        backgroundImage:
          "linear-gradient(180deg, rgba(2,132,199,0.02), rgba(2,132,199,0))",
        boxShadow:
          "0 2px 6px rgba(2,6,23,0.04), 0 12px 24px rgba(2,6,23,0.06)",
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

/* =========================================================
   Page
========================================================= */
export default function Page() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const d = dict[lang];
  const isRTL = d.dir === "rtl";

  useEffect(() => {
    document.documentElement.dir = d.dir;
    document.documentElement.lang = d.langLabel.toLowerCase();
  }, [d]);

  const MenuLink = ({ label, target }: { label: string; target: string }) => (
    <button
      onClick={() => scrollToId(target)}
      className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 transition"
    >
      {label}
    </button>
  );

  const contactMailto = buildContactMailto(lang);
  const licenseeMailto = buildLicenseeMailto(lang);

  return (
    <div
      className="min-h-screen bg-white text-slate-900 selection:bg-emerald-200/60"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Header (compact badge, bg-slate-50) */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-3">
          {/* left: logo + badge (adaptive + RTL) */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:gap-3 ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <BrandLogo />
              <span className="text-sm font-semibold tracking-wide text-slate-900">
                Regulina-T™
              </span>
            </div>

            <span className="mt-2 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm sm:mt-0">
              {HEADER_BADGE}
            </span>
          </div>

          {/* nav (optional) */}
          <nav className="hidden items-center gap-1 md:flex">
            <MenuLink label={d.menu[0]} target="home" />
            <MenuLink label={d.menu[1]} target="science" />
            <MenuLink label={d.menu[2]} target="platform" />
            <MenuLink label={d.menu[3]} target="partnership" />
            <MenuLink label={d.menu[4]} target="contacts" />
          </nav>

          {/* lang switch */}
          <div className="flex items-center gap-2">
            {(["EN", "RU", "AR"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-md px-2 py-1 text-xs font-semibold tracking-wide ring-1 transition ${
                  lang === l
                    ? "bg-emerald-600 text-white ring-emerald-600"
                    : "text-slate-700 ring-slate-200 hover:bg-slate-100"
                }`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="uppercase"
                style={{
                  letterSpacing: "0.04em",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: 1.2,
                  color: "rgba(14,165,233,.85)",
                }}
              >
                {d.hero.pretitle}
              </div>
              <h1
                className="mt-3 font-extrabold"
                style={{ color: brand.ink, fontSize: "36px", lineHeight: 1.1 }}
              >
                <span
                  className="block md:text-[60px]"
                  style={{ fontSize: "36px", lineHeight: 1.1 }}
                >
                  {d.hero.title1}
                </span>
              </h1>
              <div
                className="mt-1 font-bold"
                style={{
                  color: brand.ink,
                  opacity: 0.9,
                  fontSize: "24px",
                  lineHeight: 1.2,
                }}
              >
                <span className="block md:text-[42px]">{d.hero.title2}</span>
              </div>
              <p
                className="mt-4 max-w-[720px]"
                style={{
                  fontSize: "18px",
                  lineHeight: 1.6,
                  color: "rgba(11,18,32,.72)",
                }}
              >
                Regulina-T™ — {d.hero.paragraph}
              </p>

              {/* CTA hero: Contact | Licensee */}
              <div
                className={`mt-5 flex ${
                  isRTL ? "flex-row-reverse" : ""
                } gap-4 sm:flex-row sm:items-center max-sm:flex-col max-sm:items-stretch`}
              >
                <a
                  href={contactMailto}
                  className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  style={{
                    background: "#16A34A",
                    borderColor: "#16A34A",
                    height: "46px",
                  }}
                >
                  <Mail size={16} /> {d.blocks.ctas.contact}
                  <ArrowRight size={16} />
                </a>
                <a
                  href={licenseeMailto}
                  className="inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 text-sm font-semibold text-slate-900 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                  style={{ background: "#FFFFFF", borderColor: "#E2E8F0", height: "46px" }}
                >
                  <Users2 size={16} /> {d.blocks.ctas.licensee}
                </a>
              </div>
            </motion.div>
          </div>

          {/* right column — YouTube video */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="relative aspect-video w-full overflow-hidden p-0">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/SDnNofWX1YY?rel=0&modestbranding=1&playsinline=1"
                title="Regulina-T — overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-500/30" />
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-slate-200">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 md:gap-6">
          <Card className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-[#111827]">
              {d.blocks.missionTitle}
            </h3>
            <ul className={`mt-3 space-y-2 ${isRTL ? "text-right" : ""}`}>
              {d.blocks.missionBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-600"
                    size={18}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Card className="p-6 md:p-8">
              <div className="text-emerald-700">
                {d.blocks.marketStats.patients}
              </div>
            </Card>
            <Card className="p-6 md:p-8">
              <div className="text-emerald-700">
                {d.blocks.marketStats.size}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Science */}
      <section id="science" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-[#111827]">
                {d.blocks.scienceTitle}
              </h2>
              {d.blocks.scienceMain.map((p, i) => (
                <p key={i} className="text-[#111827]">
                  {p}
                </p>
              ))}
              <ul
                className={`mt-4 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 ${
                  isRTL ? "text-right" : ""
                }`}
              >
                {d.blocks.scienceList.map((li, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <Shield
                      className="mt-0.5 shrink-0 text-emerald-600"
                      size={18}
                    />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200">
                <div className="text-sm font-semibold">
                  {d.blocks.dosingTitle}
                </div>
                <ul
                  className={`mt-2 list-disc space-y-1 pl-5 ${
                    isRTL ? "pl-0 pr-5" : ""
                  }`}
                >
                  {d.blocks.dosingBullets.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="mb-4 text-sm font-semibold text-slate-600">
                Infographic — addressable segments
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {marketPie.map((s) => (
                        <linearGradient
                          id={`grad-${s.key}`}
                          key={s.key}
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={lighten(s.color, 28)}
                          />
                          <stop offset="100%" stopColor={s.color} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={marketPie.map((s) => ({
                        ...s,
                        fill: `url(#grad-${s.key})`,
                      }))}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      innerRadius={40}
                      stroke="rgba(15,23,42,0.12)"
                      strokeWidth={1}
                      isAnimationActive
                    />
                    <Tooltip />
                    <Legend
                      content={() => (
                        <div className="mx-auto mt-2 flex max-w-sm flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
                          {marketPie.map((s) => (
                            <div key={s.key} className="flex items-center gap-2">
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ background: s.color }}
                              />
                              <span className="text-[#111827]">{s.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Illustrative split. Final segmentation per research.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 py-16">
          <Card className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-[#111827]">
                  {d.blocks.platformTitle}
                </h2>
                <ul className={`mt-4 space-y-2 ${isRTL ? "text-right" : ""}`}>
                  {d.blocks.platformBullets.map((x, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <FlaskConical
                        className="mt-0.5 shrink-0 text-emerald-600"
                        size={18}
                      />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <Feature
                  icon={<Shield />}
                  title="GMP/GLP"
                  desc="Quality by design, audit-ready."
                />
                <Feature
                  icon={<Users2 />}
                  title="T-cell focus"
                  desc="Repertoire renewal."
                />
                <Feature
                  icon={<FlaskConical />}
                  title="Bioreactors"
                  desc="Scalable upstream."
                />
                <Feature
                  icon={<Globe2 />}
                  title="Access"
                  desc="Global health impact."
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Partnership */}
      <section id="partnership" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 py-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <Card className="p-6 md:p-8 md:col-span-1">
              <h2 className="text-2xl font-semibold text-[#111827]">
                {d.blocks.partnerTitle}
              </h2>
              <p className="mt-3 text-slate-700">{d.blocks.partnerLead}</p>
            </Card>

            <div className="md:col-span-2 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
              {d.blocks.partnerBullets.map((x, i) => (
                <Card key={i} className="p-4" clickable>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {x.split(" ")[0]}
                      </div>
                      <div className="text-sm text-slate-600">{x}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div
              className={`mt-5 flex ${
                isRTL ? "flex-row-reverse" : ""
              } items-center gap-3 md:col-span-3`}
            >
              <a
                href={buildContactMailto(lang)}
                className="inline-flex items-center gap-2 rounded-[14px] px-4 py-2 text-sm font-semibold text-white"
                style={{ background: "#16A34A" }}
              >
                <Users2 size={16} /> {d.blocks.ctas.contact}
              </a>
              <a
                href={getDossierPath(lang)}
                download
                className="inline-flex items-center gap-2 rounded-[14px] border px-4 py-2 text-sm font-semibold text-slate-900"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                <FileDown size={16} /> {d.blocks.ctas.dossier}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-4 pb-28 pt-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-[#111827]">
                {d.blocks.contactsTitle}
              </h2>
              <p className="mt-3 text-slate-700">
                Email:{" "}
                <a
                  className="font-semibold text-emerald-700 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
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
                  <Input label={d.blocks.form.name} />
                  <Input label={d.blocks.form.email} type="email" />
                  <Input label={d.blocks.form.org} />
                  <label className="block text-sm">
                    <span className="mb-1 block text-slate-700">
                      {d.blocks.form.msg}
                    </span>
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
                    <Mail size={16} /> {d.blocks.form.send}
                  </button>
                </form>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <div className="rounded-xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200">
                {d.blocks.positioningCard}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-3 z-40 px-4">
        <div
          className="mx-auto max-w-3xl rounded-2xl border"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderColor: brand.pillBorder,
            boxShadow:
              "0 8px 24px rgba(2,6,23,0.08), 0 18px 40px rgba(2,6,23,0.10)",
          }}
        >
          <div
            className={`flex ${
              isRTL ? "flex-row-reverse" : ""
            } flex-wrap items-center justify-between gap-3 p-3`}
          >
            <div className="text-sm font-semibold text-slate-900">
              Regulina-T™ — RGN-T1™ Platform
            </div>
            <div
              className={`flex ${isRTL ? "flex-row-reverse" : ""} items-center gap-2`}
            >
              <a
                href={buildContactMailto(lang)}
                className="rounded-[14px] px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: "#16A34A" }}
              >
                {d.blocks.ctas.contact}
              </a>
              <a
                href={buildLicenseeMailto(lang)}
                className="rounded-[14px] border px-3 py-1.5 text-xs font-semibold text-slate-900"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                {d.blocks.ctas.licensee}
              </a>
              <a
                href={getDossierPath(lang)}
                download
                className="rounded-[14px] border px-3 py-1.5 text-xs font-semibold text-slate-900"
                style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                {d.blocks.ctas.dossier}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-6 text-xs text-slate-500">
          <div>{d.blocks.footer}</div>
          <div>EN / RU / AR</div>
        </div>
      </footer>
    </div>
  );
}
