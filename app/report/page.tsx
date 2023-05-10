import ErrorForm from '@/core/components/ErrorForm';

export default function ReportBug() {
  return (
    <div className="w-2/4 mx-auto">
      <h1 className="text-3xl font-bold text-center">Report an issue</h1>

      <ErrorForm />
    </div>
  );
}
