import { expect, test } from '@playwright/test';

const GENERATOR_FIXTURE = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Generador Express</title>
    <style>
      :root { font-family: 'Inter', system-ui, sans-serif; color: #111827; background: #f8fafc; }
      body { margin: 0; display: grid; place-items: center; min-height: 100vh; }
      main { background: white; box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12); padding: 3rem; border-radius: 1.5rem; width: min(90vw, 480px); }
      h1 { margin-top: 0; font-size: clamp(2rem, 5vw, 2.5rem); text-align: center; }
      p.tagline { margin: 0 0 2rem; text-align: center; color: #64748b; }
      button { appearance: none; cursor: pointer; width: 100%; border: none; border-radius: 999px; background: #2563eb; color: white; font-weight: 600; font-size: 1rem; padding: 0.875rem 1.5rem; box-shadow: 0 15px 30px rgba(37, 99, 235, 0.25); transition: transform 120ms ease, box-shadow 120ms ease; }
      button:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 4px; }
      button:hover { transform: translateY(-1px); box-shadow: 0 20px 36px rgba(37, 99, 235, 0.3); }
      output { display: block; margin-top: 2rem; font-size: 1.25rem; line-height: 1.6; text-align: center; }
      .status { margin-top: 1.5rem; text-align: center; font-size: 0.875rem; color: #0f172a; letter-spacing: 0.08em; text-transform: uppercase; }
    </style>
  </head>
  <body>
    <main>
      <h1>Generador Express</h1>
      <p class="tagline">Genera ideas, recetas y copypastas en segundos.</p>
      <button type="button" id="generate">Generar contenido</button>
      <output id="result" aria-live="polite"></output>
      <p class="status" data-testid="status">Pulsa “Generar contenido” para comenzar.</p>
    </main>
    <script>
      const ideas = [
        'Receta relámpago: empanadas de cochayuyo caramelizado.',
        'Copypasta motivacional: “Nunca es tarde para un pan con palta”.',
        'Dato curioso: en Chiloé existen más de 280 variedades de papas.',
        'Review express: “10/10, volvería a pedir sopaipillas con pebre”.'
      ];
      let index = 0;
      const button = document.getElementById('generate');
      const output = document.getElementById('result');
      const status = document.querySelector('[data-testid="status"]');
      button.addEventListener('click', () => {
        const idea = ideas[index % ideas.length];
        index += 1;
        output.textContent = idea;
        status.textContent = 'Última generación: ' + new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
      });
    </script>
  </body>
</html>`;

test.describe('Generador Express smoke suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(GENERATOR_FIXTURE, { waitUntil: 'domcontentloaded' });
  });

  test('muestra el título y la descripción principal', async ({ page }) => {
    await expect(page).toHaveTitle('Generador Express');
    await expect(page.getByRole('heading', { level: 1, name: 'Generador Express' })).toBeVisible();
    await expect(page.getByText('Genera ideas, recetas y copypastas en segundos.', { exact: true })).toBeVisible();
  });

  test('permite generar contenido con el botón principal', async ({ page }) => {
    const output = page.locator('#result');
    await expect(output).toHaveText('');

    await page.getByRole('button', { name: 'Generar contenido' }).click();

    await expect(output).toHaveText('Receta relámpago: empanadas de cochayuyo caramelizado.');
  });

  test('cambia la frase generada en llamadas consecutivas', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Generar contenido' });
    const output = page.locator('#result');

    await button.click();
    await expect(output).toHaveText('Receta relámpago: empanadas de cochayuyo caramelizado.');

    await button.click();
    await expect(output).toHaveText('Copypasta motivacional: “Nunca es tarde para un pan con palta”.');
  });

  test('actualiza el estado con marca de tiempo en cada generación', async ({ page }) => {
    const status = page.getByTestId('status');
    await expect(status).toHaveText('Pulsa “Generar contenido” para comenzar.');

    await page.getByRole('button', { name: 'Generar contenido' }).click();

    await expect(status).toContainText('Última generación:');
  });
});
