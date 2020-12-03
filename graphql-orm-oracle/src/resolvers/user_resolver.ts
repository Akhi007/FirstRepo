import { Location } from "graphql";
import {Resolver, Query, Mutation, Arg} from "type-graphql";
import { UserDetails } from "../entity/User";
import { CreateUserInput } from "../inputs/create_user_input";
import { UpdateUserInput } from "../inputs/updateUserInput";

@Resolver()
export class UserResolver {

    @Query(() => [UserDetails])
    users() {    
        return UserDetails.find();
    }

    @Mutation(() => UserDetails)
async createUser(@Arg("firstName") firstName: string, @Arg("lastName") lastName: string,@Arg("age") age: string, @Arg("location") location: string) {
  const user = await  UserDetails.create({firstName,lastName, age, location});
  if (!user) {
    throw new Error(`The user with id:  does not exist!`);
  }
  await user.save();

  return user;
}

@Query(() => UserDetails)
user(@Arg("id") id: string) {
  return UserDetails.findOne({ where: { id }});
}

@Mutation(() => UserDetails)
async updateUser(@Arg("id") id: string,@Arg("firstName") firstName: string,@Arg("lastName") lastName: string,@Arg("age") age: string,@Arg("location") location: string) {
  const user = await UserDetails.findOne({ where: { id }});

  if (!user) {
    throw new Error(`The user with id: ${id} does not exist!`);
  }

  Object.assign(user, firstName, lastName, age, location);
  await user.save();

  return user;
}

@Mutation(() => Boolean)
async deleteUser(@Arg("id") id: string) {
  const user = await UserDetails.findOne({ where: { id }});

  if (!user) {
    throw new Error(`The user with id: ${id} does not exist!`);
  }

  await user.remove();
  return true;
}
}
