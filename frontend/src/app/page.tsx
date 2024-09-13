import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Filters from "@/components/Filters";
import NavBar from "@/components/NavBar";
import Separator from "@/components/Separator";
import TicketTable from "@/components/Table";
import { BsPlus } from "react-icons/bs";

export default function Home() {
  return (
    <div>
      <NavBar pageTitle="Atendimento ao cliente" />
      <Breadcrumbs pageTitle="Atendimento ao cliente" />
      <Separator />
      <div className="flex gap-2 justify-start items-center px-8">
        <Button variant="filled" iconPosition="right" icon={<BsPlus size={20} />} >Abrir ticket</Button> 
        <Filters />
      </div>
        <TicketTable />
    </div>
  );
}