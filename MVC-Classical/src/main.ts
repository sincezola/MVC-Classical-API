import { ApiExpress } from "./api/express/api.express";
import dotenv from "dotenv";
import { ProductController } from "./api/express/controllers/product.controller";

dotenv.config();

const main = () => {
  const api = ApiExpress.build();

  const port = process.env.PORT || 3333;

  const controller = ProductController.build();

  api.addGetRoute("/products", controller.list);
  api.addPostRoute("/products/:id/buy", controller.buy);
  api.addPostRoute("/products/:id/sell", controller.sell);
  api.addPostRoute("/products/create", controller.create);

  api.start(port);
};
main();
