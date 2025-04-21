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

if (command !== "add" || !componentName) {
  console.log("Usage: npx github:<user>/<repo> add <component>");
  process.exit(1);
}

const templatePath = path.join(__dirname, "components", componentName);
const targetPath = path.join(process.cwd(), "components", componentName);

if (!fs.existsSync(templatePath)) {
  console.log(`❌ Component "${componentName}" not found.`);
  process.exit(1);
}

await fs.copy(templatePath, targetPath);

console.log(
  `✅ Added component "${componentName}" to ./components/${componentName}`
);
