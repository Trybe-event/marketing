import { redirect } from "next/navigation";
import Link from "next/link";
import BrandLogo from "../../components/brand-logo";
import { EventEntry } from "../../components/product-experience";
import { webAppOrigin } from "../../lib/account-links";
import { lookupEvent } from "../../lib/event-lookup";

export default async function Join({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const result = typeof code === "string" ? await lookupEvent(code) : null;
  if (result?.status === 200) redirect(result.url);
  return (
    <main className="container join-preview">
      <BrandLogo />
      {result && <p role="status">{result.message}</p>}
      <EventEntry eventOrigin={webAppOrigin()} />
      <Link className="text-link" href="/">
        Back to Trybe
      </Link>
    </main>
  );
}
