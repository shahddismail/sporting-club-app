'use client';

import React, { useState } from 'react';
import { Users, Trophy, UserPlus, Plus, CheckCircle } from 'lucide-react';
import { Sport, Member, Subscription } from '@/types';
import { initialSports, initialMembers, initialSubscriptions } from '@/data/mockData';
import Card from './ui/Card';
import Button from './ui/Button';
import SportForm from './forms/SportForm';
import MemberForm from './forms/MemberForm';
import SubscriptionForm from './forms/SubscriptionForm';

const SportingClubApp: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>(initialSports);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [activeTab, setActiveTab] = useState<'sports' | 'members' | 'subscriptions'>('sports');
  const [showSportForm, setShowSportForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);

  const addSport = (sportData: Omit<Sport, 'id'>) => {
    const newSport: Sport = {
      id: Date.now().toString(),
      ...sportData
    };
    setSports(prev => [...prev, newSport]);
    setShowSportForm(false);
  };

  const addMember = (memberData: Omit<Member, 'id' | 'joinDate'>) => {
    const newMember: Member = {
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      ...memberData
    };
    setMembers(prev => [...prev, newMember]);
    setShowMemberForm(false);
  };

  const addSubscriptions = (memberId: string, sportIds: string[]) => {
    const newSubscriptions: Subscription[] = sportIds.map(sportId => ({
      memberId,
      sportId,
      subscriptionDate: new Date().toISOString().split('T')[0]
    }));
    setSubscriptions(prev => [...prev, ...newSubscriptions]);
    setShowSubscriptionForm(false);
  };

  const getMemberSubscriptions = (memberId: string): Sport[] => {
    const memberSportIds = subscriptions
      .filter(sub => sub.memberId === memberId)
      .map(sub => sub.sportId);
    return sports.filter(sport => memberSportIds.includes(sport.id));
  };

  const getSportMembers = (sportId: string): Member[] => {
    const sportMemberIds = subscriptions
      .filter(sub => sub.sportId === sportId)
      .map(sub => sub.memberId);
    return members.filter(member => sportMemberIds.includes(member.id));
  };

  const tabs = [
    { id: 'sports' as const, label: 'Sports', icon: Trophy },
    { id: 'members' as const, label: 'Members', icon: Users },
    { id: 'subscriptions' as const, label: 'Subscriptions', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Sporting Club Management</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sports Tab */}
        {activeTab === 'sports' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">Sports Management</h2>
              {!showSportForm && (
                <Button onClick={() => setShowSportForm(true)}>
                  <Plus size={16} />
                  Add Sport
                </Button>
              )}
            </div>

            {showSportForm && (
              <SportForm
                onSubmit={addSport}
                onCancel={() => setShowSportForm(false)}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sports.map(sport => (
                <Card key={sport.id}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">{sport.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {sport.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{sport.description}</p>
                  <div className="text-sm text-gray-500">
                    Members: {getSportMembers(sport.id).length}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">Members Management</h2>
              {!showMemberForm && (
                <Button onClick={() => setShowMemberForm(true)}>
                  <UserPlus size={16} />
                  Add Member
                </Button>
              )}
            </div>

            {showMemberForm && (
              <MemberForm
                onSubmit={addMember}
                onCancel={() => setShowMemberForm(false)}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map(member => {
                const memberSports = getMemberSubscriptions(member.id);
                return (
                  <Card key={member.id}>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <div className="space-y-2 mt-3">
                      <p className="text-sm text-gray-600">📧 {member.email}</p>
                      <p className="text-sm text-gray-600">📱 {member.phone}</p>
                      <p className="text-sm text-gray-600">📅 Joined: {member.joinDate}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Sports ({memberSports.length}):
                      </p>
                      {memberSports.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {memberSports.map(sport => (
                            <span
                              key={sport.id}
                              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                            >
                              {sport.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No subscriptions yet</p>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">Subscription Management</h2>
              {!showSubscriptionForm && (
                <Button onClick={() => setShowSubscriptionForm(true)}>
                  <Plus size={16} />
                  New Subscription
                </Button>
              )}
            </div>

            {showSubscriptionForm && (
              <SubscriptionForm
                members={members}
                sports={sports}
                subscriptions={subscriptions}
                onSubmit={addSubscriptions}
                onCancel={() => setShowSubscriptionForm(false)}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* By Member */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Subscriptions by Member</h3>
                <div className="space-y-4">
                  {members.map(member => {
                    const memberSports = getMemberSubscriptions(member.id);
                    return (
                      <div key={member.id} className="border-b pb-3 last:border-b-0">
                        <h4 className="font-medium">{member.name}</h4>
                        {memberSports.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {memberSports.map(sport => (
                              <span
                                key={sport.id}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {sport.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">No subscriptions</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* By Sport */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Members by Sport</h3>
                <div className="space-y-4">
                  {sports.map(sport => {
                    const sportMembers = getSportMembers(sport.id);
                    return (
                      <div key={sport.id} className="border-b pb-3 last:border-b-0">
                        <h4 className="font-medium">{sport.name}</h4>
                        <p className="text-sm text-gray-600">{sport.category}</p>
                        {sportMembers.length > 0 ? (
                          <div className="mt-2">
                            {sportMembers.map(member => (
                              <span
                                key={member.id}
                                className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-1 mb-1"
                              >
                                {member.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">No members subscribed</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportingClubApp;