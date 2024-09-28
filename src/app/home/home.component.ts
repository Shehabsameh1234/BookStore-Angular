import { Component } from '@angular/core';
import { HomeSeriveService } from './home-serive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books!:any[]
  constructor(private _HomeSeriveService:HomeSeriveService){}
  ngOnInit(): void {
    
    this._HomeSeriveService.getAllBooks().subscribe({
      next:(res)=>{
        console.log(res.data);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
    
  }
}
