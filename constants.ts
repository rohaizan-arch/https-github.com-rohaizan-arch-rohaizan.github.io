
import { Room } from './types';

export const ADMIN_CODE = "123456";

export const ROOMS: Room[] = [
  {
    id: 'DK2',
    name: 'Dewan Kuliah 2 (DK2)',
    capacity: 200,
    location: 'Tingkat 1',
    facilities: ['Sistem Audio', 'Projektor Laser', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'A201',
    name: 'Bilik Kuliah A201',
    capacity: 40,
    location: 'Tingkat 2',
    facilities: ['Projektor', 'Papan Putih', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'A202',
    name: 'Bilik Kuliah A202',
    capacity: 40,
    location: 'Tingkat 2',
    facilities: ['Projektor', 'Papan Putih', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'A301',
    name: 'Bilik Kuliah A301',
    capacity: 40,
    location: 'Tingkat 3',
    facilities: ['Projektor', 'Wi-Fi', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'A302',
    name: 'Bilik Kuliah A302',
    capacity: 40,
    location: 'Tingkat 3',
    facilities: ['Projektor', 'Wi-Fi', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800',
    isAvailable: false
  },
  {
    id: 'A303',
    name: 'Bilik Kuliah A303',
    capacity: 40,
    location: 'Tingkat 3',
    facilities: ['Projektor', 'Wi-Fi', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'A304',
    name: 'Bilik Kuliah A304',
    capacity: 40,
    location: 'Tingkat 3',
    facilities: ['Projektor', 'Wi-Fi', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'C203',
    name: 'Bilik Kuliah C203',
    capacity: 40,
    location: 'Tingkat 2',
    facilities: ['Projektor', 'Smart Board', 'Pendingin Udara'],
    imageUrl: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'BPJKE',
    name: 'Bilik Perbincangan JKE',
    capacity: 10,
    location: 'Tingkat Bawah (Depan Bilik KJKE)',
    facilities: ['Papan Tulis Kaca', 'Wi-Fi', 'Meja Bulat'],
    imageUrl: 'https://images.unsplash.com/photo-1505373633562-e285b603e75a?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    id: 'BMJKE',
    name: 'Bilik Mesyuarat JKE',
    capacity: 50,
    location: 'Tingkat 1 Blok B',
    facilities: ['Sistem Persidangan Video', 'Projektor', 'Sistem Audio'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  }
];

export const SYSTEM_PROMPT = `Anda adalah asisten pintar "MyKuliah". 
Tugas anda adalah membantu pengguna (pelajar atau pensyarah) mencari bilik kuliah yang sesuai.
Sistem tempahan sekarang adalah SEGERA dan AUTOMATIK (auto-booking). Jika slot kosong antara jam 7 pagi hingga 6 petang, tempahan akan terus berjaya tanpa perlu menunggu kelulusan admin.
Maklumat bilik tersedia: ${JSON.stringify(ROOMS)}.
Anda perlu:
1. Menjawab dalam Bahasa Melayu yang profesional dan mesra.
2. Mencadangkan bilik berdasarkan kapasiti atau kemudahan yang diminta.
3. Maklumkan pengguna bahawa mereka boleh menyemak jadual terkini di tab "Semua Tempahan".
4. Jika bilik penuh, cadangkan alternatif bilik lain yang kosong.`;
