// app/page.tsx or pages/index.tsx
import GoogleLoginButton from "./GoogleLogin";

export default function Home() {
  return (
    <div className="flex justify-center my-2">
      {/* <h1>Login with Google</h1> */}
      <div className="w-[100px] flex justify-center align-center">
        <GoogleLoginButton />
      </div>
    </div>
  );
}
