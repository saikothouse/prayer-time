const RamadanCalendar = () => {
  const ramadanDates = [
    { date: 'March 10', event: '' },
    { date: 'March 11', event: '' },
    { date: 'March 12', event: '' },
    { date: 'March 13', event: '' },
    { date: 'March 14', event: '' },
    { date: 'March 15', event: '' },
    { date: 'March 16', event: '' },
    { date: 'March 17', event: '' },
    { date: 'March 18', event: '' },
    { date: 'March 19', event: '' },
    { date: 'March 20', event: '' },
    { date: 'March 21', event: '' },
    { date: 'March 22', event: '' },
    { date: 'March 23', event: '' },
    { date: 'March 24', event: '' },
    { date: 'March 25', event: '' },
    { date: 'March 26', event: '' },
    { date: 'March 27', event: '' },
    { date: 'March 28', event: '' },
    { date: 'March 29', event: '' },
    { date: 'March 30', event: '' },
    { date: 'March 31', event: '' },
    { date: 'April 9', event: 'Eid al-Fitr' }, // Example Eid date
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Ramadan Calendar</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-4">
          {ramadanDates.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center py-2 px-4 rounded-md transition duration-200 ${
                item.event ? 'bg-green-100 border-l-4 border-green-500' : 'hover:bg-gray-100'
              }`}
            >
              <span className={`text-lg ${item.event ? 'font-bold' : ''}`}>{item.date}</span>
              {item.event && <span className="text-sm text-green-600">{item.event}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RamadanCalendar;
