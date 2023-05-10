import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SettingsLayout({ children }: Props) {
  return (
    <>
      <h1 className="text-3xl font-medium tracking-tight">Settings</h1>
      <hr className="my-8" />

      <div className="flex flex-row gap-4">
        <aside className="flex flex-col items-start gap-4 w-1/4">
          <ul className="flex flex-col items-start gap-4">
            <li>
              <a href="/settings/profile">Profile</a>
            </li>
            <li>
              <a href="/settings/password">Password</a>
            </li>
            <li>
              <a href="/settings/privacy">Privacy</a>
            </li>
            <li>
              <a href="/settings/notifications">Notifications</a>
            </li>
            <li>
              <a href="/settings/orders">Orders</a>
            </li>
            <li>
              <a href="/settings/events">Events</a>
            </li>
          </ul>
        </aside>

        <section className="flex flex-col items-start gap-4 w-3/4">
          {children}
        </section>
      </div>
    </>
  );
}
