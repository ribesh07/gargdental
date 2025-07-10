// app/page.tsx or pages/index.tsx
import GoogleLoginButton from "./GoogleLogin";

export default function Home() {
  return (
    <div>
      <h1>Login with Google</h1>
      <GoogleLoginButton />
    </div>
  );
}
