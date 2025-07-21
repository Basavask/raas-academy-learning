'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, BookOpen } from 'lucide-react';
import { Course } from '@prisma/client';
import { StrapiService } from '@/lib/strapi';

interface CourseMedia {
  id: string;
  featuredImage?: {
    data?: {
      attributes?: unknown;
    };
  };
  attributes?: {
    featuredImage?: {
      data?: {
        attributes?: unknown;
      };
    };
  };
}

interface CourseCardProps {
  course: Course & { _count?: { enrollments: number } }
}

export function CourseCard({ course }: CourseCardProps) {
  const [courseMedia, setCourseMedia] = useState<CourseMedia | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const strapiService = new StrapiService();

  useEffect(() => {
    const fetchCourseMedia = async () => {
      try {
        const media = await strapiService.getCourseMedia(course.id);
        setCourseMedia(media);
      } catch (error) {
        console.error('Error fetching course media:', error);
      } finally {
        setImageLoading(false);
      }
    };

    fetchCourseMedia();
  }, [course.id, strapiService]);

  // Get image URL with fallback priority
  const getImageUrl = () => {
    // Priority 1: Strapi CMS featured image
    if (courseMedia && !imageError) {
      const featuredImage = courseMedia.featuredImage?.data?.attributes || 
                            courseMedia.attributes?.featuredImage?.data?.attributes;
      
      if (featuredImage) {
        return strapiService.getImageUrl(featuredImage);
      }
    }
    
    // Priority 2: Database imageUrl field
    if (course.imageUrl && !imageError) {
      return course.imageUrl;
    }
    
    // Priority 3: Placeholder
    return 'https://via.placeholder.com/400x300?text=No+Image';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 w-full">
        {imageLoading ? (
          // Loading skeleton
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        ) : (
          <Image
            src={getImageUrl() || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={course.title}
            fill
            className="object-cover"
            onError={handleImageError}
            priority={false}
          />
        )}
        
        {course.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full">
              {course.category}
            </span>
          </div>
        )}
        
        {/* Live indicator if course is live */}
        {course.isLive && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse">
              Live
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          )}
          {course._count && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course._count.enrollments} students</span>
            </div>
          )}
          {course.level && (
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="capitalize">{course.level}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-orange-500">
            ₹{course.price.toLocaleString()}
          </span>
        </div>
        <Button asChild>
          <Link href={`/courses/${course.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}