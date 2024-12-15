export default async function Login() {
  return new Response(JSON.stringify({ message: "Login successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
