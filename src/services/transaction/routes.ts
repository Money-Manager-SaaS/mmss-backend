import * as services from './service';


export default [
    {
        path: "/api/v1/transactions",
        method: "get",
        handler: [services.getAll]
    },
    {
        path: "/api/v1/transactions/:id",
        method: "get",
        handler: [services.getOne]
    },
    {
        path: "/api/v1/transactions/:id",
        method: "put",
        handler: [services.updateOne]
    },
    {
        path: "/api/v1/transactions/:id",
        method: "delete",
        handler: [services.deleteOne]
    }
];
