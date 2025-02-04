import {NextApiHandler} from 'next';

export const withErrorHandler = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      // Standardized error handling
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  };
};
