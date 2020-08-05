import { Router } from "https://deno.land/x/oak/mod.ts";
import Category from "../models/category.ts";
import User from "../models/user.ts";

const categoriesRouter = new Router({ prefix: "/api/category" });

categoriesRouter
  .get("/all", async ({ request, response }) => {
    const categs = await Category.all();
    response.headers.set("Content-type", "application/json");
    response.body = categs;
  })
  .get("/from/:user", async ({ request, response, params }) => {
    if (params.id !== undefined) {
      try {
        const categs = await Category.where("user", params.id).all();
        response.headers.set("Content-type", "application/json");
        response.body = categs;
      } catch (e) {
        response.body = e;
      }
    } else {
      response.body = "User ID is undefined";
    }
  })
  .post("/", async ({ request, response }) => {
    const req = await request.body({ type: "json" }).value;
    if (req.name !== undefined && req.user !== undefined) {
      try {
        await Category.create(req);
        response.body = "Category created successfully";
      } catch (e) {
        response.body = e;
      }
    } else {
      response.body = "Request body is missing name or user";
    }
  })
  .delete("/:id", async ({ request, response, params }) => {
    if (params.id !== undefined) {
      try {
        await Category.deleteById(params.id);
        response.body = "Deleted successfully";
      } catch (e) {
        response.body = e;
      }
    } else {
      response.body = "Id undefined";
    }
  });

export default categoriesRouter;
