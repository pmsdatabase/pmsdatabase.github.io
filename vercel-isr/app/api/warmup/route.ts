const ENDPOINTS = [
  "/pmsdatabase",
  "/insane_pmsdatabase",
];

export async function GET(request: Request) {
  const base = new URL(request.url).origin;
  await Promise.all(
    ENDPOINTS.map((path) => fetch(`${base}${path}`))
  );
  return new Response("warmed", { status: 200 });
}