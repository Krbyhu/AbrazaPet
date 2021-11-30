import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  slideOptions = {
    direction: 'vertical',
  };

  constructor(private router: Router) {}
  
  usr_name: string;

  pets = [
    {
      image: 'https://www.encancha.cl/u/fotografias/m/2021/1/11/f850x638-62917_140406_3027.png',
      name: 'Cheems',
      descripcion: 'orem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu in magna bibendum iaculis non id metus.',
      tipo: 'Ayudar',
      distancia: '10 Km'
    },
    {
      image: 'https://www.alfadog.cl/wp-content/uploads/2021/04/perros1.png',
      name: 'AlfaDog',
      descripcion: 'orem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu in magna bibendum iaculis non id metus.',
      tipo: 'Comprar',
      distancia: ''
    },
    {
      image: 'https://www.ecestaticos.com/imagestatic/clipping/797/767/79776773aab795837282c7d4947abaf7/por-que-nos-parece-que-los-perros-sonrien-una-historia-de-30-000-anos.jpg?mtime=1622645511',
      name: 'Perrito chiquito',
      descripcion: 'orem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec arcu in magna bibendum iaculis non id metus.',
      tipo: 'Adoptar',
      distancia: '5 Km'
    },
  ]

  ngOnInit() {
    this.usr_name = localStorage.getItem('usr_name');
    console.log(this.usr_name)
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  goTo() {
    this.router.navigate(['/chat-list', this.usr_name]);
  }

}
