import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.css"]
})
export class FindComponent {
  userId: string;
  user: any = {};
  private query: QueryRef<any>;
  msg = '';
  
  constructor(private apollo: Apollo) {}
  ngOnInit() {
  }

  findBook() {
   this.query =  this.apollo
      .watchQuery<any>({
        query: gql`
          query($id: String!) {
            user(id: $id) {
              id
              firstName
              lastName
              age
              location
            }
          }
        `,
        variables: {
          id: this.user.id
        }
      });
      this.query.valueChanges.subscribe(result => {this.user = result.data && result.data.user;
      },
        error => {
          console.log("there was an error sending the query", error);
          this.msg = "user not found";
        }
        
      );
  }
}
