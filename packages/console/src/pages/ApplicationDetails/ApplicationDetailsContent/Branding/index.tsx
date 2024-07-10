import { Theme, type Application, type ApplicationSignInExperience } from '@logto/schemas';
import { useCallback, useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import DetailsForm from '@/components/DetailsForm';
import FormCard, { FormCardSkeleton } from '@/components/FormCard';
import LogoAndFavicon from '@/components/ImageInputs/LogoAndFavicon';
import RequestDataError from '@/components/RequestDataError';
import UnsavedChangesAlertModal from '@/components/UnsavedChangesAlertModal';
import { logtoThirdPartyAppBrandingLink } from '@/consts';
import ColorPicker from '@/ds-components/ColorPicker';
import FormField from '@/ds-components/FormField';
import TextInput from '@/ds-components/TextInput';
import useApi from '@/hooks/use-api';
import useDocumentationUrl from '@/hooks/use-documentation-url';
import { trySubmitSafe } from '@/utils/form';
import { uriValidator } from '@/utils/validator';

import * as styles from './index.module.scss';
import useApplicationSignInExperienceSWR from './use-application-sign-in-experience-swr';
import useSignInExperienceSWR from './use-sign-in-experience-swr';
import { formatFormToSubmitData } from './utils';

type Props = {
  readonly application: Application;
  readonly isActive: boolean; // Support for conditional render UnsavedChangesAlertModal component
};

function Branding({ application, isActive }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { getDocumentationUrl } = useDocumentationUrl();

  const formMethods = useForm<ApplicationSignInExperience>({
    defaultValues: {
      tenantId: application.tenantId,
      applicationId: application.id,
      branding: {},
      color: {},
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = formMethods;

  const api = useApi();

  const { data, error, mutate } = useApplicationSignInExperienceSWR(application.id);
  const { data: sieData, error: sieError, mutate: sieMutate } = useSignInExperienceSWR();

  const isApplicationSieLoading = !data && !error;
  const isSieLoading = !sieData && !sieError;
  const isLoading = isApplicationSieLoading || isSieLoading;

  const onSubmit = handleSubmit(
    trySubmitSafe(async (data) => {
      if (isSubmitting) {
        return;
      }

      const response = await api
        .put(`api/applications/${application.id}/sign-in-experience`, {
          json: formatFormToSubmitData(data),
        })
        .json<ApplicationSignInExperience>();

      void mutate(response);
      toast.success(t('general.saved'));
    })
  );

  const onRetryFetch = useCallback(() => {
    void mutate();
    void sieMutate();
  }, [mutate, sieMutate]);

  useEffect(() => {
    if (!data) {
      return;
    }

    reset(data);
  }, [data, reset]);

  if (isLoading) {
    return <FormCardSkeleton />;
  }

  if (error && error.status !== 404) {
    return <RequestDataError error={error} onRetry={onRetryFetch} />;
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <DetailsForm
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          onDiscard={reset}
          onSubmit={onSubmit}
        >
          <FormCard
            title="application_details.branding.name"
            description={`application_details.branding.${
              application.isThirdParty ? 'description_third_party' : 'description'
            }`}
            learnMoreLink={
              application.isThirdParty
                ? {
                    href: getDocumentationUrl(logtoThirdPartyAppBrandingLink),
                    targetBlank: 'noopener',
                  }
                : undefined
            }
          >
            {application.isThirdParty && (
              <FormField title="application_details.branding.display_name">
                <TextInput {...register('displayName')} placeholder={application.name} />
              </FormField>
            )}
            <LogoAndFavicon
              control={control}
              register={register}
              theme={Theme.Light}
              type="app_logo"
              logo={{ name: 'branding.logoUrl', error: errors.branding?.logoUrl }}
              favicon={{
                name: 'branding.favicon',
                error: errors.branding?.favicon,
              }}
            />
            <LogoAndFavicon
              control={control}
              register={register}
              theme={Theme.Dark}
              type="app_logo"
              logo={{ name: 'branding.darkLogoUrl', error: errors.branding?.darkLogoUrl }}
              favicon={{
                name: 'branding.darkFavicon',
                error: errors.branding?.darkFavicon,
              }}
            />
            {!application.isThirdParty && (
              <div className={styles.colors}>
                <Controller
                  control={control}
                  name="color.primaryColor"
                  render={({ field: { name, value, onChange } }) => (
                    <FormField title="application_details.branding.brand_color">
                      <ColorPicker name={name} value={value} onChange={onChange} />
                    </FormField>
                  )}
                />
                <Controller
                  control={control}
                  name="color.darkPrimaryColor"
                  render={({ field: { name, value, onChange } }) => (
                    <FormField title="application_details.branding.brand_color_dark">
                      <ColorPicker name={name} value={value} onChange={onChange} />
                    </FormField>
                  )}
                />
              </div>
            )}
          </FormCard>
          {application.isThirdParty && (
            <FormCard
              title="application_details.branding.more_info"
              description="application_details.branding.more_info_description"
            >
              <FormField title="application_details.branding.terms_of_use_url">
                <TextInput
                  {...register('termsOfUseUrl', {
                    validate: (value) =>
                      !value || uriValidator(value) || t('errors.invalid_uri_format'),
                  })}
                  error={errors.termsOfUseUrl?.message}
                  placeholder="https://"
                />
              </FormField>
              <FormField title="application_details.branding.privacy_policy_url">
                <TextInput
                  {...register('privacyPolicyUrl', {
                    validate: (value) =>
                      !value || uriValidator(value) || t('errors.invalid_uri_format'),
                  })}
                  error={errors.privacyPolicyUrl?.message}
                  placeholder="https://"
                />
              </FormField>
            </FormCard>
          )}
        </DetailsForm>
      </FormProvider>
      {isActive && <UnsavedChangesAlertModal hasUnsavedChanges={isDirty} onConfirm={reset} />}
    </>
  );
}

export default Branding;
