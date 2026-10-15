type AccountType = "organizer" | "attendee";
type AuthMode = "sign-in" | "sign-up";

// Public app origin only. Production without an app origin uses local handoff
// routes instead of directing visitors to localhost on their own computers.
export function accountHref(type: AccountType, mode: AuthMode = "sign-up") {
  const path = `/${type}/${mode}`;
  const configured =
    process.env.NEXT_PUBLIC_WEB_APP_URL ||
    (process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : "");
  if (!configured) return path;
  try {
    const origin = new URL(configured);
    if (origin.username || origin.password) return path;
    if (
      origin.protocol !== "https:" &&
      !(
        origin.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(origin.hostname)
      )
    )
      return path;
    return new URL(path, origin.origin).href;
  } catch {
    return path;
  }
}
