import React, { useState } from 'react'
import axios from 'axios'

const Aicalling = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("+91")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const validateForm = () => {
    if (!name.trim()) {
      return "Name is required"
    }

    if (!phone.trim()) {
      return "Phone number is required"
    }

    if (!phone.startsWith("+91")) {
      return "Phone number must start with +91"
    }

    const digits = phone.slice(3) // remove +91
    if (!/^\d{10}$/.test(digits)) {
      return "Phone number must be 10 digits after +91"
    }

    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setSuccess("")
      return
    }

    setError("")
    setSuccess("")

    const payload = {
      name: name.trim(),
      number: phone.trim(),
    }

    try {
      await axios.post("https://souptik.app.n8n.cloud/webhook/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("Data sent:", payload)
      setSuccess("Call triggered successfully!")
      setName("")
      setPhone("")
    } catch (error) {
      console.error("Error sending data:", error)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          AI Calling Assistant
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="+91**********"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm font-medium">{success}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 active:scale-95 transition"
          >
            Get Call
          </button>
        </form>
      </div>
    </div>
  )
}

export default Aicalling
