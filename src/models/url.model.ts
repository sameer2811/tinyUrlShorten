export interface Url {
  id: number;
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
  expiresAt?: Date;
  clickCount: number;
}