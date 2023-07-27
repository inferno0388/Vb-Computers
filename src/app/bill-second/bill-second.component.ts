import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from '../services/authService.component';
import { HttpClient } from '@angular/common/http';
import { ShareDataServiceService } from '../share-data-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { error } from 'jquery';

@Component({
  selector: 'app-bill-second',
  templateUrl: './bill-second.component.html',
  styleUrls: ['./bill-second.component.scss'],
})
export class BillSecondComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: authService,
    private http: HttpClient,
    private shareService: ShareDataServiceService,
    private router: Router
  ) {}

  rowForm!: FormGroup;
  dataArray: any[] = [];
  totalAmount: number = 0;
  editedRow: number = 0;
  sapDataForRow = {
    itemDescr: '',
    unit: '',
    rate: 0,
  };

  ngOnInit(): void {
    let defaultCompany = this.fetchCompanies();
    console.log('jadgnivjdsnijnjnsjv::::::::::::::', defaultCompany);

    this.rowForm = this.formBuilder.group({
      companyName: [defaultCompany, Validators.required],
      woPoNumber: ['', Validators.required],
      woPoDate: ['', Validators.required],
      sacNumber: [null, Validators.required],
      sapNumber: [null, Validators.required],

      itemDescr: { value: null, disabled: true }, // Set disabled attribute
      unit: { value: null, disabled: true }, // Set disabled attribute
      rate: { value: null, disabled: true }, // Set disabled attribute

      quantity: [null, [Validators.required, Validators.min(1)]],

      igst: [null, [Validators.min(0), Validators.max(30)]],
      cgst: [null, [Validators.min(0), Validators.max(30)]],
      sgst: [null, [Validators.min(0), Validators.max(30)]],
      amount: { value: null, disabled: true }, // Set disabled attribute
    });
  }

  showCard1 = false;
  showCard() {
    this.showCard1 = true;
  }

  companies: any[] = []; // Array to store the fetched companies

  //get all companies....
  fetchCompanies(): string {
    // Make an HTTP request to the API to fetch companies

    this.authService.getAllSubCompanies().subscribe(
      (result) => {
        console.log(result);
        this.companies = result;

        console.log('this.companies', this.companies);
        console.log(
          'this.companies.length::::::::::::::::',
          this.companies.length
        );
        for (let i = 0; i < this.companies.length; i++) {
          console.log('coomapny:::::::::::', this.companies[i]);
          if (
            this.companies[i].companyName === this.shareService.exceptionCompany
          ) {
            return this.shareService.exceptionCompany;
          }
        }
        return this.shareService.exceptionCompany;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.shareService.exceptionCompany;
  }

  validateSelection(data: string) {
    if (data != this.shareService.exceptionCompany) {
      // this.router.navigate(['/generate-bill']);
      this.router.navigate(['/generate-bill', { value: data }]);
    }
  }

  getSapNumber(inputValue: number) {
    console.log('type of input: ', typeof inputValue);

    const numberLength = inputValue.toString().length;

    if(numberLength > 6 ){
      let errorMessage = ` input value: ${inputValue} is not valid it must be of 6 digits`;
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
      });
    }

    if (numberLength === 6  ) {   //|| numberLength > 5 
      // this.sapDataForRow.itemDescr = 'temp descr';
      // this.sapDataForRow.unit = 'M2';
      // this.sapDataForRow.rate = 10;

      this.authService.getSapNumber(inputValue).subscribe(
        (result) => {
          console.log("result: ", result);
          this.sapDataForRow.itemDescr= result.shortDescription
          this.sapDataForRow.unit= result.unit
          this.sapDataForRow.rate= result.rate 

          this.rowForm.patchValue({ itemDescr: this.sapDataForRow.itemDescr});
          this.rowForm.patchValue({ unit: this.sapDataForRow.unit });
          this.rowForm.patchValue({ rate: this.sapDataForRow.rate });
        },
        (error) => {
          // Handle any errors that occurred during the API request
          console.log(error); //.error.message

          let errorMessage = error.error.message || 'An error occurred.';
          if (error.error.message == null) {
            errorMessage = 'internal server error';
          }
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
          });
        }
      );

      // if (inputValue == 111) {
      //   // this.rowForm.get('itemDescr')?.setValue('tep descr');
      //   // this.rowForm.get('unit')?.setValue('M2');
      //   // this.rowForm.get('rate')?.setValue(10);

      //   // this.authService.getSapNumber(inputValue)
      //   // this.rowForm.patchValue({ itemDescr: this.sapDataForRow.itemDescr});
      //   // this.rowForm.patchValue({ unit: this.sapDataForRow.unit });
      //   // this.rowForm.patchValue({ rate: this.sapDataForRow.rate });
      // } else {
      //   this.rowForm.patchValue({ itemDescr: '' });
      //   this.rowForm.patchValue({ unit: '' });
      //   this.rowForm.patchValue({ rate: null });
      // }
    } else {
      this.rowForm.patchValue({ itemDescr: '' });
      this.rowForm.patchValue({ unit: '' });
      this.rowForm.patchValue({ rate: null });
    }
  }

  submitRow() {
    if (this.rowForm.valid) {
      console.log('dataArray: ', this.dataArray);
      console.log(this.rowForm.value);
      console.log(this.rowForm.value.rate);

      const quantity = this.rowForm.value.quantity;
      const rate = this.rowForm.value.rate;
      // const gst = this.rowForm.value.gst;
      const igst = this.rowForm.value.igst;
      const cgst = this.rowForm.value.cgst;
      const sgst = this.rowForm.value.sgst;

      let numbertoConvert =
        quantity *
        this.sapDataForRow.rate *
        (1 + igst / 100 + cgst / 100 + sgst / 100);
      const amount = parseFloat(numbertoConvert.toFixed(2));

      this.rowForm.patchValue({ amount: amount });
      //set the total amount
      this.totalAmount += amount;
      this.rowForm.value.amount = amount;
      this.rowForm.value.itemDescr = this.sapDataForRow.itemDescr;
      this.rowForm.value.unit = this.sapDataForRow.unit;
      this.rowForm.value.rate = this.sapDataForRow.rate;
      //add in array to show data in table

      console.log('total amount now:', this.totalAmount);

      if (this.editedRow == 0) {
        this.dataArray.push(this.rowForm.value);
      } else {
        this.dataArray.splice(this.editedRow, 0, this.rowForm.value);
        this.editedRow = 0;
      }

      // Reset the form
      this.rowForm.reset();

      // Set the preserved values back to the respective form controls
      this.rowForm.get('companyName')?.setValue(this.dataArray[0].companyName);
      this.rowForm.get('woPoNumber')?.setValue(this.dataArray[0].woPoNumber);
      this.rowForm.get('woPoDate')?.setValue(this.dataArray[0].woPoDate);
      this.rowForm
        .get('amount')
        ?.setValue(this.dataArray[this.dataArray.length - 1].amount);

      // this.updateDisabledState();
    } else if (this.rowForm.invalid) {
      if (this.rowForm.invalid) {
        // Mark all fields as touched to trigger validation errors even if not filled...
        this.markFormGroupTouched(this.rowForm);
        // this.updateDisabledState();
        return;
      }
    }
  }
  // marks each form's control as touched after submitting
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  editRow(index: number) {
    console.log(`clicked on ${index} with values:`);
    console.log(this.dataArray[index]);
    this.rowForm.patchValue({ companyName: this.dataArray[index].companyName });
    this.rowForm.patchValue({ woPoNumber: this.dataArray[index].woPoNumber });
    this.rowForm.patchValue({ woPoDate: this.dataArray[index].woPoDate });
    this.rowForm.patchValue({ itemDescr: this.dataArray[index].itemDescr });
    this.rowForm.patchValue({ sacNumber: this.dataArray[index].sacNumber });
    this.rowForm.patchValue({ sapNumber: this.dataArray[index].sapNumber });
    // this.rowForm.patchValue({ hsnCode: this.dataArray[index].hsnCode    });
    this.rowForm.patchValue({ unit: this.dataArray[index].unit });
    this.rowForm.patchValue({ quantity: this.dataArray[index].quantity });
    this.rowForm.patchValue({ rate: this.dataArray[index].rate });
    // this.rowForm.patchValue({ gst: this.dataArray[index].gst         });
    this.rowForm.patchValue({ igst: this.dataArray[index].igst });
    this.rowForm.patchValue({ cgst: this.dataArray[index].cgst });
    this.rowForm.patchValue({ sgst: this.dataArray[index].sgst });
    this.rowForm.patchValue({ amount: this.dataArray[index].amount });

    this.totalAmount -= this.dataArray[index].amount;
    // deletes the edited row from array so that it would be submitted again after editing
    this.dataArray.splice(index, 1);
    this.editedRow = index;

    // this.updateDisabledState();
  }

  deleteRow(index: number) {
    console.log(`deleted ${index} `);
    this.dataArray.splice(index, 1);
  }

  generateBill() {
    console.log('saving bill of: ', this.dataArray);

    this.authService.generateBill(this.dataArray, this.totalAmount).subscribe(
      (response: any) => {
        // Handle the response from the API
        console.log(response);

        const pdfName = response.pdfName;
        const pdfData = response.pdfData;

        this.savePDF(pdfData, pdfName);
      },
      (error: any) => {
        // Handle any errors that occurred during the API request
        console.log(error); //.error.message

        let errorMessage = error.error.message || 'An error occurred.';
        if (error.error.message == null) {
          errorMessage = 'internal server error';
        }
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
        });
      }
    );
  }

  savePDF(data: string, fileName: string) {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    Swal.fire({
      title: 'Success',
      text: `pdf created with name: ${fileName}.pdf`,
      icon: 'success',
    });
    //reset fields and table data
    this.rowForm.reset();
    this.dataArray = [];
  }
}
