import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Server-side auth guard for all /app/* routes.
 * The middleware already blocks unauthenticated requests, but this
 * adds a second layer and avoids any client-side flash.
 */
export default async function AppLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("lenzro-session");

  if (!session?.value) {
    redirect("/auth");
  }

  return <>{children}</>;
}
