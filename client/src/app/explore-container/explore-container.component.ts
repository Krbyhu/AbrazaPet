import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthService } from '../services/user/auth.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor(private authService: AuthService, private router: Router, private nav: NavController) { }

  ngOnInit() {}

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
