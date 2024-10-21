import { Component, OnInit, Pipe } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { HomeFeatures } from './models/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  totalStudents: number = 0;
  totalCourses: number = 0;
  features: HomeFeatures[] = [];
  errorMessage?: string 

  constructor(
    private homeService: HomeService,
    private studentsService: StudentsService
  ){}


  ngOnInit(): void {
    this.loadHomefeatures()
    this.fetchStudents()
  }

  loadHomefeatures(){
    this.homeService.getFeatures().subscribe({
      next: (HomeFeatures: HomeFeatures[]) => {
        this.features = HomeFeatures
      }
    })
  }
  
  fetchStudents(){
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.totalStudents = students.length
      }
    })
  }
}
