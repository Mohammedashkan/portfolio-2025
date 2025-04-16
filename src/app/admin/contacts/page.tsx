'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchContacts = async (e?: React.FormEvent) => {
    // Prevent form submission default behavior if called from form submit
    if (e) e.preventDefault();
    
    if (!apiKey) {
      setError('API key is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if we're in development or production
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? '/api/contact' 
        : 'http://localhost:5000/api/contact';
      
      const response = await fetch(`${baseUrl}?apiKey=${apiKey}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      
      const data = await response.json();
      setContacts(data.contacts);
    } catch (err) {
      setError('Error fetching contacts. Please check your API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>
      
      {/* Wrap the input and button in a form element */}
      <form onSubmit={fetchContacts} className="mb-6">
        <div className="flex gap-4">
          <Input
            type="password"
            placeholder="Enter admin API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="max-w-xs"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'View Contacts'}
          </Button>
        </div>
      </form>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {contacts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader>
                <CardTitle>{contact.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(contact.timestamp).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <p><strong>Email:</strong> {contact.email}</p>
                {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                <p className="mt-2"><strong>Message:</strong></p>
                <p className="whitespace-pre-wrap">{contact.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No contacts to display. Enter your API key and click &quot;View Contacts&quot;.</p>
      )}
    </div>
  );
}