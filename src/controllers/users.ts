import { Router } from "https://deno.land/x/oak/mod.ts";
import User from "../models/user.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

const userRouter = new Router({ prefix: "/api/user" });

userRouter
  .post("/", async ({ request, response }) => {
    const result = request.body({ type: "json" });
    const userReq = await result.value;
    if (userReq.name !== undefined && userReq.password !== undefined) {
      try {
        await User.create({
          name: userReq.name,
          password: await bcrypt.hash(userReq.password),
        });
        response.body = `User: ${userReq.name} created successfully`;
      } catch (e) {
        response.body = `Something went wrong: ${e}`;
      }
    } else {
      response.body = "Use name or password missing";
    }
  })
  .delete("/:id", async ({ request, response, params }) => {
    if (params.id !== undefined) {
      try {
        await User.deleteById(Number.parseInt(params.id));
        response.body = "Deleted successfully";
      } catch (e) {
        response.body = e;
      }
    } else {
      response.body = "Insert an ID";
    }
  })
  .get("/find/:search", async ({ request, response, params }) => {
    if (params.search !== undefined) {
      try {
        const find = Number.parseInt(params.search);
        const user = await User.find(find);
        response.headers.set("Content-type", "application/json");
        response.body = user;
      } catch (e) {
        response.body = e;
      }
    } else {
      response.body = "Search parameter is undefined";
    }
  });

export default userRouter;
