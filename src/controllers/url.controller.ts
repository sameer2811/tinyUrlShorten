import { Request, Response } from "express";
import { UrlService } from "../services/url.service";

export class UrlController {
    private urlService: UrlService;
    constructor(urlService: UrlService) {
        this.urlService = urlService;
    }

    create = async (req: Request, res: Response) => {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: "URL is required" });
        }

        const shortCode = await this.urlService.createShortUrl(url);

        return res.status(201).json({
            shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
        });
    };

    redirect = async (req: Request, res: Response) => {
        const { shortCode } = req.params;

        const originalUrl = await this.urlService.getOriginalUrl(shortCode as string);

        if (!originalUrl) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.redirect(302, originalUrl);
    };
}