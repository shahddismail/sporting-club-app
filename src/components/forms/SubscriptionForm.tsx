'use client';

import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Member, Sport, Subscription } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

interface SubscriptionFormProps {
  members: Member[];
  sports: Sport[];
  subscriptions: Subscription[];
  onSubmit: (memberId: string, sportIds: string[]) => void;
  onCancel: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ 
  members, 
  sports, 
  subscriptions, 
  onSubmit, 
  onCancel 
}) => {
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getMemberSubscriptions = (memberId: string): string[] => {
    return subscriptions.filter(sub => sub.memberId === memberId).map(sub => sub.sportId);
  };

  const getAvailableSports = (): Sport[] => {
    if (!selectedMember) return sports;
    const memberSubs = getMemberSubscriptions(selectedMember);
    return sports.filter(sport => !memberSubs.includes(sport.id));
  };

  const toggleSport = (sportId: string) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!selectedMember) newErrors.member = 'Please select a member';
    if (selectedSports.length === 0) newErrors.sports = 'Please select at least one sport';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(selectedMember, selectedSports);
      setSelectedMember('');
      setSelectedSports([]);
      setErrors({});
    }
  };

  const availableSports = getAvailableSports();
  const memberOptions = members.map(member => ({ value: member.id, label: member.name }));

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Subscribe Member to Sports</h3>
      
      <Select
        label="Member"
        value={selectedMember}
        onChange={(value) => {
          setSelectedMember(value);
          setSelectedSports([]);
        }}
        options={memberOptions}
        error={errors.member}
        required
      />

      {selectedMember && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sports <span className="text-red-500">*</span>
          </label>
          {availableSports.length === 0 ? (
            <p className="text-gray-500 text-sm">This member is already subscribed to all available sports.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableSports.map(sport => (
                <label key={sport.id} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedSports.includes(sport.id)}
                    onChange={() => toggleSport(sport.id)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <div className="font-medium">{sport.name}</div>
                    <div className="text-sm text-gray-500">{sport.category}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
          {errors.sports && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
              <AlertCircle size={14} />
              {errors.sports}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={!selectedMember || availableSports.length === 0}>
          <CheckCircle size={16} />
          Subscribe
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default SubscriptionForm;