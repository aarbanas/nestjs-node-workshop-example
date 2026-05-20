import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  NoSuchKey,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.bucket = process.env.S3_BUCKET_NAME!;
    this.client = new S3Client({
      region: 'eu-central-1',
    });
  }

  async read<T>(key: string): Promise<T[]> {
    try {
      const response = await this.client.send(
        new GetObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      const body = await response.Body!.transformToString();
      return JSON.parse(body) as T[];
    } catch (err) {
      if (err instanceof NoSuchKey) {
        await this.write<T>(key, []);
        return [];
      }
      throw err;
    }
  }

  async write<T>(key: string, data: T[]): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: JSON.stringify(data),
        ContentType: 'application/json',
      }),
    );
  }
}
