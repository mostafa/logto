import { OrganizationScopes } from '@logto/schemas';

import { EnvSet } from '#src/env-set/index.js';
import koaQuotaGuard, { newKoaQuotaGuard } from '#src/middleware/koa-quota-guard.js';
import SchemaRouter from '#src/utils/SchemaRouter.js';

import { errorHandler } from '../organization/utils.js';
import { type ManagementApiRouter, type RouterInitArgs } from '../types.js';

export default function organizationScopeRoutes<T extends ManagementApiRouter>(
  ...[
    originalRouter,
    {
      queries: {
        organizations: { scopes },
      },
      libraries: { quota },
    },
  ]: RouterInitArgs<T>
) {
  const router = new SchemaRouter(OrganizationScopes, scopes, {
    middlewares: [
      EnvSet.values.isDevFeaturesEnabled
        ? newKoaQuotaGuard({ key: 'organizationsEnabled', quota, methods: ['POST', 'PUT'] })
        : koaQuotaGuard({ key: 'organizationsEnabled', quota, methods: ['POST', 'PUT'] }),
    ],
    errorHandler,
    searchFields: ['name'],
  });

  originalRouter.use(router.routes());
}
