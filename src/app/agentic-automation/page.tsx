import { redirect } from "next/navigation";

// Canonical URL is /solutions/agentic-process-automation/
// This keeps old inbound links working
export default function AgenticAutomationLegacy() {
  redirect("/solutions/agentic-process-automation/");
}
