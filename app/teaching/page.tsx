'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import DataTable from '@/components/DataTable'
import Modal from '@/components/Modal'
import { SelectField, Button } from '@/components/FormElements'

interface Teaching {
  teachingId: number
  facultyId: number
  courseId: number
  semester: string
  faculty: {
    name: string
  }
  course: {
    courseName: string
  }
}

interface Faculty {
  facultyId: number
  name: string
}

interface Course {
  courseId: number
  courseName: string
}

export default function TeachingPage() {
  const [teachings, setTeachings] = useState<Teaching[]>([])
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeaching, setEditingTeaching] = useState<Teaching | null>(null)
  const [formData, setFormData] = useState({
    facultyId: '',
    courseId: '',
    semester: '',
  })

  useEffect(() => {
    fetchTeachings()
    fetchFaculty()
    fetchCourses()
  }, [])

  const fetchTeachings = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/teaching')
      setTeachings(response.data)
    } catch (error) {
      toast.error('Failed to fetch teaching assignments')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('/api/faculty')
      setFaculty(response.data)
    } catch (error) {
      console.error('Error fetching faculty:', error)
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
      if (editingTeaching) {
        await axios.put('/api/teaching', {
          teachingId: editingTeaching.teachingId,
          ...formData,
        })
        toast.success('Teaching assignment updated successfully')
      } else {
        await axios.post('/api/teaching', formData)
        toast.success('Teaching assignment created successfully')
      }
      setIsModalOpen(false)
      resetForm()
      fetchTeachings()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Operation failed')
      console.error('Error:', error)
    }
  }

  const handleEdit = (teaching: Teaching) => {
    setEditingTeaching(teaching)
    setFormData({
      facultyId: teaching.facultyId.toString(),
      courseId: teaching.courseId.toString(),
      semester: teaching.semester,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (teaching: Teaching) => {
    if (!confirm(`Are you sure you want to delete this teaching assignment?`)) return

    try {
      await axios.delete(`/api/teaching?id=${teaching.teachingId}`)
      toast.success('Teaching assignment deleted successfully')
      fetchTeachings()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete teaching assignment')
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      facultyId: '',
      courseId: '',
      semester: '',
    })
    setEditingTeaching(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const columns = [
    { key: 'teachingId', label: 'ID' },
    { key: 'faculty.name', label: 'Faculty' },
    { key: 'course.courseName', label: 'Course' },
    { key: 'semester', label: 'Semester' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Teaching Assignments</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        >
          Add New Assignment
        </Button>
      </div>

      <DataTable
        data={teachings}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTeaching ? 'Edit Teaching Assignment' : 'Add New Teaching Assignment'}
      >
        <form onSubmit={handleSubmit}>
          <SelectField
            label="Faculty"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleSelectChange}
            options={faculty.map(f => ({ value: f.facultyId, label: f.name }))}
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
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
              Semester <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              placeholder="e.g., Fall 2024, Spring 2025"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingTeaching ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
