import { Outlet } from "react-router-dom";

import Navigation from "@/components/shared/navigation";

function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <aside className="fixed bottom-0 w-full bg-background lg:relative">
        <Navigation />
      </aside>
      <main className="flex-1 w-full max-w-3xl mx-auto p-5 pb-20 lg:px-0">
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
