"use client";

import { AuthForm } from "@/components/ui/auth-form";

export default function AuthPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Account Access</h1>
      <AuthForm />
    </div>
  );
}
