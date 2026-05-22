import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonSpinner, IonBadge, IonIcon,
  IonBackButton, IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline } from 'ionicons/icons';
import { ProductService, Product } from '../services/product';
import { TruncatePipe }       from '../pipes/truncate-pipe';
import { StarsPipe }          from '../pipes/stars-pipe';
import { HighlightDirective } from '../directives/highlight';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe, StarsPipe, HighlightDirective,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonSpinner, IonBadge, IonIcon,
    IonBackButton, IonButtons,
  ],
})
export class ProductDetailPage implements OnInit {
  product: Product | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,       // lê parâmetros da rota
    private productService: ProductService,
    private navCtrl: NavController
  ) {
    addIcons({ cartOutline, heartOutline });
  }

  ngOnInit() {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product  = data;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  voltar() {
    this.navCtrl.back();
  }

  addToCart() {
    alert(`"${this.product?.title}" adicionado ao carrinho! 🛒`);
  }
}