import Router from 'koa-router';
import * as KoaPassport from 'koa-passport';
import { IUser } from '../models/user';
import { DefaultState, Context } from 'koa';
import { ROUTES, CLIENT_CALLBACK } from '../utils/config';

import url from 'url';

const google = function (router: Router<DefaultState, Context>, passport: typeof KoaPassport) {
    router.get(
        ROUTES.GOOGLE_AUTH,
        passport.authenticate('google', { scope: ['profile', 'email'] }),
    );

    router.get(ROUTES.GOOGLE_AUTH_CALLBACK, async (ctx, next) => {
        return passport.authenticate('google', (err: string, user: IUser) => {
            if (err) {
                ctx.unauthorized(err, err);
            } else {
                ctx.login(user);
                ctx.redirect(CLIENT_CALLBACK);
            }
        })(ctx, next);
    });
    return router;
};
export default google;
