import { Component } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { Books } from '../shared/interfaces/books';
import { ViewChild, ElementRef } from '@angular/core';
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
  book!: Books


  constructor(private _BookService: BookService) { }

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

  reloadPage() {
    location.reload()
  }

}
