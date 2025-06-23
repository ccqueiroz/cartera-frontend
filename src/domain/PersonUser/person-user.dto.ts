import { BaseDto } from "../core/BaseDto/base-dto.dto";

export type PersonUserDTO = {
  id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  image?: string | null;
} & BaseDto;
