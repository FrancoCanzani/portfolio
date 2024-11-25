'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  BarChart,
  Cell,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const languageColors: { [key: string]: string } = {
  TypeScript: '#3178c6',
  JavaScript: '#f1DD35',
  HTML: '#e34c26',
  CSS: '#264de4',
  SCSS: '#563d7c',
  Python: '#ffde57',
  Go: '#00ADD8',
  Astro: 'black',
  'C#': '#178600',
};

const GitHubStats = ({ username }: { username: string }) => {
  const [contributionsData, setContributionsData] = useState<any>(null);
  const [languagesData, setLanguagesData] = useState<any>(null);
  const t = useTranslations('Practice');

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const contributionsResponse = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}`
        );

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&type=all`
        );

        if (!contributionsResponse.ok || !reposResponse.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const contribData = await contributionsResponse.json();
        const reposData = await reposResponse.json();

        const languagesMap = new Map();
        reposData.forEach((repo: any) => {
          if (repo.language) {
            const count = languagesMap.get(repo.language) || 0;
            languagesMap.set(repo.language, count + 1);
          }
        });

        const totalRepos = reposData.length;
        const processedLanguagesData = Array.from(languagesMap.entries())
          .map(([name, count]) => ({
            name,
            count,
            percentage: Number(((count / totalRepos) * 100).toFixed(1)),
            color: languageColors[name] || '#8b949e', // Default color for unknown languages
          }))
          .sort((a, b) => b.count - a.count);

        setContributionsData(contribData);
        setLanguagesData(processedLanguagesData);
      } catch (err: any) {
        console.error('Error fetching GitHub data:', err);
      }
    };

    fetchGitHubData();
  }, [username]);

  const getColor = (count: number) => {
    if (count === 0) return 'rgb(235, 237, 240)';
    if (count < 5) return 'rgb(198, 228, 139)';
    if (count < 10) return 'rgb(123, 201, 111)';
    if (count < 15) return 'rgb(35, 154, 59)';
    return 'rgb(25, 97, 39)';
  };

  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const currentYearContributions =
    contributionsData?.contributions.filter((day: { date: string }) => {
      const date = new Date(day.date);
      return date.getFullYear() === currentYear && date <= currentDate;
    }) || [];

  const totalContributions = currentYearContributions.reduce(
    (sum: number, day: { count: number }) => sum + day.count,
    0
  );

  return (
    <div className='flex flex-col space-y-12'>
      <div>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-sm font-medium'>
            {t('github')} {currentYear}
          </h3>
          <span className='text-sm text-muted-foreground'>
            {totalContributions} contributions
          </span>
        </div>
        <div className='flex flex-wrap rounded-md mb-4 p-2.5 ring-1 hover:transition-all duration-500 ring-transparent bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50'>
          {currentYearContributions.map(
            (day: { date: string; count: number }) => (
              <div
                key={day.date}
                title={`${new Date(day.date).toLocaleDateString()}: ${
                  day.count
                } contributions`}
                className='w-2.5 h-2.5 m-0.5 transition-colors duration-200'
                style={{ backgroundColor: getColor(day.count) }}
              />
            )
          )}
        </div>
        <div className='flex items-center justify-center'>
          <span className='mr-1 text-sm font-medium'>{t('less')}</span>
          {[0, 5, 10, 15, 20].map((level) => (
            <div
              key={level}
              className='w-2.5 h-2.5 mx-0.5'
              style={{ backgroundColor: getColor(level) }}
            />
          ))}
          <span className='ml-1 text-sm font-medium'>{t('more')}</span>
        </div>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-3'>{t('languages')}</h3>
        <div className='h-[300px] text-black w-full rounded-md p-2.5 ring-1 hover:transition-all duration-500 ring-transparent bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={languagesData} layout='vertical'>
              <XAxis
                type='number'
                domain={[0, 100]}
                unit='%'
                className='font-meidum'
              />
              <YAxis
                type='category'
                dataKey='name'
                width={100}
                className='font-medium text-sm my-2 text-black'
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className='rounded-sm border bg-background p-2 shadow-sm'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div className='flex flex-col'>
                            <span className='text-[0.70rem] uppercase text-muted-foreground'>
                              {t('language')}
                            </span>
                            <span className='font-bold text-muted-foreground'>
                              {data.name}
                            </span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-[0.70rem] uppercase text-muted-foreground'>
                              {t('repos')}
                            </span>
                            <span className='font-bold'>
                              {data.count} ({data.percentage}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey='percentage'
                fill='hsl(var(--primary))'
                radius={[0, 2, 2, 0]}
              >
                {languagesData?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
