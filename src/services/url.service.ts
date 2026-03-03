import { Url } from "../models/url.model";
import { UrlRepository } from "../repositories/url.repository";
import { Base62 } from "../utils/base62";
import { InMemoryCache } from "../cache/in-memory.cache";

export class UrlService {
    private repository: UrlRepository;
    private cache: InMemoryCache<Url>;
    constructor(
        repository: UrlRepository,
        cache: InMemoryCache<Url>
    ) {
        this.repository = repository;
        this.cache = cache;
    }

    async createShortUrl(originalUrl: string): Promise<string> {
        const id = Date.now(); 
        const shortCode = Base62.encode(id);

        const url: Url = {
            id,
            shortCode,
            originalUrl,
            createdAt: new Date(),
            clickCount: 0,
        };

        await this.repository.create(url);
        this.cache.set(shortCode, url);

        return shortCode;
    }

    async getOriginalUrl(shortCode: string): Promise<string | null> {
        const cached = this.cache.get(shortCode);
        if (cached) {
            await this.repository.incrementClick(shortCode);
            return cached.originalUrl;
        }

        const url = await this.repository.findByShortCode(shortCode);
        if (!url) return null;

        this.cache.set(shortCode, url);
        await this.repository.incrementClick(shortCode);

        return url.originalUrl;
    }
}