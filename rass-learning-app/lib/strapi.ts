export class StrapiService {
    public baseUrl: string;
    public apiToken: string;
  
    constructor() {
      this.baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      this.apiToken = process.env.STRAPI_API_TOKEN || '';
    }
  
    async getCourseMedia(courseId: string) {
      try {
        const response = await fetch(
          `${this.baseUrl}/api/raas-course-media-generations?filters[courseId][$eq]=${courseId}&populate=*`,
          {
            headers: this.apiToken ? {
              'Authorization': `Bearer ${this.apiToken}`,
              'Content-Type': 'application/json',
            } : {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          console.warn(`Failed to fetch course media for ${courseId}: ${response.status}`);
          return null;
        }
        
        const data = await response.json();
        return data.data[0] || null;
      } catch (error) {
        console.error('Error fetching course media:', error);
        return null;
      }
    }
  
    getImageUrl(imageData: { url?: string; attributes?: { url?: string } } | null) {
      if (!imageData) return null;
      
      const imageUrl = imageData?.url || imageData?.attributes?.url;
      if (!imageUrl) return null;
      
      return `${this.baseUrl}${imageUrl}`;
    }
  }