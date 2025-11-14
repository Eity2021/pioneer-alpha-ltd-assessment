import React from 'react'
import Image from "next/image";
export default function page() {
    return (
        <div>
            <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 min-h-screen p-8">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-8 text-gray-800">Account Information</h2>
                    <form className="space-y-6">

                        <div className="flex items-center space-x-4">
                            {/* Photo upload preview and button */}
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                {/* Use next/image for better performance */}
                                <Image
                                    src="/avatar-placeholder.png"
                                    alt="Profile Photo"
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                />
                            </div>
                            <button
                                type="button"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Upload New Photo
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="border p-3 rounded w-full"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="border p-3 rounded w-full"
                            />
                        </div>

                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-3 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            className="border p-3 rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Contact Number"
                            className="border p-3 rounded w-full"
                        />
                        <input
                            type="date"
                            placeholder="Birthday"
                            className="border p-3 rounded w-full"
                        />

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
