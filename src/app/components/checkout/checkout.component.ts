import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.checkoutForm = this.fb.group({
      
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
