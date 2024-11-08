"use client"; // This line makes the component a client component

import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import RamadanCalendar from '../components/RamadanCalendar';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string; // Allow for other prayer names if needed
}

const Home = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setLocation({ latitude: data.latitude, longitude: data.longitude });
      } catch (err) {
        setError('Unable to fetch location');
        setLoading(false);
        console.error(err);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      if (location.latitude && location.longitude) {
        try {
          const res = await fetch(`/api/prayer-times?latitude=${location.latitude}&longitude=${location.longitude}`);
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await res.json();
          setPrayerTimes(data.data.timings);
          setLoading(false);
        } catch (err) {
          setError('Unable to fetch prayer times');
          setLoading(false);
          console.error(err);
        }
      }
    };

    fetchPrayerTimes();
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Prayer Times</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : prayerTimes ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-2">
            {Object.entries(prayerTimes).map(([key, time]) => (
              <li key={key} className="flex justify-between py-2 border-b last:border-b-0">
                <span className="font-medium">{key}</span>
                <span className="text-gray-600">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-200 p-4 rounded-lg text-center">
          No prayer times available.
        </div>
      )}
      <Ram adanCalendar />
    </div>
  );
};

export default Home;
