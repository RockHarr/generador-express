# Generador Express

Colección de automatizaciones y pruebas para el proyecto Generador Express.

## Pruebas end-to-end

Este repositorio incluye una suite mínima de smoke tests construida con [Playwright](https://playwright.dev/).

### Requisitos previos

1. Node.js 18 o superior.
2. Dependencias de Playwright instaladas.

```bash
npm install
npx playwright install --with-deps
```

### Ejecutar los smoke tests

```bash
npm run test:e2e
```

Comandos adicionales:

- `npm run test:e2e:headed`: ejecuta las pruebas abriendo el navegador.
- `npm run test:e2e:ui`: abre la interfaz interactiva de Playwright Test.

## Estructura

- `tests/smoke.spec.ts`: pruebas de humo que validan interacciones básicas del generador.
- `playwright.config.ts`: configuración de Playwright (navegador, reportes y ejecución).
- `package.json`: scripts y dependencias del proyecto.

## Licencia

MIT
