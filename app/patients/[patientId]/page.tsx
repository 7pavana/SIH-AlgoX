import { PatientDetails } from "@/components/doctor-app";
export default async function PatientPage({params}:{params:Promise<{patientId:string}>}){ const {patientId}=await params; return <PatientDetails id={patientId}/>; }
