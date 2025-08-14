import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const setupFile = path.resolve(import.meta.url.replace("file://", ""));

try {
  console.log("🔹 Limpiando historial de Git del template...");
  execSync("rm -rf .git", { stdio: "inherit" });

  console.log("✅ Historial eliminado. Inicializando nuevo repositorio Git...");
  execSync("git init", { stdio: "inherit" });

  console.log("✅ Nuevo repositorio listo. Instalando dependencias...");
  execSync("pnpm install", { stdio: "inherit" });

  console.log("🔹 Eliminando este script de setup...");
  fs.unlinkSync(setupFile);

  console.log("✅ Setup completo. Proyecto listo para usar.");
} catch (err) {
  console.error("❌ Error durante el setup:", err);
  process.exit(1);
}
