import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client with explicit region
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || process.env.S3_BUCKET_NAME;

export async function POST(request) {
  try {
    const { fileName, fileType, orderId } = await request.json();

    // Validate required fields
    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, fileType' },
        { status: 400 }
      );
    }

    // Check if S3 is configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !BUCKET_NAME) {
      return NextResponse.json(
        { error: 'AWS S3 not configured. Please set AWS credentials and bucket name.' },
        { status: 500 }
      );
    }

    // Generate unique file key
    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const key = orderId 
      ? `uploads/${orderId}/${uniqueFileName}`
      : `uploads/temp/${uniqueFileName}`;

    // Create the PutObject command
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    // Generate presigned URL (valid for 10 minutes)
    const presignedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 600 
    });

    // Generate the public URL for the uploaded file
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;

    return NextResponse.json({
      presignedUrl,
      key,
      publicUrl,
    });
  } catch (error) {
    console.error('Presigned URL generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate presigned URL', 
        details: error.message,
        bucket: BUCKET_NAME,
        region: process.env.AWS_REGION || 'us-east-1'
      },
      { status: 500 }
    );
  }
}
