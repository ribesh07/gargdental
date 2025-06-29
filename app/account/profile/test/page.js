import { cookies } from "next/headers";
import ClientComponent from "./ClientComponent";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center overflow-x-hidden">
      <h1>Welcome</h1>
      <ClientComponent token={token} />
    </div>
  );
}
