import { SetMetadata } from '@nestjs/common';

import { SYSTEM } from '../constants/general';

export const Roles = (...roles: string[]) => SetMetadata(SYSTEM.ROLE, roles);
