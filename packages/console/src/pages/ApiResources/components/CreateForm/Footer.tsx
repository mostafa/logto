import { ReservedPlanId } from '@logto/schemas';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import ContactUsPhraseLink from '@/components/ContactUsPhraseLink';
import PlanName from '@/components/PlanName';
import QuotaGuardFooter from '@/components/QuotaGuardFooter';
import { isDevFeaturesEnabled } from '@/consts/env';
import { SubscriptionDataContext } from '@/contexts/SubscriptionDataProvider';
import Button from '@/ds-components/Button';
import useApiResourcesUsage from '@/hooks/use-api-resources-usage';

type Props = {
  readonly isCreationLoading: boolean;
  readonly onClickCreate: () => void;
};

function Footer({ isCreationLoading, onClickCreate }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const {
    currentPlan,
    currentSubscriptionUsage: { resourcesLimit },
    currentSku,
  } = useContext(SubscriptionDataContext);
  const { hasReachedLimit } = useApiResourcesUsage();

  if (
    hasReachedLimit &&
    /**
     * We don't guard API resources quota limit for paid plan, since it's an add-on feature
     */
    (isDevFeaturesEnabled ? currentSku.id : currentPlan.id) === ReservedPlanId.Free
  ) {
    return (
      <QuotaGuardFooter>
        <Trans
          components={{
            a: <ContactUsPhraseLink />,
            planName: <PlanName skuId={currentSku.id} name={currentPlan.name} />,
          }}
        >
          {t('upsell.paywall.resources', {
            count: (isDevFeaturesEnabled ? resourcesLimit : currentPlan.quota.resourcesLimit) ?? 0,
          })}
        </Trans>
      </QuotaGuardFooter>
    );
  }

  return (
    <Button
      isLoading={isCreationLoading}
      htmlType="submit"
      title="api_resources.create"
      size="large"
      type="primary"
      onClick={onClickCreate}
    />
  );
}

export default Footer;
