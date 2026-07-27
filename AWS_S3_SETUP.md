# AWS S3 Photo Upload Configuration Guide

> **⚠️ Superseded.** As of the checkout re-plumb to mestar's backend, photo
> uploads go through mestar's `create-pending-order` Edge Function into its
> private Supabase Storage bucket (`customer-photos`), not AWS S3. `lib/s3.js`
> and the S3 upload route described below have been removed. This doc is kept
> for historical reference only.

## Overview
The Mestar application now uses real AWS S3 for photo uploads. Photos are stored in a structured format in the S3 bucket.

## Configuration

### 1. Environment Variables

Update the following variables in `/app/.env`:

```bash
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=<your-actual-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-actual-aws-secret-key>
AWS_REGION=us-east-1
AWS_S3_BUCKET=msspb-59dydkaoi46jnjp5cr11s9pzygexguse2a-s3alias
```

### 2. S3 Bucket Structure

Uploaded photos are organized as:
```
uploads/
  ├── {orderId}/
  │   ├── {uuid}.jpg
  │   ├── {uuid}.png
  │   └── ...
  └── temp/
      └── {uuid}.jpg  (for uploads before order is created)
```

### 3. How It Works

1. **Frontend**: User selects photos on `/create` page
2. **Presigned URL**: Frontend calls `/api/upload/presign` to get a presigned URL
3. **Direct Upload**: Frontend uploads file directly to S3 using presigned URL
4. **S3 Storage**: File is stored in the bucket with the generated key
5. **Public URL**: Frontend receives the public S3 URL for the uploaded file

## API Endpoint

### POST `/api/upload/presign`

Generates a presigned URL for uploading a file to S3.

**Request Body:**
```json
{
  "fileName": "photo.jpg",
  "fileType": "image/jpeg",
  "orderId": "order_123" // optional, uses 'temp' if not provided
}
```

**Response:**
```json
{
  "presignedUrl": "https://s3.amazonaws.com/...",
  "key": "uploads/order_123/uuid.jpg",
  "publicUrl": "https://msspb-....s3.us-east-1.amazonaws.com/uploads/order_123/uuid.jpg"
}
```

## Testing the Upload

### 1. Via UI (Recommended)
1. Navigate to `/create` page
2. Use the photo upload component to select files
3. Click "Upload" or "Upload All"
4. Files will be uploaded directly to S3
5. Check S3 console to verify files are in the bucket

### 2. Via cURL (API Testing)

```bash
# Step 1: Get presigned URL
curl -X POST http://localhost:3000/api/upload/presign \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "test.jpg",
    "fileType": "image/jpeg",
    "orderId": "test-order-123"
  }'

# Step 2: Upload to S3 using the presigned URL from response
curl -X PUT "<presigned-url-from-step-1>" \
  -H "Content-Type: image/jpeg" \
  --data-binary @./path/to/test.jpg
```

## Security Features

- **Presigned URLs**: Temporary, time-limited upload URLs (10 minutes expiry)
- **Direct Upload**: Files upload directly to S3, not through the server
- **File Validation**: Frontend validates file types and sizes
- **Unique Keys**: Each file gets a unique UUID-based name

## Accepted File Types

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

## Limits

- **Max file size**: 5MB per photo
- **Max files**: 5 photos per story
- **Presigned URL expiry**: 10 minutes

## Troubleshooting

### Error: "AWS S3 not configured"
- Check that AWS credentials are set in `.env`
- Restart the Next.js server: `sudo supervisorctl restart nextjs`

### Error: "Failed to upload to S3"
- Verify S3 bucket exists and is accessible
- Check IAM permissions for the AWS user
- Verify the bucket name is correct in `.env`

### Files not appearing in S3
- Check the AWS region matches your bucket's region
- Verify CORS settings on the S3 bucket allow PUT requests
- Check CloudWatch logs for detailed errors

## Required IAM Permissions

Your AWS user needs these S3 permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::msspb-59dydkaoi46jnjp5cr11s9pzygexguse2a-s3alias/*"
    }
  ]
}
```

## Production Deployment

For production, set environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- AWS: Use IAM roles instead of credentials
- Docker: Pass via docker-compose or kubernetes secrets

**Never commit actual AWS credentials to version control!**
