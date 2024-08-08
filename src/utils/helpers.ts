import crypto from 'crypto';
import { ValidationOptions } from '../api/middlewares/validateUser';

export const generateRandomHex = (num: number = 8): string => {
  return crypto.randomBytes(num).toString('hex');
};

export function formatResponseData(
  result: boolean,
  data?: any,
  message?: string,
  schemas?: any
) {
  return {
    success: result,
    data,
    schemas,
    message: message ?? 'Request fulfilled successfully',
  };
}

export function getSecretKey(val?: ValidationOptions['secretType']) {
  switch (val) {
    case 'access':
      return process.env.ACCESS_SECRET_KEY;
    default:
      return process.env.ACCESS_SECRET_KEY;
  }
}

export function removePrefix(input: string, prefix: string): string {
  if (input.startsWith(prefix)) {
    return input.slice(prefix.length);
  }
  return input;
}

export function calculatePagination({
  size,
  page,
}: {
  page?: string;
  size?: string;
}): { offset: number; limit: number } {
  const pageNumber = page ? parseInt(page) : 1;
  const limitNumber = size ? parseInt(size) : 100;
  const offset = (pageNumber - 1) * limitNumber;
  return { offset, limit: limitNumber };
}
