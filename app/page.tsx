"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CheckCircle2, Shield, Users2, Mail, FileDown, ArrowRight } from "lucide-react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";

/* ===================== Brand / Theme ===================== */
const BRAND_NAME = "Regulina‑T™"; // U+2011 non-breaking hyphen
const brand = {
ink: "#0B1220",
headerBg: "#F9FAFB",
};
const CONTACT_EMAIL = "official.regulina.t@gmail.com";

type Lang = "EN" | "RU" | "AR";
const DEFAULT_LANG: Lang = "EN";

/* ===================== i18n ===================== */
const dict = {
EN: {
dir: "ltr" as const,
menu: ["Home", "Science", "Platform", "Partnership", "Contacts"],
hero: {
pretitle: "A UNIQUE BREAKTHROUGH UNITING SCIENCE AND FAITH",
title2: "Thymus regeneration & immunoregulator",
paragraph:
"a solution uniting faith, science, and modern biotech — opening a new era in immunology and medicine.",
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
`${BRAND_NAME} aims to regenerate the thymus and fully restore immune function.`,
],
kpiPatients: "2.5B patients",
kpiMarket: "$500B+ annual potential",
scienceTitle: "Scientific basis",
scienceLead: [
"RGN‑T1™ is a recombinant form of Regucalcin (SMP30).",
"Its level declines with age → thymic atrophy, CD4/CD8 imbalance, cytokine dysregulation.",
"Restores:",
],
scienceList: [
"Thymus regeneration",
"CD4/CD8 balance",
"Cytokine network normalization (IL‑7, TSLP)",
"Immune homeostasis & healthy longevity",
],
platformTitle: "Regulina‑T™ Platform",
partnerTitle: "Partnership",
contactsTitle: "Contacts",
ctas: { contact: "Contact", licensee: "Licensee", dossier: "Download dossier" },
footer: `© ${BRAND_NAME} Thymus Immunoregulator Platform`,
},
},
RU: {
dir: "ltr" as const,
menu: ["Главная", "Наука", "Платформа", "Партнёрство", "Контакты"],
hero: {
pretitle: "УНИКАЛЬНЫЙ ПРОРЫВ, ОБЪЕДИНЯЮЩИЙ НАУКУ И ВЕРУ",
title2: "Регенерация тимуса & иммунорегулятор",
paragraph:
"решение, соединяющее веру, науку и современные биотехнологии — открывая новую эпоху в иммунологии и медицине.",
},
segments: {
autoimmune: "Аутоиммунные",
healthyAging: "Здоровое старение",
infectious: "Инфекционные",
oncologyAdjacent: "Смежные с онкологией",
transplantationTherapy: "Трансплантационная терапия",
},
blocks: {
}
