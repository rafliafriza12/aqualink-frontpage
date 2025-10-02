// app/hooks/useMidtrans.ts

import { useEffect, useState } from "react";

// Declare Midtrans Snap type
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface UseMidtransOptions {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (result: any) => void;
  onClose?: () => void;
}

export const useMidtrans = () => {
  const [isSnapLoaded, setIsSnapLoaded] = useState(false);

  useEffect(() => {
    // Load Midtrans Snap script
    const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    if (!midtransClientKey) {
      console.error("Midtrans client key is not configured");
      return;
    }

    const snapScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    // For production: https://app.midtrans.com/snap/snap.js

    // Check if script already loaded
    const existingScript = document.querySelector(
      `script[src="${snapScriptUrl}"]`
    );

    if (existingScript) {
      setIsSnapLoaded(true);
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.src = snapScriptUrl;
    script.setAttribute("data-client-key", midtransClientKey);
    script.async = true;

    script.onload = () => {
      setIsSnapLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Midtrans Snap script");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const openSnap = (snapToken: string, options: UseMidtransOptions = {}) => {
    if (!isSnapLoaded || !window.snap) {
      console.error("Midtrans Snap is not loaded yet");
      return;
    }

    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        console.log("Payment success:", result);
        options.onSuccess?.(result);
      },
      onPending: (result) => {
        console.log("Payment pending:", result);
        options.onPending?.(result);
      },
      onError: (result) => {
        console.error("Payment error:", result);
        options.onError?.(result);
      },
      onClose: () => {
        console.log("Payment popup closed");
        options.onClose?.();
      },
    });
  };

  return {
    isSnapLoaded,
    openSnap,
  };
};
