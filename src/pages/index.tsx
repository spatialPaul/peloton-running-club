import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral">
      <Head>
        <title>Becs Wilpers Running Club</title>
        <meta name="description" content="Join the Becs Wilpers Running Club community" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-secondary text-center mb-8">
          Becs Wilpers Running Club
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">Latest Classes</h2>
            <div className="text-gray-600">
              Coming soon: Latest running classes from Becs and Matt
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">Leaderboard</h2>
            <div className="text-gray-600">
              Coming soon: Community leaderboard
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}