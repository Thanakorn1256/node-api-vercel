import Link from 'next/link';

export default function Home() {
  const events = [
    { id: 1, name: "Event A" },
    { id: 2, name: "Event B" },
  ];

  return (
    <div>
      <h1>หน้าหลัก</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Link href={`/eventlist/${event.id}`}>
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
