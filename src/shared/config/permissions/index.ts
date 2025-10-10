import { Permissions } from "@/shared/config/permissions/permissions.ts";

const checkUserPermission = (allowedPermissions) => {
  // If not given permissions then it is open
  if (!allowedPermissions) return true;

  if (allowedPermissions.includes(Permissions.AllowAll)) {
    return true;
  }

  const userPermissionsArr = [
    "immigrants.view_immigrant",
    "immigrants.add_immigrant",
    "immigrants.change_immigrant",
    "immigrants.delete_immigrant",
    "immigrants.x_create_immigrants",
    "immigrants.x_list_immigrants",
    "immigrants.x_detail_immigrants",
    "immigrants.x_change_immigrants"
  ];
  const userPermissions = new Set(userPermissionsArr);
  for (const item of allowedPermissions) {
    if (userPermissions.has(item)) {
      return true;
    }
  }
  return false;
};

export { checkUserPermission, Permissions };
