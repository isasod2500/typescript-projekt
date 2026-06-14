import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../services/course-service';
import { Coursemodel } from '../models/modelCourse';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {

  value: string = ""
  courses = signal<Coursemodel[]>([]);

  courseService = inject(CourseService);

  //Tar input från sökfält, gör om till lowercase för att korrekt filtrera och tar endast med matchande sökfraser.
  async filterValue(value: string) {
    try {
      const response = await this.courseService.getCourses();
      this.value = value.toLowerCase();

      const result = response.filter(course =>
        course.courseName.toLowerCase().includes(this.value) ||
        course.courseCode.toLowerCase().includes(this.value)
      );

      this.courses.set(result)
    } catch (err) {
      console.log(err)
    }
  }
}
