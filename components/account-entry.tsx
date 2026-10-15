import { redirect } from "next/navigation";

import { accountHref } from "../lib/account-links";
import EntryPage from "./entry-page";

// Keeps marketing links stable while the product app has its own origin. Once
// NEXT_PUBLIC_WEB_APP_URL is configured, these routes hand off to the app.
export default function AccountEntry({
  organizer = false,
  signIn = false,
}: {
  organizer?: boolean;
  signIn?: boolean;
}) {
  const target = accountHref(
    organizer ? "organizer" : "attendee",
    signIn ? "sign-in" : "sign-up",
  );
  if (target.startsWith("http")) redirect(target);
  return <EntryPage organizer={organizer} />;
}
