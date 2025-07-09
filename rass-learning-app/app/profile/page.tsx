import { requireAuth } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react'

export default async function ProfilePage() {
  const session = await requireAuth()
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      profileImage: true,
      phone: true,
      address: true,
      bio: true,
      createdAt: true,
    },
  })

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button asChild>
          <Link href="/profile/edit">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative h-20 w-20">
                <Image
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=4f46e5&color=fff`}
                  alt={user.name || 'Profile'}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="capitalize">{user.role.toLowerCase()}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{user.address}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            {user.bio && (
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}