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
// if (command !== "add" || !componentName) {
//   console.log("Usage: npx github:<user>/<repo> add <component>");
//   process.exit(1);
// }

// const baseDir = path.join(__dirname, "components");
// const templatePath = path.resolve(baseDir, componentName);
// console.log("baseDir", baseDir);
// console.log("templatePath", templatePath);
// if (!fs.existsSync(templatePath) || !templatePath.startsWith(baseDir)) {
//   console.log(`❌ Component "${componentName}" not found.`);
//   process.exit(1);
// }
// console.log("process.cwd()", process.cwd());
// const targetPath = path.join(process.cwd(), "components", componentName);
// console.log("targetPath", targetPath);
// await fs.copy(templatePath, targetPath);

// console.log(
//   `✅ Added component "${componentName}" to ./components/${componentName}`
// );

if (command === "init") {
  console.log("init");
  const data = {
    aliases: {
      default: "components",
      path: {
        components: "src/components",
      },
    },
  };

  fs.writeFile(
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
  try {
    const data = fs.readFile(
      "component-cli.config.json",
      "utf8",
      async (err, data) => {
        if (err) {
          console.error("Can't read file component-cli.config.json.");
          process.exit(1);
          return;
        }
        let jsonData = null;
        try {
          jsonData = JSON.parse(data);
        } catch (parseErr) {
          console.error("Can't read file component-cli.config.json.");
          process.exit(1);
        }
        const defaultPath = jsonData?.aliases?.default;
        if (!defaultPath) {
          console.log("Default path not found.");
          process.exit(1);
        }
        const pathComponents = jsonData?.aliases?.path?.[defaultPath];
        if (!pathComponents) {
          console.log("Path components not found.");
          process.exit(1);
        }
        const baseDir = path.join(__dirname, "components");
        const templatePath = path.resolve(baseDir, componentName);
        console.log("baseDir", baseDir);
        console.log("templatePath", templatePath);
        if (!fs.existsSync(templatePath) || !templatePath.startsWith(baseDir)) {
          console.log(`❌ Component "${componentName}" not found.`);
          process.exit(1);
        }
        console.log("process.cwd()", process.cwd());
        const targetPath = path.join(
          process.cwd(),
          pathComponents,
          componentName
        );
        console.log("targetPath", targetPath);
        await fs.copy(templatePath, targetPath);

        console.log(
          `✅ Added component "${componentName}" to ./components/${componentName}`
        );
      }
    );
  } catch (err) {
    console.error("Error reading or parsing file:", err);
  }
} else {
  console.log("Usage: npx github:<user>/<repo> add <component>");
  process.exit(1);
}
