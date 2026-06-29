import { S3Client } from '@aws-sdk/client-s3';

const REGION = process.env.AWS_REGION || 'us-east-1';
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'AKIAPLACEHOLDER';
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'placeholder_secret_key';
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'mestar-photos-placeholder';

if (!process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID.includes('PLACEHOLDER')) {
  console.warn('AWS credentials are placeholder values. S3 operations will not work until real credentials are provided.');
}

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const bucketName = BUCKET_NAME;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];