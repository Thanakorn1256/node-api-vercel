import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Event() {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <div>
      <h1>หน้าของ Event {eventId}</h1>
      <Link href="/formRegister">
        <button>สมัครแข่งขัน</button>
      </Link>
    </div>
  );
}