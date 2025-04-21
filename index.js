#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

// const answers = await inquirer.prompt([
//   {
//     type: "input",
//     name: "component",
//     message: "คุณต้องการ add component อะไร?",
//   },
//   {
//     type: "confirm",
//     name: "confirmCopy",
//     message: "ยืนยันว่าจะ copy component นี้หรือไม่?",
//     default: true,
//   },
// ]);
// console.log('answers', answers)
// if (answers.confirmCopy) {
//   console.log(`✅ กำลัง copy ${answers.component}...`);
//   // ดำเนินการ copy ที่นี่
// } else {
//   console.log("❌ ยกเลิกแล้ว");
// }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0]; // เช่น "add"
const componentName = args[1]; // เช่น "button"
if (command === "init") {
  console.log("init");
  const data = {
    aliases: {
      default: "componets",
      path: {
        components: "src/components",
      },
    },
  };

  fs.writeFileSync(
    "component-cli.config.json",
    JSON.stringify(data, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("JSON data saved successfully!");
    }
  );
} else if (!(command !== "add" || !componentName)) {
  const baseDir = path.join(__dirname, "components");
  const templatePath = path.resolve(baseDir, componentName);
  console.log("baseDir", baseDir);
  console.log("templatePath", templatePath);
  if (!fs.existsSync(templatePath) || !templatePath.startsWith(baseDir)) {
    console.log(`❌ Component "${componentName}" not found.`);
    process.exit(1);
  }

  const targetPath = path.join(process.cwd(), "components", componentName);
  console.log("targetPath", targetPath);
  await fs.copy(templatePath, targetPath);

  console.log(
    `✅ Added component "${componentName}" to ./components/${componentName}`
  );
} else {
  console.log("Usage: npx github:<user>/<repo> add <component>");
  process.exit(1);
}
