import { Component,OnInit } from '@angular/core';
import * as $ from 'jquery';
import { login } from '../data-type';
import { authService } from '../services/authService.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule }   from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // private login:Auth;
    private loggedIn= false;
    formGroup!: FormGroup;

  constructor(private authService: authService, private route: ActivatedRoute
    , private router: Router, private userService: UserService  ){   
  }

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
    });

    
 this.initForm();
  }
  // email: string= "vaibhav@gmail.com";
  // password: string;
  // username: string='';
  initForm(){
    this.formGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
    }
    
    onSubmit() {
      console.log("formgroup",this.formGroup.value)
      this.authService.login(this.formGroup.value).subscribe(
        (result) => {
          console.log("result: ",result);
          localStorage.setItem('token', result.jwtToken); 
          this.loggedIn = true;

          const message= `You are logged in successfully!!`
            Swal.fire({
              title: 'Success',
              text: `${message}`,
              icon: 'success'
            });
          

          // after successful login
          // set user name and role to show in nav bar
         this.userService.setLoggedInUserDetails(result.loggedInUser, result.role);
         localStorage.setItem('loggedInUser', result.loggedInUser);
         localStorage.setItem('role', result.role);
         
          this.router.navigate(['/dashboard']);
        },
        (error)=>{
          console.log(error)
          const errorMessage = error.error.message || 'An error occurred.';
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error'
            });
        }
      
      )};
    }
    

