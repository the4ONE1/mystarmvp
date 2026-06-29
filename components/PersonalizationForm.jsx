'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

export function PersonalizationForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    childName: initialData.childName || '',
    age: initialData.age || '',
    gender: initialData.gender || '',
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
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 12) {
      newErrors.age = 'Age must be between 1 and 12';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
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
        
        <div className="grid md:grid-cols-2 gap-6">
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
            <Label htmlFor="age" className="text-base font-semibold">
              Age *
            </Label>
            <Input
              id="age"
              type="number"
              min="1"
              max="12"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="Age (1-12)"
              className={`text-base ${errors.age ? 'border-red-500' : ''}`}
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-base font-semibold">Gender *</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => handleChange('gender', value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id="boy" />
              <Label htmlFor="boy" className="cursor-pointer font-normal">
                Boy
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id="girl" />
              <Label htmlFor="girl" className="cursor-pointer font-normal">
                Girl
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="cursor-pointer font-normal">
                Other
              </Label>
            </div>
          </RadioGroup>
          {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
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
        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
      >
        Continue to Checkout
      </Button>
    </form>
  );
}