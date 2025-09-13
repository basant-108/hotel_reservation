import { Module } from '@nestjs/common';
import { HotelReservationController } from './hotel_reservation.controller';
import { HotelReservationService } from './hotel_reservation.service';

@Module({
  controllers: [HotelReservationController],
  providers: [HotelReservationService]
})
export class HotelReservationModule {}
