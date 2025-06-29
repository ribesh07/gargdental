import { cookies } from "next/headers";
import MyAccountPage from "./MyAccountPage";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return <MyAccountPage token={token} />;
}
