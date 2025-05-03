'use client'

import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactCardSection({
  contactData,
  dictionary
}: {
  contactData: any;
  dictionary: any;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-12">
          {dictionary.contactInfo.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50 mx-auto">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-center text-blue-700 mb-4">{dictionary.contactInfo.emailTitle}</h3>
            <div className="space-y-2 text-center">
              <p className="text-gray-700">
                <a href={`mailto:${contactData.email1}`} className="hover:text-blue-600">
                  {contactData.email1}
                </a>
              </p>
              <p className="text-gray-700">
                <a href={`mailto:${contactData.email2}`} className="hover:text-blue-600">
                  {contactData.email2}
                </a>
              </p>
            </div>
          </div>
          
          {/* Phone Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50 mx-auto">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-center text-blue-700 mb-4">{dictionary.contactInfo.phoneTitle}</h3>
            <div className="space-y-2 text-center">
              <p className="text-gray-700">
                <a href={`tel:${contactData.phone1}`} className="hover:text-blue-600">
                  {contactData.phone1}
                </a>
              </p>
              <p className="text-gray-700">
                <a href={`tel:${contactData.phone2}`} className="hover:text-blue-600">
                  {contactData.phone2}
                </a>
              </p>
            </div>
          </div>
          
          {/* Address Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50 mx-auto">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-center text-blue-700 mb-4">{dictionary.contactInfo.addressTitle}</h3>
            <p className="text-gray-700 text-center">
              {contactData.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 