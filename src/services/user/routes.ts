import * as services from './service';


export default [
    {
        path: "/api/v1/users",
        method: "get",
        handler: [services.getAll]
    },
    {
        path: "/api/v1/users/signin",
        method: "post",
        handler: [services.getOne]
    },
    {
        path: "/api/v1/users/signup",
        method: "post",
        handler: [services.create]
    },
    {
        path: "/api/v1/users/:id",
        method: "put",
        handler: [services.updateOne]
    },
    {
        path: "/api/v1/users/:id",
        method: "delete",
        handler: [services.deleteOne]
    }
];
