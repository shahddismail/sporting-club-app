'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Sport } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface SportFormProps {
  onSubmit: (sport: Omit<Sport, 'id'>) => void;
  onCancel: () => void;
}

const SportForm: React.FC<SportFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) newErrors.name = 'Sport name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!category.trim()) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ name: name.trim(), description: description.trim(), category: category.trim() });
      setName('');
      setDescription('');
      setCategory('');
      setErrors({});
    }
  };

  const categories = [
    { value: 'Team Sports', label: 'Team Sports' },
    { value: 'Individual Sports', label: 'Individual Sports' },
    { value: 'Aquatic Sports', label: 'Aquatic Sports' },
    { value: 'Combat Sports', label: 'Combat Sports' },
    { value: 'Winter Sports', label: 'Winter Sports' },
  ];

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New Sport</h3>
      <Input
        label="Sport Name"
        value={name}
        onChange={setName}
        error={errors.name}
        required
      />
      <Input
        label="Description"
        value={description}
        onChange={setDescription}
        error={errors.description}
        required
      />
      <Select
        label="Category"
        value={category}
        onChange={setCategory}
        options={categories}
        error={errors.category}
        required
      />
      <div className="flex gap-2">
        <Button onClick={handleSubmit}>
          <Plus size={16} />
          Add Sport
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default SportForm;