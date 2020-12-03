import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  userId: string;
  deleteUser: any = {};
  msg = '';
  
  constructor(private apollo: Apollo) {}

  ngOnInit() {
  }
  submitForm(){
    this.apollo.mutate({
       mutation: gql`
       mutation deleteUser($id: String!) {
         deleteUser(id: $id)
       }
   `,
    variables: {
     id: this.deleteUser.id
    }
     }).subscribe(
      ({ data }) => {
        console.log( data);
        this.msg = "user deleted";
      },
      error => {
        console.log("there was an error sending the query", error);
        this.msg = "invalid userId";
      }
    );

 }
   }

