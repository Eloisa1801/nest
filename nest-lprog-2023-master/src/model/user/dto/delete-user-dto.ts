import { IsNotEmpty, IsString } from 'class-validator';


/**
 * Description placeholder
 * @date 11/6/2023 - 9:33:33 PM
 *
 * @export
 * @class DeleteUserDto
 * @typedef {DeleteUserDto}
 */
export class DeleteUserDto {
    /**
     * Description placeholder
     * @date 11/6/2023 - 9:33:33 PM
     *
     * @type {string}
     */
    @IsString()
    @IsNotEmpty()
    currentPwd: string;
}