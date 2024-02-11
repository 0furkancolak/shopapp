import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function Admin() {
  return (
    <div className="flex gap-4">
      <div className="flex basis-1/4 relative">
        <AdminSidebar />
      </div>
      <div className="flex basis-3/4">
        <Outlet />
      </div>
    </div>
  );
}
