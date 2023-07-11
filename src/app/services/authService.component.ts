import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment'; ${environment.apiUrl}


@Injectable({
    providedIn: 'root'
  })

  export class authService {

    url: string= 'http://localhost:8080';

    //get the token from local storage and add in header
    getToken(): string { 
      return localStorage.getItem('token')?? 'Default Value';
     }
    http_header= new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
     })
    httpOptions = {
      headers: this.http_header
    };
 
 headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', `Bearer ${this.getToken()}`);

    dataForBillGenerate: any= {
      woPoDate:'',
      woPoNumber:'',
      companyName:'',
      totalAmount:'',
      billDataDto: []
    };

    invalidUserAuth= new EventEmitter<boolean>(false);

    constructor(private http: HttpClient, private router:Router) { 

     }    

    login(data: any):Observable<any> {
        return this.http.post(`${this.url}/api/v1/login`, data);
    }


    createUser(data: any): Observable<any>{

        return this.http.post('http://localhost:8080/api/v1/auth/addUser', data, { 'headers': this.http_header });
    }

    getBillByCompanyName(data: string | null | undefined): Observable<any>{
        
        // return this.http.post(`http://localhost:8080/api/v1/history/getBillByCompanyName/${data}` );

      return this.http.get(`http://localhost:8080/api/v1/history/findBillByCompany/${data}` , this.httpOptions)//{ responseType: 'text' }
    }

    generateBill(data: any, totalAmount: any): Observable<any>  {

        this.dataForBillGenerate.companyName= data[0].companyName;
        this.dataForBillGenerate.woPoDate= data[0].woPoDate;
        this.dataForBillGenerate.woPoNumber= data[0].woPoNumber;
        this.dataForBillGenerate.totalAmount= totalAmount;

        console.log("data", data);
        

        this.dataForBillGenerate.billDataDto = [];

        for (let i = 0; i < data.length; i++) {
          const billItem = {
            amount: data[i].amount,
            cgst: data[i].cgst,
            gst: data[i].gst,
            hsnCode: data[i].hsnCode,
            igst: data[i].igst,
            itemDescr: data[i].itemDescr,
            quantity: data[i].quantity,
            rate: data[i].rate,
            sgst: data[i].sgst,
            unit: data[i].unit
          };
          this.dataForBillGenerate.billDataDto.push(billItem);
      }         

      let headers1= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`)

      let http_headers= new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
     })

      console.log("this.dataForBillGenerate", this.dataForBillGenerate);
      return this.http.post(`http://localhost:8080/api/v1/bill/saveBill`, this.dataForBillGenerate, 
      { 'headers':  http_headers } );//, { 'headers': headers1 }
    }

    getAllCompanies(): Observable<any> {
      console.log('header:', this.httpOptions)
      return this.http.get(`http://localhost:8080/api/v1/dashboard/getAllCompanies`, this.httpOptions )
      // ${this.url}/api/v1/dashboard/getAllCompanies
    }

  getAllCompaniesByUser(): Observable<any> {
      console.log('header:', this.httpOptions)
      return this.http.get(`http://localhost:8080/api/v1/dashboard/getCompaniesByUser`, this.httpOptions )
      // ${this.url}/api/v1/dashboard/getAllCompanies
  }

  getAllSubCompanies(): Observable<any> {

      return this.http.get(`${this.url}/api/v1/dashboard/getAllSubCompanies`, { 'headers': this.http_header } )
  }

  addCompany(data: any): Observable<any>{
      console.log("api call for data::::", data)

      let http_headers= new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
     })

      return this.http.post('http://localhost:8080/api/v1/dashboard/addCompany', data, { 'headers': http_headers });
  }
   

  changePassword(data: any): Observable<any>{

    let header= this.httpOptions;
    return this.http.post(`http://localhost:8080/api/v1/auth/changePassword`, data, { 'headers': this.headers });
  }

  downloadBill(billNumber: string): Observable<any> {


    return this.http.post(`http://localhost:8080/api/v1/history/downloadbillByNumber`, {billNumber: billNumber}  , { 'headers': this.headers });
  }
}







