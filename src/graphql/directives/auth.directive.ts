import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from "graphql";

export class IsAuthUserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;//This is confusing javascript syntax here is a link that describes what is going on: https://javascript.info/destructuring-assignment

    console.log(resolve);
    field.resolve = async function (...args) {

      let authUser, user;
      [user, {}, {authUser}] = args;
      if ((authUser && authUser.id === user.id) || user.login) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new Error('You must be the authenticated user to get this information');
      }
    };
  }
}

export class IsAuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      let authUser, user;
      [user, {}, {authUser}] = args;
      if(!authUser){
        throw new Error('User not authenticated');
      }

      const result = await resolve.apply(this, args);
      return result;
    };
  }
}