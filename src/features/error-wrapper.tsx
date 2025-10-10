import DevelopmentErrorPage from "@/pages/error-pages/development-error-page.tsx";
import ProductionErrorPage from "@/pages/error-pages/production-error-page.tsx";

export const ErrorWrapper = (props: any) => {
  if (import.meta.env.MODE === "development") {
    return <DevelopmentErrorPage {...props} />;
  }
  return <ProductionErrorPage />;
};
