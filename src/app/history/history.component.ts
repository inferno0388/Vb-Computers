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
import { GenericBillComponent } from '../generic-bill/generic-bill.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [DatePipe],
})
export class HistoryComponent implements OnInit {
  constructor(
    private authService: authService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  genericBill = new GenericBillComponent();
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

    let billNumber = bill.billNumber;
    console.log('billNumber: ', billNumber);
    console.log(bill);

    this.genericBill.generatePDF();
    console.log('ho gayi.....');
    this.authService.downloadBill(billNumber).subscribe(
      (response: any) => {
        console.log(response);
        const pdfName = response.pdfName;
        const pdfData = response.pdfData;

        this.showPDF(pdfData, pdfName);
      },
      (error: any) => {
        // Handle any errors that occurred during the API request
        console.log(error); //.error.message

        const errorMessage = error.error.message || 'An error occurred.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
        });
      }
    );
  }

  showPDF(data: string, fileName: string) {
    const byteCharacters = atob(data);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // // Create an anchor element to trigger the download
    // const link = document.createElement('a');
    // link.href = url;
    // link.target = '_blank';
    // link.download = fileName;

    // // Trigger the click event on the anchor element
    // link.dispatchEvent(new MouseEvent('click'));

    // // Clean up the temporary URL
    // URL.revokeObjectURL(url);



    // Open a new window or tab to display the PDF
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${fileName}</title>
          </head>
          <body style="margin: 0;">
            <embed width="100%" height="100%" src="${url}" type="application/pdf" download="${fileName}" />
          </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      // Handle the case when the new window could not be opened
      alert(
        'Failed to open the PDF. Please check your pop-up blocker settings.'
      );
    }
  }

  downloadBill(indexOfBill: number) {
    let bill = this.companyBillArray[indexOfBill];

    let billNumber = bill.billNumber;
    console.log('billNumber: ', billNumber);
    console.log(bill);

    this.genericBill.generatePDF();
    console.log('ho gayi.....');
    this.authService.downloadBill(billNumber).subscribe(
      (response: any) => {
        console.log(response);
        const pdfName = response.pdfName;
        const pdfData = response.pdfData;

        this.savePDF(pdfData, pdfName);
      },
      (error: any) => {
        // Handle any errors that occurred during the API request
        console.log(error); //.error.message

        const errorMessage = error.error.message || 'An error occurred.';
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
  }
}
