import * as services from './service';


export default [
    {
        path: "/api/auth/signin",
        method: "post",
        handler: [services.signIn]
    },
    {
        path: "/api/auth/signup",
        method: "post",
        handler: [services.signUp]
    },
];
