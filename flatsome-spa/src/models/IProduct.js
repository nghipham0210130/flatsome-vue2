export class IProduct {
    id: string;
    title: string ; 
    productItems: IProductItem[]; 
    isCategoryChild: boolean;
}

export class IProductItem {
    id: number;
    name: string;
    category: Category;
    price: number;
    amountAvailable: number;
    img: Image;
}

// catergory id to use Sidebar section
export class ICategory {
    id: number;
    idCategory: string;
    isChild: boolean;
}

export interface IImage{
    name : string;
    src : string;
}
