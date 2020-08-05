import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";
import Category from "./category.ts";
import Element from "./element.ts";

class User extends Model {
  static table = "users";
  static timestamps = true;
  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
    },
  };
}

export default User;
