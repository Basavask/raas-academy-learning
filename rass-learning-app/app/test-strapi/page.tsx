'use client';
import { useEffect, useState } from 'react';
import { StrapiService } from '@/lib/strapi';

export default function TestStrapi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const strapiService = new StrapiService();

  useEffect(() => {
    const testStrapi = async () => {
      try {
        console.log('Testing Strapi integration...');
        
        // Test getting course media for course-1
        const media = await strapiService.getCourseMedia('course-1');
        console.log('Course media result:', media);
        
        if (media) {
          setData(media);
        } else {
          setError('No media found for course-1');
        }
      } catch (err) {
        console.error('Test error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    testStrapi();
  }, []);

  if (loading) return <div className="p-8">Testing Strapi connection...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Strapi Integration Test</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {data && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Success!</strong> Found course media data.
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Manual Test URLs:</h3>
        <ul className="space-y-1">
          <li>
            <a 
              href="http://localhost:1337/api/raas-course-media-generations" 
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              All Course Media (without populate)
            </a>
          </li>
          <li>
            <a 
              href="http://localhost:1337/api/raas-course-media-generations?populate=*" 
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              All Course Media (with media files)
            </a>
          </li>
          <li>
            <a 
              href="http://localhost:1337/api/raas-course-media-generations?filters[courseId][$eq]=course-1&populate=*" 
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Course-1 Media (with media files)
            </a>
          </li>
          <li>
            <a 
              href="http://localhost:1337/admin" 
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Strapi Admin Panel
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
