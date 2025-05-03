'use client'

import { useState } from 'react'
import { Send } from "lucide-react"

export default function ContactForm({
  isRTL,
  dictionary
}: {
  isRTL: boolean;
  dictionary: any;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would submit the form data to a backend
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    // Show success message (in a real app)
  }
  
  return (
    <div className={isRTL ? "lg:order-1" : ""}>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">{dictionary.formSection.title}</h2>
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            {dictionary.formSection.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={dictionary.formSection.namePlaceholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            {dictionary.formSection.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={dictionary.formSection.emailPlaceholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
            {dictionary.formSection.subjectLabel}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder={dictionary.formSection.subjectPlaceholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            {dictionary.formSection.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={dictionary.formSection.messagePlaceholder}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <Send className="h-5 w-5 mr-2" />
          {dictionary.formSection.submitButton}
        </button>
      </form>
    </div>
  )
} 