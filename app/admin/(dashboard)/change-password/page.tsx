"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { FormAlert } from "@/components/forms/form-alert";
import { PasswordInput } from "@/components/forms/password-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { adminChangePassword } from "@/lib/api/auth";
import { adminChangePasswordSchema, type AdminChangePasswordFormValues } from "@/lib/validations/admin-change-password";
import { getErrorMessage } from "@/lib/utils/errors";

export default function ChangePasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminChangePasswordFormValues>({
    resolver: zodResolver(adminChangePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: AdminChangePasswordFormValues) => {
    setMessage("");
    setError("");
    try {
      const response = await adminChangePassword(values);
      setMessage(response.message);
      reset();
    } catch (submissionError) {
      setError(getErrorMessage(submissionError, "Unable to change password."));
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <AdminPageHeader title="Change Password" description="Update the password used to access your admin account." />
      <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-7">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {error && <FormAlert variant="error" message={error} onClose={() => setError("")} />}
          {message && <FormAlert variant="success" message={message} />}
          <PasswordInput {...register("currentPassword")} label="Current Password" autoComplete="current-password" error={errors.currentPassword?.message} />
          <PasswordInput {...register("newPassword")} label="New Password" autoComplete="new-password" error={errors.newPassword?.message} />
          <PasswordInput {...register("confirmPassword")} label="Confirm New Password" autoComplete="new-password" error={errors.confirmPassword?.message} />
          <SubmitButton loading={isSubmitting} loadingText="Updating password...">Update Password</SubmitButton>
        </form>
      </section>
    </div>
  );
}
