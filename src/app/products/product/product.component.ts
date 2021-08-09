import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/carrito/app-state';
import { AddItemAction } from 'src/app/carrito/carrito.actions';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from '../../interfaces/product.interface';
import { ProductCart } from '../../interfaces/productCart.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() producto!: Product;
  constructor(private store: Store<AppState>, private _firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  agregarCarrito(producto: Product) {
    const nuevoProductCart = {
      product_id: producto.id,
      cart_id: this._firebaseService.getCarritoId(),
      quantity: 1,
      product: producto,
    } as ProductCart;

    this.store.dispatch(new AddItemAction(nuevoProductCart));
  }

}
