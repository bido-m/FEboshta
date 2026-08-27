import { QueryClient } from "@tanstack/react-query";

/**
 * Single shared cache for the whole app.
 *
 * - staleTime: البيانات تعتبر "طازة" 5 دقايق => مفيش fetch متكرر عند كل mount
 * - refetchOnWindowFocus / refetchOnMount: مقفولة => مفيش تحميل كل شوية
 * - أي تغيير حقيقي في الداتا بيحصل عن طريق invalidateQueries بعد الـ mutation
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
      placeholderData: (prev) => prev,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
