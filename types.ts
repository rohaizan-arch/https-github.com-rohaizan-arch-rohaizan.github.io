
export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  facilities: string[];
  imageUrl: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  userId: string;
  userName: string;
  purpose: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface User {
  id: string;
  name: string;
  role: 'Student' | 'Lecturer' | 'Admin';
}
