import * as services from './service';


export default [
    {
        path: "/api/v1/accounts",
        method: "get",
        handler: [services.getAll]
    },
    {
        path: "/api/v1/accounts/:id",
        method: "get",
        handler: [services.getOne]
    },
    {
        path: "/api/v1/accounts/:id",
        method: "put",
        handler: [services.updateOne]
    },
    {
        path: "/api/v1/accounts/:id",
        method: "delete",
        handler: [services.deleteOne]
    }
];
