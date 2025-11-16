'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import DataTable from '@/components/DataTable'
import Modal from '@/components/Modal'
import { SelectField, Button } from '@/components/FormElements'

interface Enrollment {
  enrollmentId: number
  studentId: number
  courseId: number
  grade: string | null
  student: {
    name: string
  }
  course: {
    courseName: string
  }
}

interface Student {
  studentId: number
  name: string
}

interface Course {
  courseId: number
  courseName: string
}

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(null)
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    grade: '',
  })

  useEffect(() => {
    fetchEnrollments()
    fetchStudents()
    fetchCourses()
  }, [])

  const fetchEnrollments = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/enrollment')
      setEnrollments(response.data)
    } catch (error) {
      toast.error('Failed to fetch enrollments')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students')
      setStudents(response.data)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses')
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingEnrollment) {
        await axios.put('/api/enrollment', {
          enrollmentId: editingEnrollment.enrollmentId,
          ...formData,
        })
        toast.success('Enrollment updated successfully')
      } else {
        await axios.post('/api/enrollment', formData)
        toast.success('Enrollment created successfully')
      }
      setIsModalOpen(false)
      resetForm()
      fetchEnrollments()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Operation failed')
      console.error('Error:', error)
    }
  }

  const handleEdit = (enrollment: Enrollment) => {
    setEditingEnrollment(enrollment)
    setFormData({
      studentId: enrollment.studentId.toString(),
      courseId: enrollment.courseId.toString(),
      grade: enrollment.grade || '',
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (enrollment: Enrollment) => {
    if (!confirm(`Are you sure you want to delete this enrollment?`)) return

    try {
      await axios.delete(`/api/enrollment?id=${enrollment.enrollmentId}`)
      toast.success('Enrollment deleted successfully')
      fetchEnrollments()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete enrollment')
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      studentId: '',
      courseId: '',
      grade: '',
    })
    setEditingEnrollment(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const columns = [
    { key: 'enrollmentId', label: 'ID' },
    { key: 'student.name', label: 'Student' },
    { key: 'course.courseName', label: 'Course' },
    { 
      key: 'grade', 
      label: 'Grade',
      render: (enrollment: Enrollment) => enrollment.grade || 'Not Graded'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Enrollments</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        >
          Add New Enrollment
        </Button>
      </div>

      <DataTable
        data={enrollments}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingEnrollment ? 'Edit Enrollment' : 'Add New Enrollment'}
      >
        <form onSubmit={handleSubmit}>
          <SelectField
            label="Student"
            name="studentId"
            value={formData.studentId}
            onChange={handleSelectChange}
            options={students.map(s => ({ value: s.studentId, label: s.name }))}
            required
          />
          <SelectField
            label="Course"
            name="courseId"
            value={formData.courseId}
            onChange={handleSelectChange}
            options={courses.map(c => ({ value: c.courseId, label: c.courseName }))}
            required
          />
          <div className="mb-4">
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
              Grade (Optional)
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              placeholder="A+, A, B+, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingEnrollment ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
