import type { RequestCookie, ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

declare module 'next/headers' {
  interface RequestCookies {
    get(name: string): RequestCookie | undefined;
    getAll(): RequestCookie[];
    has(name: string): boolean;
    set(name: string, value: string, options?: ResponseCookie): void;
    delete(name: string): void;
  }

  export function cookies(): RequestCookies;
}
