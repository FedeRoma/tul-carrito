import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Cart } from 'src/app/interfaces/cart.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  listproductos: Product[] = [];

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    if (!this._firebaseService.getCarritoId())
      this.guardarCarrito();
  }

  obtenerProductos() {
    this._firebaseService.obtenerProductos().subscribe(doc => {
      this.listproductos = [];
      doc.forEach((element: any) => {
        this.listproductos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  guardarCarrito() {
    const newCarrito: Cart = { status: 'pending' }
    this._firebaseService.guardarCarrito(newCarrito).then((doc) => {
      console.log('Carrito Registrado:', doc.id)
      this._firebaseService.setCarritoId(doc.id)
    })
  }

}
