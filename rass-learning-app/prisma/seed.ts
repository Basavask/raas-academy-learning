import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')
  
  // Create admin user with profile image
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@rasslearning.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      phone: '+91 9876543210',
      address: 'Bengaluru, Karnataka, India',
      bio: 'Platform administrator',
      profileImage: 'https://ui-avatars.com/api/?name=Admin+User&background=f97316&color=fff&size=200',
    },
  })
  console.log('✅ Admin user created:', admin.email)
  
  // Create test students with profile images
  const studentPassword = await bcrypt.hash('student123', 10)
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        password: studentPassword,
        name: 'John Doe',
        role: 'STUDENT',
        phone: '+91 9876543211',
        address: 'Mumbai, Maharashtra, India',
        bio: 'Passionate learner',
        profileImage: 'https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff&size=200',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        password: studentPassword,
        name: 'Jane Smith',
        role: 'STUDENT',
        phone: '+91 9876543212',
        address: 'Delhi, India',
        bio: 'Tech enthusiast',
        profileImage: 'https://ui-avatars.com/api/?name=Jane+Smith&background=ec4899&color=fff&size=200',
      },
    }),
  ])
  console.log('✅ Test students created:', students.length)
  
  // Create courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive web development course. Perfect for beginners who want to become full-stack developers.',
        price: 4999,
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
        isLive: true,
        duration: '40 hours',
        level: 'Beginner',
        category: 'Web Development',
        modules: {
          create: [
            {
              title: 'Introduction to Web Development',
              description: 'Get started with the basics of web development',
              order: 1,
              content: 'Welcome to web development! In this module, you will learn the fundamentals...',
              duration: '2 hours',
            },
            {
              title: 'HTML Fundamentals',
              description: 'Master the building blocks of web pages',
              order: 2,
              content: 'HTML is the foundation of web development...',
              duration: '3 hours',
            },
            {
              title: 'CSS Styling',
              description: 'Make your websites beautiful with CSS',
              order: 3,
              content: 'CSS brings life to your HTML...',
              duration: '4 hours',
            },
            {
              title: 'JavaScript Basics',
              description: 'Add interactivity with JavaScript',
              order: 4,
              content: 'JavaScript makes your websites dynamic...',
              duration: '5 hours',
            },
          ],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: 'Data Science with Python',
        description: 'Master data science concepts using Python. Learn pandas, numpy, matplotlib, and machine learning basics.',
        price: 5999,
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        isLive: true,
        duration: '35 hours',
        level: 'Intermediate',
        category: 'Data Science',
        modules: {
          create: [
            {
              title: 'Python Basics for Data Science',
              description: 'Python fundamentals for data analysis',
              order: 1,
              content: 'Python is the most popular language for data science...',
              duration: '3 hours',
            },
            {
              title: 'NumPy and Pandas',
              description: 'Essential libraries for data manipulation',
              order: 2,
              content: 'Learn to work with data using NumPy and Pandas...',
              duration: '5 hours',
            },
            {
              title: 'Data Visualization',
              description: 'Create stunning visualizations with matplotlib and seaborn',
              order: 3,
              content: 'Visualizing data is crucial for insights...',
              duration: '4 hours',
            },
          ],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: 'Digital Marketing Masterclass',
        description: 'Learn SEO, social media marketing, content marketing, and PPC advertising to grow any business online.',
        price: 3999,
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        isLive: true,
        duration: '25 hours',
        level: 'Beginner',
        category: 'Marketing',
        modules: {
          create: [
            {
              title: 'Introduction to Digital Marketing',
              description: 'Overview of digital marketing landscape',
              order: 1,
              content: 'Digital marketing is essential in today\'s world...',
              duration: '2 hours',
            },
            {
              title: 'Search Engine Optimization',
              description: 'Master SEO to rank higher on Google',
              order: 2,
              content: 'SEO helps your content get discovered...',
              duration: '4 hours',
            },
            {
              title: 'Social Media Marketing',
              description: 'Leverage social media for business growth',
              order: 3,
              content: 'Social media is a powerful marketing tool...',
              duration: '3 hours',
            },
          ],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile apps using React Native. Deploy to both iOS and Android from a single codebase.',
        price: 6999,
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        isLive: false, // Draft course
        duration: '45 hours',
        level: 'Intermediate',
        category: 'Mobile Development',
        modules: {
          create: [
            {
              title: 'React Native Setup',
              description: 'Setting up your development environment',
              order: 1,
              content: 'Get your environment ready for React Native development...',
              duration: '2 hours',
            },
            {
              title: 'React Native Components',
              description: 'Build UI with React Native components',
              order: 2,
              content: 'React Native provides powerful components...',
              duration: '5 hours',
            },
          ],
        },
      },
    }),
  ])
  console.log('✅ Courses created:', courses.length)
  
  // Create some sample enrollments and payments
  const enrollment1 = await prisma.enrollment.create({
    data: {
      userId: students[0].id,
      courseId: courses[0].id,
      progress: 25,
    },
  })
  
  await prisma.payment.create({
    data: {
      userId: students[0].id,
      courseId: courses[0].id,
      amount: courses[0].price,
      status: 'SUCCESS',
      razorpayPaymentId: 'pay_sample_1',
      razorpayOrderId: 'order_sample_1',
    },
  })
  
  const enrollment2 = await prisma.enrollment.create({
    data: {
      userId: students[1].id,
      courseId: courses[1].id,
      progress: 60,
    },
  })
  
  await prisma.payment.create({
    data: {
      userId: students[1].id,
      courseId: courses[1].id,
      amount: courses[1].price,
      status: 'SUCCESS',
      razorpayPaymentId: 'pay_sample_2',
      razorpayOrderId: 'order_sample_2',
    },
  })
  
  console.log('✅ Sample enrollments and payments created')
  
  console.log('\n📋 Seed Summary:')
  console.log('- Admin: admin@rasslearning.com (password: admin123)')
  console.log('- Students: john@example.com, jane@example.com (password: student123)')
  console.log('- Courses: 4 courses (3 published, 1 draft)')
  console.log('- Enrollments: 2 sample enrollments with payments')
  console.log('\n✨ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })