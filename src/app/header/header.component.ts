import { Component, ElementRef  } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authService } from '../services/authService.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'; 
import Swal from 'sweetalert2';
// import { NgbModal }



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  formGroup!: FormGroup;

  loggedInUserName: string = 'default name';
  loggedInUserRole: string= 'user';

  loggedInUserDetails: { name: string, role: string } = { name: '', role: '' };
  // constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private authService: authService) {}
  constructor(private dialog: MatDialog, private formBuilder: FormBuilder
    , private authService: authService, private userService: UserService
    , private router: Router, private elementRef: ElementRef  ) {
   
      
  }

  initForm() {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
  //  let  loggedInUserDetails = this.userService.getLoggedInUserDetails();
    this.initForm();
    this.loggedInUserName = localStorage.getItem('loggedInUser') ?? '';
    this.loggedInUserRole = localStorage.getItem('role') ?? '';

    //  let userName= localStorage.getItem('loggedInUser');
    //  let role= localStorage.getItem('role');
  }

  // let userDetails= login.getLoggedInUserDetails();
    
    onSubmit() {
      if (this.formGroup.valid) {
        console.log("Form submitted");
        console.log("Form submitted:", this.formGroup.value);
  
        this.authService.changePassword(this.formGroup.value).subscribe(
          (result) => {
            console.log(result);
            const message= `password changed successfully`
            Swal.fire({
              title: 'Success',
              text: `${message}`,
              icon: 'success'
            });

            localStorage.setItem('token', `${result.jwtToken}`);

          },
          (error) => {
            console.log(error.error.message);
            const errorMessage = error.error.message || 'An error occurred.';
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error'
            });
          }
        );
      }
    }
   
    // closeModal(): void {
    //   const modalElement = document.getElementById('exampleModal');
    //   const modal = new bootstrap.Modal(modalElement);
    //   modal.hide();
    // }

    logout(){
      localStorage.removeItem('token');
      this.userService.setLoggedInUserDetails('', '');

      // Navigate to the login page
      this.router.navigate(['/']);
      // this.router.navigate(['/index']);
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('role');
    }

    showForm= false;
  }

  // @NgModule({
  //   declarations: [HeaderComponent],
  //   imports: [FormsModule, ReactiveFormsModule],
  //   exports: [HeaderComponent]
  // })
  // export class HeaderModule {}

    // onSubmit(){
    //   if (this.formGroup.valid) {
    //     console.log("Form submitted");
    //     console.log("Form submitted:", this.formGroup.value);

    //     this.authService.changePassword(this.formGroup.value).subscribe((result)=>{
    //       console.log(result)
    //     }, 
    //     (error)=>{
    //       console.log(error);
    //     });
    //   }
    // }

  // openPopupForm() {
  //   const dialogRef: MatDialogRef<PopupFormComponent> = this.dialog.open(PopupFormComponent, {
  //     width: '400px' // Customize the width as per your requirement
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log('Form data:', result); // Access the form data here
  //       // Perform any required actions with the form data
  //     }
  //   });
  // }


