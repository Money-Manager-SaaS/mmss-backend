import * as services from './service';


export default [
    {
        path: "/api/v1/categories",
        method: "get",
        handler: [services.getAll]
    },
    {
        path: "/api/v1/categories/:id",
        method: "get",
        handler: [services.getOne]
    },
    {
        path: "/api/v1/categories/:id",
        method: "put",
        handler: [services.updateOne]
    },
    {
        path: "/api/v1/categories/:id",
        method: "delete",
        handler: [services.deleteOne]
    }
];
