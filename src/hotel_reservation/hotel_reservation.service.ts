import { Injectable } from '@nestjs/common';
import { BookRoomDto } from './dtos/book_room_dto';
import { Room } from './room.interface';

@Injectable()
export class HotelReservationService {
    hotel : Room[][]=[];
    constructor(){
        this.init()
    }

    init(){
        for (let f = 1; f <= 9; f++) {
            const floor: Room[] = [];
            for (let i = 0; i < 10; i++) {
                floor.push({
                roomNo: f * 100 + (i + 1),
                floor: f,
                index: i,
                isAvailable: true,
                });
            }
            this.hotel.push(floor);
        }
        const floor10: Room[] = []; 
        for (let i = 0; i < 7; i++) {
            floor10.push({
            roomNo: 1000 + (i + 1),
            floor: 10,
            index: i,
            isAvailable: true,
            });
        }
        this.hotel.push(floor10);
    }

    bookRooms(bookRoomDto: BookRoomDto): any{
        const { booking } =bookRoomDto;
        const availableRooms: Room[] = [];
      
        for (const floor of this.hotel){
            let floorCap = 0;
            for (const r of floor){
                if (r.isAvailable){
                    availableRooms.push(r)
                    floorCap++;
                }
            }
            if (booking <= floorCap) {
                let booked = 0;
                for (const r of floor){
                    if (r.isAvailable){
                        r.isAvailable=false;
                        booked++;
                    }
                    if (booked >= booking ){
                        break;
                    }
                }
                return { message: "Success" , rooms : this.hotel }
            }
        }
       
        if ( booking > availableRooms.length ){
            return { message: "Not enough room" , rooms : this.hotel }
        }

        
        let start = 0;
        let end = booking-1;
        let ws = start;
        let we = end

        let minTime = this.getCost(availableRooms, start, end);
        while ( end < availableRooms.length ){
            const curr =  this.getCost(availableRooms, start, end);
            if (curr < minTime) {
                minTime = curr;
                ws = start;
                we = end;
            }
            start++;
            end++;
        }

        for (let i =ws ; i<= we ; i++ ){
            const room = availableRooms[i];
            this.hotel[room.floor-1][room.index].isAvailable=false;
        }

         return { message: "Success" , rooms : this.hotel }
    }

    getCost(availableRooms: Room [], start: number, end: number): number{
        const first = availableRooms[start];
        const last = availableRooms[end];
        return Math.abs(Math.abs((last.floor-first.floor)*2) + Math.abs(first.index-last.index))
    }

    getRoomData():any{
       return this.hotel;
    }

    randomBooking():any{
        this.resetBooking();
        const random1 = Math.floor(Math.random() * 96);
        for (let i = 0 ;i < random1; i++){
            const randomF = Math.floor(Math.random() * 10);
            const l = this.hotel[randomF].length;
            const randomR = Math.floor(Math.random() * l);
            this.hotel[randomF][randomR].isAvailable=false;
        }
        return this.hotel;
    }

    resetBooking(){
        this.hotel.forEach((floor)=>{
            floor.forEach((r)=>{
                r.isAvailable= true;
            });
        })
    }


}
