import RegisterForm from "@/components/account/register-form";
import { Suspense } from "react";

export default function RegisterPage() {
  return <Suspense fallback={<main className="min-h-[60vh] bg-[#F8F5EF]" />}><RegisterForm /></Suspense>;
}
