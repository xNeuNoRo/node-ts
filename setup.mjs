import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const setupFile = path.resolve(import.meta.url.replace("file://", ""));
const dim = (text) => `\x1b[2m${text}\x1b[0m`; // Gris oscuro / separadores
const cyan = (text) => `\x1b[36m${text}\x1b[0m`; // Etapas / info
const green = (text) => `\x1b[32m${text}\x1b[0m`; // Éxito
const red = (text) => `\x1b[31m${text}\x1b[0m`; // Error

try {
  console.log(dim("───────────────────────────────\n"));
  console.log(cyan("🔹 Limpiando historial de Git del template..."));
  execSync("rm -rf .git", { stdio: "inherit" });

  console.log(dim("\n───────────────────────────────\n"));
  console.log(green("✅ Historial eliminado. Inicializando nuevo repositorio Git...\n"));
  execSync("git init", { stdio: "inherit" });

  console.log(dim("\n───────────────────────────────\n"));
  console.log(green("✅ Nuevo repositorio listo. Instalando dependencias...\n"));
  execSync("bun install", { stdio: "pipe" }).toString();

  console.log("✅ Dependencias instaladas correctamente");

  console.log(dim("\n───────────────────────────────\n"));
  console.log(cyan("🔹 Eliminando este script de setup..."));
  fs.unlinkSync(setupFile);

  console.log(green("✅ Setup inicial completado. El proyecto ta' ready.\n\n"));
} catch (err) {
  console.error(red("❌ Error durante el setup: "), err);
  process.exit(1);
}
