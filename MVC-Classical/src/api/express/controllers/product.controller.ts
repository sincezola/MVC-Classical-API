import type { Request, Response } from "express";
import { ProductRepositoryPrisma } from "../../../repositories/product/prisma/product.repository.prisma";
import { prisma } from "../../../util/prisma.util";
import { ProductServiceImplementation } from "../../../services/product/implementation/product.service.implementation";

export class ProductController {
  private constructor() {}

  public static build() {
    return new ProductController();
  }

  public async create(req: Request, res: Response) {
    const { name, price } = req.body;

    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const output = await aService.create(name, price);

    const data = {
      id: output.id,
      name,
      price,
      balance: output.balance,
    };

    res.status(201).json(data).send();
  }

  public async list(_req: Request, res: Response) {
    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const output = await aService.list();

    const data = {
      products: output.products,
    };

    res.status(200).json(data).send();
  }

  public async buy(req: Request, res: Response) {
    const { id } = req.params;

    const { amount } = req.body;

    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const output = await aService.buy(id, amount);

    const data = {
      id: output.id,
      balance: output.balance,
    };

    res.status(200).json(data).send();
  }

  public async sell(req: Request, res: Response) {
    const { id } = req.params;

    const { amount } = req.body;

    const aRepository = ProductRepositoryPrisma.build(prisma);
    const aService = ProductServiceImplementation.build(aRepository);

    const output = await aService.sell(id, amount);

    const data = {
      id: output.id,
      balance: output.balance,
    };

    res.status(200).json(data).send();
  }
}
