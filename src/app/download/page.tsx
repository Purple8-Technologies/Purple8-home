import { redirect } from "next/navigation";

export default function DownloadPage() {
  redirect("/beta?plan=developer");
}
