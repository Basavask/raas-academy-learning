export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-500 mb-4">
          RASS Learning
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learning Management System - Setup Complete
        </p>
        <div className="mt-8 space-x-4">
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="inline-block px-6 py-3 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  )
}