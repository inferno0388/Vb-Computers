import { Component, OnInit } from '@angular/core';
import { authService } from '../services/authService.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit{

  constructor( private authService: authService, private formBuilder: FormBuilder ){ }

  ngOnInit() {

    this.rowForm = this.formBuilder.group({
      companyName:['', Validators.required],
      gstin:['', Validators.required],
      address:['', Validators.required],
      contactNo1:['', Validators.required],
      cinNumber:['', Validators.required],  
      companyEmail:['', Validators.required],  
      
    });
  }

  rowForm !: FormGroup;

  demo(){
    console.log("demo")
  }

  submitCompany(){
    if (this.rowForm.valid) {

      console.log("companyForm: ", this.rowForm.value)

      this.authService.addCompany(this.rowForm.value).subscribe( (result)=>{
        console.log("result: ",result);
          Swal.fire({
            title: 'Success', 
            text: `${result.message}`,
            icon: 'success'
          });
        // console.log(" company is added with name: "+result.companyName+" and id: "+result.id);

      }, (error)=>{
        const errorMessage = error.error.message || 'An error occurred.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error'
        });
      } );
     
    }
    else if(this.rowForm.invalid){
      if (this.rowForm.invalid) {

        // Mark all fields as touched to trigger validation errors even if not filled...
        this.markFormGroupTouched(this.rowForm);
        return;
      }
    }
  }
   // marks each form's control as touched after submitting
   markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
