import { handle } from "hono/cloudflare-pages";
import { app } from "../../src/server/api";

export const onRequest = handle(app);
