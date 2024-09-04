import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { GENRE_ICON_MAPPER } from 'src/constants/employee.constants';
import { validatePipeValue } from 'src/helpers/genre-pipe.helper';

@Injectable()
export class GenreTransformPipe<T> implements PipeTransform<T, T> {
  transform(value: T, metadata: ArgumentMetadata): T {
    validatePipeValue(value);

    (value as any).genre =
      GENRE_ICON_MAPPER[(value as any).genre.toUpperCase()];

    return value;
  }
}
