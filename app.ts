import express from "express";
import { InMemoryUrlRepository } from "./src/repositories/in-memory-url.repository";
import { InMemoryCache } from "./src/cache/in-memory.cache";
import { UrlService } from "./src//services/url.service";
import { UrlController } from "./src//controllers/url.controller";
import { createUrlRoutes } from "./src/routes/url.routes";
import { Url } from "./src/models/url.model";

export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const repository = new InMemoryUrlRepository();
    const cache = new InMemoryCache<Url>(5 * 60 * 1000); // 5 min TTL
    const service = new UrlService(repository, cache);
    const controller = new UrlController(service);

    app.use("/", createUrlRoutes(controller));
    app.get("/api/v1/healthy", (req, res) => res.send("OK! Your TinyURL service is healthy."));

    return app;
}