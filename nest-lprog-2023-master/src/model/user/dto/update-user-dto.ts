import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user-dto';

/**
 * Description placeholder
 * @date 11/6/2023 - 9:33:45 PM
 *
 * @export
 * @class UpdateUserDto
 * @typedef {UpdateUserDto}
 * @extends {PartialType(CreateUserDto)}
 */
export class UpdateUserDto extends PartialType(CreateUserDto){
    /**
     * Description placeholder
     * @date 11/6/2023 - 9:33:45 PM
     *
     * @type {?string}
     */
    currentPassword?: string;
}