import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  ngOnInit(): void {
    
  }
  
isAdmin: boolean = false; // Initialize to false by default or based on your logic
  validateForRouting(): boolean {
    let show = localStorage.getItem('role');
    // console.log(show)
    if (show == 'admin'|| show == 'super_admin'|| show == 'ADMIN'|| show == 'SUPER_ADMIN' ) { 
      // console.log('method khatam')
      return true;
    }else{
      // console.log('method khatam')
      return false;
    }  
  }
}
