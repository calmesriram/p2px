import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../services/script-loader.service';
import { AuthenticationService, UserDetails } from '../services/authentication.service';
import { CreateOrderService } from '../services/create-order.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { NavserviceService } from '../services/navservice.service';
// import { LoginComponent } from '../login/login.component';
declare var c3: any;
declare var Maplace: any;
declare var Noty: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  details: UserDetails;
  x = true;
  form: FormGroup;
  form1: FormGroup;
  private assetHistory = [];
  private assetHistory1 = [];
  private sellHistory = [];
  private buyHistory = [];
  interval;
  myangForm: FormGroup;
  sellangForm:FormGroup;
  submitted = false;
  public btc:any;
  public price:any;
  public avgprice:any;
  public reqinr:any;
  public avalinr:any;
  public sellbtc;
  public sellprice;
  constructor(private fb:FormBuilder,private scriptLoader: ScriptLoaderService, private createOrderService: CreateOrderService, private auth: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {
    this.scriptLoader.load('d3', 'c3', 'noty', 'maplace');
   
  }

  ngOnInit() {
    this.auth.visible=true;
    // this.NavserviceService.show();
    setInterval(()=>{this.auth.checklogout()},900);
    // // this.auth.show();
    // var myVar = setInterval(()=>
    // {
    //   this.auth.check_user().then(state=>{
    //     if(!state){
    //       this.router.navigate(['login'])
    //     }
    //   })   
    //  }
    // , 1000);

    var a = this.createOrderService.myusernamenavbar;
    console.log(a)

    this.myangForm = this.fb.group({
      btc: ['', Validators.required],
      price: ['', Validators.required],
      avgprice: ['', Validators.required],
      reqinr: ['', Validators.required],
      avalinr: ['', Validators.required]
  }); 

  this.sellangForm = this.fb.group({
    sellbtc: ['', Validators.required],
    sellprice: ['', Validators.required]
});

    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log("user   ::", user)
      this.x = false;
      // return this.x;
    }, (err) => {
      console.error(err);
    });
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);
    this.form = this.formBuilder.group({
      btc: [null, Validators.required],
      avgPrice: [null],
      inr: [null, Validators.required],
      reQinr: [null],
      aviLinr: [null]
    });
    this.form1 = this.formBuilder.group({
      btc: [null, Validators.required],
      price: [null, Validators.required],
    });


  }


  
  refreshData() {
    console.log(this.createOrderService.myusernamenavbar);
    this.createOrderService.listBuyPlaceOrder((data) => {
      console.log("data inside listBuyPlaceOrder=>", data);
      let temp = data;
      console.log("temp temo ", temp)
      let totalSize = 0
      let totalPrice = 0;
      let avgPrice1 = 0;
      temp.map((key) => {
        totalPrice = totalPrice + key.inr * key.btc;
        totalSize = totalSize + key.btc;
        avgPrice1 = (totalPrice) / totalSize;
        key.total = totalSize;
        key.avg = avgPrice1;
      });
      this.assetHistory = temp;
    })
    this.createOrderService.listSellPlaceOrder((data) => {
      console.log("data inside listSellPlaceOrder=>", data);
      let temp = data.reverse();
      console.log("temp temo ", temp)
      let totalSize = 0
      let totalPrice = 0;
      let avgPrice1 = 0;
      temp.map((key) => {
        totalPrice = totalPrice + key.price * key.btc;
        totalSize = totalSize + (key.btc);
        console.log("totalSize", totalSize)
        avgPrice1 = (totalPrice) / totalSize;
        key.total = totalSize;
        key.avg = avgPrice1;
      });
      this.assetHistory1 = temp.reverse();
    })
    this.createOrderService.getUserBuyOrderList((data) => {
      console.log("data inside getUserBuyOrderList=>", data);
      let temp = data.reverse();
      console.log("temp temo ", temp)
      let totalSize = 0
      let totalPrice = 0;
      let avgPrice1 = 0;
      temp.map((key) => {
        totalPrice = totalPrice + key.inr * key.btc;
        totalSize = totalSize + key.btc;
        avgPrice1 = (totalPrice) / totalSize;
        key.total = totalSize;
        key.avg = avgPrice1;
      });
      this.sellHistory = temp.reverse();
    })
    this.createOrderService.getUserSellOrderList((data) => {
      console.log("data inside getUserSellOrderList=>", data);
      let temp = data;
      console.log("temp temo ", temp)
      let totalSize = 0
      let totalPrice = 0;
      let avgPrice1 = 0;
      temp.map((key) => {
        totalPrice = totalPrice + key.price * key.btc;
        totalSize = totalSize + (key.btc);
        // console.log("totalSize", totalSize)
        avgPrice1 = (totalPrice) / totalSize;
        key.total = totalSize;
        key.avg = avgPrice1;
      });
      this.buyHistory = temp;
    })
  };
  redirect() {
    this.router.navigate(['login']);
  }
  // public btc:any;
  // public price:any;
  // public avgprice:any;
  // public reqinr:any;
  // public avalinr:any;;
  onSubmit(){
    this.submitted = true; 
    // stop here if form is invalid
    if (this.myangForm.invalid) {
        return;
    }
   
var d ={
  avgPrice:parseFloat(this.myangForm.value.avgprice),
  aviLinr:parseFloat(this.myangForm.value.avalinr),
  btc:parseFloat(this.myangForm.value.btc),
  inr:parseFloat(this.myangForm.value.price),
  reQinr:parseFloat(this.myangForm.value.reqinr)
}
    this.createOrderService.buyOrder(d)
    this.myangForm.reset();
  }

  onSell() {
    this.submitted = true; 
    // stop here if form is invalid
    if (this.sellangForm.invalid) {
        return;
    }
    var d = {
    btc:parseFloat(this.sellangForm.value.sellbtc),
    price:parseFloat(this.sellangForm.value.sellprice)
    }
    this.createOrderService.sellOrder(d)
    this.sellangForm.reset();
  }

  ngAfterViewInit() {
    c3.generate({
      bindto: '#ks-next-payout-chart',
      data: {
        columns: [
          ['data1', 6, 5, 6, 5, 7, 8, 7]
        ],
        types: {
          data1: 'area'
        },
        colors: {
          data1: '#81c159'
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false
      },
      point: {
        show: false
      },
      axis: {
        x: { show: false },
        y: { show: false }
      }
    });

    c3.generate({
      bindto: '#ks-total-earning-chart',
      data: {
        columns: [
          ['data1', 6, 5, 6, 5, 7, 8, 7]
        ],
        types: {
          data1: 'area'
        },
        colors: {
          data1: '#4e54a8'
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false
      },
      point: {
        show: false
      },
      axis: {
        x: { show: false },
        y: { show: false }
      }
    });

    c3.generate({
      bindto: '.ks-chart-orders-block',
      data: {
        columns: [
          ['Revenue', 150, 200, 220, 280, 400, 160, 260, 400, 300, 400, 500, 420, 500, 300, 200, 100, 400, 600, 300, 360, 600],
          ['Profit', 350, 300, 200, 140, 200, 30, 200, 100, 400, 600, 300, 200, 100, 50, 200, 600, 300, 500, 30, 200, 320]
        ],
        colors: {
          'Revenue': '#f88528',
          'Profit': '#81c159'
        }
      },
      point: {
        r: 5
      },
      grid: {
        y: {
          show: true
        }
      }
    });


  }
}
