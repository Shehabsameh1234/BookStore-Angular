import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  fullText: string = '';
  displayText: string = '';
  isReadMore: boolean = false;
  isLongText: boolean = false;

  readonly MAX_LINES: number = 1;

  ngOnInit() {
    // Simulate fetching data from an API
    this.fullText = `Harry Potter can’t wait for his holidays with the dire Dursleys to end. But a small, self-punishing house-elf warns Harry of mortal danger awaiting him at Hogwarts. Returning to the castle nevertheless, Harry hears a rumour about a Chamber of Secrets, holding unknown horrors for wizards of Muggle parentage. 
    Now someone is casting spells that turn people to stone, and a terrible warning is found painted on the wall. The chief suspect – always in the wrong place – is Harry. But something much more terrifying has yet to be unleashed.`;

    this.setupText();
  }

  setupText() {
    // Split the text into an array of lines
    const lines = this.fullText.split('\n');
    
    // Check if the text has more than MAX_LINES
    if (lines.length > this.MAX_LINES) {
      this.isLongText = true;
      this.displayText = lines.slice(0, this.MAX_LINES).join(' ') + '...'; // Display only the first 5 lines
    } else {
      this.displayText = this.fullText; // If the text is shorter, display all
    }
  }

  toggleReadMore() {
    this.isReadMore = !this.isReadMore;
    if (this.isReadMore) {
      this.displayText = this.fullText; // Show full text on "Read More"
    } else {
      this.setupText(); // Go back to showing first 5 lines on "Read Less"
    }
  }
}
