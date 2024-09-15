import Button from "@/components/Button";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

export default function Home() {
  return (
    <div>
      <main className='container mx-8 mt-8'>
        <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
        <Link href='/atendimento-ao-cliente'>
          <Button
            variant='filled'
            iconPosition='left'
            icon={<MdDashboard size={20} />}
          >
            Atendimento ao Cliente
          </Button>
        </Link>
      </main>
    </div>
  );
}