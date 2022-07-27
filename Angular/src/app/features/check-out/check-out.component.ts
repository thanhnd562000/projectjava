import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country.model';
import { State } from 'src/app/common/state.model';
import { CheckformService } from 'src/app/core/services/checkform.service';
import { FormValidater } from 'src/app/core/validater/form-validater';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  countries: Country[] = [];
  states: State[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  //
  credittCardYear: number[] = [];
  creditCardMonths: number[] = [];
  checkoutFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private checkFormService: CheckformService
  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2),FormValidater.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2),FormValidater.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      }),
      shippingAddress: this.formBuilder.group({
        street:new FormControl('', [Validators.required, Validators.minLength(2),FormValidater.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),FormValidater.notOnlyWhitespace]),
        state: [''],
        country: [''],
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),FormValidater.notOnlyWhitespace]),
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
    const startMonth: number = new Date().getMonth() + 1;
    this.checkFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log(data);
      this.creditCardMonths = data;
    });
    //year
    this.checkFormService.getCreditCardYear().subscribe((data) => {
      this.credittCardYear = data;
    });

    this.checkFormService.getCoutries().subscribe(
      data => {
        this.countries = data;
      }
    )

  }
  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    // const countryName = formGroup!.value.country.name;



    this.checkFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup!.get('state')!.setValue(data[0]);
      }
    );
  }
  onSubmit() {
    // console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
if(this.checkoutFormGroup.invalid)
{
  this.checkoutFormGroup.markAllAsTouched();
}
  }

 
  copyShippingAddressToBillingAddress(even: any) {
    if (even.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      //
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }


  }
  handleMonthAndYear() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.checkFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });
  }
}
