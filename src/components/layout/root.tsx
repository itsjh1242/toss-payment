import { Outlet } from "react-router-dom";

export const RootLayout: React.FC = () => {
  return (
    <main className="flex flex-col w-full min-h-screen bg-gray-50 text-gray-900">
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
};
