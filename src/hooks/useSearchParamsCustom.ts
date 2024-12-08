import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

// key: searchParams의 키, value: searchParams의 값
export const useSearchParamsCustom = ({
  key,
  value,
}: {
  key?: string;
  value?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const updateURL = useCallback(
    (params: { key: string; value: string | undefined }) => {
      if (params.value !== undefined) {
        currentParams.set(params.key, params.value);
      } else {
        currentParams.delete(params.key);
      }
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [currentParams, router, pathname]
  );

  useEffect(() => {
    if (key && value) {
      updateURL({ key, value });
    }
  }, [updateURL, key, value]);

  return { updateURL };
};
