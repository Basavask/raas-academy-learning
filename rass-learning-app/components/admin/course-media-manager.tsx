'use client';

import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StrapiService } from '@/lib/strapi';
import Image from 'next/image';

interface CourseMediaManagerProps {
  courseId: string;
  courseName: string;
}

export function CourseMediaManager({ courseId, courseName }: CourseMediaManagerProps) {
  const [courseMedia, setCourseMedia] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const strapiService = new StrapiService();

  useEffect(() => {
    fetchCourseMedia();
  }, [courseId]);

  const fetchCourseMedia = async () => {
    setLoading(true);
    try {
      const media = await strapiService.getCourseMedia(courseId);
      setCourseMedia(media);
    } catch (error) {
      console.error('Error fetching course media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('files', selectedFile);

      // Upload to Strapi
      const uploadResponse = await fetch(`${strapiService.baseUrl}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${strapiService.apiToken}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadedFiles = await uploadResponse.json();

      // Create or update course media entry
      const mediaData = {
        data: {
          courseId,
          featuredImage: uploadedFiles[0]?.id,
        },
      };

      let apiResponse;
      if (courseMedia) {
        // Update existing entry
        apiResponse = await fetch(
          `${strapiService.baseUrl}/api/raas-course-media-generations/${courseMedia.id}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${strapiService.apiToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mediaData),
          }
        );
      } else {
        // Create new entry
        apiResponse = await fetch(
          `${strapiService.baseUrl}/api/raas-course-media-generations`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${strapiService.apiToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mediaData),
          }
        );
      }

      if (!apiResponse.ok) {
        throw new Error('Failed to save course media');
      }

      // Refresh data
      await fetchCourseMedia();
      setSelectedFile(null);
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getCurrentImageUrl = () => {
    if (!courseMedia) return null;
    
    const featuredImage = courseMedia.featuredImage?.data?.attributes || 
                          courseMedia.attributes?.featuredImage?.data?.attributes;
    
    if (featuredImage) {
      return strapiService.getImageUrl(featuredImage);
    }
    
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading course media...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-orange-500" />
          Media Manager - {courseName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Image Display */}
        {getCurrentImageUrl() && (
          <div className="space-y-2">
            <h4 className="font-semibold">Current Featured Image:</h4>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
              <Image
                src={getCurrentImageUrl()!}
                alt={`Featured image for ${courseName}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* File Upload Section */}
        <div className="space-y-4">
          <h4 className="font-semibold">
            {getCurrentImageUrl() ? 'Update Featured Image:' : 'Upload Featured Image:'}
          </h4>
          
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
              disabled={uploading}
            />
            
            {selectedFile && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}
            
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {selectedFile && (
          <div className="space-y-2">
            <h4 className="font-semibold">Preview:</h4>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}