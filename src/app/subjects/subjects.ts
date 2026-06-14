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

  @Output() subjectSelected = new EventEmitter<string>();

  subjects = computed(() =>
    [...new Set(this.courses().map(c => c.subject))]
  )

  courses = signal<Coursemodel[]>([]);
  courseService = inject(CourseService);

  ngOnInit() {
    this.loadCourses()
  }

  async loadCourses() {
    const response = await this.courseService.getCourses();
    this.courses.set(response)
  }

  filterSubjects(subject: string) {
    this.subjectSelected.emit(subject);
  }



}