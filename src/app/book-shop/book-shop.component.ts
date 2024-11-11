import { Component } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { Books } from '../shared/interfaces/books';
import { ViewChild, ElementRef } from '@angular/core';
import { BasketService } from '../shared/services/basket.service';
declare var bootstrap: any; // Make sure Bootstrap JS is loaded
@Component({
  selector: 'app-book-shop',
  templateUrl: './book-shop.component.html',
  styleUrls: ['./book-shop.component.css']
})
export class BookShopComponent {
  modalView: boolean = true;
  @ViewChild('modalRef') modalElement!: ElementRef;
  books!: Books[]
  categories!: any[]
  ifError: boolean = false
  pageSize!: number
  count!: number
  categoryId!: any
  isFilter: boolean = false
  sortedBy!: string
  book!: any


  constructor(private _BookService: BookService,private _BasketService : BasketService) { }

  // Toggle Modal based on boolean value
  toggleModal() {
    const modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);

    if (this.modalView) {
      modalInstance.show(); // Show the modal
    } else {
      modalInstance.hide(); // Hide the modal
    }
  }

  ngOnInit(): void {
    this.getBook(1)
    this._BookService.getAllBooks(1, 4).subscribe({
      next: (res) => {
        this.categoryId = null
        this.isFilter = false
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
        this.categories = res

        this.ifError = false

      },
      error: () => {
        this.ifError = true
      }
    })
  }
  loadMore() {
    this.pageSize = this.pageSize + 3
    if (this.categoryId == null) {
      this._BookService.getAllBooks(1, this.pageSize, this.sortedBy).subscribe({
        next: (res) => {

          this.books = res.data
          this.pageSize = res.pageSize
        },
        error: () => {
          this.ifError = true
        }
      })
    }
    else {
      this._BookService.getByCategory(1, this.pageSize, this.categoryId, this.sortedBy).subscribe({
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

  getByCategory(CategoryId: number) {
    this.categoryId = CategoryId
    this._BookService.getByCategory(1, 4, this.categoryId).subscribe({
      next: (res) => {
        this.isFilter = true
        this.books = res.data
        this.pageSize = res.pageSize
        this.count = res.count
      },
      error: () => {
        this.toggleModal()
      }
    })
  }


  sortBy(sortBy: string) {
    this.sortedBy = sortBy
    if (this.categoryId == null) {
      this._BookService.getAllBooks(1, this.pageSize, this.sortedBy).subscribe({
        next: (res) => {
          this.isFilter = true
          this.books = res.data
          this.pageSize = res.pageSize
          this.count = res.count
        },
        error: () => {
          this.ifError = true
        }
      })
    }
    else {
      this._BookService.getByCategory(1, this.pageSize, this.categoryId, this.sortedBy).subscribe({
        next: (res) => {
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
  getBook(bookid: number) {
    this._BookService.getBook(bookid).subscribe({
      next: (res) => {
        this.book = res
      },
      error: () => {
        this.ifError = true

      }
    })
  }

  addToBasket(productId: number) {
    let div = document.getElementById(`row${productId}`);
    const div2= document.getElementById(`${productId}`)
    this._BasketService.addToBasket(productId).subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.totalAmount.next(res.totalAmount)
        this._BasketService.numberOfItems.next(res.items.length)
        setTimeout(() => {
          div = document.getElementById(`row${productId}`);
          div?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            div?.classList.add("alert-div")
          }, 200);
          setTimeout(() => {
            div?.classList.remove("alert-div")
          }, 1100);
        }, 0)
      },
      error: () => {
        div?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(()=>{
          if(div2){
            div2.classList.add("alert-div")
          }
        },500)
        setTimeout(()=>{
          if(div2){
            div2.classList.remove("alert-div")
          }
        },1500)
      }
    })
  }

  reloadPage() {
    location.reload()
  }

}
