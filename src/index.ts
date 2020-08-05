import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { startDb } from "./db.ts";
import userRouter from "./controllers/users.ts";
import categoriesRouter from "./controllers/categories.ts";
import elementsRouter from "./controllers/elements.ts";

const app = new Application();
const port = 8080;

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(categoriesRouter.routes());
app.use(categoriesRouter.allowedMethods());

app.use(elementsRouter.routes());
app.use(elementsRouter.allowedMethods());

app.use(oakCors());

app.addEventListener("listen", () => {
  console.log(`API listening on http://localhost:${port}/api`);
  startDb();
});

await app.listen({ port: port });
