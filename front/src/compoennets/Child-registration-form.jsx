"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"

const childFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }),
  
  
allergies: z.boolean().default(false),
  allergiesDetails: z.string().optional(),
  medicalConditions: z.boolean().default(false),
  medicalConditionsDetails: z.string().optional(),
  specialNeeds: z.boolean().default(false),
  specialNeedsDetails: z.string().optional(),
  additionalNotes: z.string().optional(),
})

export function ChildRegistrationForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const form = useForm({
    resolver: zodResolver(childFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      
      allergies: false,
      medicalConditions: false,
      specialNeeds: false,
    },
  })

  const { register, handleSubmit, formState, watch, setValue } = form
  const { errors } = formState

  function onSubmit(data) {
  setIsSubmitting(true)

  // Construction du body pour respecter le backend
 const requestBody = {
  nom: data.lastName,
  prenom: data.firstName,
  dateNaissance: data.dateOfBirth.toISOString().split("T")[0],
  genre: data.gender === "male" ? "Garçon" : data.gender === "female" ? "Fille" : "Autre",
  allergies: data.allergies ? data.allergiesDetails || "Non spécifié" : null,
  conditionsMedicales: data.medicalConditions ? data.medicalConditionsDetails || "Non spécifié" : null,
  besoinsSpecifiques: data.specialNeeds ? data.specialNeedsDetails || "Non spécifié" : null,
  additionalNotes: data.additionalNotes || null,

  // 👇 On ajoute cette ligne pour forcer le statut "en attente"
  statut: "pending"
}

  fetch("https://bloom-care-backend.onrender.com/children", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // ou remplace avec ton token
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Échec de l'enregistrement de l'enfant.")
      }
      return response.json()
    })
    .then((result) => {
      console.log("Succès :", result)
      navigate("/dashboard?registration=success")
    })
    .catch((error) => {
      console.error("Erreur :", error)
      alert("Une erreur s'est produite lors de l'enregistrement.")
    })
    .finally(() => {
      setIsSubmitting(false)
    })
}


  // Watch checkbox values to conditionally render detail fields
  const hasAllergies = watch("allergies")
  const hasMedicalConditions = watch("medicalConditions")
  const hasSpecialNeeds = watch("specialNeeds")
  const selectedDate = watch("dateOfBirth")

  // Handle date selection
  const handleDateSelect = (date) => {
    setValue("dateOfBirth", date)
    setShowCalendar(false)
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const today = new Date()
    const days = []
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // Get the first day of the month
    const firstDay = currentMonth.getDay()

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    // Add days of the month
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i)
      const isDisabled = date > today || date < new Date("2000-01-01")

      days.push(
        <button
          key={i}
          type="button"
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          {i}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                id="firstName"
                placeholder="Enter first name"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("firstName")}
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                placeholder="Enter last name"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("lastName")}
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Date of Birth */}
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium">
                Date of Birth
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`w-full px-3 py-2 border rounded-md text-left ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </button>

                {showCalendar && (
                  <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-3">
                    <div className="grid grid-cols-7 gap-1">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                      {generateCalendarDays()}
                    </div>
                  </div>
                )}
              </div>
              {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <label className="block text-sm font-medium">Gender</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    className="h-4 w-4 text-blue-600"
                    {...register("gender")}
                  />
                  <label htmlFor="male" className="text-sm">
                    Male
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    className="h-4 w-4 text-blue-600"
                    {...register("gender")}
                  />
                  <label htmlFor="female" className="text-sm">
                    Female
                  </label>
                </div>
                
              </div>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
            </div>
          </div>

          
           

            

          {/* Allergies */}
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <input type="checkbox" id="allergies" className="h-4 w-4 mt-1" {...register("allergies")} />
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium">
                Does your child have any allergies?
              </label>
              <p className="text-sm text-gray-500">Check this box if your child has any allergies.</p>
            </div>
          </div>

          {/* Allergies Details */}
          {hasAllergies && (
            <div className="space-y-2">
              <label htmlFor="allergiesDetails" className="block text-sm font-medium">
                Allergy Details
              </label>
              <textarea
                id="allergiesDetails"
                placeholder="Please provide details about your child's allergies"
                className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                {...register("allergiesDetails")}
              ></textarea>
            </div>
          )}

          {/* Medical Conditions */}
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <input type="checkbox" id="medicalConditions" className="h-4 w-4 mt-1" {...register("medicalConditions")} />
            <div>
              <label htmlFor="medicalConditions" className="block text-sm font-medium">
                Does your child have any medical conditions?
              </label>
              <p className="text-sm text-gray-500">Check this box if your child has any medical conditions.</p>
            </div>
          </div>

          {/* Medical Conditions Details */}
          {hasMedicalConditions && (
            <div className="space-y-2">
              <label htmlFor="medicalConditionsDetails" className="block text-sm font-medium">
                Medical Condition Details
              </label>
              <textarea
                id="medicalConditionsDetails"
                placeholder="Please provide details about your child's medical conditions"
                className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                {...register("medicalConditionsDetails")}
              ></textarea>
            </div>
          )}

          {/* Special Needs */}
          <div className="flex items-start space-x-3 p-4 border rounded-md">
            <input type="checkbox" id="specialNeeds" className="h-4 w-4 mt-1" {...register("specialNeeds")} />
            <div>
              <label htmlFor="specialNeeds" className="block text-sm font-medium">
                Does your child have any special needs?
              </label>
              <p className="text-sm text-gray-500">
                Check this box if your child has any special needs or requirements.
              </p>
            </div>
          </div>

          {/* Special Needs Details */}
          {hasSpecialNeeds && (
            <div className="space-y-2">
              <label htmlFor="specialNeedsDetails" className="block text-sm font-medium">
                Special Needs Details
              </label>
              <textarea
                id="specialNeedsDetails"
                placeholder="Please provide details about your child's special needs"
                className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                {...register("specialNeedsDetails")}
              ></textarea>
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-2">
            <label htmlFor="additionalNotes" className="block text-sm font-medium">
              Additional Notes (Optional)
            </label>
            <textarea
              id="additionalNotes"
              placeholder="Any additional information you'd like us to know about your child"
              className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
              {...register("additionalNotes")}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
           disabled={isSubmitting}
           className="w-full py-2 px-4 bg-pink-300 hover:bg-pink-400 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
          {isSubmitting ? "Submitting..." : "Register Child"}
       </button>
        </form>
      </div>
    </div>
  )
}
