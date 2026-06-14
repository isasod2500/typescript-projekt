import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../services/course-service';
import { Coursemodel } from '../models/modelCourse';
import { Searchbar } from '../searchbar/searchbar';
import { Subjects } from '../subjects/subjects';


@Component({
  selector: 'app-home',
  imports: [Searchbar, Subjects],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  courses = signal<Coursemodel[]>([]);
  error = signal<string | null>(null)
  sorted: boolean = false;


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

      this.courses().forEach(course => {
        console.log(course.subject)
      })
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

      if (id === "points") {
        if (this.sorted == false) {
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

  async filterSubject(subject: string) {
    try {
      const response = await this.courseService.getCourses();
      this.courses.set(response)
      this.courses().forEach(course => {
        console.log(course.subject)
      })
    } catch (err) {
      console.log(err)
    }
  }
}
