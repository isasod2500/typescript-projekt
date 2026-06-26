import { Injectable, inject } from '@angular/core';
import { CourseService } from './course-service';
import { Coursemodel } from '../models/modelCourse';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {

  courseService = inject(CourseService);

  getLocalStorage(): string[] {
    const stored = localStorage.getItem("courses")
    
    return stored ? JSON.parse(stored) : [];

  }

  //Funktion för att visa
  async getCourses(): Promise<Coursemodel[]> {
    const id = this.getLocalStorage();
    const allCourses = await this.courseService.getCourses();

    return allCourses.filter(course =>
      id.includes(course.courseCode)
    )
  }

  removeCourse(id: string) {
    const ids = this.getLocalStorage().filter(c => c !== id);
    localStorage.setItem("courses", JSON.stringify(ids))
  }

}
