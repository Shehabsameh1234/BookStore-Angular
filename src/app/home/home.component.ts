import { Component } from '@angular/core';
import { HomeSeriveService } from './home-serive.service';
import { Books } from './books';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books!: Books[]
  ifError: boolean = false
  numberOfPages!: number
  pageIndex!: number

  constructor(private _HomeSeriveService: HomeSeriveService) { }
  ngOnInit(): void {

    this._HomeSeriveService.getAllBooks().subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
        this.numberOfPages = Math.ceil(res.count / res.pageSize)
      },
      error: () => {
        this.ifError = true
      }
    })
  }

  reloadPage() {
    location.reload()
  }

  getPgaeByNumber(pageNumber: number) {
    this._HomeSeriveService.getAllBooks(pageNumber).subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
      },
      error: () => {
        this.ifError = true
      }
    })
  }
  getNextPage()
  {
    this.pageIndex++
    this._HomeSeriveService.getAllBooks(this.pageIndex).subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
      
      },
      error: () => {
        this.ifError = true
      }
    })
  }
  getPreviousPage()
  {
    this.pageIndex--
    this._HomeSeriveService.getAllBooks(this.pageIndex).subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
      
      },
      error: () => {
        this.ifError = true
      }
    })
  }
}
