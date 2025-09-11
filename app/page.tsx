'use client';

import React, { useEffect, useState } from 'react';

/* ===== helpers: lang, i18n, badges, brand ===== */
function useHtmlLang(): 'en' | 'ru' | 'ar' {
  const read = () => {
    if (typeof document === 'undefined') return 'en';
    const l = (document.documentElement.lang || 'en').toLowerCase();
    return (['en','ru','ar'] as const).includes(l as any) ? (l as any) : 'en';
  };
  const [lang, setLang] = useState<'en'|'ru'|'ar'>(read);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;
    const mo = new MutationObserver(() => setLang(read()));
    mo.observe(el, { attributes: true, attributeFilter: ['lang'] });
    return () => mo.disconnect();
  }, []);
  return lang;
}

function LocaleText({ dict }: { dict: Record<'en'|'ru'|'ar', string> }) {
  const l = useHtmlLang();
  return <>{dict[l] ?? dict.en}</>;
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`glass-chip square-chip ${className}`}>{children}</span>;
}

/** Бренд с неразрывным дефисом U+2011 (одна строка всегда) */
function BrandRT() {
  return (
    <span className="whitespace-nowrap" style={{ hyphens: 'none', wordBreak: 'keep-all' }}>
      Regulina-T™
    </span>
  );
}

/* ================== PAGE ================== */
export default function Page() {
  const lang = useHtmlLang();

  return (
    <main className="mx-auto max-w-3xl md:max-w-5xl px-4 py-10 md:py-14 space-y-16 md:space-y-24">

      {/* HERO */}
      <section id="hero" className="scroll-mt-24">
        <div className="mb-5">
          <Badge className="text-emerald-800/90 dark:text-emerald-200/90">
            <LocaleText dict={{
              en: 'Regulina-T™ Platform',
              ru: 'Платформа Regulina-T™',
              ar: 'منصّة Regulina-T™'
            }} />
          </Badge>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          <LocaleText dict={{
            en: 'A UNIQUE BREAKTHROUGH BRIDGING SCIENCE AND FAITH',
            ru: 'УНИКАЛЬНЫЙ ПРОРЫВ, ОБЪЕДИНЯЮЩИЙ НАУКУ И ВЕРУ',
            ar: 'اختراق فريد يجمع بين العلم والإيمان'
          }}/>
        </h1>

        <p className="mt-4 text-slate-700 dark:text-slate-200 text-base md:text-lg">
          <BrandRT />{' '}
          <LocaleText dict={{
            en: '— a solution uniting faith, science, and modern biotechnology — opening a new era in immunology and medicine.',
            ru: '— решение, соединяющее веру, науку и современные биотехнологии — открывая новую эпоху в иммунологии и медицине.',
            ar: '— حلٌ يوحِّد الإيمان والعلم والتقنيات الحيوية الحديثة — ويفتح عصرًا جديدًا في علم المناعة والطب.'
          }}/>
        </p>
      </section>

      {/* MISSION + KPI */}
      <section id="mission" className="scroll-mt-24" dir={lang === 'ar' ? 'rtl' : undefined}>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          <Badge className="text-emerald-800/90 dark:text-emerald-200/90">
            <LocaleText dict={{ en: 'Mission', ru: 'Миссия', ar: 'المهمة' }} />
          </Badge>
        </h2>

        <div className="rounded-2xl ring-1 ring-emerald-200/50 bg-emerald-50/60 dark:bg-emerald-900/20 p-5 md:p-6">
          <p className="text-emerald-950/90 dark:text-emerald-100/90 font-semibold mb-3">
            <BrandRT />{' '}
            <LocaleText dict={{
              en: 'aims to regenerate the thymus and fully restore immune function.',
              ru: 'направлена на регенерацию тимуса и полное восстановление иммунной системы.',
              ar: 'تهدف إلى تجديد الغدة الصعترية واستعادة وظيفة المناعة بالكامل.'
            }}/>
          </p>

          <ul className="space-y-2 text-slate-700 dark:text-slate-200">
            <li className="flex gap-2">
              <span>✅</span>
              <span>
                <LocaleText dict={{
                  en: '> 2.5B patients addressable globally.',
                  ru: '> 2,5 млрд пациентов потенциально адресуемых.',
                  ar: '> ٢٫٥ مليار مريض يمكن الوصول إليهم عالميًا.'
                }}/>
              </span>
            </li>
            <li className="flex gap-2">
              <span>✅</span>
              <span>
                <LocaleText dict={{
                  en: '> $500B yearly economic potential.',
                  ru: '> $500B+ годовой экономический потенциал.',
                  ar: '> ‎$500B+‎ إمكان اقتصادي سنوي.'
                }}/>
              </span>
            </li>
            <li className="flex gap-2">
              <span>✅</span>
              <span>
                <LocaleText dict={{
                  en: 'Humanitarian effect: a healthier, more productive humanity.',
                  ru: 'Гуманитарный эффект: более здоровое и продуктивное человечество.',
                  ar: 'أثر إنساني: بشر أصحّ وأكثر إنتاجية.'
                }}/>
              </span>
            </li>
          </ul>
        </div>

        {/* KPI chips */}
        <div className="mt-4 flex flex-wrap gap-3">
          <Badge className="text-emerald-800/90 dark:text-emerald-200/90">KPI</Badge>
          <Badge className="text-emerald-800/90 dark:text-emerald-200/90">
            <LocaleText dict={{ en: '2.5B patients', ru: '2,5 млрд пациентов', ar: '٢٫٥ مليار مريض' }} />
          </Badge>
          <Badge className="text-emerald-800/90 dark:text-emerald-200/90">$500B+</Badge>
        </div>
      </section>

      {/* INFOGRAPHIC */}
      <section id="infographic" className="scroll-mt-24" dir={lang === 'ar' ? 'rtl' : undefined}>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          <Badge className="text-emerald-800/90 dark:text-emerald-200/90">
            <LocaleText dict={{
              en: 'Infographic — addressable segments',
              ru: 'Инфографика — адресуемые сегменты',
              ar: 'الإنفوغراف — الشرائح القابلة للاستهداف'
            }}/>
          </Badge>
        </h2>

        <div className="infographic-card rounded-2xl ring-1 ring-emerald-200/50 bg-emerald-50/60 dark:bg-emerald-900/20">
          <div className="infographic-inner">
            {/* замените блок ниже своей диаграммой (canvas/SVG); контейнер не даст вылезти за поля */}
            <div className="w-full flex items-center justify-center mb-4">
              <div className="h-48 w-48 rounded-full ring-1 ring-black/5 bg-white/70 dark:bg-white/5 relative">
                <div className="absolute inset-6 rounded-full bg-emerald-50/60 dark:bg-emerald-900/30" />
              </div>
            </div>

            {/* легенда: длинные RU/AR подписи красиво переносятся, анимация «въезда» */}
            <div className="space-y-2">
              {[
                { dot:'bg-blue-500',   text:{ en:'Autoimmune',              ru:'Аутоиммунные',                     ar:'أمراض مناعية ذاتية' }},
                { dot:'bg-emerald-500',text:{ en:'Healthy aging',           ru:'Здоровое старение',                ar:'شيخوخة صحية' }},
                { dot:'bg-amber-500',  text:{ en:'Infectious',              ru:'Инфекционные',                     ar:'أмерاض معدية'.replace('أم','أم') }}, // нормализация RTL
                { dot:'bg-rose-500',   text:{ en:'Oncology-adjacent',       ru:'Смежные с онкологией',             ar:'مرتبطة بالأورام' }},
                { dot:'bg-violet-500', text:{ en:'Transplantation therapy', ru:'Трансплантационная терапия',      ar:'علاج الزرع' }},
              ].map((item, i) => (
                <div
                  key={i}
                  className="legend-item flex items-center gap-3 translate-y-4 opacity-0 will-change-transform"
                  style={{ animation:`legend-in .45s ease-out ${i*80}ms forwards` }}
                >
                  <span className={`h-3 w-3 rounded-full ${item.dot}`} />
                  <span className="text-slate-800 dark:text-slate-200 text-[15px]/[1.2]">
                    <LocaleText dict={item.text as any} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПРИМЕР других секций: просто оборачивайте заголовки в <Badge /> */}
      <section className="scroll-mt-24" dir={lang === 'ar' ? 'rtl' : undefined}>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          <Badge className="text-emerald-800/90 dark:text-emerald-200/90">
            <LocaleText dict={{ en:'Scientific basis', ru:'Научная основа', ar:'الأساس العلمي' }} />
          </Badge>
        </h2>
        <p className="text-slate-700 dark:text-slate-200">
          <LocaleText dict={{
            en: 'RGN-T1™ is a recombinant form of Regucalcin (SMP30). Its level declines with age, leading to thymic atrophy and CD4/CD8 imbalance.',
            ru: 'RGN-T1™ — рекомбинантная форма Regucalcin (SMP30). Его уровень снижается с возрастом, что приводит к атрофии тимуса и дисбалансу CD4/CD8.',
            ar: '‏RGN-T1™ شكلٌ مُعاد التركيب من Regucalcin ‏(SMP30). ينخفض مستواه مع العمر مما يسبب ضمور الغدة الصعترية واختلال CD4/CD8.'
          }}/>
        </p>
      </section>

      {/* глобальные стили для бейджей и анимации (чтобы не лезть в globals.css) */}
      <style jsx global>{`
        .glass-chip {
          background: rgba(255,255,255,.58);
          border: 1px solid rgba(255,255,255,.45);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.55), 0 8px 24px rgba(0,0,0,.10);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .dark .glass-chip {
          background: rgba(18,20,23,.42);
          border-color: rgba(255,255,255,.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 10px 28px rgba(0,0,0,.28);
        }
        .square-chip {
          border-radius: 14px;
          padding: 10px 14px;
          line-height: 1.1;
          font-weight: 600;
          white-space: nowrap;
        }
        .infographic-card { overflow: hidden; }
        .legend-item { word-break: break-word; hyphens: auto; }
        .infographic-inner { padding: clamp(16px, 3vw, 24px); }
        @keyframes legend-in { to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </main>
  );
}

