import { Router } from "express";
import { UrlController } from "../controllers/url.controller";

export function createUrlRoutes(controller: UrlController) {
  const router = Router();

  router.post("/shorten", controller.create);
  router.get("/:shortCode", controller.redirect);

  return router;
}