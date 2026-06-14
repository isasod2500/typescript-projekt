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

  allCourses = signal<Coursemodel[]>([]);
  courses = signal<Coursemodel[]>([]);

  error = signal<string | null>(null)
  sorted: boolean = false;

  subjectValue: string = "";
  searchValue = signal<string>("")

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
      this.allCourses.set(response);
      this.courses.set(response);

    } catch (err) {
      console.error(err);
      this.error.set("Kunde inte ladda data - försök igen senare");
    }
  }

  //Filtrerar kurskod, namn och prog.
  async filterCourses(id: string) {
    try {
      let data = [...this.courses()];

      if (id === "code") {
        if (this.sorted == false) {
          data.sort((a, b) => a.courseCode.localeCompare(b.courseCode))
          this.courses.set(data)
          this.sorted = true;
        } else {
          data.sort((a, b) => b.courseCode.localeCompare(a.courseCode))
          this.courses.set(data)
          this.sorted = false;
        }
      }

      if (id === "name") {
        if (this.sorted == false) {
          data.sort((a, b) => a.courseName.localeCompare(b.courseName))
          this.courses.set(data)
          this.sorted = true;
        } else {
          data.sort((a, b) => b.courseName.localeCompare(a.courseName))
          this.courses.set(data)
          this.sorted = false;
        }
      }

      if (id === "progression") {
        if (this.sorted == false) {
          data.sort((a, b) => a.progression.localeCompare(b.progression))
          this.courses.set(data)
          this.sorted = true;
        } else {
          data.sort((a, b) => b.progression.localeCompare(a.progression))
          this.courses.set(data)
          this.sorted = false;
        }
      }

      if (id === "points") {
        if (this.sorted == false) {
          data.sort((a, b) => a.points - b.points)
          this.courses.set(data)
          this.sorted = true
        } else {
          data.sort((a, b) => b.points - a.points)
          this.courses.set(data)
          this.sorted = false
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  selectedSubject(subject: string) {
    this.subjectValue = subject;
    this.combineFilter();
  }

  searchFilter(value: string) {
    this.searchValue.set(value.toLowerCase());
    this.combineFilter()
  }

  combineFilter() {
    let data = this.allCourses();

    //Applicera sökfiltrering
    if (this.searchValue()) {
      data = data.filter(course =>
        course.courseName.toLowerCase().includes(this.searchValue()) ||
        course.courseCode.toLowerCase().includes(this.searchValue())
      )
    }

    //Applicera ämnesfiltrering 
    if (this.subjectValue) {
      data = data.filter(c => c.subject === this.subjectValue)
    }

    //Uppdatera variabel courses med filtrerad data
    this.courses.set(data)
  }

  addCourse(id: string) {
    const stored = localStorage.getItem("courses")

    const courses: string[] = stored ? JSON.parse(stored) : []

    if (courses.includes(id)) {
      return;
    }
    courses.push(id)

    localStorage.setItem("courses", JSON.stringify(courses))

    console.log(stored)
  }
}
