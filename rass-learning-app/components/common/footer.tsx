import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                RASS Learning
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Empowering learners worldwide with quality education and innovative learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Email: info@rasslearning.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Address: Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} RASS Learning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}