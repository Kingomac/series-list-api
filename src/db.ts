import Category from "./models/category.ts";
import Element from "./models/element.ts";
import User from "./models/user.ts";
import { Database, Relationships } from "https://deno.land/x/denodb/mod.ts";

let db;

let elementOwner;

async function startDb() {
  db = new Database("mysql", {
    host: "127.0.0.1",
    username: "root",
    password: "ZcXpQW551IznUhz6",
    port: 3306,
    database: "series-list",
  });
  db.link([User, Category, Element]);
  try {
    await db.sync();
    console.log("Database tables created");
  } catch {
    console.log("Database tables ready");
  }
  console.log("MySQL connected and linked");
}
export { db, startDb };
