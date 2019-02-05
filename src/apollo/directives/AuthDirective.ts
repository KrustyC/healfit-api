import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';

export default class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    // const { resolve = defaultFieldResolver } = field;
    const resolve = field.resolve;
    const { role } = this.args;

    field.resolve = async function(...args: any[]) {
      const [, , ctx] = args;
      const { user } = ctx;
      if (user) {
        if (role && !user.roles.includes(role)) {
          throw new AuthenticationError(
            'You are not authorized to view this resource.'
          );
        }
        return resolve.apply(this, args);
      }
      throw new AuthenticationError(
        'You must be signed in to view this resource.'
      );
    };
  }
}
