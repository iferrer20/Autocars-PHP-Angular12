import { ApiConnectorService } from './../../services/api-connector.service';
import { Component, OnInit } from '@angular/core';
import { Car } from '../car-element/car-element.component';

export interface CarList {
  cars: Car[],
  pages: number
}

export interface CarSearch {
  text?: string,
  categories: string[],
  min_price: number,
  max_price: number,
  max_km?: number,
  order?: string,
  published?: string,
  brand?: string,
  page?: number
}

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  search: CarSearch = {
    page: 1,
    categories: [],
    min_price: 500,
    max_price: 20000
  };
  carlist!: CarList;

  constructor(private service: ApiConnectorService) {
  }
  async searchCars() {
    try {
      this.carlist = await this.service.searchCar(this.search);
    } catch(e) {
      console.log(e);
    }
  }
  onChangePage(page: number) {
    this.search.page = page;
    this.searchCars();
  }

  ngOnInit() {
    this.searchCars();
  }
}
