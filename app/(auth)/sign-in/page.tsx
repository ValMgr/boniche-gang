import SignInForm from '@/auth/components/SignInForm';

export default function SignIn() {
  return (
    <div className="w-2/4 mx-auto">
      <h1 className="text-3xl font-bold text-center">Sign In</h1>

      <SignInForm />
    </div>
  );
}
