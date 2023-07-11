import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { authService } from '../services/authService.component';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  
  constructor(private authService: authService, private route: ActivatedRoute, private router: Router){   
  }

  formGroup = new FormGroup({

    userName: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
    
  });

  createUser(){
    console.log("formgroup",this.formGroup.value)
    this.authService.createUser(this.formGroup.value)
        .subscribe((result)=>{
          console.log(result);
          const message= `user with email: ${this.formGroup.value.email} added succesfully as ${this.formGroup.value.role} `
          Swal.fire({
            title: 'Success',
            text: `${message}`,
            icon: 'success'
          });
        }, 
        (error)=>{
          console.info(error);//.error.message
          const errorMessage = error.error.message || 'An error occurred.';
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error'
          });
        })
    


  }
  showCard2=false;
    ngOnInit(): void {
    $(function(){
  
      $('#eye').click(function(){
           
            if($(this).hasClass('fa-eye-slash')){
               
              $(this).removeClass('fa-eye-slash');
              
              $(this).addClass('fa-eye');
              
              $('#password').attr('type','text');
                
            }else{
             
              $(this).removeClass('fa-eye');
              
              $(this).addClass('fa-eye-slash');  
              
              $('#password').attr('type','password');
            }
        });
        $('#eye2').click(function(){
           
          if($(this).hasClass('fa-eye-slash')){
             
            $(this).removeClass('fa-eye-slash');
            
            $(this).addClass('fa-eye');
            
            $('#cpassword').attr('type','text');
              
          }else{
           
            $(this).removeClass('fa-eye');
            
            $(this).addClass('fa-eye-slash');  
            
            $('#cpassword').attr('type','password');
          }
      });
    });

     // Call the function to fetch companies
     this.fetchCompanies();    
  }
  showcard2(){
    this.showCard2=true;
  }

  companyName: any;
  companyArray: any[]= [];


  companies: any[]= []; // Array to store the fetched companies

  //get all companies....
  fetchCompanies(): void {
    // Make an HTTP request to the API to fetch companies

    this.authService.getAllCompanies().subscribe( (result)=>{
      console.log(result);
      this.companyArray = result;

      console.log("this.companies", this.companyArray)
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
