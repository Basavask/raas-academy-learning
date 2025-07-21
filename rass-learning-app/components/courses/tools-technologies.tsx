import Image from 'next/image'

export function ToolsTechnologies({ course }: { course: Course }) {
  const tools = course.tools || [
    { name: 'Python', icon: '/tools/python.png' },
    { name: 'TensorFlow', icon: '/tools/tensorflow.png' },
    { name: 'Docker', icon: '/tools/docker.png' },
    { name: 'AWS', icon: '/tools/aws.png' },
    { name: 'Git', icon: '/tools/git.png' },
    { name: 'VS Code', icon: '/tools/vscode.png' },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Tools & Technologies</h2>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {tools.map((tool: Tool, index: number) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                {tool.icon ? (
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">
                    {tool.name.charAt(0)}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}