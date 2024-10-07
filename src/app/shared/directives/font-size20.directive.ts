import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFontSize20]'
})
export class FontSize20Directive implements OnInit{

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.fontSize = '20px'
  }
}
