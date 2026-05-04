# Portfolio

## Ako spustiť projekt

**Požiadavky:** Node.js 18+

```bash
# Inštalácia závislostí
npm install

# Dev server (http://localhost:5173)
npm run dev

# Build do /dist
npm run build

# Preview buildu
npm run preview
```

---

## Postup riešenia

## Stack

- **Vite** — dev server a build
- **Tailwind CSS v4** — štýlovanie cez utility triedy, konfigurácia cez `@theme` v CSS
- **Alpine.js** — reaktivita (filtrovanie, vyhľadávanie, prechody)

---

## Čo som robil a ako som to riešil

### 1. Ikona v krúžku

Požiadavka bola jednoduchá: `absolute inset-0 flex items-center justify-center`, veľkosť 80×80px, farba `#ddbcb5`, `border-radius` na maximum.

Prvý krok bol ujasniť si konflikt — `inset-0` natiahne element na celého parenta, čo je v rozpore s fixnou veľkosťou `w-20 h-20`. Riešenie: dva elementy. Vonkajší `div` s `absolute inset-0 flex items-center justify-center` slúži len ako centrovací wrapper, vnútorný `div` je samotný krúžok `w-20 h-20 bg-[#ddbcb5] rounded-full`. Hover scale efekt som presunul z `<img>` na krúžok, aby sa animoval celok.

### 2. Audit kvality projektu

Prešiel som štyri kritériá: Tailwind, sémantické HTML, Alpine.js, animácie.

**Tailwind** bol pokrytý dobre — takmer nič nebolo riešené custom CSS okrem `card-animate` keyframe, čo je opodstatnené.

**Sémantické HTML** malo medzery. Filter buttony nemali žiadnu skupinovú rolu, search input nemal `aria-label`, dekoratívne SVG nemalo `aria-hidden`. Toto som doplnil: `role="group"` + `aria-label` na wrapper buttonov, `:aria-pressed` na každý button (screen readery takto vedia, ktorý filter je aktívny), `type="search"` a `aria-label` na input, `aria-hidden="true"` na SVG ikonku.

**Alpine.js** bol funkčný, ale chýbal `x-cloak`. Bez neho je obsah sekcie viditeľný na zlomok sekundy pred tým, než Alpine inicializuje — používateľ uvidí surový HTML s `x-text` šablónami. Oprava je dvojkroková: pridať `x-cloak` atribút na element a `[x-cloak] { display: none !important }` do CSS.

**Animácie** mali `card-animate` (fade in + translateY pri načítaní kariet) a hover efekty. Chýbala entry animácia headera.

### 3. Animácia headera — a kde bol problém

Pridanie `animate-fade-down` na `<h2>` bolo priamočiare. Pridanie rovnakej animácie s oneskorením na `<p>` tiež — definoval som `fade-down-soft` keyframe s `animation-delay: 0.12s`.

Tu prišiel nečakaný problém. Paragraf mal Tailwind triedu `opacity-60`, ale po animácii ostával na plnej opacite.

**Príčina:** `animation-fill-mode: both` znamená, že po skončení animácie element "zamrzne" v stave `to` keyframu — v tomto prípade `opacity: 1`. CSS animácia má vyššiu špecificitu ako trieda, takže `opacity-60` (0.6) bola prepísaná.

**Riešenie:** Vytvoril som samostatný keyframe `fade-down-soft`, ktorého `to` stav je `opacity: 0.6`. Tým animácia sama skončí na správnej hodnote a triedu `opacity-60` som z HTML odstranil — bola zbytočná, keďže výsledok rieši keyframe.

Toto bola jediná časť, kde som musel zastaviť a premyslieť dôsledok `fill-mode: both` — nie je intuitívne, že animácia môže "prebiť" statickú CSS triedu po svojom skončení.

### 4. Upratanie

`counter.js` bol súčasťou Vite default šablóny, nikde sa nepoužíval, vymazal som ho.

---

## Štruktúra súborov

```
index.html        — markup, Alpine atribúty, Tailwind triedy
src/
  main.js         — Alpine.data('portfolio', ...) — logika filtrovania a vyhľadávania
  style.css       — @theme, keyframes, [x-cloak], .card-animate
  assets/
    default-icon.svg
    hero.png
```
