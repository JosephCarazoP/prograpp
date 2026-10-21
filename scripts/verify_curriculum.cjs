const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

let totalLessons = 0;
let totalExercises = 0;
let errors = [];

// Verify Kotlin units 1 to 12
for (let u = 1; u <= 12; u++) {
  const uPad = String(u).padStart(2, '0');
  const file = path.join(rootDir, 'src', 'content', 'kotlin', `unit_${uPad}`, 'index.ts');
  if (!fs.existsSync(file)) {
    errors.push(`Missing Kotlin unit file: ${file}`);
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  const jsonMatch = content.match(/export const KOTLIN_UNIT_\d+_LESSONS: Lesson\[\] = (\[[\s\S]*\]);/);
  if (!jsonMatch) {
    errors.push(`Could not parse JSON in ${file}`);
    continue;
  }
  const lessons = JSON.parse(jsonMatch[1]);
  lessons.forEach((l, idx) => {
    totalLessons++;
    if (!l.exercises || l.exercises.length !== 10) {
      errors.push(`Kotlin Unit ${u} Lesson ${idx + 1} (${l.id}) has ${l.exercises ? l.exercises.length : 0} exercises! Expected 10.`);
    } else {
      totalExercises += l.exercises.length;
      l.exercises.forEach(ex => {
        if (!ex.id || !ex.type || !ex.prompt || !ex.explanation) {
          errors.push(`Exercise missing required fields: ${ex.id} in ${l.id}`);
        }
      });
    }
  });
}

// Verify SQL units 1 to 13
for (let u = 1; u <= 13; u++) {
  const uPad = String(u).padStart(2, '0');
  const file = path.join(rootDir, 'src', 'content', 'sql', `unit_${uPad}`, 'index.ts');
  if (!fs.existsSync(file)) {
    errors.push(`Missing SQL unit file: ${file}`);
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  const jsonMatch = content.match(/export const SQL_UNIT_\d+_LESSONS: Lesson\[\] = (\[[\s\S]*\]);/);
  if (!jsonMatch) {
    errors.push(`Could not parse JSON in ${file}`);
    continue;
  }
  const lessons = JSON.parse(jsonMatch[1]);
  lessons.forEach((l, idx) => {
    totalLessons++;
    if (!l.exercises || l.exercises.length !== 10) {
      errors.push(`SQL Unit ${u} Lesson ${idx + 1} (${l.id}) has ${l.exercises ? l.exercises.length : 0} exercises! Expected 10.`);
    } else {
      totalExercises += l.exercises.length;
      l.exercises.forEach(ex => {
        if (!ex.id || !ex.type || !ex.prompt || !ex.explanation) {
          errors.push(`Exercise missing required fields: ${ex.id} in ${l.id}`);
        }
      });
    }
  });
}

console.log('═══════════════════════════════════════════════════════');
console.log('Resultado de la Verificación');
console.log('═══════════════════════════════════════════════════════');
console.log(`Total de Lecciones Analizadas: ${totalLessons} (84 Kotlin + 89 SQL = 173)`);
console.log(`Total de Retos Prácticos Analizados: ${totalExercises} (173 * 10 = 1730)`);
console.log(`Total de Errores encontrados: ${errors.length}`);

if (errors.length > 0) {
  console.error('Errores detectados:');
  errors.slice(0, 20).forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('¡TODAS las 173 lecciones tienen exactamente 10 retos válidos!');
}
