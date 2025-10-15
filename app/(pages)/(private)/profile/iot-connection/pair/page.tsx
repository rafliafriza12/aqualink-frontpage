"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import CircleBackground from "@/app/components/svg/CircleBackground";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/hooks/UseAuth";
import {
  ArrowBack,
  BluetoothSearching,
  Bluetooth,
  CheckCircle,
  Error as ErrorIcon,
  Refresh,
  Info,
} from "@mui/icons-material";

// Web Bluetooth API types
interface BluetoothDevice {
  id: string;
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
}

interface BluetoothRemoteGATTServer {
  connected: boolean;
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(
    characteristic: string
  ): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic {
  writeValue(value: BufferSource): Promise<void>;
  readValue(): Promise<DataView>;
}

interface Navigator {
  bluetooth?: {
    requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
  };
}

interface RequestDeviceOptions {
  filters?: Array<{ services?: string[]; name?: string; namePrefix?: string }>;
  optionalServices?: string[];
}

const IotPairingPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const [step, setStep] = useState<
    | "idle"
    | "generating"
    | "waiting"
    | "connecting"
    | "provisioning"
    | "success"
    | "error"
  >("idle");
  const [pairingCode, setPairingCode] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [meteranId, setMeteranId] = useState<string>("");

  // SoftAP Mode - WiFi Provisioning
  const [wifiSSID, setWifiSSID] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [deviceIP] = useState<string>("192.168.4.1");
  const [bluetoothDevice, setBluetoothDevice] =
    useState<BluetoothDevice | null>(null);

  // Fetch user meteran ID on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = auth.auth.token;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: token || "",
            },
          }
        );

        const data = await response.json();
        if (response.ok && data.data?.user?.meteranId) {
          console.log(data);
          setMeteranId(
            data.data.user.meteranId._id || data.data.user.meteranId
          );
        } else {
          setStep("error");
          setErrorMessage("Meteran belum ditugaskan. Silakan hubungi admin.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setStep("error");
        setErrorMessage("Gagal memuat data user");
      }
    };

    fetchUserData();
  }, []);

  // Countdown timer for pairing code expiration
  useEffect(() => {
    if (!expiresAt) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));

      setCountdown(remaining);

      if (remaining === 0) {
        setStep("error");
        setErrorMessage(
          "Kode pairing sudah kadaluarsa. Silakan generate ulang."
        );
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const generatePairingCode = async () => {
    if (!meteranId) {
      setStep("error");
      setErrorMessage("Meteran ID tidak ditemukan");
      return;
    }

    setStep("generating");
    setErrorMessage("");

    try {
      const token = auth.auth.token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/iot/generate-pairing-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
          body: JSON.stringify({ meteranId }),
        }
      );

      const data = await response.json();

      if (response.ok && data.data) {
        setPairingCode(data.data.pairingCode);
        setExpiresAt(new Date(data.data.expiresAt));
        setStep("waiting");
      } else {
        setStep("error");
        setErrorMessage(data.message || "Gagal generate kode pairing");
      }
    } catch (error) {
      console.error("Error generating pairing code:", error);
      setStep("error");
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const provisionDevice = async () => {
    if (!wifiSSID || !wifiPassword || !pairingCode) {
      setStep("error");
      setErrorMessage("WiFi SSID, Password, dan Pairing Code harus diisi");
      return;
    }

    setStep("provisioning");
    setErrorMessage("");

    try {
      console.log("📡 Sending provisioning data to ESP32...");
      console.log("📡 Device IP:", deviceIP);
      console.log("📡 WiFi SSID:", wifiSSID);
      console.log("🔑 Pairing Code:", pairingCode);

      // Send provisioning data to ESP32 via HTTP
      const provisionUrl = `http://${deviceIP}/provision`;

      const formData = new URLSearchParams();
      formData.append("ssid", wifiSSID);
      formData.append("password", wifiPassword);
      formData.append("code", pairingCode);

      const response = await fetch(provisionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        mode: "no-cors", // Required for cross-origin request to local device
      });

      console.log("✅ Provisioning data sent to device");
      console.log(
        "⏳ Waiting for device to connect to WiFi and pair with backend..."
      );

      // Wait a bit for device to receive and process
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Start checking pairing status
      await checkPairingStatus();
    } catch (error: any) {
      console.error("❌ Provisioning error:", error);
      setStep("error");
      setErrorMessage(
        "Tidak dapat terhubung ke device. Pastikan Anda terhubung ke WiFi 'AquaLink-XXXXXX'"
      );
    }
  };

  const connectBluetooth = async () => {
    const nav = navigator as Navigator;
    console.log("🔵 Starting Bluetooth connection...");
    console.log("🔵 Navigator bluetooth support:", !!nav.bluetooth);

    if (!nav.bluetooth) {
      console.error("❌ Browser does not support Web Bluetooth");
      setStep("error");
      setErrorMessage(
        "Browser Anda tidak mendukung Web Bluetooth API. Gunakan Chrome atau Edge."
      );
      return;
    }

    setStep("connecting");
    setErrorMessage("");

    try {
      console.log("🔵 Requesting Bluetooth device...");

      // Request Bluetooth device with more flexible filters
      const device = await nav.bluetooth.requestDevice({
        filters: [
          { namePrefix: "AquaLink" },
          { namePrefix: "ESP32" }, // Common ESP32 prefix
          { namePrefix: "Arduino" }, // Common Arduino prefix
        ],
        optionalServices: [
          "0000181a-0000-1000-8000-00805f9b34fb", // Environmental Sensing
          "0000ffe0-0000-1000-8000-00805f9b34fb", // Common custom service
        ],
      });

      console.log("✅ Device selected:", device.name, device.id);
      setBluetoothDevice(device);

      // Connect to GATT server
      console.log("🔵 Connecting to GATT server...");
      const server = await device.gatt?.connect();
      if (!server) {
        throw new Error("Gagal terhubung ke GATT server");
      }
      console.log("✅ GATT server connected");

      // Get service and characteristic
      console.log("🔵 Getting primary service...");
      const service = await server.getPrimaryService(
        "0000181a-0000-1000-8000-00805f9b34fb"
      );
      console.log("✅ Service obtained");

      console.log("🔵 Getting characteristic...");
      const characteristic = await service.getCharacteristic(
        "00002a59-0000-1000-8000-00805f9b34fb"
      );
      console.log("✅ Characteristic obtained");

      // Send pairing code to device
      console.log("🔵 Sending pairing code to device:", pairingCode);
      const encoder = new TextEncoder();
      const codeData = encoder.encode(pairingCode);
      await characteristic.writeValue(codeData);
      console.log("✅ Pairing code sent successfully");

      // Wait for device response (device will call backend /iot/pair-device)
      // In real implementation, device should send confirmation
      // For now, we'll poll the connection status
      console.log("🔵 Starting to poll connection status...");
      await checkPairingStatus();
    } catch (error: any) {
      console.error("Error connecting Bluetooth:", error);
      setStep("error");
      setErrorMessage(error.message || "Gagal terhubung ke device Bluetooth");
    }
  };

  const checkPairingStatus = async () => {
    // Poll connection status every 2 seconds for max 30 seconds
    let attempts = 0;
    const maxAttempts = 15;

    const checkStatus = async () => {
      try {
        const token = auth.auth.token;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/iot/connection-status`,
          {
            headers: {
              Authorization: token || "",
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.data) {
          if (
            data.data.isConnected &&
            data.data.connection?.status === "connected"
          ) {
            setStep("success");
            return true;
          }
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 2000);
        } else {
          setStep("error");
          setErrorMessage("Timeout menunggu konfirmasi dari device");
        }
      } catch (error) {
        console.error("Error checking status:", error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 2000);
        } else {
          setStep("error");
          setErrorMessage("Gagal memeriksa status koneksi");
        }
      }
    };

    await checkStatus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const reset = () => {
    setStep("idle");
    setPairingCode("");
    setExpiresAt(null);
    setCountdown(0);
    setErrorMessage("");
    setBluetoothDevice(null);
  };

  return (
    <div className="w-full flex flex-col font-inter relative z-0 min-h-screen overflow-hidden">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] fixed z-[-10] top-0 hidden lg:block"
        )}
        width={80}
        height={80}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <div className="w-full fixed z-[-10] lg:hidden inset-0">
        <CircleBackground />
      </div>

      <div className="w-full flex flex-col gap-6 py-[18.4px]">
        <HeaderMobile mode="normal" />

        <div className="px-5">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white mb-4"
          >
            <ArrowBack />
            <span>Kembali</span>
          </button>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-white font-bold text-2xl mb-2">
              Hubungkan Device IoT
            </h1>
            <p className="text-gray-400 text-sm">
              Ikuti langkah-langkah di bawah untuk menghubungkan meteran air
              Anda dengan device IoT
            </p>
          </div>

          {/* Step 1: Generate Pairing Code */}
          {step === "idle" && (
            <div className="bg-[#202226] rounded-3xl p-6">
              {/* Browser Compatibility Warning */}
              {!(navigator as Navigator).bluetooth && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <div className="flex gap-3">
                    <ErrorIcon className="text-red-400 flex-shrink-0" />
                    <div className="text-sm text-red-300">
                      <p className="font-semibold mb-2">
                        ⚠️ Web Bluetooth Tidak Didukung
                      </p>
                      <p className="mb-2">
                        Browser Anda tidak mendukung Web Bluetooth API.
                      </p>
                      <p className="font-semibold mb-1">Solusi:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                          Gunakan <strong>Google Chrome</strong> atau{" "}
                          <strong>Microsoft Edge</strong>
                        </li>
                        <li>
                          Pastikan mengakses via <strong>HTTPS</strong> atau{" "}
                          <strong>localhost</strong>
                        </li>
                        <li>Update browser ke versi terbaru</li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-red-500/30">
                        <p className="font-semibold text-yellow-300">
                          💡 Untuk Testing:
                        </p>
                        <p>
                          Anda tetap bisa menggunakan <strong>Test Mode</strong>{" "}
                          tanpa Bluetooth
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <BluetoothSearching
                    className="text-blue-500"
                    fontSize="large"
                  />
                </div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  Mulai Pairing Device
                </h2>
                <p className="text-gray-400 text-sm">
                  Pastikan device IoT Anda sudah menyala dan dalam jangkauan
                  Bluetooth
                </p>
              </div>

              <button
                onClick={generatePairingCode}
                className="w-full bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Generate Kode Pairing
              </button>
            </div>
          )}

          {/* Step 2: Show Pairing Code */}
          {step === "waiting" && pairingCode && (
            <div className="space-y-4">
              {/* Pairing Code Card */}
              <div className="bg-gradient-to-br from-[#2835FF] to-[#5F68FE] rounded-3xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4 text-center">
                  Kode Pairing Anda
                </h2>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-4">
                  <p className="text-white text-5xl font-bold text-center tracking-widest">
                    {pairingCode}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                  <span>Berlaku selama:</span>
                  <span className="font-bold text-lg text-white">
                    {formatTime(countdown)}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#202226] rounded-3xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Langkah Selanjutnya:
                </h3>

                {/* Info Banner */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                  <div className="flex gap-3">
                    <Info className="text-blue-400 flex-shrink-0" />
                    <div className="text-sm text-blue-300">
                      <p className="font-semibold mb-1">Catatan Penting:</p>
                      <p>
                        • Untuk pairing real, gunakan tombol "Hubungkan
                        Bluetooth" dengan device IoT fisik
                      </p>
                      <p>
                        • Untuk testing tanpa device, gunakan tombol "Test Mode"
                      </p>
                      <p>
                        • Browser akan menampilkan dialog untuk memilih device
                        Bluetooth
                      </p>
                    </div>
                  </div>
                </div>

                <ol className="space-y-3 text-gray-300 text-sm">
                  <li className="flex gap-3">
                    <span className="text-blue-500 font-bold">1.</span>
                    <span>Pastikan device IoT sudah menyala</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span>Tekan tombol "Hubungkan Bluetooth" di bawah</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 font-bold">3.</span>
                    <span>Pilih device "AquaLink" dari daftar</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-500 font-bold">4.</span>
                    <span>Kode akan dikirim otomatis ke device</span>
                  </li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={connectBluetooth}
                  disabled={!(navigator as Navigator).bluetooth}
                  className={`w-full ${
                    (navigator as Navigator).bluetooth
                      ? "bg-gradient-to-r from-[#2835FF] to-[#5F68FE] hover:opacity-90"
                      : "bg-gray-600 cursor-not-allowed opacity-50"
                  } text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2`}
                >
                  <Bluetooth />
                  {(navigator as Navigator).bluetooth
                    ? "Hubungkan Bluetooth"
                    : "Bluetooth Tidak Didukung"}
                </button>

                {/* Development: Test button to simulate pairing */}
                <button
                  onClick={async () => {
                    console.log(
                      "🧪 Testing mode: Simulating device pairing..."
                    );
                    setStep("provisioning");

                    // Simulate API call to pair device
                    try {
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/iot/pair-device`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            pairingCode: pairingCode,
                            deviceId: "TEST-DEVICE-" + Date.now(),
                          }),
                        }
                      );

                      const data = await response.json();
                      console.log("🧪 Pairing response:", data);

                      if (response.ok) {
                        await checkPairingStatus();
                      } else {
                        setStep("error");
                        setErrorMessage(data.message || "Gagal pairing device");
                      }
                    } catch (error: any) {
                      console.error("🧪 Test pairing error:", error);
                      setStep("error");
                      setErrorMessage(error.message);
                    }
                  }}
                  className="w-full bg-yellow-600/20 border border-yellow-600 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-600/30 transition text-sm"
                >
                  🧪 Test Mode (Skip Bluetooth)
                </button>

                <button
                  onClick={reset}
                  className="bg-[#202226] text-white py-4 px-6 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  <Refresh />
                </button>
              </div>
            </div>
          )}

          {/* Loading States */}
          {(step === "generating" ||
            step === "connecting" ||
            step === "provisioning") && (
            <div className="bg-[#202226] rounded-3xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  {step === "generating"
                    ? "Generating Kode..."
                    : step === "connecting"
                    ? "Menghubungkan Bluetooth..."
                    : "Mengirim Konfigurasi..."}
                </h2>
                <p className="text-gray-400 text-sm">
                  {step === "generating"
                    ? "Mohon tunggu sebentar"
                    : step === "connecting"
                    ? "Connecting ke device IoT"
                    : "Device sedang terhubung ke WiFi dan backend"}
                </p>
              </div>
            </div>
          )}

          {/* Success State */}
          {step === "success" && (
            <div className="bg-[#202226] rounded-3xl p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-500" fontSize="large" />
                </div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  Berhasil Terhubung!
                </h2>
                <p className="text-gray-400 text-sm">
                  Device IoT Anda telah berhasil terhubung dengan meteran air
                </p>
              </div>

              <button
                onClick={() => router.push("/profile/iot-connection")}
                className="w-full bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Lihat Status Koneksi
              </button>
            </div>
          )}

          {/* Error State */}
          {step === "error" && (
            <div className="space-y-4">
              <div className="bg-[#202226] rounded-3xl p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <ErrorIcon className="text-red-500" fontSize="large" />
                  </div>
                  <h2 className="text-white font-semibold text-xl mb-2">
                    Koneksi Gagal
                  </h2>
                  <p className="text-gray-400 text-sm">{errorMessage}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="flex-1 bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    Coba Lagi
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="bg-[#202226] text-white py-4 px-6 rounded-xl font-semibold hover:opacity-90 transition border border-gray-700"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IotPairingPage;
