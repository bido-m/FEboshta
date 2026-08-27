import { toast } from "sonner";

/**
 * كل رسائل التطبيق تمر من هنا (toast فقط) — مفيش alert ولا رسائل inline.
 */
export const notifySuccess = (message, options = {}) =>
  toast.success(message || "تم بنجاح", { duration: 3000, ...options });

export const notifyError = (error, fallback = "حدث خطأ غير متوقع", options = {}) => {
  const message =
    typeof error === "string"
      ? error
      : error?.error || error?.message || fallback;
  return toast.error(message || fallback, { duration: 4000, ...options });
};

export const notifyInfo = (message, options = {}) =>
  toast(message, { duration: 3000, ...options });

export const notifyWarning = (message, options = {}) =>
  toast.warning(message, { duration: 3500, ...options });

export const notifyLoading = (message = "جاري التنفيذ...") => toast.loading(message);

export const dismissToast = (id) => toast.dismiss(id);

/**
 * يتعامل مع شكل الـ actions: { success, data, error }
 * بيرجع true لو نجحت العملية.
 */
export const notifyResult = (result, successMessage, fallbackError) => {
  if (result?.success) {
    if (successMessage) notifySuccess(successMessage);
    return true;
  }
  notifyError(result?.error, fallbackError || "فشلت العملية، حاول مرة أخرى");
  return false;
};

/**
 * بديل confirm() الافتراضي برسالة toast فيها تأكيد.
 */
export const confirmToast = (message, onConfirm, confirmLabel = "تأكيد") =>
  toast(message, {
    duration: 8000,
    action: {
      label: confirmLabel,
      onClick: () => onConfirm?.(),
    },
    cancel: {
      label: "إلغاء",
      onClick: () => {},
    },
  });

export { toast };
