import Button from '@/core/components/Button';
import Avatar from '@/settings/components/Avatar';
import ProfileForm from '@/settings/components/ProfileForm';

export default function Profile() {
  return (
    <>
      <div
        className="block w-full h-60 bg-gradient-to-r from-blue-400 to-purple-500 opacity-40"
        style={{ borderRadius: '150px 0 0 0' }}
      ></div>

      <div className="flex flex-row items-center justify-between w-full mb-24">
        <div className="flex flew-row gap-4 ml-52">
          {/* @ts-expect-error Async Server Component */}
          <Avatar />
          <div className="flex flex-col items-start justify-center ml-10">
            <h2 className="text-2xl">Profile</h2>
            <p className="text-sm text-gray-500">Update your profile details</p>
          </div>
        </div>

        <Button style="secondary">Save</Button>
      </div>

      <ProfileForm />
    </>
  );
}
