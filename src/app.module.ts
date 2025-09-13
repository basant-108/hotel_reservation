import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelReservationModule } from './hotel_reservation/hotel_reservation.module';

@Module({
  imports: [HotelReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
