import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "../components/brand-logo";
import { BrandMark } from "../components/brand-mark";

export const metadata: Metadata = {
  title: "404 page · Trybe",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="marketing-not-found">
      <header>
        <BrandLogo />
      </header>
      <main>
        <div className="marketing-not-found-number" aria-hidden="true">
          <span>4</span>
          <span className="marketing-not-found-mark">
            <BrandMark />
          </span>
          <span>4</span>
        </div>
        <p className="marketing-not-found-label">PAGE NOT FOUND</p>
        <h1>This connection leads somewhere else.</h1>
        <p>
          The page may have moved, or the link may be incomplete. Let’s get you
          back to your people.
        </p>
        <Link href="/" className="marketing-not-found-home">
          Back to Trybe
        </Link>
      </main>
      <footer>Fostering connection with convenience.</footer>
    </div>
  );
}
