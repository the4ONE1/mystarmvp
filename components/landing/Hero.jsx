'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Create Magical Memories</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Your Child is the
              <span className="gradient-text block mt-2">
                Star of the Story
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
              Create unique, personalized storybooks featuring your child as the hero. 
              Choose from magical themes, add photos, and watch their imagination come to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/create">
                <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                  Create Your Story
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
                See Examples
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">50,000+</p>
                <p className="text-sm text-gray-600">Happy Families</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">4.9★</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">100%</p>
                <p className="text-sm text-gray-600">Satisfaction</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/6157218/pexels-photo-6157218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Children reading personalized storybook together"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">📚</p>
                <p className="text-xs font-semibold text-gray-700">Personalized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20">✨</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-20">🌟</div>
    </section>
  );
}