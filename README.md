# Verumsell — Site oficial

Site static HTML/CSS pentru verumsell.com. Deploy pe Vercel via GitHub.

## Structura proiect

```
verumsell/
├── index.html              # Landing page principal
├── pages/
│   └── capacitate.html     # Pagina produsului Capacitate
├── css/
│   ├── main.css            # Stiluri globale
│   └── capacitate.css      # Stiluri specifice paginii Capacitate
├── vercel.json             # Config Vercel
└── README.md
```

## Deploy pe Vercel (GitHub)

1. Creează un repo GitHub și push folderul
2. Du-te pe [vercel.com](https://vercel.com) → Import Project
3. Selectează repo-ul
4. Framework Preset: **Other** (site static)
5. Root Directory: `/` (sau folderul dacă ai subfoldere)
6. Click Deploy

## Conectare domeniu verumsell.com

1. În Vercel → Settings → Domains
2. Adaugă `verumsell.com` și `www.verumsell.com`
3. Vercel îți dă recorduri DNS (A și CNAME)
4. Mergi în Wix → Manage Domain → Advanced DNS
5. Șterge recordurile A și CNAME existente
6. Adaugă recordurile de la Vercel
7. Propagare: 24-48h (de obicei mult mai rapid)

## Pagini

- `/` — Landing page cu toate produsele
- `/pages/capacitate` — Pagina dedicată aplicației de Capacitate

## În viitor (când mai adaugi produse)

- Copiază `pages/capacitate.html` ca template pentru Bacalaureat
- Adaugă link-ul în `index.html` în grid-ul de produse
- Actualizează `products-grid` din `index.html`
