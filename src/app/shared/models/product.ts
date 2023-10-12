import { ProductCategory } from "./product-category";

export interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: string;
    lastUpdated: string;
    category: ProductCategory;
}