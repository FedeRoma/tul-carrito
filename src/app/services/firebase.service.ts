import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart.interface';
import { ProductCart } from '../interfaces/productCart.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private carritoId: string = '';

  constructor(private _firestore: AngularFirestore) { }

  guardarCarrito(carrito: Cart): Promise<any> {
    return this._firestore.collection('carts').add(carrito);
  }

  completarCarrito(): Promise<any> {
    return this._firestore.collection('carts').doc(this.carritoId).update({ 'status': 'completed' })
  }

  guardarOrden(order: ProductCart): Promise<any> {
    return this._firestore.collection('product_carts').add(order);
  }

  obtenerProductos(): Observable<any> {
    return this._firestore.collection('products').snapshotChanges();
  }

  setCarritoId(id: string) {
    this.carritoId = id;
  }

  getCarritoId() {
    return this.carritoId;
  }

  obtenerUsers(): Observable<any> {
    return this._firestore.collection('users').snapshotChanges()
  }

  // eliminarTarjeta(id: string): Promise<any> {
  //   return this.firestore.collection('tarjetas').doc(id).delete();
  // }

  // editarTarjeta(id: string, tarjeta: any): Promise<any> {
  //   return this.firestore.collection('tarjetas').doc(id).update(tarjeta);
  // }

  // addTarjetaEdit(tarjeta: TarjetaCredito) {
  //   this.tarjeta$.next(tarjeta);
  // }

  // getTarjetaEdit(): Observable<TarjetaCredito> {
  //   return this.tarjeta$.asObservable();
  // }
}
