'use client';

import { useEffect, useState } from 'react';
import { useSession } from "../context/SessionContext";

export default function MedicationReadPage() {
  const { user } = useSession();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('/api/medication/read', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setMedications(data);
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMedications();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">Loading medications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">My Medications</h1>
            <p className="mt-2 text-sm text-gray-600">View and manage your current medications</p>
          </div>

          {medications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No medications found. Add your first medication here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{medication.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Dosage: {medication.dosage} • Frequency: {medication.frequency}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      medication.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : medication.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Start Date:</span> {new Date(medication.startDate).toLocaleDateString()}
                    </p>
                    {medication.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span> {medication.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
