import { Action } from '@ngrx/store';
import { ProductCart } from '../interfaces/productCart.interface';

export enum CarritoActionTypes {
    ADD_ITEM = '[Carrito] Add Item',
    DELETE_ITEM = '[Carrito] Delete Item',
    DELETE_All_ITEM = '[Carrito] Delete All Item',
    UPDATE_ITEM = '[Carrito] Update Item'
}

// Add
export class AddItemAction implements Action {
    readonly type = CarritoActionTypes.ADD_ITEM;
    constructor(public payload: ProductCart) { }
}
// Delete Single
export class DeleteItemAction implements Action {
    readonly type = CarritoActionTypes.DELETE_ITEM;
    constructor(public payload: string) { }
}
// Delete All
export class DeleteAllItemAction implements Action {
    readonly type = CarritoActionTypes.DELETE_All_ITEM;
    constructor() { }
}
// Update
export class UpdateItemAction implements Action {
    readonly type = CarritoActionTypes.UPDATE_ITEM;
    constructor(public payload: ProductCart) { }
}

export type CarritoAction =
    AddItemAction |
    DeleteItemAction |
    DeleteAllItemAction |
    UpdateItemAction;
