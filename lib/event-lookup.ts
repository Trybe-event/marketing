import { webAppOrigin } from "./account-links";

export type EventLookupResult =
  | { status: 200; name: string; url: string }
  | { status: 400 | 404 | 503; message: string };

// Only the configured web origin is contacted. Codes cannot supply a destination.
export async function lookupEvent(code: string): Promise<EventLookupResult> {
  const normalizedCode = code.trim().toLowerCase();
  if (!/^[a-z0-9]{6}$/.test(normalizedCode))
    return {
      status: 400,
      message: "Enter the six letters and numbers shared by your organizer.",
    };
  const origin = webAppOrigin();
  if (!origin)
    return {
      status: 503,
      message: "Event lookup is unavailable. Please use your invitation link.",
    };
  try {
    const response = await fetch(new URL(`/api/e/${normalizedCode}`, origin), {
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
      headers: { accept: "application/json" },
    });
    if (response.status === 404)
      return {
        status: 404,
        message: "No event found with this code. Check it with your organizer.",
      };
    if (!response.ok) throw new Error("Event lookup unavailable");
    const event: unknown = await response.json();
    if (
      !event ||
      typeof event !== "object" ||
      !("slug" in event) ||
      event.slug !== normalizedCode ||
      !("name" in event) ||
      typeof event.name !== "string" ||
      !event.name.trim()
    )
      throw new Error("Unexpected event response");
    return {
      status: 200,
      name: event.name,
      url: new URL(`/${normalizedCode}`, origin).href,
    };
  } catch {
    return {
      status: 503,
      message: "We couldn't check this code right now. Please try again.",
    };
  }
}
