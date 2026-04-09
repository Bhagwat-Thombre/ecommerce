import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);
  formbuilder = inject(FormBuilder);

  orderStep: number = 0;
  paymentType = 'cash';

  addressForm = this.formbuilder.group({
    address1: [''],
    address2: [''],
    city: [''],
    pincode: [''],
  });

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items || []; // ✅ safe
  }

  sellingPrice(product: Product) {
    const discount = product.discount || 0; // ✅ fix
    return Math.round(product.price - (product.price * discount) / 100);
  }

  addToCart(productId: number | undefined, quantity: number) {
    if (!productId) return; // ✅ fix undefined error

    const result = this.cartService.addToCart(productId, quantity);
    if (result) {
      result.subscribe(() => {
        this.cartService.init();
      });
    }
  }

  get totalAmmount() {
    let amount = 0;

    for (let element of this.cartItems) {
      if (element.product) {
        amount += this.sellingPrice(element.product) * (element.quantity || 0);
      }
    }

    return amount;
  }

  checkout() {
    this.orderStep = 1;
  }

  addAddress() {
    this.orderStep = 2;
  }

  completeOrder() {
    const order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value || {}, // ✅ fix null issue
      date: new Date(),
    };

    this.orderService.addOrder(order).subscribe(() => {
      alert('Your order is completed');
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    });
  }
}
