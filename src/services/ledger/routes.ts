import * as services from './service';


export default [
    {
        path: "/api/v1/ledgers",
        method: "get",
        handler: [services.getAll]
    },
    {
        path: "/api/v1/ledgers/:id",
        method: "get",
        handler: [services.getOne]
    },
    {
        path: "/api/v1/ledgers",
        method: "post",
        handler: [services.create]
    },
    {
        path: "/api/v1/ledgers/:id",
        method: "put",
        handler: [services.updateOne]
    },
    {
        path: "/api/v1/ledgers/:id",
        method: "delete",
        handler: [services.deleteOne]
    }
];
