import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ProductCart } from 'src/app/interfaces/productCart.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppState } from '../app-state';
import { AddItemAction, DeleteItemAction, UpdateItemAction } from '../carrito.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  itemsCarrito$: Observable<ProductCart[]>;

  constructor(private store: Store<AppState>, private _firebaseService: FirebaseService) {
    this.itemsCarrito$ = of([])
  }

  ngOnInit(): void {
    this.itemsCarrito$ = this.store.select(store => store.carrito);
  }

  deleteItem(id: string): void {
    this.store.dispatch(new DeleteItemAction(id));
  }

  agregoItem(productCart: ProductCart) {
    const modifProductCart = { ...productCart, quantity: productCart.quantity + 1 }
    this.store.dispatch(new UpdateItemAction(modifProductCart))
  }

  sacoItem(productCart: ProductCart) {
    if (productCart.quantity - 1 == 0)
      this.deleteItem(productCart.product_id)
    else {
      this.deleteItem(productCart.product_id);
      const nuevoProductCart = { ...productCart, quantity: productCart.quantity - 1 }
      this.store.dispatch(new AddItemAction(nuevoProductCart));
    }
  }

  async guardarOrden() {
    this.itemsCarrito$.subscribe(listProducts => {
      listProducts.forEach(element => {
        let newProductCart: ProductCart = {
          cart_id: this._firebaseService.getCarritoId(),
          quantity: element.quantity,
          product: element.product,
          product_id: element.product_id
        }
        this._firebaseService.guardarOrden(newProductCart).then(
          (doc) => console.log('Orden Creada: ', doc.id)
        )
      });
    })
    this._firebaseService.completarCarrito().then(
      () => console.log('Se completo el Carrito')
    )
  }



}
