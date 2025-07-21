"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp, PlayCircle, FileText, Code } from 'lucide-react'

export function CourseCurriculum({ modules }: { modules: Module[] }) {
  const [expandedModules, setExpandedModules] = useState<number[]>([0])

  const toggleModule = (index: number) => {
    setExpandedModules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return PlayCircle
      case 'reading': return FileText
      case 'exercise': return Code
      default: return FileText
    }
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Course Curriculum</h2>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {modules.map((module, index) => (
            <Card key={module.id} className="overflow-hidden">
              <button
                onClick={() => toggleModule(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">Module {index + 1}</span>
                  <h3 className="text-lg font-medium">{module.title}</h3>
                </div>
                {expandedModules.includes(index) ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {expandedModules.includes(index) && (
                <div className="px-6 pb-4 border-t">
                    <p className="text-gray-600 dark:text-gray-400 mt-3 mb-4">
                   {module.description}
                 </p>
                 
                 {module.contents && (
                   <div className="space-y-2">
                     {module.contents.map((content: Content, contentIndex: number) => {
                       const Icon = getContentIcon(content.type)
                       return (
                         <div key={contentIndex} className="flex items-center gap-3 py-2">
                           <Icon className="h-4 w-4 text-primary" />
                           <span className="flex-1">{content.title}</span>
                           <span className="text-sm text-gray-500">{content.duration}</span>
                         </div>
                       )
                     })}
                   </div>
                 )}
               </div>
             )}
           </Card>
         ))}
       </div>
     </div>
   </section>
 )
}