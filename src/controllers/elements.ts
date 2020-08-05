import { Router } from "https://deno.land/x/oak/mod.ts";
import Category from "../models/category.ts";
import Element from "../models/element.ts";
import User from "../models/user.ts";

const elementsRouter = new Router({ prefix: "/api/element" });

elementsRouter
  .post("/", async ({ request, response }) => {
    const element = await request.body({ type: "json" }).value;
    try {
      await Element.create(element);
      response.body = "Element created successfully";
    } catch (e) {
      response.body = e;
    }
  })
  .get("/category/:category", async ({ request, response, params }) => {
    if (params.category !== undefined) {
      const elements = await Element.where("category", params.category).all();
      response.headers.set("Content-type", "application/json");
      response.body = elements;
    } else {
      response.body = "Category id undefined";
    }
  })
  .get("/user/:user", async ({ request, response, params }) => {
    if (params.user !== undefined) {
      try {
        const categories: number[] = await Category.where("user", params.user)
          .all();
        let result: any[] = [];
        categories.forEach(async (c) => {
          const categ = await Category.find(c);
          result.push(categ);
        });
        response.headers.set("Content-type", "application/json");
        response.body = JSON.stringify(result);
      } catch (e) {
        response.body = e;
      }
    }
  });

export default elementsRouter;
