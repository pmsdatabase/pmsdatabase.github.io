const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxfD7pmUyQwcYahrfpElgPweGnd99vKecuGHp8U4RWD37h2WeJm4Eshzu0clVDM9fyy/exec";
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
