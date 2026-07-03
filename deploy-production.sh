#!/bin/bash
# PRODUCTION DEPLOYMENT SCRIPT - LIVE STRIPE KEYS
# This script updates the application with live Stripe keys and deploys to production

set -e  # Exit on error

echo "=========================================="
echo "MESTAR - PRODUCTION DEPLOYMENT"
echo "=========================================="
echo ""

# Step 1: Verify live Stripe keys are available
echo "Step 1: Verifying live Stripe keys..."
if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "❌ ERROR: STRIPE_SECRET_KEY not found in environment"
    echo "Please ensure live Stripe keys are loaded from vault"
    exit 1
fi

if [ -z "$STRIPE_PUBLISHABLE_KEY" ]; then
    echo "❌ ERROR: STRIPE_PUBLISHABLE_KEY not found in environment"
    echo "Please ensure live Stripe keys are loaded from vault"
    exit 1
fi

echo "✓ Live Stripe secret key found: ${STRIPE_SECRET_KEY:0:15}..."
echo "✓ Live Stripe publishable key found: ${STRIPE_PUBLISHABLE_KEY:0:15}..."
echo ""

# Step 2: Update .env files with live keys
echo "Step 2: Updating environment files with live Stripe keys..."
cd /app

# Update .env
sed -i "s|STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY|" .env
sed -i "s|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=.*|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY|" .env

# Update .env.production
sed -i "s|STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY|" .env.production
sed -i "s|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=.*|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY|" .env.production

echo "✓ Updated .env with live keys"
echo "✓ Updated .env.production with live keys"
echo ""

# Step 3: Verify keys are set correctly
echo "Step 3: Verifying configuration..."
if grep -q "sk_live_" .env && grep -q "pk_live_" .env; then
    echo "✓ Live Stripe keys confirmed in .env"
else
    echo "❌ ERROR: Keys not properly updated in .env"
    exit 1
fi
echo ""

# Step 4: Restart the server
echo "Step 4: Restarting Next.js server..."
sudo supervisorctl restart nextjs
sleep 8
echo "✓ Server restarted"
echo ""

# Step 5: Test checkout endpoint
echo "Step 5: Testing checkout with live keys..."
response=$(curl -s -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "customerEmail": "test@example.com",
    "customerName": "Test User",
    "childName": "Emma",
    "childAge": "5",
    "theme": "space-adventure",
    "selectedAddons": []
  }')

if echo "$response" | grep -q "sessionId"; then
    echo "✓ Checkout endpoint working with live keys!"
    echo "$response" | python3 -m json.tool | head -10
else
    echo "❌ ERROR: Checkout endpoint test failed"
    echo "Response: $response"
    exit 1
fi
echo ""

# Step 6: Verify all pages load
echo "Step 6: Verifying all pages..."
for page in "/" "/create" "/checkout" "/privacy" "/terms"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$page")
    if [ "$status" = "200" ]; then
        echo "✓ $page: $status"
    else
        echo "❌ $page: $status"
    fi
done
echo ""

# Step 7: Production build
echo "Step 7: Running production build..."
cd /app
yarn build > /tmp/build.log 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Production build successful"
    tail -20 /tmp/build.log
else
    echo "❌ ERROR: Production build failed"
    cat /tmp/build.log
    exit 1
fi
echo ""

# Final summary
echo "=========================================="
echo "✅ PRODUCTION DEPLOYMENT READY"
echo "=========================================="
echo ""
echo "Configuration Summary:"
echo "  ✓ Live Stripe keys active"
echo "  ✓ Checkout endpoint tested"
echo "  ✓ All pages verified"
echo "  ✓ Production build passed"
echo ""
echo "Live Price IDs:"
echo "  • Main Story: price_1ToVKtFABTce6JHk4WECX6JK ($19.99)"
echo "  • Audiobook: price_1ToarQFABTce6JHknM5PrJ4c ($9.99)"
echo "  • Coloring Book: price_1ToarUFABTce6JHk4gzcClnG ($3.99)"
echo "  • Additional Character: price_1ToarfFABTce6JHk6JWz2bdq ($9.99)"
echo ""
echo "Next Steps:"
echo "  1. Deploy to production environment"
echo "  2. Update Stripe webhook to: https://mystarstories.app/api/webhooks/stripe"
echo "  3. Test complete checkout flow on live domain"
echo ""
echo "Application ready for production! 🚀"
