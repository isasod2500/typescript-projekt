import { Component, inject, signal } from '@angular/core';
import { Coursemodel } from '../models/modelCourse';
import { CourseService } from '../services/course-service';

@Component({
  selector: 'app-my-page',
  imports: [],
  templateUrl: './my-page.html',
  styleUrl: './my-page.css',
})
export class MyPage {

  //Skapar objekt för kurskoder och deras successmeddelande
  successTexts = signal<Record<string, string>>({});

  courseService = inject(CourseService);

  allCourses = signal<Coursemodel[]>([]);
  courses = signal<Coursemodel[]>([]);

  error = signal<string | null>(null)
  sorted: boolean = false;

  //Vid hämtning av sida, laddar kurser
  ngOnInit() {
    this.showCourses();
  }

  //Funktion för att få fram idt tillhörande vad som klickas. 
  findID(id: Event) {
    const element = id.target as HTMLElement
    this.filterCourses(element.id)
  }

  async showCourses() {
    const stored = localStorage.getItem("courses");

    //Om inget finns i courses, gör den null. Annars hämta info
    const courses: string[] = stored ? JSON.parse(stored) : [];

    const ids: string[] = stored ? JSON.parse(stored) : [];

    const allCourses = await this.courseService.getCourses();

    const filteredCourses = allCourses.filter(course =>
      ids.includes(course.courseCode)
    )

    this.courses.set(filteredCourses)
    this.allCourses.set(filteredCourses)

  }


  removeCourse(id: string) {
    const stored = localStorage.getItem("courses");

    // Hämta array eller tom
    const courses: string[] = stored ? JSON.parse(stored) : [];

    const updatedCourses = courses.filter(courseId => courseId !== id);

    localStorage.setItem("courses", JSON.stringify(updatedCourses));

    this.showCourses()
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
  
}

