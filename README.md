# Mestar - Personalized Children's Storybooks

A beautiful, conversion-optimized Next.js application for creating personalized children's storybooks with photo uploads and Stripe checkout integration.

## 🌟 Features

- ✨ **High-Converting Landing Page** - SEO-optimized with compelling copy and social proof
- 📸 **Photo Upload Flow** - Drag-and-drop interface with AWS S3 integration
- 🎨 **Story Personalization** - Customize child's name, age, gender, and story theme
- 💳 **Secure Checkout** - Stripe payment integration
- 📱 **Fully Responsive** - Beautiful UI on all devices
- ⚡ **Server-Side Rendering** - Optimized for SEO and performance
- 🎭 **6 Story Themes** - Space, Princess, Superhero, Fairy Tale, Animal Friends, Medieval

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB
- **Payments**: Stripe
- **Storage**: AWS S3
- **UI Library**: Shadcn UI + Tailwind CSS
- **File Uploads**: React Dropzone

## 📦 Project Structure

```
/app
├── app/
│   ├── page.js                    # Landing page
│   ├── layout.js                  # Root layout with SEO
│   ├── globals.css               # Global styles
│   ├── create/
│   │   └── page.js               # Story personalization flow
│   ├── checkout/
│   │   ├── page.js               # Checkout page
│   │   ├── success/page.js       # Success page
│   │   └── cancel/page.js        # Cancel page
│   └── api/[[...path]]/
│       └── route.js              # Unified backend API
├── components/
│   ├── ui/                       # Shadcn UI components
│   ├── landing/                  # Landing page sections
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── ThemeShowcase.jsx
│   │   └── Testimonials.jsx
│   ├── PhotoUpload.jsx           # Photo upload component
│   └── PersonalizationForm.jsx   # Form component
├── lib/
│   ├── mongodb.js                # MongoDB connection
│   ├── stripe.js                 # Stripe configuration
│   ├── s3.js                     # AWS S3 configuration
│   └── utils.js                  # Utility functions
└── .env                          # Environment variables

```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd /app
yarn install
```

### 2. Configure Environment Variables

The application is currently configured with **placeholder credentials**. To enable full functionality, update the following in `.env`:

```bash
cp .env.example .env
cp .env.production.example .env.production
```

#### MongoDB (Already configured)
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=mestar_storybooks
```

#### Stripe Configuration
Get your API keys from: https://dashboard.stripe.com/test/apikeys

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
STRIPE_PRICE_ID=price_your_price_id_here
```

**To create a Stripe Price:**
1. Go to Stripe Dashboard → Products
2. Create a new product "Personalized Storybook"
3. Set price to $19.99 (one-time payment)
4. Copy the Price ID (starts with `price_`)

#### AWS S3 Configuration
Get credentials from: https://console.aws.amazon.com/iam/

```bash
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name-here
```

**To create an S3 Bucket:**
1. Go to AWS S3 Console
2. Create a new bucket (e.g., `mestar-photos-production`)
3. Block all public access (we use presigned URLs)
4. Enable server-side encryption
5. Create an IAM user with S3 access and generate access keys

### 3. Start Development Server

```bash
yarn dev
```

The application will be available at: http://localhost:3000

### 4. Test the Application

#### With Placeholder Credentials (Current State):
- ✅ Landing page works fully
- ✅ Personalization form works
- ✅ Photo upload UI works (simulated)
- ✅ Checkout flow redirects to success page

#### After Adding Real Credentials:
- ✅ Photos actually upload to S3
- ✅ Stripe checkout creates real payment sessions
- ✅ Orders saved to MongoDB

## 📋 API Endpoints

### Health Check
```
GET /api/health
```
Returns service status and configuration state.

### Create Checkout Session
```
POST /api/create-checkout-session
Body: { childName, age, gender, theme, dedication }
```
Creates a Stripe checkout session and returns redirect URL.

### Generate Presigned Upload URL
```
POST /api/upload/presign
Body: { childId, storybookId, filename, mimeType, sizeBytes }
```
Generates a presigned S3 URL for direct file upload.

### Confirm Photo Upload
```
POST /api/upload/confirm
Body: { childId, storybookId, objectKey, mimeType, sizeBytes, uploadedBy }
```
Saves photo metadata to MongoDB after successful upload.

### Get Photos
```
GET /api/photos?childId=xxx&storybookId=yyy
```
Retrieves all photos for a specific storybook.

## 🎨 Design System

### Colors
- **Primary**: Purple (#667eea to #764ba2 gradient)
- **Secondary**: Pink (#EC4899)
- **Accent**: Blue (#3B82F6)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes for impact
- **Body**: Regular weight, readable sizes

### Components
All UI components use Shadcn UI with Tailwind CSS for consistent, accessible design.

## 🔒 Security Features

- ✅ Server-side API key management
- ✅ Presigned S3 URLs for secure uploads
- ✅ Stripe secure checkout (no card data on server)
- ✅ CORS configured
- ✅ Input validation on all forms
- ✅ File type and size restrictions

## 📊 SEO Optimization

- ✅ Server-Side Rendering (SSR)
- ✅ Semantic HTML structure
- ✅ Meta tags (title, description, OG tags)
- ✅ Structured data (JSON-LD)
- ✅ Mobile-responsive design
- ✅ Fast loading times
- ✅ Optimized images with Next.js Image component

## 🎯 Conversion Optimization

- ✅ Clear value proposition in hero
- ✅ Trust signals (testimonials, stats, badges)
- ✅ Multiple CTAs throughout the page
- ✅ Simple 3-step process
- ✅ Visual theme showcase
- ✅ Transparent pricing
- ✅ Easy-to-use personalization flow
- ✅ Progress indicators in checkout

## 📝 Next Steps After Adding Real Credentials

1. **Configure Stripe Webhook** (for production)
   - Add webhook endpoint in Stripe Dashboard
   - Point to: `https://your-domain.com/api/webhooks/stripe`
   - Select event: `checkout.session.completed`
   - Add webhook secret to `.env`

2. **Set up CloudFront** (optional but recommended)
   - Create CloudFront distribution for S3 bucket
   - Use CloudFront URLs instead of direct S3 URLs
   - Better performance and caching

3. **Configure DNS and SSL**
   - Point domain to your hosting
   - Enable HTTPS (required for Stripe)

4. **Test Payment Flow**
   - Use Stripe test cards: 4242 4242 4242 4242
   - Verify webhook events
   - Test success and cancel flows

## 🐛 Troubleshooting

### Stripe Checkout Not Working
- Verify `STRIPE_SECRET_KEY` is set correctly
- Check `STRIPE_PRICE_ID` matches your product
- Ensure domain is HTTPS in production

### Photo Upload Failing
- Verify AWS credentials are correct
- Check S3 bucket exists and has correct permissions
- Ensure IAM user has `PutObject` permission

### MongoDB Connection Error
- Verify `MONGO_URL` is correct
- Check MongoDB is running
- Ensure database name is set

## 📞 Support

For issues or questions:
- Check environment variables are set correctly
- Review logs in `/var/log/supervisor/nextjs.out.log`
- Verify all services are running: `sudo supervisorctl status`

## 🎉 Features Highlight

### For Parents:
- Easy photo upload
- Beautiful story themes
- Fast checkout process
- Secure payment
- Professional quality books

### For Business:
- High conversion landing page
- SEO optimized
- Scalable architecture
- Secure payment processing
- Easy to maintain

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ using Next.js, Stripe, and AWS S3**
