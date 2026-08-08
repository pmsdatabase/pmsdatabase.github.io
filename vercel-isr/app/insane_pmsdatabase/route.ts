const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxxIG6DRM_yFNYV6yMWGhZusbcGNGoZmVKOVcANDge7ayL_WemCfKthT0_qmdKdXc-z/exec";
export const revalidate = 300;

export async function GET() {
  const res = await fetch(GAS_URL, {
    redirect: "follow",
    next: { revalidate: 300 },
  });
  const data = await res.text();
  return new Response(data, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
