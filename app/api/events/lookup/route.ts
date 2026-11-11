import { lookupEvent } from "../../../../lib/event-lookup";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  const result = await lookupEvent(code);
  return Response.json(result, {
    status: result.status,
    headers: { "Cache-Control": "no-store" },
  });
}
