import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Coursemodel } from '../models/modelCourse';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json"

  http = inject(HttpClient);

  async getCourses(): Promise<Coursemodel[]> {
    const courses = this.http.get<Coursemodel[]>(this.url);
    return await firstValueFrom(courses)
  }
}
