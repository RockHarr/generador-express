// Utilidades
const rand = (arr)=> arr[Math.floor(Math.random()*arr.length)];
const cap = s => s.charAt(0).toUpperCase()+s.slice(1);
const byLargo = (min,max)=> {
  const val = Number(document.getElementById('largo').value);
  return Math.round(min + (max-min) * ((val-1)/4));
};
const mult = ()=> 1 + Number(document.getElementById('boost').value); // 1x a 4x
const vibe = (ms=30)=>{ if(document.getElementById('haptica')?.checked && navigator.vibrate){ navigator.vibrate(ms); } };

function withTono(text, tono){
  if(tono==='chistoso') return text + ' 😂';
  if(tono==='formal') return text.replaceAll('jaja','');
  return text;
}
function applyTema(text){
  const tema = document.getElementById('tema')?.value?.trim();
  if(!tema) return text;
  return text.replaceAll('[[TEMA]]', tema);
}
function sanitizar(text){
  // Modo prudente: neutraliza @ y enlaces
  if(!document.getElementById('sanitizar')?.checked) return text;
  let out = text;
  ['@','http://','https://'].forEach(tok=>{ out = out.split(tok).join('(enlace omitido)'); });
  return out;
}
function chilenizar(text){
  if(!document.getElementById('chileno')?.checked) return text;
  const modismos = ['po','al tiro','cachai','bacán','la media volá','filete','piola','pulento'];
  return text + '\n\nPD: ' + rand(['Tranqui','Todo bien','Corta','Dato libre']) + ', ' + rand(modismos) + '.';
}

// Data (offline)
const emojis = ['🍳','🥄','🍽️','🧂','🫙','🥣','🧈','🫑','🧅','🧄','🌶️','🥔','🥕','🍗','🥐','🍞','🫓','🫛'];
const medidas = ['1 taza','2 tazas','1/2 taza','1 cucharada','2 cucharadas','1 cucharadita','200 g','300 g','500 g'];
const ingredientes = ['harina','azúcar','sal','aceite','mantequilla','huevos','leche','polvo de hornear','vainilla','pimienta','ají de color','orégano','cebolla','tomate','pimentón','pollo','papa','zanahoria','choclo','porotos','arroz'];
const tecnicas = ['mezcla','revuelve','bate','hornea','saltea','hidrata','deja reposar','sirve','precalienta el horno a 180°C','prueba y ajusta sal'];
const platos = ['queque de la abuela','arroz con cositas','pollo místico','pastel express','menestra turbo','sopa reconfortante','tallarines del domingo','pan de emergencia'];
const cierres = ['Listo, no hay drama.','Eso sería, éxito.','Y a disfrutar, po.','Queda filete.','¡A comer!','Fin del comunicado gastronómico.'];

const datos = [
  'Las abejas pueden reconocer rostros humanos en patrones simples.',
  'El punto sobre la i se llama «título».',
  'Los pulpos tienen tres corazones.',
  'El chocolate blanco no es técnicamente chocolate.',
  'Chile tiene el desierto más árido del mundo: Atacama.',
  'Los flamencos son grises al nacer; se ponen rosados por la dieta.',
  'Los koalas duermen hasta 20 horas al día.',
  'El ajedrez tiene más posiciones posibles que átomos en el universo observable (aprox.).'
];

const copypastas = [
  'Estimado algoritmo: procedo a depositar este texto completamente neutro y carente de significado operativo. Gracias por su amable atención y feliz jornada. ☺️',
  'Este es un comunicado oficial del Sindicato de Comentarios Inútiles. A contar de ahora, este hilo queda cubierto por letras. Eso. Buenas tardes.',
  'Insertar texto de relleno nivel experto. Si llegaste hasta aquí, recuerda hidratarte y estirar la espalda. Fin del servicio público.',
  'Por disposición de mis ganas de webear responsablemente, adjunto párrafo sin calorías. Úsese con moderación y preferencia en días nublados.',
  'Manual rápido: 1) Respira 2) Cuenta 3) Pega esto 4) Abandona el hilo con elegancia. — Gerencia de Memes Saludables.'
];

// Absurdo
const ingAbsurdos = ['microondas imaginario','aire sabor a merquén','luz solar en polvo','hielo tibio','ensalada de puntos suspensivos','sal unicornio (sin gluten)','tornillos veganos','ruido de cucharas','pan metafísico','gluten de mentiritas'];
const accionesAbsurdo = ['saluda al sartén','canta una cueca al colador','mira fijamente al refrigerador hasta que responda','revuelve en sentido antihorario porque sí','declara tu independencia del tenedor','deja reposar 7 minutos y medio exactos','agradece al universo por la olla'];

// ASCII
const asciiPool = [
  '(=^･ω･^=)  \nGato mirando el hilo',
  '(っ˘▽˘)っ  \nAbrazote de paz',
  '[▓▓▓▓▓]  \nBarra de progreso social',
  '( •_•)\n( •_•)>⌐■-■\n(⌐■_■)  \nModo elegante activado',
  '_/\\\\__  \nChile, pero en ASCII (simbólico)',
  "(•◡•)☕  \nMatecito pa' la conversa",
  '🚍= =  \nLa micro pasando piola',
  '🐕  \nQuiltro buena onda'
];

const paragraphs = (n, makeLine)=> Array.from({length:n*mult()},(_,i)=> makeLine(i)).join('\n');

// Generadores
function genReceta(){
  const pasos = byLargo(3,8);
  const nombre = rand(platos);
  const lista = Array.from({length:byLargo(4,9)},()=> `${rand(medidas)} de ${rand(ingredientes)}`);
  const pasosTxt = paragraphs(pasos, (i)=> `${i+1}. ${cap(rand(tecnicas))}.`);
  const lead = `${rand(emojis)} RECETA EXPRESS: ${cap(nombre)} ${rand(emojis)} (inspirada en [[TEMA]])`;
  const body = `Ingredientes:\n- ${lista.join('\n- ')}\n\nPreparación:\n${pasosTxt}`;
  const end = `\n\n${rand(cierres)} ${rand(['#cocina','<3','— servicio público —'])}`;
  return `${lead}\n\n${body}${end}`;
}
function genRecetaAbsurd(){
  const pasos = byLargo(3,6);
  const nombre = `recetaza absurda de ${rand(['empanadas cuánticas','sopa existencial','tallarines invisibles','cazuela interdimensional'])}`;
  const lista = Array.from({length:byLargo(3,6)},()=> rand([`${rand(medidas)} de ${rand(ingAbsurdos)}`, `${rand(medidas)} de ${rand(ingredientes)}`]));
  const pasosTxt = paragraphs(pasos, (i)=> `${i+1}. ${cap(rand(accionesAbsurdo))}.`);
  const lead = `🌀 RECETA ABSURDA: ${cap(nombre)} (tema: [[TEMA]])`;
  const body = `Ingredientes no-confirmados:\n- ${lista.join('\n- ')}\n\nProcedimiento a ojo:\n${pasosTxt}`;
  const end = `\n\nResultado: comestible en universos paralelos. Sugerencia: acompañar con agua imaginaria.`;
  return `${lead}\n\n${body}${end}`;
}
function genDato(){
  const base = rand(datos);
  const extra = ['Dato 100% real (no fake).','Apréndase esta para el asado.','Úselo responsablemente en reuniones aburridas.'];
  return `${rand(['ℹ️','💡','🧠'])} ${base} ${rand(extra)} (tema: [[TEMA]])`;
}
function genReview(){
  const estrellas = '★★★★★☆☆☆☆☆'.slice(0, byLargo(2,5));
  const bloques = [
    `📺 Review flash (tema: [[TEMA]])`,
    `Sinopsis: producción que mezcla ritmo, drama y momentos "igual bien".`,
    `Lo mejor: fotografía y un par de escenas pulentas.`,
    `Podría mejorar: guion apurado en el tercer acto.`,
    `Veredicto: ${estrellas}/5 — ideal para maratón liviana.`
  ];
  return paragraphs(1,()=> bloques.join('\n'));
}
function genAscii(){ return rand(asciiPool) + `\n\n[[TEMA]]`; }
function genCopypasta(){
  const t = rand(copypastas);
  const cola = rand(['#PazEnLosComentarios','#HidrataciónObligatoria','— Fin —']);
  return `${t} ${cola} (tema: [[TEMA]])`;
}

function generar(){
  const tipo = document.getElementById('tipo').value;
  const tono = document.getElementById('tono').value;
  let out = '';
  if(tipo==='receta') out = genReceta();
  if(tipo==='receta_absurda') out = genRecetaAbsurd();
  if(tipo==='dato') out = genDato();
  if(tipo==='review') out = genReview();
  if(tipo==='ascii') out = genAscii();
  if(tipo==='copypasta') out = genCopypasta();

  out = applyTema(out);
  out = sanitizar(out);
  out = withTono(out, tono);
  out = chilenizar(out);

  document.getElementById('salida').value = out;
  actualizarContador();
  document.getElementById('previewInfo').textContent = `Generado: ${new Date().toLocaleTimeString()} | x${mult()} de extensión`;

  if(document.getElementById('autocopiar')?.checked){ copiar(); }
  vibe();
}

function copiar(){
  const ta = document.getElementById('salida');
  ta.select(); ta.setSelectionRange(0, 99999);
  const ok = document.execCommand?.('copy');
  if(ok){ const b = document.getElementById('btnCopiar'); if(b){ b.textContent='¡Copiado!'; setTimeout(()=> b.textContent='Copiar texto', 1200); } }
  toast('Texto copiado');
  vibe();
}

function actualizarContador(){
  const n = document.getElementById('salida').value.length;
  document.getElementById('contador').textContent = `${n} caracteres`;
}

// PNG: copiar/guardar imagen del texto
function copyOrSavePNG(){
  const text = document.getElementById('salida').value || 'Nada por aquí…';
  const padding = 28, lineHeight = 38, maxWidth = 1080;
  const c = document.createElement('canvas'); const ctx = c.getContext('2d');
  const font = '28px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  ctx.font = font;
  const words = text.split(/\s+/), lines = []; let line='';
  const target = Math.min(maxWidth, Math.max(640, Math.min(window.innerWidth*2, 1080)));
  words.forEach(w=>{ const test = line ? line+' '+w : w; if(ctx.measureText(test).width > (target - padding*2)){ lines.push(line); line = w; } else { line = test; } });
  if(line) lines.push(line);
  const width = target, height = padding*2 + lines.length*lineHeight;
  c.width = width; c.height = height;
  const ctx2 = c.getContext('2d');
  ctx2.fillStyle = '#0b1220'; ctx2.fillRect(0,0,width,height);
  ctx2.fillStyle = '#e8eefc'; ctx2.font = font; ctx2.textBaseline = 'top';
  lines.forEach((ln,i)=> ctx2.fillText(ln, padding, padding + i*lineHeight));
  c.toBlob(async (blob)=>{
    try{
      if(navigator.clipboard && window.ClipboardItem){
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        toast('PNG copiado al portapapeles');
      } else {
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'generador.png'; a.click(); toast('PNG descargado');
      }
    }catch(_){
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'generador.png'; a.click(); toast('PNG descargado');
    }
  }, 'image/png');
  vibe(20);
}

function toast(msg){
  let n = document.getElementById('toast');
  if(!n){ n = Object.assign(document.createElement('div'), { id:'toast' }); document.body.appendChild(n); }
  Object.assign(n.style, { position:'fixed', left:'50%', bottom:'20px', transform:'translateX(-50%)', padding:'10px 14px', background:'#121a2b', color:'#e8eefc', border:'1px solid rgba(255,255,255,.15)', borderRadius:'12px', zIndex:9999, opacity:'0.95'});
  n.textContent = msg; setTimeout(()=> n.remove(), 1400);
}

// Tests básicos existentes (no modificar)
function runTests(){
  const log = [];
  const ok = (m)=> log.push('✅ '+m);
  const fail = (m)=> log.push('❌ '+m);
  const notEmpty = (s)=> typeof s==='string' && s.length>20 && !/undefined|NaN/.test(s);
  try{ if(notEmpty(genReceta())) ok('genReceta() devuelve texto válido'); else fail('genReceta vacío'); }catch(e){ fail('genReceta lanzó error: '+e.message); }
  try{ if(notEmpty(genRecetaAbsurd())) ok('genRecetaAbsurd() válido'); else fail('genRecetaAbsurd vacío'); }catch(e){ fail('genRecetaAbsurd error: '+e.message); }
  try{ if(notEmpty(genDato())) ok('genDato() válido'); else fail('genDato vacío'); }catch(e){ fail('genDato error: '+e.message); }
  try{ if(notEmpty(genReview())) ok('genReview() válido'); else fail('genReview vacío'); }catch(e){ fail('genReview error: '+e.message); }
  try{ if(notEmpty(genAscii())) ok('genAscii() válido'); else fail('genAscii vacío'); }catch(e){ fail('genAscii error: '+e.message); }
  try{ if(notEmpty(genCopypasta())) ok('genCopypasta() válido'); else fail('genCopypasta vacío'); }catch(e){ fail('genCopypasta error: '+e.message); }
  try{ const s = sanitizar('mira http://ejemplo.com @usuario'); if(!/http|@usuario/.test(s)) ok('sanitizar() neutraliza enlaces y @'); else fail('sanitizar no neutraliza'); }catch(e){ fail('sanitizar error: '+e.message); }
  try{ document.getElementById('chileno').checked = true; const c = chilenizar('hola'); if(/PD:/.test(c)) ok('chilenizar() agrega PD'); else fail('chilenizar no agregó PD'); document.getElementById('chileno').checked = false; }catch(e){ fail('chilenizar error: '+e.message); }
  document.getElementById('testLog').textContent = log.join('\n');
  document.getElementById('testStatus').textContent = log.every(l=> l.startsWith('✅')) ? 'OK' : 'Fallas';
}

// Tests extra
function runExtraTests(){
  const log = [];
  const ok = (m)=> log.push('🟢 '+m);
  const fail = (m)=> log.push('🔴 '+m);
  try{ if(typeof copyOrSavePNG === 'function') ok('copyOrSavePNG() existe'); else fail('copyOrSavePNG no existe'); }catch(e){ fail('copyOrSavePNG error: '+e.message); }
  try{ document.getElementById('autocopiar').checked = true; generar(); const txt = document.getElementById('salida').value; if(txt && txt.length>0) ok('autocopiar no rompe el flujo'); else fail('autocopiar generó vacío'); document.getElementById('autocopiar').checked = false; }catch(e){ fail('autocopiar error: '+e.message); }
  document.getElementById('testLog').textContent += '\n' + log.join('\n');
}

// Wire-up
['tipo','tono','largo','boost','chileno','sanitizar','tema'].forEach(id=> document.getElementById(id)?.addEventListener('change', generar));
['btnGenerar','btnOtra'].forEach(id=> document.getElementById(id)?.addEventListener('click', generar));
document.getElementById('btnCopiar')?.addEventListener('click', copiar);
document.getElementById('btnPng')?.addEventListener('click', copyOrSavePNG);
document.getElementById('salida')?.addEventListener('input', actualizarContador);
document.getElementById('btnTests')?.addEventListener('click', ()=>{ runTests(); runExtraTests(); });

// Action bar
['abGen','abCopy','abPng'].forEach((id,i)=>{
  const el = document.getElementById(id);
  if(!el) return;
  if(i===0) el.addEventListener('click', generar);
  if(i===1) el.addEventListener('click', copiar);
  if(i===2) el.addEventListener('click', copyOrSavePNG);
});

// Primer render
window.addEventListener('DOMContentLoaded', ()=>{ generar(); });
