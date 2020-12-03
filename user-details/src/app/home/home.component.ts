import { Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  users: any[];
  loading = false;
  error: any;
  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: gql`
      query  {
        users {
          id
          firstName
          lastName
          age
          location
        }
      }
      `
    });
    this.query.valueChanges.subscribe(result => {this.users = result.data && result.data.users;
    });
  
  }
}
