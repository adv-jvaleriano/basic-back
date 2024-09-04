import { BadRequestException } from '@nestjs/common';

import {
  GENRE_ICON_MAPPER,
  GENRE_INCOMPATIBLE,
  GENRE_MISSING,
  INVALID_FORMAT,
  OBJECT,
  STRING,
} from '../constants';

export const validatePipeValue = <T>(value: T): void => {
  if (typeof value !== OBJECT || value === null) {
    throw new BadRequestException(INVALID_FORMAT);
  }

  if (typeof (value as any).genre !== STRING) {
    throw new BadRequestException(GENRE_MISSING);
  }

  if (
    !Object.keys(GENRE_ICON_MAPPER).includes((value as any).genre.toUpperCase())
  ) {
    throw new BadRequestException(GENRE_INCOMPATIBLE);
  }
};
