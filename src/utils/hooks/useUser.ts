import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFetchMe } from "@/entities/auth/api/fetch-me.ts";

export interface User {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  photo?: string;
  role?: string;
  groups?: Array<{ id: number; name: string }>;
  permissions?: string[];
  is_active?: boolean;
  district?: {
    id: number;
    name: string;
    region?: {
      id: number;
      name: string;
    };
  };
  date_joined?: string;
  last_login?: string;
}

export const useUser = () => {
  // Helpers
  const queryClient = useQueryClient();

  // States
  const [localUser, setLocalUser] = useState<User | null>(null);

  // Queries
  const { data: serverUser, isLoading, error, refetch, isError } = useFetchMe();

  // Effects
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setLocalUser(parsedUser);
      }
    } catch (error) {
      console.error(
        "localStorage'dan user ma'lumotlarini o'qishda xatolik:",
        error
      );
      localStorage.removeItem("user");
    }
  }, []);

  // Server'dan kelgan ma'lumotlarni localStorage'ga saqlash
  useEffect(() => {
    if (serverUser && typeof serverUser === "object") {
      try {
        localStorage.setItem("user", JSON.stringify(serverUser));
        setLocalUser(serverUser);
      } catch (error) {
        console.error(
          "User ma'lumotlarini localStorage'ga saqlashda xatolik:",
          error
        );
      }
    }
  }, [serverUser]);

  // Cache invalidation listener - bu profile update'dan keyin Header'ni yangilash uchun
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (
        event.type === "updated" &&
        event.query.queryKey[0] === "user" &&
        event.query.queryKey[1] === "me"
      ) {
        const updatedUser = event.query.state.data;
        if (updatedUser) {
          setLocalUser(updatedUser);
          try {
            localStorage.setItem("user", JSON.stringify(updatedUser));
          } catch (error) {
            console.error(
              "Cache update localStorage saqlashda xatolik:",
              error
            );
          }
        }
      }
    });

    return unsubscribe;
  }, [queryClient]);

  const user = serverUser || localUser;

  // User ma'lumotlarini yangilash funksiyasi
  const updateUser = (newUserData: Partial<User>) => {
    const updatedUser = { ...user, ...newUserData };

    // Optimistic update
    queryClient.setQueryData(["user", "me"], updatedUser);

    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLocalUser(updatedUser);
    } catch (error) {
      console.error("User ma'lumotlarini yangilashda xatolik:", error);
    }
  };

  // User ma'lumotlarini tozalash
  const clearUser = () => {
    localStorage.removeItem("user");
    setLocalUser(null);
    queryClient.removeQueries({ queryKey: ["user", "me"] });
  };

  // Manual refetch funksiyasi
  const refreshUser = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("User ma'lumotlarini yangilashda xatolik:", error);
    }
  };

  return {
    user: user || {
      photo: undefined,
      first_name: undefined,
      last_name: undefined,
      username: undefined,
      email: undefined,
      phone: undefined
    },
    isLoading,
    error,
    isError,
    refetch: refreshUser,
    updateUser,
    clearUser,
    // Qo'shimcha utility funksiyalar
    displayName:
      user?.first_name && user?.last_name
        ? `${user.first_name} ${user.last_name}`
        : user?.username || user?.email || "Foydalanuvchi"
  };
};
