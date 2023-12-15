import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <main>
      RootLayout
      <Outlet />
    </main>
  );
}

export default RootLayout;
