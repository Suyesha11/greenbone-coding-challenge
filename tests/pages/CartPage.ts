import {Page , Locator , expect} from "@playwright/test";
export class CartPage {
    private readonly page:Page;
    private readonly inventoryName:Locator;

    constructor(page:Page){
        this.page = page;
        this.inventoryName = page.getByTestId('inventory-item-name');
    }

    async verifyProductInCart(productName:string){
        const cartItem = this.inventoryName;
        await expect(cartItem).toContainText(productName);
    }

    async proceedToCheckout(){
        await this.page.getByRole('button',{name:'Checkout'}).click();
    }

    
}