export type RiskLevel = "High" | "Moderate" | "Low";
export type Doctor = { id: string; name: string; specialization: string; email: string; organization: string };
export type Patient = { id: string; name: string; age: number; sex: "Female" | "Male"; bloodGroup: string; notes: string; lastScreening: string; result: string; risk: RiskLevel };
export type ScreeningSession = { id: string; patientId: string; doctorId: string; date: string; screening: string; result: string; confidence: number; risk: RiskLevel; inputType: "Clinical data" | "Clinical image"; model: string; inputs: { label: string; value: string }[] };

export const currentDoctor: Doctor = { id: "DOC-1042", name: "Dr. Ananya Rao", specialization: "Cardiology", email: "ananya.rao@medqube.demo", organization: "MedQube Clinical Research Centre" };
export const patients: Patient[] = [
  { id:"MQ-1024", name:"Arjun Rao", age:52, sex:"Male", bloodGroup:"B+", notes:"Synthetic demo record. Review cardiometabolic indicators at next visit.", lastScreening:"18 Sep 2026", result:"Elevated indicators", risk:"High" },
  { id:"MQ-1001", name:"Meera Shah", age:44, sex:"Female", bloodGroup:"O+", notes:"Synthetic demo record. Ongoing retinal screening follow-up.", lastScreening:"12 Sep 2026", result:"Lower indicator pattern", risk:"Low" },
  { id:"MQ-1002", name:"Vikram Iyer", age:61, sex:"Male", bloodGroup:"A+", notes:"Synthetic demo record. Lifestyle and blood-pressure review advised.", lastScreening:"08 Sep 2026", result:"Elevated indicators", risk:"Moderate" },
  { id:"MQ-1031", name:"Nisha Kapoor", age:37, sex:"Female", bloodGroup:"AB+", notes:"Synthetic demo record. Skin screening session pending review.", lastScreening:"03 Sep 2026", result:"Benign pattern", risk:"Low" },
  { id:"MQ-1040", name:"Karan Mehta", age:58, sex:"Male", bloodGroup:"O-", notes:"Synthetic demo record. Diabetes risk screening requested.", lastScreening:"29 Aug 2026", result:"Elevated indicators", risk:"High" },
];
export const sessions: ScreeningSession[] = [
  { id:"SCR-20260918-0042",patientId:"MQ-1024",doctorId:"DOC-1042",date:"18 Sep 2026 · 09:42",screening:"Skin Cancer",result:"Melanoma suspected",confidence:87,risk:"High",inputType:"Clinical image",model:"Hybrid QML prototype",inputs:[{label:"Image type",value:"Dermoscopic image"},{label:"Quality check",value:"Accepted"}] },
  { id:"SCR-20260830-0018",patientId:"MQ-1024",doctorId:"DOC-1042",date:"30 Aug 2026 · 14:18",screening:"Diabetes",result:"Elevated indicators",confidence:81,risk:"Moderate",inputType:"Clinical data",model:"Hybrid QML prototype",inputs:[{label:"BMI",value:"29.4"},{label:"Blood pressure",value:"High recorded"},{label:"General health",value:"Fair"}] },
  { id:"SCR-20260912-0031",patientId:"MQ-1001",doctorId:"DOC-1042",date:"12 Sep 2026 · 11:05",screening:"Diabetic Retinopathy",result:"No DR pattern",confidence:92,risk:"Low",inputType:"Clinical image",model:"Hybrid QML prototype",inputs:[{label:"Image type",value:"Retinal fundus image"},{label:"Quality check",value:"Accepted"}] },
  { id:"SCR-20260908-0027",patientId:"MQ-1002",doctorId:"DOC-1042",date:"08 Sep 2026 · 16:20",screening:"Heart Disease",result:"Elevated indicators",confidence:78,risk:"Moderate",inputType:"Clinical data",model:"Hybrid QML prototype",inputs:[{label:"Resting BP",value:"142 mmHg"},{label:"Cholesterol",value:"228 mg/dL"}] },
  { id:"SCR-20260903-0020",patientId:"MQ-1031",doctorId:"DOC-1042",date:"03 Sep 2026 · 10:12",screening:"Skin Cancer",result:"Benign pattern",confidence:74,risk:"Low",inputType:"Clinical image",model:"Hybrid QML prototype",inputs:[{label:"Image type",value:"Dermoscopic image"}] },
];
export const patientById = (id: string) => patients.find(patient => patient.id === id);
export const sessionsForPatient = (id: string) => sessions.filter(session => session.patientId === id);
