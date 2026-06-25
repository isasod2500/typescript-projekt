import { Component, inject, signal } from '@angular/core';
import { Coursemodel } from '../models/modelCourse';
import { CourseService } from '../services/course-service';
import { Searchbar } from '../searchbar/searchbar';
import { Subjects } from '../subjects/subjects';
import { Reset } from '../reset/reset';

@Component({
  selector: 'app-my-page',
  imports: [Searchbar, Subjects, Reset],
  templateUrl: './my-page.html',
  styleUrl: './my-page.css',
})
export class MyPage {

  //Skapar objekt för kurskoder och deras successmeddelande
  successTexts = signal<Record<string, string>>({});

  courseService = inject(CourseService);

  allCourses = signal<Coursemodel[]>([]);
  courses = signal<Coursemodel[]>([]);

  subjectValue: string = "";
  searchValue = signal<string>("")

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

    //Återapplicera filtrering efter borttagning
    this.allCourses.set(
      this.allCourses().filter(c => c.courseCode !== id)
    );
    this.combineFilter();
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

  //funktion för ämne
  selectedSubject(subject: string) {
    this.subjectValue = subject;
    this.combineFilter();
  }

  //Funktion för sökruta
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

  resetFilter() {
    this.searchValue.set("");
    this.subjectValue = "";
    this.courses.set(this.allCourses());

    const select = document.querySelector("select") as HTMLSelectElement;
    if (select) select.value = "";

    const search = document.getElementById("search") as HTMLInputElement;
    if (search) search.value = "";
  }

}

