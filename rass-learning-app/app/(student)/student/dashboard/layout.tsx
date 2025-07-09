import { requireAuth } from "@/lib/auth/guard"

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  
  return (
    <div className="min-h-[calc(100vh-16rem)]">
      {children}
    </div>
  )
}