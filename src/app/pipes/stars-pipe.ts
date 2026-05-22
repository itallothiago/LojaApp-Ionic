import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stars', standalone: true })
export class StarsPipe implements PipeTransform {
  transform(rate: number, maxStars: number = 5): string {
    if (rate == null || rate < 0) return '☆☆☆☆☆';
    const full = Math.min(Math.round(rate), maxStars);
    const empty = maxStars - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }
}