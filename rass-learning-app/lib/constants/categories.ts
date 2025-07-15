export const COURSE_CATEGORIES = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'business', label: 'Business' },
    { value: 'personal-development', label: 'Personal Development' },
  ] as const
  
  export const COURSE_LEVELS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ] as const
  
  export type CourseCategory = typeof COURSE_CATEGORIES[number]['value']
  export type CourseLevel = typeof COURSE_LEVELS[number]['value']