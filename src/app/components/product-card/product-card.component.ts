import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() title: string;
  @Input() imgSrc: string;
  @Input() price: number;

  constructor() { }

  ngOnInit() {}

}
