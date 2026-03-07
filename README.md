# Landing Page — Agence IA Vin

Landing page pour un service d'automatisation IA destiné aux importateurs et négociants de vin.

## Stack technique

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Formspree** pour le formulaire de contact
- Prêt à déployer sur **Vercel**

## Installation locale

```bash
npm install
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Configuration

### 1. Personnaliser les informations

Modifiez le fichier `src/lib/constants.ts` :

```typescript
export const AGENCY_NAME = "Votre Agence";
export const AGENCY_EMAIL = "contact@votre-agence.com";
export const AGENCY_LINKEDIN = "https://linkedin.com/in/votre-profil";
```

### 2. Configurer Formspree

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire
3. Copiez l'ID du formulaire (ex: `xrgnoklp`)
4. Créez un fichier `.env.local` à la racine :

```
NEXT_PUBLIC_FORMSPREE_ID=votre_id_formspree
```

### 3. Remplacer les visuels

- Remplacez `public/og-image.png` par votre image Open Graph (1200x630px)
- Les blocs Avant/Après dans `src/components/BeforeAfterSection.tsx` sont des placeholders à remplacer par vos visuels

## Déploiement sur Vercel

1. Poussez le code sur GitHub
2. Importez le repo dans [Vercel](https://vercel.com)
3. Ajoutez la variable d'environnement `NEXT_PUBLIC_FORMSPREE_ID` dans les settings du projet
4. Déployez

## Structure

```
src/
├── app/
│   ├── globals.css        # Thème Tailwind (couleurs wine, cream)
│   ├── layout.tsx         # Layout racine + SEO
│   └── page.tsx           # Assemblage des sections
├── components/
│   ├── Header.tsx         # Navigation sticky
│   ├── HeroSection.tsx    # Accroche + CTA
│   ├── ProblemSection.tsx # Pain points
│   ├── BeforeAfterSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── PricingSection.tsx
│   ├── ContactSection.tsx # Formulaire Formspree
│   ├── Footer.tsx
│   ├── ScrollLink.tsx     # Smooth scroll
│   ├── SectionWrapper.tsx # Container réutilisable
│   └── icons/
└── lib/
    └── constants.ts       # Infos à personnaliser
```
