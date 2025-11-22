'use client';

import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Example: set a cookie via API route or action. Replace with your real auth.
    await fetch('/api/mock-login', {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
      headers: { 'Content-Type': 'application/json' },
    });
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirectTo') || '/dashboard';
    window.location.href = redirectTo;
  }

  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label htmlFor="pass" className="block text-sm">Password</label>
          <input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="border rounded px-3 py-2 w-full" required />
        </div>
        <button className="px-3 py-2 border rounded">Sign in</button>
      </form>
    </div>
  );
}
