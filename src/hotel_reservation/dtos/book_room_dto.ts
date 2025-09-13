import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class BookRoomDto{
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    booking : number
}