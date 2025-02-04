import {BaseResponse} from '@/types/common';
import {NextApiRequest, NextApiResponse} from 'next';
import {ZodError, ZodSchema} from 'zod';

export const withValidation = <T>(schema: ZodSchema<T>) => {
  return async (req: NextApiRequest) => {
    try {
      return await schema.parseAsync(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(error.errors.map(e => e.message).join(', '));
      }
      throw error;
    }
  };
};

export const withErrorHandler = <T>(
  handler: (req: NextApiRequest, res: NextApiResponse<BaseResponse<T>>) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse<BaseResponse<T>>) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      res.status(500).json({data: null as T, error: message});
    }
  };
};

export const withAuth = <T>(
  handler: (req: NextApiRequest, res: NextApiResponse<BaseResponse<T>>) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse<BaseResponse<T>>) => {
    try {
      // Add your auth check here
      const user = req.headers.authorization;
      if (!user) {
        res.status(401).json({data: null as T, error: 'Unauthorized'});
        return;
      }
      await handler(req, res);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      res.status(500).json({data: null as T, error: message});
    }
  };
};
