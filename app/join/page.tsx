import { redirect } from "next/navigation";
import Link from "next/link";
import BrandLogo from "../../components/brand-logo";
import { EventEntry } from "../../components/product-experience";
import { eventHref, webAppOrigin } from "../../lib/account-links";

export default async function Join({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const destination = code ? eventHref(code.trim()) : null;
  if (destination) redirect(destination);
  return (
    <main className="container join-preview">
      <BrandLogo />
      <EventEntry eventOrigin={webAppOrigin()} />
      <Link className="text-link" href="/">
        Back to Trybe
      </Link>
    </main>
  );
}
