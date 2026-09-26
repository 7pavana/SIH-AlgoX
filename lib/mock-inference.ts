import type { DiseaseType } from "./screening-config";

export type Result = { primary: string; probabilities?: { label: string; value: number }[]; signals?: { label: string; value: string }[] };
const score = (value: string) => [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0);
const normalize = (items: string[], seed: number) => { const raw = items.map((_, index) => 10 + ((seed * (index + 7)) % 34)); const total = raw.reduce((a,b) => a+b,0); return raw.map((value,index) => ({ label: items[index], value: Math.round(value / total * 100) })); };
const asNumber = (data: Record<string,string>, key: string) => Number(data[key] ?? 0);

function screenDiabetes(data: Record<string,string>): Result {
  let indicatorScore = 0;
  indicatorScore += asNumber(data, "HighBP") * 2;
  indicatorScore += asNumber(data, "HighChol");
  indicatorScore += asNumber(data, "BMI") >= 30 ? 2 : asNumber(data, "BMI") >= 25 ? 1 : 0;
  indicatorScore += asNumber(data, "Smoker");
  indicatorScore += asNumber(data, "PhysActivity") === 0 ? 1 : 0;
  indicatorScore += asNumber(data, "GenHlth") >= 4 ? 2 : 0;
  indicatorScore += asNumber(data, "HeartDiseaseorAttack") * 2;
  indicatorScore += asNumber(data, "DiffWalk");
  indicatorScore += asNumber(data, "Age") >= 9 ? 1 : 0;
  const elevated = indicatorScore >= 5;
  const elevatedProbability = Math.min(91, Math.max(12, 25 + indicatorScore * 8));
  const lowerProbability = 100 - elevatedProbability;
  return {
    primary: elevated ? "Elevated diabetes-related indicators detected" : "No strong diabetes-related indicator pattern detected",
    probabilities: [{ label: "Lower Indicator Pattern", value: lowerProbability }, { label: "Elevated Indicator Pattern", value: elevatedProbability }],
    signals: [
      { label: "Blood pressure status", value: data.HighBP === "1" ? "High blood pressure recorded" : "No high blood pressure recorded" },
      { label: "BMI", value: data.BMI ? `Submitted BMI · ${data.BMI}` : "Recorded input" },
      { label: "General health", value: "Recorded input" },
    ],
  };
}

export async function mockInference(disease: DiseaseType, data: Record<string, string>): Promise<Result> {
  await new Promise(resolve => setTimeout(resolve, 2500));
  const seed = score(JSON.stringify(data));
  if (disease === "heart") { const elevated = seed % 2 === 0; return { primary: elevated ? "Elevated risk indicators" : "Lower risk indicators", signals: [{ label: "Resting Blood Pressure", value: elevated ? "Elevated" : "Within input range" }, { label: "Serum Cholesterol", value: elevated ? "Review indicated" : "Within input range" }, { label: "Exercise profile", value: "Recorded input" }] }; }
  if (disease === "diabetes") return screenDiabetes(data);
  const labels = disease === "retinopathy" ? ["No_DR", "Mild", "Moderate", "Severe", "Proliferate_DR"] : ["AKIEC", "BCC", "BKL", "DF", "MEL", "NV", "VASC"];
  const probabilities = normalize(labels, seed); const highest = probabilities.reduce((a,b) => a.value > b.value ? a : b);
  return { primary: highest.label, probabilities };
}
