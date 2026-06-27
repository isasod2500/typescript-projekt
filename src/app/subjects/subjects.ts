import { Component, inject, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Coursemodel } from '../models/modelCourse';
import { CourseService } from '../services/course-service';

@Component({
  selector: 'app-subjects',
  imports: [CommonModule],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects {

  //Skapar en output till HTML
  @Output() selectedSubject = new EventEmitter<string>();

  //computed körs vid ändring av courses och filtrerar ut dubblettämnen
  subjects = computed(() =>
    [...new Set(this.courses().map(c => c.subject))]
  )

  courses = signal<Coursemodel[]>([]);
  courseService = inject(CourseService);

  ngOnInit() {
    this.loadCourses()
  }

  //Funktion som fetchar courses från ramschemat från courseservice och gör courses till responsen.
  async loadCourses() {
    const response = await this.courseService.getCourses();
    this.courses.set(response)
  }


  //En change-eventlistener på HTML-elementet som skickar valt värde till home/mypage.ts
  filterSubjects(subject: string) {
    this.selectedSubject.emit(subject);
  }



}