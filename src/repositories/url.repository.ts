import { Url } from "../models/url.model";

export interface UrlRepository {
  create(url: Url): Promise<Url>;
  findByShortCode(shortCode: string): Promise<Url | null>;
  incrementClick(shortCode: string): Promise<void>;
}