import { Module } from "@nestjs/common";
import { RedisController } from "./redis.controller";
import { RedisService } from "./redis.service";

@Module({
    imports: [],
    controllers: [RedisController],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule { }