import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/pavan/OneDrive/Desktop/Pavana_clg/project_reports/Medqure.pptx";
const outDir = "C:/Users/pavan/OneDrive/Documents/ChatGPT/SIH/.build_inspect";
await fs.mkdir(outDir, { recursive: true });
const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));
const report = await presentation.inspect({ kind: "slide,textbox,shape,image,table,chart,notes,layout", maxChars: 50000 });
await fs.writeFile(path.join(outDir, "deck-inspect.ndjson"), report.ndjson);
for (let i = 0; i < presentation.slides.length; i++) {
  const slide = presentation.slides.getItem(i);
  const image = await slide.export({ format: "png", scale: 1 });
  await fs.writeFile(path.join(outDir, `slide-${i + 1}.png`), new Uint8Array(await image.arrayBuffer()));
}
console.log(`slides=${presentation.slides.length}`);
