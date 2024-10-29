// components/Loading.jsx
"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import LoginForm from '../Login/Login';
import WhiteF from '../../public/white-logo.png';
import FooterImg from '../../public/footerlogo.png';
import useStore from '@/lib/store'; // Adjust the path if needed

const Loading = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [userLatitude, setLatitude] = useState(null);
  const [userLongitude, setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState('');

  const setLocation = useStore((state) => state.setLocation);

  const fetchCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(userCoords, handleGeoError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const userCoords = async (position) => {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    setLatitude(userLatitude);
    setLongitude(userLongitude);
    // console.log("User Latitude:", userLatitude, "User Longitude:", userLongitude);

    // Fetch address after setting coordinates
    await getUserAdd(userLatitude, userLongitude);
  };

  const handleGeoError = (error) => {
    console.error("Error retrieving location:", error);
  };

  const getUserAdd = async (latitude, longitude) => {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?key=9cbd8ba98a4f4b3699511db734fb6cfd&q=${latitude}+${longitude}&pretty=1&no_annotations=1`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted;
        setUserAddress(address);
        console.log("User Address:", address);

        // Set location in Zustand store after successfully fetching the address
        setLocation(latitude, longitude, address);
      } else {
        console.log("No address found for these coordinates.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    fetchCoordinates(); // Trigger fetching coordinates on mount

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShowLogin(true);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setLocation]);

  if (showLogin) return <LoginForm />;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {/* Loading Image */}
      <Image
        src={WhiteF}
        alt="Loading Image"
        width={60}
        height={60}
        priority
      />

      {/* Indicator Circles */}
      <div className="flex space-x-2 mt-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-blue-200'}`}
          />
        ))}
      </div>

      {/* Footer with Image and Text */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-xs text-gray-300 font-roboto">from</span>
        <Image
          src={FooterImg}
          alt="Footer Image"
          width={80}
          height={20}
          priority
        />
      </div>
    </div>
  );
};

export default Loading;
