'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import DataTable from '@/components/DataTable'
import Modal from '@/components/Modal'
import { InputField, Button } from '@/components/FormElements'

interface Faculty {
  facultyId: number
  name: string
  department: string
  designation: string
  phone: string
  email: string
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    designation: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/faculty')
      setFaculty(response.data)
    } catch (error) {
      toast.error('Failed to fetch faculty')
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
      if (editingFaculty) {
        await axios.put('/api/faculty', {
          facultyId: editingFaculty.facultyId,
          ...formData,
        })
        toast.success('Faculty updated successfully')
      } else {
        await axios.post('/api/faculty', formData)
        toast.success('Faculty created successfully')
      }
      setIsModalOpen(false)
      resetForm()
      fetchFaculty()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Operation failed')
      console.error('Error:', error)
    }
  }

  const handleEdit = (facultyMember: Faculty) => {
    setEditingFaculty(facultyMember)
    setFormData({
      name: facultyMember.name,
      department: facultyMember.department,
      designation: facultyMember.designation,
      phone: facultyMember.phone,
      email: facultyMember.email,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (facultyMember: Faculty) => {
    if (!confirm(`Are you sure you want to delete ${facultyMember.name}?`)) return

    try {
      await axios.delete(`/api/faculty?id=${facultyMember.facultyId}`)
      toast.success('Faculty deleted successfully')
      fetchFaculty()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete faculty')
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      department: '',
      designation: '',
      phone: '',
      email: '',
    })
    setEditingFaculty(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const columns = [
    { key: 'facultyId', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'department', label: 'Department' },
    { key: 'designation', label: 'Designation' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Faculty</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        >
          Add New Faculty
        </Button>
      </div>

      <DataTable
        data={faculty}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}
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
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
            placeholder="Professor/Associate Professor/Assistant Professor"
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
              {editingFaculty ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
