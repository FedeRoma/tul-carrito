import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/carrito/app-state';
import { ProductCart } from '../../../interfaces/productCart.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cantidadItems: Observable<number>;

  constructor(private store: Store<AppState>) { 
    this.cantidadItems = of(0)
  }

  ngOnInit(): void {
    this.cantidadItems = this.store.select(store => store.carrito.length);
  }

}
