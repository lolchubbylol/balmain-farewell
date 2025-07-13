# 🚀 Deployment Instructions - Balmain Hospital Farewell Website

## Quick Deploy to Vercel (Recommended - 5 minutes)

### Prerequisites
- GitHub account (free at github.com)
- Vercel account (free at vercel.com)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Run these commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/balmain-farewell.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your `balmain-farewell` repository
5. Leave all settings as default (Vercel auto-detects Next.js)
6. Click "Deploy"
7. Wait ~2 minutes for deployment
8. Your site is live at `your-project-name.vercel.app`! 🎉

### Custom Domain (Optional)
- In Vercel dashboard → Settings → Domains
- Add your custom domain and follow DNS instructions

---

## Alternative: Deploy to Netlify

### Step 1: Build for Static Export
```bash
npm run build
npx next export
```

### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Drag the `out` folder to the deployment area
3. Your site is instantly live!

---

## Alternative: Deploy to GitHub Pages

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Add these scripts:
```json
"scripts": {
  ...
  "export": "next build && next export",
  "deploy": "npm run export && gh-pages -d out"
}
```

### Step 3: Deploy
```bash
npm run deploy
```

Your site will be at `https://YOUR_USERNAME.github.io/balmain-farewell/`

---

## Local Development

To run locally:
```bash
npm install
npm run dev
```

Visit http://localhost:3001

---

## Project Structure
```
balmain-farewell/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── VisualHero.tsx        # Opening EKG animation
│   ├── VisualStaff.tsx       # Staff appreciation cards
│   ├── VisualSignatures.tsx  # Student signatures
│   └── VisualFinale.tsx      # Closing animation
├── public/           # Static assets
└── styles/          # Global styles
```

## Features
- 🏥 Thank you message to Balmain Hospital Lever Ward
- 👩‍⚕️ Staff appreciation: Ma Lu, Kim, Simone, Marcia
- 🎓 USYD Medicine Class of 2025 signatures
- 🐨 Australian visual elements
- 🥚 Easter egg: Click the koala 3x on the last page!

## Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js (React Three Fiber)

## Troubleshooting

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version: `node --version` (should be 16+)

### Deployment Issues
- Ensure all changes are committed: `git status`
- Check build logs in Vercel/Netlify dashboard

---

Made with ❤️ by Nathan Xu for Balmain Hospital