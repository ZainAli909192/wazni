import { signOut } from "next-auth/react";

export async function clearAdminSession(): Promise<void> {
  await signOut({ redirect: false });
}
