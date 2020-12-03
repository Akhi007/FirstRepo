import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateUser: any = {};

  constructor(private apollo: Apollo) {}

  ngOnInit() {
  }

  submitForm(){
    this.apollo.mutate({
       mutation: gql`
       mutation updateUser($id: String!, $firstName: String!, $lastName: String!, $age: String!, $location: String!) {
        updateUser(id: $id, firstName: $firstName, lastName: $lastName,age: $age, location: $location){
          id
          firstName
          lastName
          age 
          location
        }
       }
   `,
    variables: {
      id: this.updateUser.id,
     firstName: this.updateUser.firstName,
     lastName: this.updateUser.lastName,
     age: this.updateUser.age,
     location: this.updateUser.location
    }
     }).subscribe(
       ({ data }) => {
         console.log( data);
         
       },
       error => {
         console.log("there was an error sending the query", error);
         
       }
     );
}
}
