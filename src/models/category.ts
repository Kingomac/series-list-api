import {
  DataTypes,
  Model,
  Relationships,
} from "https://deno.land/x/denodb/mod.ts";
import Element from "./element.ts";
import User from "./user.ts";

class Category extends Model {
  static table = "categories";
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
    color: {
      type: DataTypes.STRING,
      length: 7,
    },
    user: {
      type: DataTypes.INTEGER,
    },
  };
  static defaults = {
    color: "ffffff",
  };
  static elements() {
    return this.hasMany(Element);
  }
  static user() {
    return this.hasOne(User);
  }
}

export default Category;
