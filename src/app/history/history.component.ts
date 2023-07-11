import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { authService } from '../services/authService.component';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { error } from 'jquery';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [DatePipe],
})
export class HistoryComponent implements OnInit {
  constructor(private authService: authService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  companies: any[] = []; // Array to store the fetched companies

  //get all companies....
  fetchCompanies(): void {
    // Make an HTTP request to the API to fetch companies

    this.authService.getAllSubCompanies().subscribe(
      (result) => {
        console.log(result);
        this.companies = result;

        console.log('this.companies', this.companies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  companyBillArray: any[] = [];
  formGroup!: FormGroup;

  myForm = new FormGroup({
    searchFor: new FormControl(''),
  });

  jsDate!: Date;
  formattedDate!: string;

  // search the entered company through api and get the data in companyBillArray[]
  sendCompanyName(): any {
    console.log('searchFor: ', typeof this.myForm.value.searchFor);

    this.authService
      .getBillByCompanyName(this.myForm.value.searchFor || '') //  this.myForm.value
      .subscribe(
        (response: any) => {
          // Handle the response from the API
          console.log('response', response);

          let tempCompany = response;
          // manually convert date because it is being recieved as in long millis.
          for (let i = 0; i < tempCompany.length; i++) {
            let dateInMillis = tempCompany[i].woPoDate;
            this.jsDate = new Date(dateInMillis);
            this.formattedDate =
              this.datePipe.transform(this.jsDate, 'dd/MM/yyyy') ||
              'error in fetching date';
            tempCompany[i].woPoDate = this.formattedDate;

            let dateInMillis1 = tempCompany[i].billDate;
            this.jsDate = new Date(dateInMillis1);
            this.formattedDate =
              this.datePipe.transform(this.jsDate, 'dd/MM/yyyy') ||
              'error in fetching date';
            tempCompany[i].billDate = this.formattedDate;
          }
          console.log('tempCompany: ', tempCompany);

          this.companyBillArray = response;
        },
        (error: any) => {
          // Handle any errors that occurred during the API request
          console.error(error.error.message);
          console.error(error);
          const errorMessage = error.error.message || 'An error occurred.';
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
          });
        }
      );
  }

 
  singleBill: any[] = [];
  rowForBill: any;

  viewBill(indexOfBill: number) {
    let bill = this.companyBillArray[indexOfBill];
    console.log('array:;;;;;;;;', this.companyBillArray);
    console.log('bill::::::::::::', bill);

    for (let index = 0; index < bill.billDataDto.length; index++) {
      this.rowForBill = {}; // Create a new object for each iteration

      this.rowForBill.companyName = bill.companyName;
      this.rowForBill.woPoNumber = bill.woPoNumber;
      this.rowForBill.woPoDate = bill.woPoDate;

      this.rowForBill.itemDescr = bill.billDataDto[index].itemDescr;
      this.rowForBill.hsnCode = bill.billDataDto[index].hsnCode;
      this.rowForBill.unit = bill.billDataDto[index].unit;
      this.rowForBill.quantity = bill.billDataDto[index].quantity;
      this.rowForBill.rate = bill.billDataDto[index].rate;
      this.rowForBill.gst = bill.billDataDto[index].gst;
      this.rowForBill.cgst = bill.billDataDto[index].cgst;
      this.rowForBill.igst = bill.billDataDto[index].igst;
      this.rowForBill.sgst = bill.billDataDto[index].sgst;
      this.rowForBill.amount = bill.billDataDto[index].amount;

      this.singleBill.push(this.rowForBill);
      console.log('index row: ', this.rowForBill);
    }

    // console.log(this.singleBill);
  }

  downloadBill(indexOfBill: number) {
    let bill = this.companyBillArray[indexOfBill];

    let billNumber = bill.billNumber;
    console.log('billNumber: ', billNumber);
    console.log(bill);

    this.authService.downloadBill(billNumber).subscribe(
      (response: any) => {
        console.log(response);
        const pdfName = response.pdfName;
        const pdfData = response.pdfData;

        this.savePDF(pdfData, pdfName);
      },
      (error: any) => {
        // Handle any errors that occurred during the API request
        console.log(error);//.error.message

        const errorMessage = error.error.message || 'An error occurred.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error'
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
      icon: 'success'
    });
  }
}
