"use client";
import LoginForm from "@/components/Login/Login";
import Loading from '@/components/Loading/Loading';
import LoginPage from '@/components/Login/LoginPage';
import useLoginPageLogic from "@/hooks/useLoginPageLogic";

export default function Home() {
  const { loading, isLargeScreen } = useLoginPageLogic();

  if (loading) return <Loading />

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900">
      {isLargeScreen ? <LoginPage /> : <LoginForm />}
    </div>
  );
}
