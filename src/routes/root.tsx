import { Outlet } from "react-router-dom";

import Navigation from "@/components/shared/navigation";

function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-3xl mx-auto p-5 lg:px-0">
        <Outlet />
      </main>
      <aside className="lg:order-first">
        <Navigation />
      </aside>
    </div>
  );
}

export default Root;
