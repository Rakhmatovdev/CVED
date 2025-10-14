import { ErrorWrapper } from "@/features/error-wrapper.tsx";
import { Permissions } from "@/shared/config/permissions/permissions.ts";
import { CustomRoute } from "@/shared/types";
import KoggIcon from "@/shared/ui/icons/sidebar/KoggIcon.tsx";
import Kogg from "./index.tsx";

const cvedRoutes: CustomRoute = {
  id: "kogg",
  path: "/kogg",
  // element: <Kogg />,
  errorElement: <ErrorWrapper />,
  handle: {
    title: "breadcrumb.cved",
    icon: (props) => <KoggIcon {...props} />,
    permissions: [Permissions.AllowAll]
  },
  children: [
    {
      index: true,
      handle: {
        noBreadCrumb: true
      },
      element: <Kogg />
    },
  ]
};
export default cvedRoutes;