import { Action } from '@ngrx/store';
import { ProductCart } from '../interfaces/productCart.interface';
import { CarritoAction, CarritoActionTypes } from './carrito.actions';

const initialState: ProductCart[] = [];

export function CarritoReducer(state: ProductCart[] = initialState, incomingAction: Action) {
    const action = incomingAction as CarritoAction;
    switch (action.type) {
        // Add
        case CarritoActionTypes.ADD_ITEM:
            return [...state, action.payload];
        // Delete Single
        case CarritoActionTypes.DELETE_ITEM:
            return state.filter(item => item.product_id !== action.payload);
        // Delete All
        case CarritoActionTypes.DELETE_All_ITEM:
            return [];
        // Update
        case CarritoActionTypes.UPDATE_ITEM:
            const newState = state.map(g => ({ ...g }));
            const newProduct = newState.find(g => g.product_id === action.payload.product_id);
            if (newProduct) {
                newProduct.quantity = action.payload.quantity;
                return [...newState]
            } else {
                return
            }
        default:
            return state;
    }
}
