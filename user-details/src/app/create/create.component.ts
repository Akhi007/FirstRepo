
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  createUser: any = {};
  msg = '';

  constructor(private apollo: Apollo, private _router :Router) {}

  ngOnInit() {
  }

  submitForm(){
   this.apollo.mutate({
      mutation: gql`
      mutation createUser($firstName: String!, $lastName: String!, $age: String!, $location: String!) {
        createUser(firstName: $firstName, lastName: $lastName,age: $age, location: $location){
          
          firstName
          lastName
          age 
          location
        }
      }
  `,
   variables: {
    firstName: this.createUser.firstName,
    lastName: this.createUser.lastName,
    age: this.createUser.age,
    location: this.createUser.location
   }
    }).subscribe(
      ({ data }) => {
        console.log( data);
        this.msg = "user created successfully";
      },
      error => {
        console.log("there was an error sending the query", error);
             }
    );
}
  }
