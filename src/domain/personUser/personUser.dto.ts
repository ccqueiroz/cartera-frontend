import { BaseDto } from "../core/baseDto/baseDto.dto";

export type PersonUserDTO = {
  id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  image?: string | null;
} & BaseDto;
