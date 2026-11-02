type AccountType = "organizer" | "attendee";
type AuthMode = "sign-in" | "sign-up";

// Public app origin only. Production without an app origin uses local handoff
// routes instead of directing visitors to localhost on their own computers.
export function webAppOrigin(): string | null {
  const configured =
    process.env.NEXT_PUBLIC_WEB_APP_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");
  if (!configured) return null;
  try {
    const origin = new URL(configured);
    if (origin.username || origin.password) return null;
    if (
      origin.protocol !== "https:" &&
      !(
        origin.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(origin.hostname)
      )
    )
      return null;
    return origin.origin;
  } catch {
    return null;
  }
}

export function accountHref(type: AccountType, mode: AuthMode = "sign-up") {
  const path = `/${type}/${mode}`;
  const origin = webAppOrigin();
  return origin ? new URL(path, origin).href : path;
}

export function eventHref(code: string): string | null {
  if (!/^[a-z0-9]{6}$/i.test(code)) return null;
  const origin = webAppOrigin();
  return origin ? new URL(`/${code.toLowerCase()}`, origin).href : null;
}
