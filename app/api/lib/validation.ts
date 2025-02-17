import { z } from 'zod'
import { ApiError } from './error-handler'

export async function validateRequest<T extends z.ZodType>(schema: T, request: Request): Promise<z.infer<T>> {
  try {
    const body = await request.json()
    return schema.parse(body)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, 'Validation error', 'VALIDATION_ERROR', error.errors)
    }
    throw new ApiError(400, 'Invalid request body')
  }
}

export function validateQuery<T extends z.ZodType>(schema: T, searchParams: URLSearchParams): z.infer<T> {
  const queryObj = Object.fromEntries(searchParams.entries())
  try {
    return schema.parse(queryObj)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, 'Validation error', 'VALIDATION_ERROR', error.errors)
    }
    throw new ApiError(400, 'Invalid query parameters')
  }
}
