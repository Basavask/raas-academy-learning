"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CourseBatch {
  id: string
  batchNumber: string
  startDate: string
  endDate: string
  maxStudents: number
  isActive: boolean
  enrollments: Array<{
    id: string
    user: {
      id: string
      name: string
      email: string
      studentId?: string
    }
  }>
}

interface BatchManagementProps {
  courseId: string
  courseTitle: string
  batches: CourseBatch[]
}

export function BatchManagement({ courseId, courseTitle, batches: initialBatches }: BatchManagementProps) {
  const [batches, setBatches] = useState<CourseBatch[]>(initialBatches)
  const [showForm, setShowForm] = useState(false)
  const [editingBatch, setEditingBatch] = useState<CourseBatch | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    batchNumber: '',
    startDate: '',
    endDate: '',
    maxStudents: 50
  })

  const fetchBatches = async () => {
    try {
      const response = await fetch(`/api/admin/batches?courseId=${courseId}`)
      if (response.ok) {
        const data = await response.json()
        setBatches(data)
      }
    } catch (error) {
      console.error('Error fetching batches:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const url = editingBatch ? '/api/admin/batches' : '/api/admin/batches'
      const method = editingBatch ? 'PUT' : 'POST'
      const body = editingBatch 
        ? { id: editingBatch.id, ...formData }
        : { courseId, ...formData }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        toast.success(editingBatch ? 'Batch updated successfully' : 'Batch created successfully')
        await fetchBatches()
        setShowForm(false)
        setEditingBatch(null)
        setFormData({ batchNumber: '', startDate: '', endDate: '', maxStudents: 50 })
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save batch')
      }
    } catch (error) {
      toast.error('Failed to save batch')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (batch: CourseBatch) => {
    setEditingBatch(batch)
    setFormData({
      batchNumber: batch.batchNumber,
      startDate: batch.startDate.split('T')[0],
      endDate: batch.endDate.split('T')[0],
      maxStudents: batch.maxStudents
    })
    setShowForm(true)
  }

  const handleDelete = async (batchId: string) => {
    if (!confirm('Are you sure you want to delete this batch?')) return
    
    try {
      const response = await fetch(`/api/admin/batches?id=${batchId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Batch deleted successfully')
        await fetchBatches()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete batch')
      }
    } catch (error) {
      toast.error('Failed to delete batch')
    }
  }

  const generateStudentId = async (userId: string) => {
    try {
      const response = await fetch('/api/admin/generate-student-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(`Student ID generated: ${data.studentId}`)
        await fetchBatches() // Refresh to show the new student ID
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to generate student ID')
      }
    } catch (error) {
      toast.error('Failed to generate student ID')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Batch Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage cohorts for {courseTitle}</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Batch
        </Button>
      </div>

      {/* Add/Edit Batch Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingBatch ? 'Edit Batch' : 'Add New Batch'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    placeholder="e.g., Batch 1, Batch 2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingBatch ? 'Update Batch' : 'Create Batch')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingBatch(null)
                    setFormData({ batchNumber: '', startDate: '', endDate: '', maxStudents: 50 })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Batches List */}
      <div className="grid gap-4">
        {batches.map((batch) => (
          <Card key={batch.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{batch.batchNumber}</CardTitle>
                  <Badge variant={batch.isActive ? 'default' : 'secondary'}>
                    {batch.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(batch)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(batch.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Start Date</div>
                    <div className="text-sm text-gray-600">{new Date(batch.startDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">End Date</div>
                    <div className="text-sm text-gray-600">{new Date(batch.endDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Enrolled</div>
                    <div className="text-sm text-gray-600">
                      {batch.enrollments.length} / {batch.maxStudents}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Status</div>
                    <div className="text-sm text-gray-600">
                      {batch.enrollments.length >= batch.maxStudents ? 'Full' : 'Open'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Students */}
              <div>
                <h4 className="font-medium mb-2">Enrolled Students ({batch.enrollments.length})</h4>
                <div className="space-y-2">
                  {batch.enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <div className="font-medium">{enrollment.user.name}</div>
                        <div className="text-sm text-gray-600">{enrollment.user.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {enrollment.user.studentId ? (
                          <Badge variant="outline">{enrollment.user.studentId}</Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => generateStudentId(enrollment.user.id)}
                          >
                            Generate ID
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {batch.enrollments.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No students enrolled yet
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {batches.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Batches Created</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your first batch to start managing student cohorts
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Batch
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 