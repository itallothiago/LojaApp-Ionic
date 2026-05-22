import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  private traducoes: { [id: number]: { title: string; description: string } } = {
    1: {
      title: 'Mochila Fjallraven Foldable N°1 — Cabe Notebook 15"',
      description: 'Sua mochila de dia perfeita, agora com mais espaço para o seu laptop. Com compartimento acolchoado e alças ergonômicas, ideal para uso diário no trabalho ou faculdade.',
    },
    2: {
      title: 'Camiseta Masculina Premium Slim Fit',
      description: 'Camiseta casual masculina slim fit de alta qualidade. Tecido macio e confortável, perfeita para o dia a dia. Disponível em diversas cores.',
    },
    3: {
      title: 'Jaqueta de Algodão Masculina',
      description: 'Jaqueta masculina casual de algodão. Excelente para dias frios, com acabamento premium e estilo moderno que combina com qualquer look.',
    },
    4: {
      title: 'Calça Jeans Masculina Slim Fit',
      description: 'Calça jeans masculina slim fit casual. Modelagem moderna e confortável, feita com tecido de alta durabilidade para o uso diário.',
    },
    5: {
      title: 'Pulseira Feminina John Hardy — Ouro e Prata Dragão',
      description: 'Pulseira artesanal feminina banhada em ouro e prata com design de dragão Naga. Peça única feita à mão, símbolo de elegância e tradição.',
    },
    6: {
      title: 'Anel Solitário em Ouro Maciço com Micropavê',
      description: 'Anel delicado em ouro maciço com pedras em micropavê. Design refinado e atemporal, perfeito para presentear ou para uso no dia a dia.',
    },
    7: {
      title: 'Anel Princesa Banhado em Ouro Branco',
      description: 'Anel estilo princesa banhado em ouro branco com pedra central cravejada. Elegante e sofisticado, ideal para ocasiões especiais.',
    },
    8: {
      title: 'Brinco Duplo Piercing Banhado em Ouro Rosê',
      description: 'Brinco piercing duplo em aço inoxidável banhado a ouro rosê. Design moderno e resistente, perfeito para quem gosta de estilo urbano.',
    },
    9: {
      title: 'HD Externo Portátil WD 2TB — USB 3.0',
      description: 'HD externo portátil Western Digital de 2TB com interface USB 3.0. Compacto, rápido e confiável para armazenar seus arquivos, fotos e vídeos com segurança.',
    },
    10: {
      title: 'SSD Interno SanDisk 1TB — SATA III 6 Gb/s',
      description: 'SSD interno SanDisk de 1TB com tecnologia SATA III. Velocidade de leitura e escrita superior, ideal para acelerar seu computador e jogos.',
    },
    11: {
      title: 'SSD Interno Silicon Power 256GB — 3D NAND SATA III',
      description: 'SSD de 256GB com tecnologia 3D NAND e cache SLC para maior performance. Formato 2.5" compatível com notebooks e desktops.',
    },
    12: {
      title: 'HD Externo WD 4TB — Para PlayStation 4',
      description: 'HD externo portátil WD de 4TB desenvolvido especialmente para PlayStation 4. Expanda seu armazenamento e instale mais jogos sem complicação.',
    },
    13: {
      title: 'Monitor Acer 21,5" Full HD IPS Ultra Fino',
      description: 'Monitor Acer de 21,5 polegadas com resolução Full HD 1920x1080 e painel IPS. Design ultra fino, cores vibrantes e ângulo de visão amplo.',
    },
    14: {
      title: 'Monitor Gamer Samsung 49" Curvo CHG90 144Hz',
      description: 'Monitor gamer Samsung ultrawide de 49 polegadas com taxa de atualização de 144Hz e tela curva. Experiência de imersão total para jogos e entretenimento.',
    },
    15: {
      title: 'Jaqueta Feminina 3 em 1 para Neve — Inverno',
      description: 'Jaqueta feminina snowboard 3 em 1 para o inverno. Camada externa impermeável e forro removível. Proteção completa contra frio e vento.',
    },
    16: {
      title: 'Jaqueta Feminina Estilo Motociclista com Capuz',
      description: 'Jaqueta feminina em couro sintético estilo motociclista com capuz removível. Visual moderno e atitude, perfeita para o dia a dia urbano.',
    },
    17: {
      title: 'Corta-Vento Feminino Listrado — À Prova de Chuva',
      description: 'Jaqueta corta-vento feminina com proteção contra chuva. Leve e estilosa, ideal para trilhas, esportes ao ar livre ou uso urbano em dias chuvosos.',
    },
    18: {
      title: 'Blusa Feminina Manga Curta Decote Barco',
      description: 'Blusa feminina sólida com manga curta e decote barco. Tecido leve e confortável, perfeita para looks casuais e despojados no dia a dia.',
    },
    19: {
      title: 'Camiseta Feminina Dry-Fit Manga Curta',
      description: 'Camiseta feminina de tecido dry-fit que absorve a umidade. Ideal para atividades físicas, yoga, caminhada ou uso casual no verão.',
    },
    20: {
      title: 'Camiseta Feminina Casual 100% Algodão',
      description: 'Camiseta feminina casual de algodão com manga curta. Modelagem solta e confortável, ótima para o dia a dia com muito estilo e leveza.',
    },
  };

  private categorias: { [key: string]: string } = {
    "electronics":        "Eletrônicos",
    "jewelery":           "Joias",
    "men's clothing":     "Roupas Masculinas",
    "women's clothing":   "Roupas Femininas",
  };

  constructor(private http: HttpClient) {}

  private traduzir(produto: Product): Product {
    const t = this.traducoes[produto.id];
    const cat = this.categorias[produto.category] ?? produto.category;
    return {
      ...produto,
      title:       t?.title       ?? produto.title,
      description: t?.description ?? produto.description,
      category:    cat,
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(map((lista) => lista.map((p) => this.traduzir(p))));
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(map((p) => this.traduzir(p)));
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}/categories`)
      .pipe(map((cats) => cats.map((c) => this.categorias[c] ?? c)));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const catEn = Object.entries(this.categorias).find(
      ([, v]) => v === category
    )?.[0] ?? category;

    return this.http
      .get<Product[]>(`${this.apiUrl}/category/${catEn}`)
      .pipe(map((lista) => lista.map((p) => this.traduzir(p))));
  }
}