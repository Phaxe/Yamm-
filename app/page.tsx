import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import OrdersTable from "@/components/Table/Table";


export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <OrdersTable />
      </div>
    </div>
  );
}
