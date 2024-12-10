import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

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
  const getCurrentParams = () => {
    return new URLSearchParams(window.location.search);
  };

  const updateURL = useCallback(
    (params: { key: string; value: string | undefined }) => {
      const updatedParams = getCurrentParams();
      if (params.value !== undefined) {
        updatedParams.set(params.key, params.value);
      } else {
        updatedParams.delete(params.key);
      }
      router.replace(`${pathname}?${updatedParams.toString()}`);
    },
    [router, pathname]
  );

  useEffect(() => {
    if (key && value) {
      updateURL({ key, value });
    }
  }, [updateURL, key, value]);

  return { updateURL };
};
