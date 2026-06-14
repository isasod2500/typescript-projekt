import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../services/course-service';
import { Coursemodel } from '../models/modelCourse';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {

  //Skapar output för sökfiltrering
  @Output() searchFilter = new EventEmitter<string>();

  value: string = ""
  courses = signal<Coursemodel[]>([]);

  courseService = inject(CourseService);

  //Tar input från sökfält och emittar till Home. 
  async filterValue(value: string) {
    this.searchFilter.emit(value)
  }
}
