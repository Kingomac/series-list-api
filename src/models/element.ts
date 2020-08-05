import { Model, DataTypes } from "https://deno.land/x/denodb/mod.ts";
import { Relationships } from "https://deno.land/x/denodb/mod.ts";
import User from "./user.ts";
import Category from "./category.ts";

class Element extends Model {
  static table = "elements";
  static timestamps = true;
  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    chapter: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.INTEGER,
    },
  };
}

export default Element;
