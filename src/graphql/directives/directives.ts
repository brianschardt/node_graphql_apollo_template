import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLEnumValue, GraphQLField } from "graphql";

export class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === "string") {
        return result.toUpperCase();
      }
      return result;
    };
  }
}
export class IsAuthUserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);

      let authUser, user;
      [user, {}, {authUser}] = args;
      if ((authUser && authUser.id === user.id) || user.jwt) {
        return result;
      } else {
        throw new Error('You must be the authenticated user to get this information');
      }
    };
  }
}

export class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      let authUser, user;
      [authUser, {}, {user}] = args;

      console.log('test1');
      if(!user){
        throw new Error('You must be authenticated');
      }

      return result;
    };
  }

  visitObject(schema) {
    const { resolve = defaultFieldResolver } = schema;
    schema.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      let authUser, user;
      [authUser, {}, {user}] = args;

      console.log('test1');
      if(!user){
        throw new Error('You must be authenticated');
      }

      return result;
    };
  }
}