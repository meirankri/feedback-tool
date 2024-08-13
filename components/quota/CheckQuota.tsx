"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { useSession } from "@/providers/SessionProvider";
import { useQuota } from "@/providers/QuotaProvider";

interface QuotaCheckProps {
  productName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function QuotaCheck({
  productName,
  children,
  fallback,
}: QuotaCheckProps) {
  const session = useSession();
  const userId = session?.id ?? null;
  const t = useTranslations();
  const { quotaInfo, isLoading, error, canUseProduct } = useQuota(
    userId,
    productName
  );

  if (!userId) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div>{t("QuotaCheck.connexionError")}</div>
    );
  }

  if (isLoading) {
    return <div>{t("QuotaCheck.checking")}</div>;
  }

  if (quotaInfo?.total === 0) {
    return (
      <div>
        <p>{t("QuotaCheck.noAccess", { productName })}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{t("QuotaCheck.error", { error })}</p>
      </div>
    );
  }

  if (!quotaInfo) {
    return <div>{t("QuotaCheck.noInformation", { productName })}</div>;
  }

  if (!canUseProduct) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div>
        <p> {t("QuotaCheck.exceeded", { productName })} </p>
      </div>
    );
  }

  return <>{children}</>;
}
