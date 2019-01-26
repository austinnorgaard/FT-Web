import { IsNumber, IsString, IsDate, Length } from "class-validator";

export class MessageFormatTy {
    @IsNumber()
    id: number;

    @IsDate()
    date: Date;

    @IsString()
    name: string;

    test() {
        console.log("test!");
    }
}

export class OtherMessageFormatTy {
    @IsNumber()
    isbn: number;

    @IsString()
    @Length(5, 5)
    zip: string;
}

export class PairTy<T> {
    type: T;
    id: number;
    name: string;
}
