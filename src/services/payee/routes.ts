import * as services from './service';


export default [
    {
        path: "/api/v1/payees",
        method: "get",
        handler: [services.getAll]
    },
    {
        path: "/api/v1/payees/:id",
        method: "get",
        handler: [services.getOne]
    },
    {
        path: "/api/v1/payees/:id",
        method: "put",
        handler: [services.updateOne]
    },
    {
        path: "/api/v1/payees",
        method: "post",
        handler: [services.create]
    },
    {
        path: "/api/v1/payees/:id",
        method: "delete",
        handler: [services.deleteOne]
    }
];
