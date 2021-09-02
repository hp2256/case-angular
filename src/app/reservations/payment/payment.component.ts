import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ReservationServicesService } from '../reservation-services.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private router:Router, 
    private route:ActivatedRoute,
    private token:TokenStorageService,
    private fb:FormBuilder, 
    private reservationService:ReservationServicesService
  ) { }
  addPaymentForm!:FormGroup;

  payment!:Payment;
  public errorMessage:string="";
  isLoggedIn=false;
  allowed=false;
  private roles: string[] = [];
  errorBool=false;
  errorMsg="";
  billId="";
  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn){ 
      this.route.paramMap.subscribe((params:ParamMap)=>{
        let id=params.get('id')||"";
        this.billId=id;
        console.log(id);
        
      })
      this.reservationService.getBill(this.billId)
      .subscribe(
        data=>{  
        let total = data.price+data.taxes;
        let time:Date=new Date();
           this.addPaymentForm= this.fb.group(
          { 
            //id:[],
            cardNumber:['',[Validators.required]],
            total:[total,[Validators.required,Validators.minLength(16)]],
            billId:[data.id],
            payTime:[time]
          }
        );},
        error=>{}
      );
   
    }
  }
  get cardNumber(){
    return this.addPaymentForm.get('cardNumber')!;
  }
  get total(){
    return this.addPaymentForm.get('total')!;
  }
  onSubmit(){
    console.log(this.addPaymentForm.value);
    this.payment=this.addPaymentForm.value;
    this.reservationService.addPayment(this.payment).subscribe(
      response=>{
        console.log("response "+response)
        
        alert('SUCCESSFULLY ADDED');
        this.router.navigate(['../'],{relativeTo:this.route});
 
      },
      error=>{console.log(error);this.errorBool=true;this.errorMsg=error;}      
    )
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}