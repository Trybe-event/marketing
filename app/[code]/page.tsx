import { notFound, redirect } from "next/navigation";
import { eventHref } from "../../lib/account-links";

export default async function EventInvitation({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const destination = eventHref(code);
  if (!destination) notFound();
  redirect(destination);
}
