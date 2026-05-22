import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonBadge, IonButton, IonSpinner, IonSearchbar,
  IonGrid, IonRow, IonCol, IonSelect, IonSelectOption,
} from '@ionic/angular/standalone';
import { ProductService, Product } from '../services/product';
import { TruncatePipe }    from '../pipes/truncate-pipe';
import { StarsPipe }       from '../pipes/stars-pipe';
import { HighlightDirective } from '../directives/highlight';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    TruncatePipe, StarsPipe, HighlightDirective,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonBadge, IonButton, IonSpinner, IonSearchbar,
    IonGrid, IonRow, IonCol, IonSelect, IonSelectOption,
  ],
})
export class HomePage implements OnInit {
  products: Product[]         = [];
  filteredProducts: Product[] = [];
  categories: string[]        = [];
  isLoading                   = true;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products         = data;
        this.filteredProducts = data;
        this.isLoading        = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (data) => (this.categories = data),
    });
  }

  filterByCategory(event: any) {
    const category = event?.detail?.value;
    if (!category) {
      this.filteredProducts = this.products;
      return;
    }
    this.productService.getProductsByCategory(category).subscribe({
      next: (data) => (this.filteredProducts = data),
    });
  }

  searchProducts(event: any) {
    const term = event?.target?.value?.toLowerCase() ?? '';
    this.filteredProducts = this.products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  goToDetail(id: number) {
    this.router.navigate(['/product-detail', id]);
  }
}