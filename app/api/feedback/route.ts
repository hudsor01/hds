import {sql} from '@vercel/postgres';

export async function POST(req: Request) {
  const {type, message, metadata} = await req.json();
  await sql`
    INSERT INTO feedback (type, message, metadata)
    VALUES (${type}, ${message}, ${JSON.stringify(metadata)})
  `;
}
