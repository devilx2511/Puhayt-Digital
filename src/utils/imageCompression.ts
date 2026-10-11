/**
 * Client-side image compression utility for Firestore cloud persistence.
 * Ensures uploaded device images preserve their full aspect ratio (zero cropping)
 * while staying safely below Firestore's 1MB document payload limit so all
 * DevMode changes sync reliably to every visitor on Vercel & production deployments.
 */

export async function compressImageFile(
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) {
        reject(new Error("Failed to read file"));
        return;
      }

      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        let compressed = canvas.toDataURL("image/webp", quality);
        if (!compressed || compressed === "data:," || compressed.length > 350000) {
          compressed = canvas.toDataURL("image/jpeg", Math.min(quality, 0.75));
        }
        // Further step down if still very large
        if (compressed.length > 420000) {
          compressed = canvas.toDataURL("image/jpeg", 0.6);
        }
        resolve(compressed);
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function compressDataUrlIfNeeded(
  dataUrl: string,
  maxBytes = 280000
): Promise<string> {
  if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) {
    return dataUrl;
  }
  if (dataUrl.startsWith("data:image/svg") || dataUrl.length <= maxBytes) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;
      const maxDim = 1200;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      let out = canvas.toDataURL("image/webp", 0.78);
      if (out.length > maxBytes) {
        out = canvas.toDataURL("image/jpeg", 0.68);
      }
      resolve(out);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export async function compressDeepPayload<T>(obj: T): Promise<T> {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") {
    if (obj.startsWith("data:image/") && obj.length > 280000) {
      return (await compressDataUrlIfNeeded(obj)) as unknown as T;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    const results = await Promise.all(obj.map((item) => compressDeepPayload(item)));
    return results as unknown as T;
  }
  if (typeof obj === "object") {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v !== undefined) {
        out[k] = await compressDeepPayload(v);
      }
    }
    return out as T;
  }
  return obj;
}
