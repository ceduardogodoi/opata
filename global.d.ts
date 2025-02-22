declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_OPTIONS: string;
    NODE_ENV: "development" | "production" | "test";
    VERCEL_ORG_ID: string;
    VERCEL_PROJECT_ID: string;
    VERCEL_TOKEN: string;
    JWT_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
