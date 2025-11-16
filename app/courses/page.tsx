'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import DataTable from '@/components/DataTable'
import Modal from '@/components/Modal'
import { InputField, Button } from '@/components/FormElements'

interface Course {
  courseId: number
  courseName: string
  department: string
  credit: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    courseName: '',
    department: '',
    credit: '',
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/courses')
      setCourses(response.data)
    } catch (error) {
      toast.error('Failed to fetch courses')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
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
      if (editingCourse) {
        await axios.put('/api/courses', {
          courseId: editingCourse.courseId,
          ...formData,
        })
        toast.success('Course updated successfully')
      } else {
        await axios.post('/api/courses', formData)
        toast.success('Course created successfully')
      }
      setIsModalOpen(false)
      resetForm()
      fetchCourses()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Operation failed')
      console.error('Error:', error)
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      courseName: course.courseName,
      department: course.department,
      credit: course.credit.toString(),
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (course: Course) => {
    if (!confirm(`Are you sure you want to delete ${course.courseName}?`)) return

    try {
      await axios.delete(`/api/courses?id=${course.courseId}`)
      toast.success('Course deleted successfully')
      fetchCourses()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete course')
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      courseName: '',
      department: '',
      credit: '',
    })
    setEditingCourse(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const columns = [
    { key: 'courseId', label: 'ID' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'department', label: 'Department' },
    { key: 'credit', label: 'Credits' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        >
          Add New Course
        </Button>
      </div>

      <DataTable
        data={courses}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Credits"
            name="credit"
            type="number"
            value={formData.credit}
            onChange={handleInputChange}
            required
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingCourse ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
