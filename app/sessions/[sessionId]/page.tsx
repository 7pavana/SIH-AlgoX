import { SessionDetails } from "@/components/doctor-app";
export default async function SessionPage({params}:{params:Promise<{sessionId:string}>}){ const {sessionId}=await params; return <SessionDetails id={sessionId}/>; }
