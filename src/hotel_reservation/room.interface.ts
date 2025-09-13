export interface Room{
   
  roomNo: number;
  floor: number;
  index: number; // 0 = closest to stairs
  isAvailable: boolean;
}