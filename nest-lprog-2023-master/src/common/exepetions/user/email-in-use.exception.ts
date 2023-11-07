import { BadRequestException } from "@nestjs/common";

export class UserExistExeception extends BadRequestException {
    constructor() {
        super('E-mail already exists!');
    }
}