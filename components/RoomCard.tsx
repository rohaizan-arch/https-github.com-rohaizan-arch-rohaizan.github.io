
import React from 'react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <img src={room.imageUrl} alt={room.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800 leading-tight">{room.name}</h3>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {room.isAvailable ? 'Tersedia' : 'Penuh'}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {room.location}
        </p>
        <div className="flex items-center text-sm text-slate-600 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Kapasiti: {room.capacity} orang
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {room.facilities.map((f, i) => (
            <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium">
              {f}
            </span>
          ))}
        </div>
        <button
          onClick={() => onBook(room)}
          disabled={!room.isAvailable}
          className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${
            room.isAvailable 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {room.isAvailable ? 'Tempah Sekarang' : 'Tidak Tersedia'}
        </button>
      </div>
    </div>
  );
};
