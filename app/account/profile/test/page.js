import { cookies } from "next/headers";
import ClientComponent from "./ClientComponent";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return (
    <div>
      <h1>Welcome</h1>
      <ClientComponent token={token} />
    </div>
  );
}
