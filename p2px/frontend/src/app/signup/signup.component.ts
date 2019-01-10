import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup,FormControl} from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';




declare var $: any;



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fileToUpload: File = null;
  angForm: FormGroup;
  submitted = false;
  public fname:any;
  public lname:any;
  public phnumber;
  public myemail;
  public pwd;
  myangForm: FormGroup;
  // submitted = false;
  public myemaillogin:any;
  public pwdlogin:any;
  public myvar:string
  image:any;
  buffer:any
  public myarray=[];
  constructor(private fb:FormBuilder,private auth: AuthenticationService, private router: Router) { 
      
  } 
  ngOnInit() {
    
    this.myangForm = this.fb.group({
        myemaillogin: ['', Validators.required],
        pwdlogin: ['', Validators.required]
    }); 

      this.angForm = this.fb.group({
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        phnumber: ['', Validators.required],
        myemail: ['', Validators.required],
        pwd: ['', Validators.required]
    }); 

  }
   myphotoenc:String="";
   myphotodec:String
  photo:any;
//    handleFileSelect(evt){
//     var file = evt.target.files[0];
//     var reader = new FileReader();
//     reader.readAsBinaryString(file)  
//     reader.onload =this._handleReaderLoaded.bind(this);            
// }  
// _handleReaderLoaded(readerEvt) {
//    var binaryString = readerEvt.target.result;
//   this.myphotoenc= btoa(binaryString);
//   console.log(this.myphotodec)
//    this.myvar=window.atob((this.myphotoenc).toString())
//     this.myphotodec = window.atob((this.myphotoenc).toString());   
  
//   }
base64textString = [];

onUploadChange(evt: any) {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}
handleReaderLoaded(e) {
  this.base64textString.push('data:image/png;base64,'+btoa(e.target.result))
  this.myphotoenc = (this.base64textString[0]).toString();
  console.log(this.myphotoenc)
  // var c = a.toString();
  // console.log(c.split(","))
  //  var b = a.substring(22)
  //  console.log(b)
  // console.log(this.base64textString[0]);
      }
  
  Reg() {
        this.submitted = true; 
        console.log(this.angForm.value);
    // stop here if form is invalids
    if (this.angForm.invalid) {
        return;
    }    
    var d = {
      email:this.angForm.value.myemail,
      firstname:this.angForm.value.fname,
      lastname:this.angForm.value.lname,
      password:this.angForm.value.pwd,
      phonenumber:this.angForm.value.phnumber,
      keys:"",
      name:"",
      _id:"" ,
      profilephoto:this.myphotoenc,     
    }        
    

  console.log(d);
        console.log("Register 1 ......... ")
        this.auth.register(d).subscribe(() => {
    
          console.log("Register ......... ")
          this.router.navigateByUrl('/signup');
          this.refresh();
        }, (err) => {
    
          console.log("Register error......... ")
          console.error(err);
        });
      }
    
      refresh(): void {
    
        console.log("Refresh ......... ")
        // window.location.href = '/login';
        this.router.navigateByUrl("/signup");
        window.location.reload();
      }
  login(){
    this.submitted = true; 
    // stop here if form is invalid
    if (this.myangForm.invalid) {
        return;
    }
    
     var d = {
       email:this.myangForm.value.myemaillogin,
       password:this.myangForm.value.pwdlogin,
       keys: "",
       _id: ""
     }  
     console.log(d)
     this.auth.login(d).subscribe((user) => {
      console.log("user details   =>", user)
      // this.myarray.push(user.img);
      this.auth.myarrayimage.push(user.img);
      localStorage.setItem('userimg',user.img);

      // console.log(writeFileSync('asdf','adsf'));
      // writeFileSync("test","ftgufu",{encoding:'utf8'});
      console.log("Login successful")     
       this.router.navigateByUrl("/menu");
      
    }, (err) => {
      console.error(err);
    });
  }

}