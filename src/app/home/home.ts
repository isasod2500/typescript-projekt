import { Component, inject,signal } from '@angular/core';
import { Course } from '../course/course';
import { CourseService } from '../services/course-service';
import { Coursemodel } from '../models/modelCourse';


@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  courses = signal<Coursemodel[]>([]);
  error = signal<string | null>(null)
  sorted: boolean = false;
  value: string = ""

  courseService = inject(CourseService);



  //Funktion för att få fram idt tillhörande vad som klickas. 
  findID(id: Event) {
    const element = id.target as HTMLElement
    this.filterCourses(element.id)
  }

  ngOnInit() {
    this.loadCourses();
  }

  //laddar in kurser.
  async loadCourses() {
    try {
      const response = await this.courseService.getCourses();
      this.courses.set(response)
      console.log(this.courses())
    } catch (error) {
      console.error(error);
      this.error.set("Kunde inte ladda data - försök igen senare");
    }
  }

  //Filtrerar kurskod, namn och prog.
  async filterCourses(id: string) {
    try {
      const response = await this.courseService.getCourses();

      if (id === "code") {
        if (this.sorted == false) {
          response.sort((a, b) => a.courseCode.localeCompare(b.courseCode))
          this.courses.set(response)
          this.sorted = true;
        } else {
          response.sort((a, b) => b.courseCode.localeCompare(a.courseCode))
          this.courses.set(response)
          this.sorted = false;
        }
      }

      if (id === "name") {
        if (this.sorted == false) {
          response.sort((a, b) => a.courseName.localeCompare(b.courseName))
          this.courses.set(response)
          this.sorted = true;
        } else {
          response.sort((a, b) => b.courseName.localeCompare(a.courseName))
          this.courses.set(response)
          this.sorted = false;
        }
      }

      if (id === "progression") {
        if (this.sorted == false) {
          response.sort((a, b) => a.progression.localeCompare(b.progression))
          this.courses.set(response)
          this.sorted = true;
        } else {
          response.sort((a, b) => b.progression.localeCompare(a.progression))
          this.courses.set(response)
          this.sorted = false;
        }
      }

      if(id === "points") {
        if(this.sorted == false) {
          response.sort((a, b) => a.points - b.points)
          this.courses.set(response)
          this.sorted = true
        } else {
          response.sort((a, b) => b.points - a.points)
          this.courses.set(response)
          this.sorted = false
        }
      }
    } catch (err) {
      console.log(err)
    }

  }

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



