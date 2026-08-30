import LoginForm from "@/components/account/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return <Suspense fallback={<main className="min-h-[60vh] bg-[#F8F5EF]" />}><LoginForm /></Suspense>;
}
