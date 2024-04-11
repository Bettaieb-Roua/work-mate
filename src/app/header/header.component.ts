import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string = '';
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,private route:ActivatedRoute, private sharedDataService:SharedDataService) {
    this.sharedDataService.currentUsername.subscribe((username)=>{
      this.username=username;
    });
  }
  getDynamicUsername() {
    return this.username ? this.username : 'DefaultUsername';
}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout(){
    this.router.navigate(['/signup'])
    
  }
}
