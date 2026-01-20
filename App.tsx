
import React, { useState, useEffect, useMemo } from 'react';
import { Room, Booking } from './types';
import { ROOMS, ADMIN_CODE } from './constants';
import { RoomCard } from './components/RoomCard';
import { BookingModal } from './components/BookingModal';
import { Assistant } from './components/Assistant';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CURRENT_USER_ID = 'USER_ID';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'my-bookings' | 'all-bookings' | 'stats'>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterRoomId, setFilterRoomId] = useState<string>('all');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const initialBookings: Booking[] = [
      {
        id: 'B1',
        roomId: 'A201',
        roomName: 'Bilik Kuliah A201',
        userId: CURRENT_USER_ID,
        userName: 'Prof. Zakaria (Anda)',
        purpose: 'Matematik Diskret',
        startTime: '08:00',
        endTime: '10:00',
        date: today,
        status: 'Approved'
      },
      {
        id: 'B2',
        roomId: 'DK2',
        roomName: 'Dewan Kuliah 2 (DK2)',
        userId: 'U2',
        userName: 'Dr. Sarah',
        purpose: 'Seminar Keusahawanan',
        startTime: '11:00',
        endTime: '13:00',
        date: today,
        status: 'Approved'
      }
    ];
    setBookings(initialBookings);
  }, []);

  const handleCreateBooking = (data: Partial<Booking>) => {
    const isOverlapping = bookings.some(b => {
      return (
        b.roomId === data.roomId &&
        b.date === data.date &&
        ((data.startTime! >= b.startTime && data.startTime! < b.endTime) ||
         (data.endTime! > b.startTime && data.endTime! <= b.endTime) ||
         (data.startTime! <= b.startTime && data.endTime! >= b.endTime))
      );
    });

    if (isOverlapping) {
      alert('Maaf, slot masa ini telah ditempah. Sila pilih waktu lain.');
      return;
    }

    const newBooking: Booking = {
      id: `B${Date.now()}`,
      userId: CURRENT_USER_ID,
      ...(data as Booking),
      status: 'Approved'
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedRoom(null);
    setActiveTab('my-bookings'); 
    alert(`Tempahan di ${data.roomName} berjaya.`);
  };

  const handleDeleteBooking = (booking: Booking) => {
    // Check if user is the owner
    if (booking.userId === CURRENT_USER_ID) {
      if (confirm('Adakah anda ingin memadam tempahan anda ini?')) {
        setBookings(prev => prev.filter(b => b.id !== booking.id));
        alert('Tempahan anda telah dipadam.');
      }
      return;
    }

    // Otherwise, require Admin Code
    const userInput = prompt(`Hanya Penempah atau Admin boleh memadam. Sila masukkan Kod Admin untuk memadam tempahan ${booking.userName}:`);
    
    if (userInput === ADMIN_CODE) {
      if (confirm('Sahkan pemadaman sebagai Admin?')) {
        setBookings(prev => prev.filter(b => b.id !== booking.id));
        alert('Tempahan telah dipadamkan oleh Admin.');
      }
    } else if (userInput !== null) {
      alert('Akses Ditolak: Kod Admin tidak sah.');
    }
  };

  const filteredRooms = ROOMS.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allFilteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchDate = filterDate === '' || b.date === filterDate;
      const matchRoom = filterRoomId === 'all' || b.roomId === filterRoomId;
      return matchDate && matchRoom;
    });
  }, [bookings, filterDate, filterRoomId]);

  const statsData = useMemo(() => {
    return [
      { name: 'Dewan', value: bookings.filter(b => b.roomName.includes('Dewan')).length },
      { name: 'Bilik', value: bookings.filter(b => b.roomName.includes('Bilik')).length },
      { name: 'Lain-lain', value: bookings.filter(b => !b.roomName.includes('Bilik') && !b.roomName.includes('Dewan')).length },
    ];
  }, [bookings]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-indigo-200 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5"/></svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight">MyKuliah</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setActiveTab('rooms')} className={`text-sm font-semibold transition-all ${activeTab === 'rooms' ? 'text-indigo-600 border-b-2 border-indigo-600 py-5' : 'text-slate-500 hover:text-slate-900'}`}>Cari Bilik</button>
              <button onClick={() => setActiveTab('all-bookings')} className={`text-sm font-semibold transition-all ${activeTab === 'all-bookings' ? 'text-indigo-600 border-b-2 border-indigo-600 py-5' : 'text-slate-500 hover:text-slate-900'}`}>Semua Tempahan</button>
              <button onClick={() => setActiveTab('my-bookings')} className={`text-sm font-semibold transition-all ${activeTab === 'my-bookings' ? 'text-indigo-600 border-b-2 border-indigo-600 py-5' : 'text-slate-500 hover:text-slate-900'}`}>Tempahan Saya</button>
              <button onClick={() => setActiveTab('stats')} className={`text-sm font-semibold transition-all ${activeTab === 'stats' ? 'text-indigo-600 border-b-2 border-indigo-600 py-5' : 'text-slate-500 hover:text-slate-900'}`}>Statistik</button>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden ring-2 ring-indigo-50">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeTab === 'rooms' && "Pilih & Tempah Slot"}
            {activeTab === 'all-bookings' && "Jadual Penggunaan Bilik"}
            {activeTab === 'my-bookings' && "Rekod Tempahan Anda"}
            {activeTab === 'stats' && "Laporan Statistik"}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            {activeTab === 'rooms' && "Tempahan automatik disahkan serta-merta jika slot tersedia."}
            {activeTab === 'all-bookings' && "Sila rujuk jadual ini sebelum membuat tempahan baru."}
          </p>
        </header>

        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Cari bilik, aras, atau kapasiti..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} onBook={(r) => setSelectedRoom(r)} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'all-bookings' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
              </div>
              <div className="flex-1">
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white" value={filterRoomId} onChange={(e) => setFilterRoomId(e.target.value)}>
                  <option value="all">Semua Bilik</option>
                  {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Bilik</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Pemohon</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Masa</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allFilteredBookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{booking.roomName}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">{booking.userName}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="font-bold text-indigo-600">{booking.date}</div>
                        <div className="text-slate-500 font-medium">{booking.startTime} - {booking.endTime}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDeleteBooking(booking)} 
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100" 
                          title="Padam Tempahan"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allFilteredBookings.length === 0 && <div className="p-12 text-center text-slate-400 font-medium">Tiada rekod tempahan.</div>}
            </div>
          </div>
        )}

        {activeTab === 'my-bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Bilik</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Tujuan</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Masa</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.filter(b => b.userId === CURRENT_USER_ID).map(booking => (
                  <tr key={booking.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{booking.roomName}</div>
                      <div className="text-xs text-indigo-500 font-bold">{booking.roomId}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{booking.purpose}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-bold">{booking.date}</div>
                      <div className="text-slate-500">{booking.startTime} - {booking.endTime}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteBooking(booking)} 
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.filter(b => b.userId === CURRENT_USER_ID).length === 0 && <div className="p-12 text-center text-slate-400 font-medium italic">Anda belum membuat sebarang tempahan.</div>}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Kekerapan Penggunaan</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {statsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-indigo-100 shadow-xl">
                <div className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Jumlah Bilik</div>
                <div className="text-4xl font-black">{ROOMS.length}</div>
              </div>
              <div className="bg-emerald-500 p-6 rounded-2xl text-white shadow-emerald-100 shadow-xl">
                <div className="text-emerald-50 text-xs font-bold uppercase tracking-widest mb-1">Tersedia</div>
                <div className="text-4xl font-black">{ROOMS.filter(r => r.isAvailable).length}</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex justify-around z-30 shadow-2xl">
        <button onClick={() => setActiveTab('rooms')} className={`flex flex-col items-center gap-1 ${activeTab === 'rooms' ? 'text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span className="text-[10px] font-bold">Cari</span></button>
        <button onClick={() => setActiveTab('all-bookings')} className={`flex flex-col items-center gap-1 ${activeTab === 'all-bookings' ? 'text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg><span className="text-[10px] font-bold">Jadual</span></button>
        <button onClick={() => setActiveTab('my-bookings')} className={`flex flex-col items-center gap-1 ${activeTab === 'my-bookings' ? 'text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><span className="text-[10px] font-bold">Saya</span></button>
      </nav>

      {selectedRoom && <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} onSubmit={handleCreateBooking} />}
      <Assistant />
    </div>
  );
};

export default App;
