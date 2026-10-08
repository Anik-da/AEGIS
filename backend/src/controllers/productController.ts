import { Request, Response } from 'express';
import { productService } from '../services/commerce/productService.js';
import { randomUUID } from 'crypto';

export class ProductController {
  public async getProducts(req: Request, res: Response): Promise<void> {
    const { category, brand, minPrice, maxPrice, inStock, search, sortBy, page, limit } = req.query;

    const result = await productService.getProducts({
      category: category as string,
      brand: brand as string,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      inStock: inStock === 'true' ? true : inStock === 'false' ? false : undefined,
      search: search as string,
      sortBy: sortBy as any,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20
    });

    res.json({ success: true, data: result });
  }

  public async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        error: { code: 'PRODUCT_NOT_FOUND', message: `Product with ID ${id} not found.` }
      });
      return;
    }

    res.json({ success: true, data: { product } });
  }

  public async search(req: Request, res: Response): Promise<void> {
    const { q } = req.query;
    const result = await productService.getProducts({
      search: q as string,
      limit: 15
    });

    res.json({ success: true, data: result });
  }

  public async getCategories(req: Request, res: Response): Promise<void> {
    const categories = await productService.getCategories();
    res.json({ success: true, data: { categories } });
  }

  public async getRecommendations(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const recommendations = await productService.getRecommendations(id);
    res.json({ success: true, data: { recommendations } });
  }

  public async adminCreateProduct(req: Request, res: Response): Promise<void> {
    const productData = req.body;
    const id = productData.id || `prod_${randomUUID().slice(0, 8)}`;
    const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const created = await productService.createProduct({
      ...productData,
      id,
      slug
    });

    res.status(201).json({ success: true, data: { product: created } });
  }

  public async adminUpdateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updated = await productService.updateProduct(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found.' } });
      return;
    }
    res.json({ success: true, data: { product: updated } });
  }

  public async adminDeleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found.' } });
      return;
    }
    res.json({ success: true, data: { message: 'Product soft-deleted successfully.' } });
  }
}

export const productController = new ProductController();
