import { Component, OnInit } from '@angular/core';
import { authService } from '../services/authService.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor( private authService: authService, private formBuilder: FormBuilder ){ }

  ngOnInit() {
    this.getCompanies(); // Call the method when the component initializes

    // this.rowForm = this.formBuilder.group({
    //   companyName:['', Validators.required],
    //   companyGstin:['', Validators.required],
    //   address:['', Validators.required],
    //   contactNo1:['', Validators.required],
    //   cinNo:[''],  
    //   companyEmail:[''],  
    //   image: ['']
    // });
  }

  rowForm !: FormGroup;
  // selectedImage: File | null = null;

  companyNamesArray: any[]= []; //  property to store the company names

 

  showAlert(response: any) {
    Swal.fire({
      title: response.success ? 'Success' : 'Error',
      text: response.message,
      icon: response.success ? 'success' : 'error'
    });
  }



  getCompanies(){

    // this.authService.getAllCompanies().subscribe( (result)=>{
    this.authService.getAllCompaniesByUser().subscribe( (result)=>{
      console.log(result);
      this.companyNamesArray= result;

    }, (error)=>{
      console.log(error);

      const errorMessage = error.error.message || 'An error occurred.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error'
        });
    } );
  }
}

 // showForm = false; //  property to show  the form to save company 
  // toggleForm() {    //  shows the form to save company  based on showform value

  //   this.showForm = !this.showForm;
  // }

  // onImageSelect(event: any) {
  //   this.selectedImage = event.target.files[0];
  // }

  // uploadDataWithFile(data: any, file: File) {
  //   const formData: FormData = new FormData();
    
  //   // Append form data
  //   formData.append('key1', data.key1);
  //   formData.append('key2', data.key2);
    
  //   // Append file
  //   formData.append('file', file, file.name);
  // }


  // submitCompany(){
  //   if (this.rowForm.valid) {

  //     const formData = new FormData();

  //     const companyName = this.rowForm.get('companyName');
  //     if (companyName) {
  //       formData.append('companyName', companyName.value);
  //     }
  
  //     const companyDescr = this.rowForm.get('companyDescr');
  //     if (companyDescr) {
  //       formData.append('companyDescr', companyDescr.value);
  //     }
  
  //     const address = this.rowForm.get('address');
  //     if (address) {
  //       formData.append('address', address.value);
  //     }
  
  //     const contactNo1 = this.rowForm.get('contactNo1');
  //     if (contactNo1) {
  //       formData.append('contactNo1', contactNo1.value);
  //     }
  
  //     const contactNo2 = this.rowForm.get('contactNo2');
  //     if (contactNo2) {
  //       formData.append('contactNo2', contactNo2.value);
  //     }
  
  //     if (this.selectedImage) {
  //       formData.append('image', this.selectedImage);
  //     }
    
  //     if (this.selectedImage) {
  //       formData.append('image', this.selectedImage);
  //     }
  //     console.log("companyForm: ", formData)
  //     this.authService.addCompany(formData).subscribe( (result)=>{
  //       console.log("result: ",result);
  //         Swal.fire({
  //           title: 'Success',
  //           text: `Company added with name: ${result.companyName} and id: ${result.id}`,
  //           icon: 'success'
  //         });
  //       console.log(" company is added with name: "+result.companyName+" and id: "+result.id);

  //     }, (error)=>{
  //       const errorMessage = error.error.message || 'An error occurred.';
  //       Swal.fire({
  //         title: 'Error',
  //         text: errorMessage,
  //         icon: 'error'
  //       });
  //     } );
     
  //   }
  //   else if(this.rowForm.invalid){
  //     if (this.rowForm.invalid) {
  //       // Mark all fields as touched to trigger validation errors even if not filled...
  //       this.markFormGroupTouched(this.rowForm);
  //       return;
  //     }
  //   }
  // }
  //  // marks each form's control as touched after submitting
  //  markFormGroupTouched(formGroup: FormGroup) {
  //   Object.values(formGroup.controls).forEach(control => {
  //     control.markAsTouched();
  
  //     if (control instanceof FormGroup) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }
