import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
public myarray=[];
constructor(private auth: AuthenticationService) {
// this.auth.visible=false;

 }

  ngOnInit() {
    this.myarray = this.auth.myarrayimage;
    }

  logout() {
    localStorage.removeItem('userimg');
    localStorage.clear();
    this.auth.logout();    
  }

}
