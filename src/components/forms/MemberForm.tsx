'use client';

import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Member } from '@/types';
import { validateEmail, validatePhone } from '@/utils/validation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface MemberFormProps {
  onSubmit: (member: Omit<Member, 'id' | 'joinDate'>) => void;
  onCancel: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
      setName('');
      setEmail('');
      setPhone('');
      setErrors({});
    }
  };

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New Member</h3>
      <Input
        label="Full Name"
        value={name}
        onChange={setName}
        error={errors.name}
        required
      />
      <Input
        label="Email"
        value={email}
        onChange={setEmail}
        type="email"
        error={errors.email}
        required
      />
      <Input
        label="Phone"
        value={phone}
        onChange={setPhone}
        type="tel"
        error={errors.phone}
        required
      />
      <div className="flex gap-2">
        <Button onClick={handleSubmit}>
          <UserPlus size={16} />
          Add Member
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default MemberForm;