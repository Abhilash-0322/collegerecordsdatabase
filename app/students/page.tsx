'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import DataTable from '@/components/DataTable'
import Modal from '@/components/Modal'
import { InputField, Button } from '@/components/FormElements'

interface Student {
  studentId: number
  name: string
  dob: string
  department: string
  gender: string
  phone: string
  email: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    department: '',
    gender: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/students')
      setStudents(response.data)
    } catch (error) {
      toast.error('Failed to fetch students')
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
      if (editingStudent) {
        await axios.put('/api/students', {
          studentId: editingStudent.studentId,
          ...formData,
        })
        toast.success('Student updated successfully')
      } else {
        await axios.post('/api/students', formData)
        toast.success('Student created successfully')
      }
      setIsModalOpen(false)
      resetForm()
      fetchStudents()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Operation failed')
      console.error('Error:', error)
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      dob: student.dob.split('T')[0],
      department: student.department,
      gender: student.gender,
      phone: student.phone,
      email: student.email,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (student: Student) => {
    if (!confirm(`Are you sure you want to delete ${student.name}?`)) return

    try {
      await axios.delete(`/api/students?id=${student.studentId}`)
      toast.success('Student deleted successfully')
      fetchStudents()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete student')
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      dob: '',
      department: '',
      gender: '',
      phone: '',
      email: '',
    })
    setEditingStudent(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const columns = [
    { key: 'studentId', label: 'ID' },
    { key: 'name', label: 'Name' },
    {
      key: 'dob',
      label: 'Date of Birth',
      render: (student: Student) => new Date(student.dob).toLocaleDateString(),
    },
    { key: 'department', label: 'Department' },
    { key: 'gender', label: 'Gender' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        >
          Add New Student
        </Button>
      </div>

      <DataTable
        data={students}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
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
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            placeholder="Male/Female/Other"
          />
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingStudent ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
