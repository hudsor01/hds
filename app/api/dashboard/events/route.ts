export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      let isControllerClosed = false

      const ping = () => {
        try {
          if (!isControllerClosed) {
            controller.enqueue(encoder.encode('event: ping\ndata: ping\n\n'))
          }
        } catch (error) {
          isControllerClosed = true
          console.error(
            `Controller error: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        }
      }

      // Send initial ping
      ping()

      // Send ping every 30 seconds to keep connection alive
      const pingInterval = setInterval(ping, 30000)

      // Clean up on close
      return () => {
        isControllerClosed = true
        clearInterval(pingInterval)
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}
