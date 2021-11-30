import { Component, OnInit } from '@angular/core';

declare var google;

interface Marker {
  lat: number;
  lng: number;
  title: string;
  image: string;
  name: string;
  text: string;
  phone: string;
  Hor: string;
  markerObj?: any;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  map = null;
  markers: Marker[] = [
    {
      lat: -33.017297664753016,
      lng: -71.55425244508612,
      title: 'PetCity',
      name: 'PetCity',
      image: 'https://www.petcity.cl/img/petcity-logo-1617149448.jpg',
      text: 'Tienda de alimentos para animales y articulos varios',
      phone: '(32) 297 4164',
      Hor: 'Lunes a Viernes 10:00 a 18:00'
    },
    {
      lat: -33.01772074636898,
      lng: -71.5549722450861,
      title: 'Bahia Mascota Viña',
      name: 'Bahia Mascota Viña',
      image: 'https://bahiamascota.cl/wp-content/themes/bahia/images/bahia-mascota-logo-encabezado.png',
      text: 'Veterinaria, alimentos para animales y peluqueria',
      phone: '(32) 268 8150',
      Hor: 'Lunes a Viernes 10:00 a 18:00'
    },
    {
      lat: -33.011981242975345,
      lng: -71.54896098741493,
      title: 'Petlandia Chile',
      name: 'Petlandia Chile',
      image: 'https://static.btcdn.co/3318/logo/original/logo-logo.png',
      text: 'Tienda de alimentos para animales y articulos varios',
      phone: '9 3390 9789',
      Hor: 'Lunes a Viernes 10:00 a 18:00'
    }
  ];

  infoWindows: any = [];
  

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  // ionViewDidEnter() {
  //   this.ngOnInit();
  // }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: -33.0153481, lng: -71.5500276};
    // create map

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      mapId: '96cd79d9898e2b20'
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // this.renderMarkers();
      mapEle.classList.add('show-map');
      this.loadMarkers();
    });
  };
  


  private addMarker(itemMarker: Marker) {
    const numberMarkerImg = {
      url: '../assets/img/noun_dog paw pin_1417883.png',
      size: new google.maps.Size(50, 50),
      scaledSize: new google.maps.Size(50, 50),
      labelOrigin: new google.maps.Point(25, -3)
    };

    const newLabel = {
      text: itemMarker.title,
      color: 'black',
      fontSize: '12px',
      fontWeight:'bold'

    };

    const marker = new google.maps.Marker({
      position: { lat: itemMarker.lat, lng: itemMarker.lng },
      map: this.map,
      title: itemMarker.title,
      icon: numberMarkerImg,
      label: newLabel
    });

    const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading" style="font-size: 15px;">' + marker.title +'</h1>' +
    '<h2 style="font-size: 10px; color: grey; margin-top: -10px">' + itemMarker.text +'</h2>' +
    '<div id="bodyContent">' + 
    '<img src="' + itemMarker.image + '" style="width:auto; height: auto; max-width:100px; max-height: 100px; display: block; margin-left: auto; margin-right: auto;" />' + 
    '<p style="font-size: 10px;">Horario de atención: ' + itemMarker.Hor +'</p>' +
    '<p style="font-size: 10px;">Telefono: ' + itemMarker.phone +'</p>' +
    "</div>" +
    "</div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener('click', () => {
      this.closeAll();
      infowindow.open(this.map, marker);
    });
    this.infoWindows.push(infowindow)

    return marker;
  };

  closeAll() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  private loadMarkers(){
    this.markers.forEach(marker => {
      const markerObj = this.addMarker(marker);
      marker.markerObj = markerObj;
    });
  }

}
