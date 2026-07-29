'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Rocket, Crown, Star, Heart, Castle } from 'lucide-react';

const storyThemes = [
  { id: 'space', title: 'Space Adventure', icon: Rocket, color: 'from-blue-500 to-purple-600' },
  { id: 'princess', title: 'Royal Princess', icon: Crown, color: 'from-pink-500 to-purple-500' },
  { id: 'superhero', title: 'Superhero Mission', icon: Star, color: 'from-red-500 to-yellow-500' },
  { id: 'fairy', title: 'Fairy Tale Magic', icon: Sparkles, color: 'from-green-400 to-emerald-500' },
  { id: 'animal', title: 'Animal Friends', icon: Heart, color: 'from-orange-400 to-pink-500' },
  { id: 'castle', title: 'Medieval Quest', icon: Castle, color: 'from-gray-600 to-blue-700' },
];

const ageGroups = [
  { id: '2-under', label: '2 & Under' },
  { id: '3-6', label: '3-6' },
  { id: '7-10', label: '7-10' },
  { id: '11-up', label: '11 & Up' },
];

export function PersonalizationForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    childName: initialData.childName || '',
    ageGroup: initialData.ageGroup || '',
    theme: initialData.theme || '',
    dedication: initialData.dedication || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.childName.trim()) {
      newErrors.childName = 'Child\'s name is required';
    }
    
    if (!formData.ageGroup) {
      newErrors.ageGroup = 'Please select an age group';
    }
    
    if (!formData.theme) {
      newErrors.theme = 'Please select a story theme';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Child Details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Child Details</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="childName" className="text-base font-semibold">
            Child's Name *
          </Label>
          <Input
            id="childName"
            value={formData.childName}
            onChange={(e) => handleChange('childName', e.target.value)}
            placeholder="Enter child's name"
            className={`text-base ${errors.childName ? 'border-red-500' : ''}`}
          />
          {errors.childName && (
            <p className="text-sm text-red-500">{errors.childName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Age Group *</Label>
          <div className="flex flex-wrap gap-3">
            {ageGroups.map((group) => {
              const isSelected = formData.ageGroup === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleChange('ageGroup', group.id)}
                  className={`px-6 py-3 rounded-full border-2 font-semibold transition-all ${
                    isSelected
                      ? 'bg-purple-600 border-purple-600 text-white shadow-lg'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
          {errors.ageGroup && <p className="text-sm text-red-500">{errors.ageGroup}</p>}
        </div>
      </div>

      {/* Story Theme */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Choose Story Theme *</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {storyThemes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = formData.theme === theme.id;
            
            return (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'border-2 border-purple-600 shadow-lg'
                    : 'border-2 border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handleChange('theme', theme.id)}
              >
                <CardContent className="p-4">
                  <div
                    className={`w-full h-24 rounded-lg bg-gradient-to-br ${theme.color} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-center font-semibold text-gray-900">{theme.title}</p>
                  {isSelected && (
                    <div className="flex items-center justify-center mt-2 text-purple-600 text-sm font-semibold">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Selected
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        {errors.theme && <p className="text-sm text-red-500">{errors.theme}</p>}
      </div>

      {/* Optional Dedication */}
      <div className="space-y-2">
        <Label htmlFor="dedication" className="text-base font-semibold">
          Dedication Message (Optional)
        </Label>
        <textarea
          id="dedication"
          value={formData.dedication}
          onChange={(e) => handleChange('dedication', e.target.value)}
          placeholder="Add a special message to your child..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <p className="text-sm text-gray-500">This will appear on the first page of the book</p>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg py-6 shadow-xl shadow-primary/30 rounded-full"
      >
        Continue to Checkout ⭐
      </Button>
    </form>
  );
}