import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { HotelReservationService } from './hotel_reservation.service';
import { BookRoomDto } from './dtos/book_room_dto';

@Controller('hotel-reservation')
export class HotelReservationController {
    constructor(private hotelReservationService:HotelReservationService ){}

    @Post("/book")
     @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
    doBooking(@Body() bookRoomDto :BookRoomDto): any{
        return this.hotelReservationService.bookRooms(bookRoomDto);
    }

    @Get("/rooms")
    getRooms(): any{
        return this.hotelReservationService.getRoomData();
    }

    @Post("/random-book")
    randomBook(): any{
        return this.hotelReservationService.randomBooking();
    }

    @Post("/reset-booking")
    resetBooking(): any{
        return this.hotelReservationService.resetBooking();
    }

}
