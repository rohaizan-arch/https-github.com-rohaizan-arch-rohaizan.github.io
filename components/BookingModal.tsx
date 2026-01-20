
import React, { useState } from 'react';
import { Room, Booking } from '../types';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
  onSubmit: (booking: Partial<Booking>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ room, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: '',
    purpose: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const start = formData.startTime;
    const end = formData.endTime;

    // Validation for 7 AM to 6 PM (07:00 to 18:00)
    if (start < '07:00' || start > '18:00' || end < '07:00' || end > '18:00') {
      setError('Waktu tempahan mestilah di antara jam 7:00 pagi hingga 6:00 petang.');
      return;
    }

    if (start >= end) {
      setError('Waktu tamat mestilah selepas waktu mula.');
      return;
    }

    setError(null);
    onSubmit({
      ...formData,
      roomId: room.id,
      roomName: room.name,
      status: 'Approved' // Status is Approved immediately
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tempah Slot Segera</h2>
            <p className="text-sm text-slate-500">{room.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pemohon</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Masukkan nama anda"
              value={formData.userName}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tujuan Penggunaan</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Contoh: Kuliah Pengaturcaraan"
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tarikh</label>
              <input
                required
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mula</label>
                <input
                  required
                  type="time"
                  min="07:00"
                  max="18:00"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tamat</label>
                <input
                  required
                  type="time"
                  min="07:00"
                  max="18:00"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-green-700 leading-relaxed">
              <strong>Sistem Segera:</strong> Tempahan anda akan disahkan secara automatik sekiranya tiada pertindihan slot.
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Sahkan Tempahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
