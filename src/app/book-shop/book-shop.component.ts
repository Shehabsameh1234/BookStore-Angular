import { Component } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Books } from '../shared/books';

@Component({
  selector: 'app-book-shop',
  templateUrl: './book-shop.component.html',
  styleUrls: ['./book-shop.component.css']
})
export class BookShopComponent {


  books!: Books[]
  categories!: any[]
  ifError: boolean = false
  pageSize!: number
  count!: number
  categoryId!:any
  isFilter:boolean=false

  constructor(private _BookService: BookService) { }
  ngOnInit(): void {
    
    this._BookService.getAllBooks(1, 3).subscribe({
      next: (res) => {
        this.categoryId=null
        this.isFilter=false
        this.books = res.data
        this.pageSize = res.pageSize
        this.count = res.count
      },
      error: () => {
        this.ifError = true
      }
    })
    this._BookService.getCategories().subscribe({
      next: (res) => {
        this.categories=res
       
        this.ifError = false
        
      },
      error: () => {
        this.ifError = true
      }
    })
  }

  reloadPage() {
    location.reload()
  }

  loadMore() {
    this.pageSize = this.pageSize + 3
    if(this.categoryId==null){
      this._BookService.getAllBooks(1, this.pageSize).subscribe({
        next: (res) => {
  
          this.books = res.data
          this.pageSize = res.pageSize
        },
        error: () => {
          this.ifError = true
        }
      })}
      else
      {
        this._BookService.getByCategory(1,this.pageSize,this.categoryId).subscribe({
          next: (res) => {
            this.ifError = false
            this.books = res.data
            this.pageSize = res.pageSize
            this.count = res.count
          },
          error: () => {
            this.ifError = true
          }
        })
      }
   
  }

  getByCategory(CategoryId:number)
  {
    this.categoryId=CategoryId
    this._BookService.getByCategory(1, 3,this.categoryId).subscribe({
      next: (res) => {
        this.isFilter=true
        this.ifError = false
        this.books = res.data
        this.pageSize = res.pageSize
        this.count = res.count
      },
      error: () => {
        this.ifError = true
      }
    })
  }

}
