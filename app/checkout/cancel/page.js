import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-12 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <XCircle className="w-12 h-12 text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Cancelled</h1>
            <p className="text-gray-600">
              Your order was not completed. No charges were made.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link href="/create">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}