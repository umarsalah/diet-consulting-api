import { SetMetadata } from '@nestjs/common';

import { SYSTEM } from '../constants/general';

export const Public = () => SetMetadata(SYSTEM.PUBLIC, true);
