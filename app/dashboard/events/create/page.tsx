import Button from '@/core/components/Button';
import CreateEventForm from '@/dashboard/components/CreateEventForm';

export default function CreateEvent() {
  return (
    <>
      <div className="flex flex-row-reverse w-full">
        <Button href="/dashboard/events">Back</Button>
      </div>
      <CreateEventForm />
    </>
  );
}
