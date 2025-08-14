import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "node:readline";

const setupFile = path.resolve(import.meta.url.replace("file://", ""));
const dim = (text) => `\x1b[2m${text}\x1b[0m`; // Gris oscuro / separadores
const cyan = (text) => `\x1b[36m${text}\x1b[0m`; // Etapas / info
const green = (text) => `\x1b[32m${text}\x1b[0m`; // Éxito
const yellow = (text) => `\x1b[33m${text}\x1b[0m`; // Advertencia
const red = (text) => `\x1b[31m${text}\x1b[0m`; // Error

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

try {
  console.log(dim("───────────────────────────────\n"));
  console.log(cyan("🔹 Limpiando historial de Git del template..."));
  execSync("rm -rf .git", { stdio: "inherit" });

  console.log(dim("\n───────────────────────────────\n"));
  console.log(green("✅ Historial eliminado. Inicializando nuevo repositorio Git...\n"));
  execSync("git init", { stdio: "inherit" });

  console.log(dim("\n───────────────────────────────\n"));
  console.log(green("✅ Nuevo repositorio listo. Instalando dependencias...\n"));
  const output = execSync("pnpm install", { stdio: "pipe" }).toString();

  // Detectar si hay builds bloqueados
  if (/Ignored build scripts:/i.test(output)) {
    console.log(yellow("\n⚠️ Se detectaron scripts de build bloqueados."));

    const answer = await ask(cyan("🔹 ¿Deseas aprobar todos los build scripts bloqueados automáticamente? (y/n):  "));
    
    if (answer.toLowerCase() === "y") {
        console.log(cyan("\n🔧 Aprobando scripts de build...\n"));
        execSync("pnpm approve-builds --all", { stdio: "inherit" });
      } else {
        console.log(yellow("\n⚠️ No se aprobaron scripts de build. Algunos paquetes podrían no compilarse correctamente.\n"));
      }
  }

  console.log("✅ Dependencias instaladas correctamente");

  console.log(dim("\n───────────────────────────────\n"));
  console.log(cyan("🔹 Eliminando este script de setup..."));
  fs.unlinkSync(setupFile);

  console.log(green("✅ Setup inicial completado. El proyecto ta' ready pa que empezar a desarrollar.\n\n"));
} catch (err) {
  console.error(red("❌ Error durante el setup: "), err);
  process.exit(1);
}
