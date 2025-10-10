import authApi from "@/shared/api/axios.ts";

export async function fetchBlob(
  url: string,
  params: Record<string, any> = {}
): Promise<{ blob: Blob; headers: Record<string, string> }> {
  const response = await authApi.get(url, {
    responseType: "blob",
    params
  });

  return {
    blob: response.data,
    headers: response.headers as Record<string, string>
  };
}
