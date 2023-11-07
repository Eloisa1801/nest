import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/model/user/dto/create-user-dto';


/**
 * Description placeholder
 * @date 11/6/2023 - 10:22:04 PM
 *
 * @export
 * @class CreateAuthDto
 * @typedef {CreateAuthDto}
 * @extends {PartialType(CreateUserDto)}
 */
export class CreateAuthDto extends PartialType(CreateUserDto) {
    /**
     * Description placeholder
     * @date 11/6/2023 - 10:22:04 PM
     *
     * @type {?string}
     */
    currentPassword?: string;
}