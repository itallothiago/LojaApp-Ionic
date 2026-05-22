import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input() appHighlight: string = '#e8f4fd';

  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  @HostBinding('style.transform')       transform        = 'scale(1)';
  @HostBinding('style.transition')      transition       = 'all 0.25s ease';
  @HostBinding('style.cursor')          cursor           = 'pointer';

  @HostListener('mouseenter') onEnter() {
    this.backgroundColor = this.appHighlight;
    this.transform = 'scale(1.02)';
  }
  @HostListener('mouseleave') onLeave() {
    this.backgroundColor = 'transparent';
    this.transform = 'scale(1)';
  }
}