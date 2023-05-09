import RegisterForm from '@/auth/components/RegisterForm';

export default function Register() {
  return (
    <div className="w-2/4 mx-auto">
      <h1 className="text-3xl font-bold text-center">Register</h1>

      <RegisterForm />
    </div>
  );
}
