import { requireAdmin } from "@/lib/auth/guard"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()
  
  return (
    <div className="min-h-[calc(100vh-16rem)]">
      {children}
    </div>
  )
}