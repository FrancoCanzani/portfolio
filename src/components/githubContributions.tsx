'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const GitHubContributions = ({ username }: { username: string }) => {
  const [contributionsData, setContributionsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Practice');

  useEffect(() => {
    const fetchContributions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch contribution data');
        }
        const data = await response.json();
        setContributionsData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setContributionsData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContributions();
  }, [username]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!contributionsData) return null;

  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const currentYearContributions = contributionsData.contributions.filter(
    (day: { date: string }) => {
      const date = new Date(day.date);
      return date.getFullYear() === currentYear && date <= currentDate;
    }
  );

  const getColor = (count: number) => {
    if (count === 0) return '#ebedf0';
    if (count < 5) return '#c6e48b';
    if (count < 10) return '#7bc96f';
    if (count < 15) return '#239a3b';
    return '#196127';
  };

  return (
    <div className='w-full'>
      <h2 className='text-sm mb-3'>
        {t('github')}
        {` ${currentYear}`}.
      </h2>
      <div className='flex flex-wrap rounded-md mb-4 p-1.5 ring-1 hover:transition-all duration-500 ring-transparent bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50'>
        {currentYearContributions.map(
          (day: { date: string; count: number }) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} contributions`}
              style={{
                width: '10px',
                height: '10px',
                margin: '1px',
                backgroundColor: getColor(day.count),
              }}
            />
          )
        )}
      </div>
      <div className='flex items-center justify-center w-full'>
        <span className='mr-1 text-sm font-medium capitalize'>{t('less')}</span>
        {[0, 5, 10, 15, 20].map((level) => (
          <div
            key={level}
            className='mx-1'
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: getColor(level),
            }}
          />
        ))}
        <span className='ml-1 text-sm font-medium capitalize'>{t('more')}</span>
      </div>
    </div>
  );
};

export default GitHubContributions;
