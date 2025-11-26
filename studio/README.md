# portfolio-jirka-cms (Sanity Studio)

Toto je Sanity Studio pro správu obsahu (projekty, služby, reference).

## Instalace

```bash
npm install
```

## Spuštění lokálně

```bash
npm run dev
```

Studio poběží na:
- http://localhost:3333

## Nastavení projektu

1. Vytvoř si projekt na https://www.sanity.io/manage
2. Zkopíruj `projectId` a `dataset` (např. `production`).
3. Vytvoř v tomto adresáři soubor `.env` a doplň:

```env
SANITY_STUDIO_PROJECT_ID=tvuj_project_id
SANITY_STUDIO_DATASET=production
```

4. Restartuj `npm run dev`.

## Import ilustračního obsahu

Soubory se seed daty jsou v `seed.ndjson`.

Po nastavení `projectId` a `dataset` můžeš spustit:

```bash
npx sanity dataset import seed.ndjson production
```

Tím se ti do Sanity nahrají ukázkové projekty, služby a reference.
