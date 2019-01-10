import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { map, take } from 'rxjs/operators';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';

// import { Observable } from 'rxjs/Observable';
// import { Http, Headers, RequestOptions } from '@angular/http';


declare let require: any;
declare let window: any;

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}


@Injectable()
export class CreateOrderService {
  private token: string;
  public myusernamenavbar:string;
  _baseUrl;
  constructor(private auth: AuthenticationService, private http: HttpClient, @Inject(Window) private _window: Window) {
    //   console.log("contr");
    this._baseUrl = 'http://' + _window.location.hostname + ':3000';
  }
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  sellOrder(data) {
    // console.log("data details   ", _data);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let body = JSON.stringify(_data.value);
    // let requestOptions = new RequestOptions({ headers: headers });
    this.auth.sellOrder(data).subscribe((_data) => {
      console.log("------", _data)
    })
  }
  buyOrder(data) {
    console.log("data details   ", data);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // console.log("data        ..", _data.value);
    // let body = JSON.stringify(_data.value);
    // let requestOptions = new RequestOptions({ headers: headers });
    // console.log("requestOptions        ", requestOptions);

    // console.log(":body   ", body)
    // console.log(":body   ", this._baseUrl + '/api/buyOrder')
    this.auth.buyOrder(data).subscribe((_data) => {
      console.log("------", _data)

    })
  }
  approveOrder(_data) {
    console.log("data details   ", _data);
    this.auth.approveOrder(_data).subscribe((_data) => {
      console.log("------++", _data)

    })
  }
  rejectOrder(_data) {
    console.log("rejectOrder   ", _data);
    this.auth.rejectOrder(_data).subscribe((_data) => {
      console.log("------++", _data)

    })
  }
  getSellOrderListByUserId(res) {
    console.log("list of order")
    this.auth.getSellOrderListByUserId().subscribe((data) => {
      console.log("data inside getsellOrderListByUserId=>", data);
      res(data);
    })
  }
  getAssetOrderListByUserId(res) {
    console.log("list of order")
    this.auth.getAssetOrderListByUserId().subscribe((data) => {
      console.log("data inside getAssetOrderListByUserId=>", data);
      res(data);
    })
  }
  listBuyPlaceOrder(res) {
    console.log("list of order")
    this.auth.listBuyPlaceOrder().subscribe((data) => {
      console.log("data inside listBuyPlaceOrder=>", data);
      res(data);
    })
  }
  listSellPlaceOrder(res) {
    console.log("list of order")
    this.auth.listSellPlaceOrder().subscribe((data) => {
      console.log("data inside listSellPlaceOrder=>", data);
      res(data);
    })
  }
  getBuyOrderListByUserId(res) {
    console.log("list of order")
    this.auth.getBuyOrderListByUserId().subscribe((data) => {
      console.log("data inside getOrderListByUserId", data);
      res(data);
    })
  }
  getSellRequestListByUserId(res) {
    console.log("list of order")
    this.auth.getSellRequestListByUserId().subscribe((data) => {
      console.log("data inside getsellRequestListByUserId=>", data);
      res(data);
    })
  }
  getUserBuyOrderList(res) {
    console.log("list of ordergetUserBuyOrderList")
    this.auth.getUserBuyOrderList().subscribe((data) => {
      console.log("data inside getUserBuyOrderList", data);
      res(data);
    })
  }
  getUserSellOrderList(res) {
    console.log("list of ordergetUserSellOrderList")
    this.auth.getUserSellOrderList().subscribe((data) => {
      console.log("data inside getUserSellOrderList=>", data);
      res(data);
    })
  }
  getWalletInfo(res) {
    console.log("getWalletInfo")
    this.auth.getWalletInfo().subscribe((data) => {
      console.log("data inside getWalletInfo=>", data);
      res(data);
    })
  }
}
