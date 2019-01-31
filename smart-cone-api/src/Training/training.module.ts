import { Module, NestModule } from "@nestjs/common";
import { TrainingController } from "./training.controller";
import { MiddlewareConsumer } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { FieldConesModule } from "../FieldCones/field-cones.module";
import { FrontEndCommsModule } from "../FrontEndComms/front-end-comms.module";
import { UltrasonicModule } from "../Ultrasonic/ultrasonic.module";

@Module({
    imports: [FieldConesModule, FrontEndCommsModule, UltrasonicModule],
    providers: [TrainingService],
    controllers: [TrainingController],
})
export class TrainingModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
        // consumer.apply(passport.authenticate("jwt", { session: false })).forRoutes(TrainingController);
    }
}
