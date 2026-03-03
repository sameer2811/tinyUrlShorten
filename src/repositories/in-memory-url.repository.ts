import { Url } from "../models/url.model";
import { UrlRepository } from "./url.repository";

export class InMemoryUrlRepository implements UrlRepository {
  private store: Map<string, Url> = new Map();
  private idCounter = 1;

  async create(url: Url): Promise<Url> {
    url.id = this.idCounter++;
    this.store.set(url.shortCode, url);
    return url;
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return this.store.get(shortCode) || null;
  }

  async incrementClick(shortCode: string): Promise<void> {
    const url = this.store.get(shortCode);
    if (url) {
      url.clickCount += 1;
      this.store.set(shortCode, url);
    }
  }
}