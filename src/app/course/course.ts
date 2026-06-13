import { Component, Input } from '@angular/core';
import { CourseService } from '../services/course-service';
import { Coursemodel } from '../models/modelCourse';


@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {

  @Input() courses: Coursemodel[] = [];

}