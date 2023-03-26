import { Product } from "./types";

export function CheckIsSelected(selectedProducts: Product[], product: Product) {
    return selectedProducts.some(item => item.id === product.id);
}

export function formatPrice(price: number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        // Não precisou porque já trouxe os 2 "0" depois da vírgula
        //minimumFractionDigits: 2
    });
    return formatter.format(price);
}