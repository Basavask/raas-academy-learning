// import { Target } from 'lucide-react'

// export function LearningOutcomes({ course }: { course: Course }) {
//   const outcomes = course.learningOutcomes || [
//     'Master fundamental concepts and advanced techniques',
//     'Build real-world projects from scratch',
//     'Prepare for industry certifications',
//     'Gain practical experience through hands-on labs',
//     'Network with industry professionals',
//     'Access to exclusive job opportunities'
//   ]

//   return (
//     <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">What You&apos;ll Learn</h2>
//           <p className="text-lg text-gray-600 dark:text-gray-400">
//             By the end of this course, you&apos;ll be able to:
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {outcomes.map((outcome: string, index: number) => (
//             <div key={index} className="flex items-start gap-3">
//               <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
//               <p className="text-gray-700 dark:text-gray-300">{outcome}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }