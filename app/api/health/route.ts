// app/api/health/route.ts
export async function GET() {
  const health = {
    uptime: process.uptime(),
    database: await checkDatabase(),
    redis: await checkRedis(),
    email: await checkEmailService(),
    timestamp: Date.now(),
  };

  return Response.json(health);
}
