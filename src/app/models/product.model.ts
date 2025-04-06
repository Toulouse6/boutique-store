import AttributeModel from "./attribute.model";

class ProductModel {
    id: string;
    title: string;
    description: string;
    images: { title: string; url: string }[];
    min_price: number;
    max_price: number;
    attributes: AttributeModel[];
    createdAt?: string;

    constructor(data: any = {}) {
        this.id = data.id || "";
        this.title = data.title || "";
        this.description = data.description || "";
        this.images = data.images || [];
        this.min_price = data.min_price || 0;
        this.max_price = data.max_price || 0;
        this.attributes = (data.attributes || []).map((a: any) => new AttributeModel(a));
        this.createdAt = data.createdAt || undefined;
    }

    // Get formatted price
    getPriceRange(): string {
        return `${this.min_price} - ${this.max_price}`;
    }
}

export default ProductModel;

