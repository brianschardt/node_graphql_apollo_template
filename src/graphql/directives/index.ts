import { IsAuthUserDirective, IsAuthDirective } from './auth.directive';

export const schemaDirectives = {
    isAuth: IsAuthDirective,
    isAuthUser: IsAuthUserDirective
};