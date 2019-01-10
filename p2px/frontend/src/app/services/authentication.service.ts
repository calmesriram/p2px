import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { map, take } from 'rxjs/operators';
// import 'rxjs/add/operator/take';
// import { map } from 'rxjs/operators';
// import {map} from "rxjs/operator/map";
// import { Http, Headers } from '@angular/http';
// import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators/map';
// import 'rxjs/add/operator/map';




export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}
export interface AssetDetails {
  Name: string,
  userId: string,
  orderId: string,
  price: number,
  quantity: number
}

interface TokenResponse {
  token: string;
  _id: string
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  keys: string;
  _id: string
}
export interface sellDetails {
  _id: string;
  name: string,
  price: number,
  minQuantity: number,
  maxQuantity: number,
  paymentMethods: string,
  collateral: string
}

export interface BuyDetails {
  Name: string;
  userId: string;
  orderId: string,
  price: number,
  quantity: number,
  totalAmount: number,
  collateral: string

}


@Injectable()
export class AuthenticationService {

  private token: string;
 public username:any;
 public temp:any;
  _baseUrl;
  public mytestdata;
  public myarrayimage=[];
  public visible:boolean;
  constructor(private http: HttpClient,private router: Router, @Inject(Window) private _window: Window) {
    this._baseUrl ='http://' + _window.location.hostname + ':3000';
    setInterval(()=>{
      if(this.mytestdata=="" || this.mytestdata==null)
      {
        this.myarrayimage.length=0;
        this.myarrayimage.push(localStorage.getItem('userimg'));
      }
    },3000);
  }


  // hide() { this.visible = false; }

  // show() { this.visible = true; }
check(){
  window.onbeforeunload = function(){
    localStorage.removeItem('mean-token');
    localStorage.removeItem('userimg');
    localStorage.clear();
    return;
  }
}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {

    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
      // this.getUserDetails()
    }
    return this.token;
    
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      // console.log("---==>",JSON.parse(payload)) 
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  public async check_user():Promise<any>{
    return new Promise((resolve,reject)=>{

  let result=localStorage.getItem('mean-token');
  if(result!=null)
  {
  resolve(true)
  }else{
    resolve(false)
  }
    }) as Promise<any>
  }

  public async isLoggedIn():Promise<boolean>{
    return new Promise((resolve,reject)=>{
      const user = this.getUserDetails();
      if (user) {
        localStorage.setItem('userid', user._id);
        resolve(true)
        return user.exp > Date.now() / 1000;
      } else {
        resolve(false);
      }
    }) as Promise<boolean>
  }
  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile' | 'listBuyPlaceOrder' | 'full_profile' | 'update_profile' | 'wallet' | 'sellOrder' | 'buyOrder' |
    'getBuyOrderListByUserId' | 'getSellOrderListByUserId' | 'getSellRequestListByUserId' | 'getWalletInfo' | 'approveOrder' | 'rejectOrder' | 'getAssetOrderListByUserId' |
    'userDetails' | 'getListAllOrder' | 'getUserBuyOrderList' | 'getUserSellOrderList' | 'listSellPlaceOrder' | 'addAsset', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      if (type == 'update_profile' || type == 'wallet') {
        base = this.http.post(this._baseUrl + '/api/users/' + type, user, { headers: new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` }) });
      } else if (type == 'sellOrder') {
        if (!this.getUserDetails()) {
          alert("user not login")
        }
        base = this.http.post(this._baseUrl + '/api/' + type, user, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
      }
      else if (type == 'approveOrder') {
        console.log("inside approveOrder ")
        base = this.http.post(this._baseUrl + '/api/' + type, user, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
      }
      else if (type == 'rejectOrder') {
        console.log("inside rejectOrder ")
        base = this.http.post(this._baseUrl + '/api/' + type, user, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
      }
      else if (type == 'buyOrder') {
        if (!this.getUserDetails()) {
          alert("user not login")
        }
        console.log("inside buyorder ")
        base = this.http.post(this._baseUrl + '/api/' + type, user, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
      }
      else if (type == 'addAsset') {
        console.log("inside addAsset ")
        base = this.http.post(this._baseUrl + '/api/' + type, user, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
      }
      else {
        // alert(user)
        base = this.http.post(this._baseUrl + '/api/users/' + type, user, { headers: new HttpHeaders({ Authorization: `Bearer ${this.getUserDetails()}` }) });
      }
    }
    else if (type == 'getSellOrderListByUserId') {
      console.log("inside getSellOrderListByUserId", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'getBuyOrderListByUserId') {
      console.log("inside getBuyOrderListByUserId", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'getSellRequestListByUserId') {
      console.log("inside getSellRequestListByUserId", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'getWalletInfo') {
      console.log("inside getWalletInfo", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'getAssetOrderListByUserId') {
      console.log("inside getAssetOrderListByUserId", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'listBuyPlaceOrder') {
      console.log("inside listBuyPlaceOrder", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type);
    }
    else if (type == 'listSellPlaceOrder') {
      console.log("inside listSellPlaceOrder", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type);
    }
    else if (type == 'userDetails') {
      console.log("inside userDetails", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'getListAllOrder') {
      console.log("inside getListAllOrder", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'getUserBuyOrderList') {
      console.log("inside getUserBuyOrderList", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else if (type == 'getUserSellOrderList') {
      console.log("inside getUserSellOrderList", this.getUserDetails());
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${JSON.stringify(this.getUserDetails())}` }) });
    }
    else {
      console.log("profile info")
      base = this.http.get(this._baseUrl + '/api/' + type, { headers: new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` }) });
    }

    var request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        // console.log("data --!--->",data)
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public updateProfile(profile): Observable<any> {
    console.log("up", profile);
    return this.request('post', 'update_profile', profile);
  }

  public login(user: TokenPayload): Observable<any> {
    console.log(user)
    this.mytestdata = user["img"];
    return this.request('post', 'login', user);
  }
  public userDetails(): Observable<any> {
    return this.request('get', 'userDetails');
  }
  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public fullProfile(): Observable<any> {
    return this.request('get', 'full_profile');
  }
  public wallet(user: TokenPayload): Observable<any> {
    console.log("wallet info   ::", user.email)
    return this.request('post', 'wallet', user);
  }
public checklogout(){
  var meantoken =  window.localStorage.getItem('mean-token');
  if(meantoken =="" || meantoken==undefined)
  {
    this.router.navigateByUrl('/signup');
    window.localStorage.removeItem('mean-token');
    window.location.reload();

    
  }
  if(this.token !== meantoken){
    this.router.navigateByUrl('/signup');
    window.localStorage.removeItem('mean-token');
    window.localStorage.clear();
    window.location.reload();
    // this.router.navigateByUrl('/signup');
  }
}
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/signup');
  }
  public sellOrder(details): Observable<any> {
    console.log("details  ", details);
    return this.request('post', 'sellOrder', details);
  }
  public approveOrder(details): Observable<any> {
    console.log("details  ", details);
    return this.request('post', 'approveOrder', details);
  }
  public rejectOrder(details): Observable<any> {
    console.log("details  ", details);
    return this.request('post', 'rejectOrder', details);
  }

  public buyOrder(details): Observable<any> {
    console.log("buyorder    ....details  ", details);
    return this.request('post', 'buyOrder', details);
  }
  public addAsset(details): Observable<any> {
    console.log("buyorder    ...addAsset.details  ", details);
    return this.request('post', 'addAsset', details);
  }

  public getSellOrderListByUserId(): Observable<any> {
    return this.request('get', 'getSellOrderListByUserId');
  }
  public getAssetOrderListByUserId(): Observable<any> {
    return this.request('get', 'getAssetOrderListByUserId');
  }
  public listBuyPlaceOrder(): Observable<any> {
    return this.request('get', 'listBuyPlaceOrder');
  }
  public listSellPlaceOrder(): Observable<any> {
    return this.request('get', 'listSellPlaceOrder');
  }
  public getBuyOrderListByUserId(): Observable<any> {
    return this.request('get', 'getBuyOrderListByUserId');
  }
  public getSellRequestListByUserId(): Observable<any> {
    return this.request('get', 'getSellRequestListByUserId');
  }
  public getWalletInfo(): Observable<any> {
    return this.request('get', 'getWalletInfo');
  }
  public getListAllOrder(): Observable<any> {
    return this.request('get', 'getListAllOrder');
  }
  public getUserSellOrderList(): Observable<any> {
    return this.request('get', 'getUserSellOrderList');
  }
  public getUserBuyOrderList(): Observable<any> {
    return this.request('get', 'getUserBuyOrderList');
  }
}
