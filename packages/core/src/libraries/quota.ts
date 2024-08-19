import { ReservedPlanId } from '@logto/schemas';

import { EnvSet } from '#src/env-set/index.js';
import RequestError from '#src/errors/RequestError/index.js';
import assertThat from '#src/utils/assert-that.js';
import {
  getTenantSubscriptionData,
  reportSubscriptionUpdates,
  isReportSubscriptionUpdatesUsageKey,
} from '#src/utils/subscription/index.js';
import { type SubscriptionQuota } from '#src/utils/subscription/types.js';

import { type CloudConnectionLibrary } from './cloud-connection.js';

export type QuotaLibrary = ReturnType<typeof createQuotaLibrary>;

const shouldReportSubscriptionUpdates = (
  planId: string,
  key: keyof SubscriptionQuota,
  isAddOnAvailable?: boolean
) => planId === ReservedPlanId.Pro && isAddOnAvailable && isReportSubscriptionUpdatesUsageKey(key);

export const createQuotaLibrary = (cloudConnection: CloudConnectionLibrary) => {
  const guardTenantUsageByKey = async (key: keyof SubscriptionQuota) => {
    const { isCloud, isIntegrationTest } = EnvSet.values;

    // Cloud only feature, skip in non-cloud environments
    if (!isCloud) {
      return;
    }

    // Disable in integration tests
    if (isIntegrationTest) {
      return;
    }

    const {
      planId,
      isAddOnAvailable,
      quota: fullQuota,
      usage: fullUsage,
    } = await getTenantSubscriptionData(cloudConnection);

    // Do not block Pro plan from adding add-on resources.
    if (shouldReportSubscriptionUpdates(planId, key, isAddOnAvailable)) {
      return;
    }

    // Type `SubscriptionQuota` and type `SubscriptionUsage` are sharing keys, this design helps us to compare the usage with the quota limit in a easier way.
    const { [key]: limit } = fullQuota;
    const { [key]: usage } = fullUsage;

    if (limit === null) {
      return;
    }

    if (typeof limit === 'boolean') {
      assertThat(
        limit,
        new RequestError({
          code: 'subscription.limit_exceeded',
          status: 403,
          data: {
            key,
          },
        })
      );
      return;
    }

    if (typeof limit === 'number') {
      // See the definition of `SubscriptionQuota` and `SubscriptionUsage` in `types.ts`, this should never happen.
      assertThat(
        typeof usage === 'number',
        new TypeError('Usage must be with the same type as the limit.')
      );

      assertThat(
        usage < limit,
        new RequestError({
          code: 'subscription.limit_exceeded',
          status: 403,
          data: {
            key,
            limit,
            usage,
          },
        })
      );

      return;
    }

    throw new TypeError('Unsupported subscription quota type');
  };

  const guardEntityScopesUsage = async (entityName: 'resources' | 'roles', entityId: string) => {
    const { isCloud, isIntegrationTest } = EnvSet.values;

    // Cloud only feature, skip in non-cloud environments
    if (!isCloud) {
      return;
    }

    // Disable in integration tests
    if (isIntegrationTest) {
      return;
    }

    const {
      quota: { scopesPerResourceLimit, scopesPerRoleLimit },
      resources,
      roles,
    } = await getTenantSubscriptionData(cloudConnection);
    const usage = (entityName === 'resources' ? resources[entityId] : roles[entityId]) ?? 0;

    if (entityName === 'resources') {
      assertThat(
        scopesPerResourceLimit === null || scopesPerResourceLimit > usage,
        new RequestError({
          code: 'subscription.limit_exceeded',
          status: 403,
          data: {
            key: 'scopesPerResourceLimit',
            limit: scopesPerResourceLimit,
            usage,
          },
        })
      );
      return;
    }

    assertThat(
      scopesPerRoleLimit === null || scopesPerRoleLimit > usage,
      new RequestError({
        code: 'subscription.limit_exceeded',
        status: 403,
        data: {
          key: 'scopesPerRoleLimit',
          limit: scopesPerRoleLimit,
          usage,
        },
      })
    );
  };

  const reportSubscriptionUpdatesUsage = async (key: keyof SubscriptionQuota) => {
    const { isCloud, isIntegrationTest } = EnvSet.values;

    // Cloud only feature, skip in non-cloud environments
    if (!isCloud) {
      return;
    }

    // Disable in integration tests
    if (isIntegrationTest) {
      return;
    }

    const { planId, isAddOnAvailable } = await getTenantSubscriptionData(cloudConnection);

    if (shouldReportSubscriptionUpdates(planId, key, isAddOnAvailable)) {
      await reportSubscriptionUpdates(cloudConnection, key);
    }
  };

  return {
    guardTenantUsageByKey,
    guardEntityScopesUsage,
    reportSubscriptionUpdatesUsage,
  };
};
