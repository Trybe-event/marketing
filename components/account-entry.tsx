import { redirect } from "next/navigation";
import EntryPage from "./entry-page";
import { accountHref } from "../lib/account-links";

// Keep marketing links stable while the product app has a separate origin.
// Production handoff is enabled only after a deployed app URL is configured.
export default function AccountEntry({organizer=false, signIn=false}:{organizer?:boolean;signIn?:boolean}) {
 const target = accountHref(organizer ? "organizer" : "attendee", signIn ? "sign-in" : "sign-up");
 if (target.startsWith("http")) redirect(target);
 return <EntryPage organizer={organizer}/>;
}
