import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appRowShadow]'
})
export class RowShadowDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('rgba(160,232,253,0.25)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
