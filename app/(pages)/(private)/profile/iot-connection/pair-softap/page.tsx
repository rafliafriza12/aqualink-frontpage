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
  Wifi,
  CheckCircle,
  Error as ErrorIcon,
  Refresh,
  Info,
  ContentCopy,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const IotPairingSoftAPPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const [step, setStep] = useState<
    "idle" | "generating" | "waiting" | "connecting" | "success" | "error"
  >("idle");
  const [pairingCode, setPairingCode] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [meteranId, setMeteranId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Modem WiFi Configuration (user must connect to same network as ESP32)
  const [modemSSID, setModemSSID] = useState<string>("");
  const [modemPassword, setModemPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModemConnected, setIsModemConnected] = useState<boolean>(false);

  // Device IP on modem network (auto-discovered or manual input)
  const [deviceIP, setDeviceIP] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<string[]>([]);

  // Fetch user data on mount
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
        if (response.ok && data.data?.user) {
          const user = data.data.user;

          // Set user ID
          setUserId(user._id || user.id);

          // Set meteran ID
          if (user.meteranId) {
            setMeteranId(user.meteranId._id || user.meteranId);
          } else {
            setStep("error");
            setErrorMessage("Meteran belum ditugaskan. Silakan hubungi admin.");
          }
        } else {
          setStep("error");
          setErrorMessage("Gagal memuat data user");
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

  const sendPairingData = async () => {
    if (!userId || !meteranId || !pairingCode) {
      setStep("error");
      setErrorMessage("User ID, Meteran ID, dan Pairing Code harus ada");
      return;
    }

    setStep("connecting");
    setErrorMessage("");

    try {
      console.log("📡 Sending pairing data to ESP32...");
      console.log("📡 Device IP:", deviceIP);
      console.log("� User ID:", userId);
      console.log("📟 Meteran ID:", meteranId);
      console.log("🔑 Pairing Code:", pairingCode);

      // Send pairing data to ESP32 via HTTP
      const provisionUrl = `http://${deviceIP}/provision`;

      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append("meteranId", meteranId);
      formData.append("pairingCode", pairingCode);

      const response = await fetch(provisionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        mode: "no-cors", // Required for cross-origin request to local device
      });

      console.log("✅ Pairing data sent to device");
      console.log(
        "⏳ Waiting for device to connect to modem and pair with backend..."
      );

      // Wait for device to receive, connect to modem, and call backend
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Start checking pairing status
      await checkPairingStatus();
    } catch (error: any) {
      console.error("❌ Pairing error:", error);
      setStep("error");
      setErrorMessage(
        "Tidak dapat terhubung ke device. Pastikan Anda terhubung ke WiFi 'AquaLink-XXXXXX'"
      );
    }
  };

  const checkPairingStatus = async () => {
    // Poll connection status every 3 seconds for max 60 seconds
    let attempts = 0;
    const maxAttempts = 20;

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
          setTimeout(checkStatus, 3000);
        } else {
          setStep("error");
          setErrorMessage(
            "Timeout menunggu konfirmasi dari device. Pastikan WiFi credentials benar."
          );
        }
      } catch (error) {
        console.error("Error checking status:", error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 3000);
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
    setModemSSID("");
    setModemPassword("");
    setIsModemConnected(false);
    setDeviceIP("");
    setDiscoveredDevices([]);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} berhasil dicopy!`);
  };

  const connectToModem = () => {
    if (!modemSSID || !modemPassword) {
      alert("Mohon isi SSID dan Password modem");
      return;
    }

    // Instruksikan user untuk connect manual
    alert(
      `Silakan connect HP Anda ke WiFi:\n\nSSID: ${modemSSID}\nPassword: ${modemPassword}\n\nSetelah terconnect, klik OK untuk melanjutkan.`
    );

    // Mark as connected (user must do it manually)
    setIsModemConnected(true);

    // Auto-scan for ESP32 device after connecting to modem
    scanForESP32();
  };

  // Auto-discover ESP32 device on local network
  const scanForESP32 = async () => {
    setIsScanning(true);
    setErrorMessage("");
    const foundDevices: string[] = [];

    try {
      console.log("🔍 Scanning for AquaLink ESP32 devices...");

      // Method 1: Try mDNS hostname (aqualink-device.local)
      try {
        const mdnsUrl = "http://aqualink-device.local/ping";
        const mdnsResponse = await fetch(mdnsUrl, {
          method: "GET",
          signal: AbortSignal.timeout(3000),
        });

        if (mdnsResponse.ok || mdnsResponse.status === 200) {
          console.log("✅ Found device via mDNS: aqualink-device.local");
          foundDevices.push("aqualink-device.local");
        }
      } catch (err) {
        console.log("⚠️ mDNS discovery failed, trying IP scan...");
      }

      // Method 2: Scan common IP ranges (192.168.1.x, 192.168.0.x)
      // Note: This requires ESP32 to respond to /ping endpoint
      const ipRanges = [
        { base: "192.168.1.", start: 100, end: 110 },
        { base: "192.168.0.", start: 100, end: 110 },
      ];

      const scanPromises: Promise<string | null>[] = [];

      for (const range of ipRanges) {
        for (let i = range.start; i <= range.end; i++) {
          const ip = `${range.base}${i}`;

          scanPromises.push(
            (async () => {
              try {
                const pingUrl = `http://${ip}/ping`;
                const response = await fetch(pingUrl, {
                  method: "GET",
                  signal: AbortSignal.timeout(1000),
                  mode: "no-cors",
                });

                // With no-cors, we can't check response, but if no error = device exists
                console.log(`✅ Device responded at ${ip}`);
                return ip;
              } catch (err) {
                // Device not found at this IP
                return null;
              }
            })()
          );
        }
      }

      const results = await Promise.all(scanPromises);
      const validIPs = results.filter((ip): ip is string => ip !== null);

      foundDevices.push(...validIPs);

      if (foundDevices.length > 0) {
        console.log(`✅ Found ${foundDevices.length} device(s):`, foundDevices);
        setDiscoveredDevices(foundDevices);
        setDeviceIP(foundDevices[0]); // Auto-select first device
      } else {
        console.log("⚠️ No devices found. Please enter IP manually.");
        setErrorMessage(
          "Tidak ada device ditemukan. Silakan masukkan IP manual."
        );
      }
    } catch (error) {
      console.error("❌ Scan error:", error);
      setErrorMessage("Gagal melakukan scan. Silakan masukkan IP manual.");
    } finally {
      setIsScanning(false);
    }
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
              Hubungkan Device IoT - WiFi Mode
            </h1>
            <p className="text-gray-400 text-sm">
              Koneksikan meteran IoT Anda melalui WiFi hotspot
            </p>
          </div>

          {/* Step 1: Generate Pairing Code */}
          {step === "idle" && (
            <div className="bg-[#202226] rounded-3xl p-6">
              {/* Instructions */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <Info className="text-blue-400 flex-shrink-0" />
                  <div className="text-sm text-blue-300">
                    <p className="font-semibold mb-2">
                      🔧 Cara Kerja Pairing (Modem Network):
                    </p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>
                        ESP32 sudah hardcoded dengan WiFi modem (otomatis
                        connect)
                      </li>
                      <li>
                        Anda harus connect HP ke WiFi modem yang SAMA dengan
                        ESP32
                      </li>
                      <li>Generate kode pairing di halaman ini</li>
                      <li>Masukkan IP ESP32 di jaringan lokal modem</li>
                      <li>Kirim userId, meteranId, pairingCode ke ESP32</li>
                      <li>ESP32 akan pair dengan backend server via modem</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <Wifi className="text-blue-500" fontSize="large" />
                </div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  Mulai Pairing IoT
                </h2>
                <p className="text-gray-400 text-sm">
                  Pastikan ESP32 dan HP Anda terhubung ke modem yang sama
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

          {/* Step 2: Show Pairing Code & Modem WiFi Connection Form */}
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

              {/* Step 1: Connect to Modem WiFi */}
              {!isModemConnected && (
                <div className="bg-[#202226] rounded-3xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    📶 Step 1: Connect ke WiFi Modem
                  </h3>

                  <div className="space-y-4">
                    {/* Modem SSID */}
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Nama WiFi Modem (SSID){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={modemSSID}
                        onChange={(e) => setModemSSID(e.target.value)}
                        placeholder="Contoh: Modem-AquaLink-001"
                        className="w-full bg-[#2a2d31] text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Modem Password */}
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">
                        Password WiFi Modem{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={modemPassword}
                          onChange={(e) => setModemPassword(e.target.value)}
                          placeholder="Masukkan password modem"
                          className="w-full bg-[#2a2d31] text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex gap-3">
                      <Info className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-300">
                        <p className="font-semibold mb-2">
                          ℹ️ Informasi Penting:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            ESP32 sudah terhubung ke modem ini (hardcoded)
                          </li>
                          <li>Anda juga harus connect ke modem yang SAMA</li>
                          <li>
                            Setelah klik tombol, connect HP Anda secara manual
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={connectToModem}
                    disabled={!modemSSID || !modemPassword}
                    className={`w-full mt-4 ${
                      modemSSID && modemPassword
                        ? "bg-gradient-to-r from-[#2835FF] to-[#5F68FE] hover:opacity-90"
                        : "bg-gray-600 cursor-not-allowed opacity-50"
                    } text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2`}
                  >
                    <Wifi />
                    Connect ke Modem WiFi
                  </button>
                </div>
              )}

              {/* Step 2: Pairing Data Form (after modem connected) */}
              {isModemConnected && (
                <>
                  {/* Pairing Data */}
                  <div className="bg-[#202226] rounded-3xl p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">
                      🔐 Step 2: Data Pairing
                    </h3>

                    <div className="space-y-4">
                      {/* User ID */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          User ID
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={userId}
                            readOnly
                            className="flex-1 bg-[#2a2d31] text-gray-300 px-4 py-3 rounded-xl border border-gray-600 cursor-not-allowed font-mono text-sm"
                          />
                          <button
                            onClick={() => copyToClipboard(userId, "User ID")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition"
                          >
                            <ContentCopy style={{ fontSize: 20 }} />
                          </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">
                          ID Anda yang unik
                        </p>
                      </div>

                      {/* Meteran ID */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          Meteran ID
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={meteranId}
                            readOnly
                            className="flex-1 bg-[#2a2d31] text-gray-300 px-4 py-3 rounded-xl border border-gray-600 cursor-not-allowed font-mono text-sm"
                          />
                          <button
                            onClick={() =>
                              copyToClipboard(meteranId, "Meteran ID")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition"
                          >
                            <ContentCopy style={{ fontSize: 20 }} />
                          </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">
                          ID meteran Anda yang akan dipasangkan
                        </p>
                      </div>

                      {/* Device IP (Auto-discovered or Manual) */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          ESP32 IP Address di Modem Network{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        {/* Scanning Status */}
                        {isScanning && (
                          <div className="mb-3 bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                            <div className="flex items-center gap-2 text-blue-400">
                              <Refresh className="animate-spin" />
                              <span className="text-sm">
                                Scanning for ESP32 devices...
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Discovered Devices */}
                        {discoveredDevices.length > 0 && !isScanning && (
                          <div className="mb-3">
                            <p className="text-green-400 text-sm mb-2 flex items-center gap-2">
                              <CheckCircle style={{ fontSize: 18 }} />
                              {discoveredDevices.length} device(s) ditemukan:
                            </p>
                            <div className="space-y-2">
                              {discoveredDevices.map((ip, index) => (
                                <button
                                  key={index}
                                  onClick={() => setDeviceIP(ip)}
                                  className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                                    deviceIP === ip
                                      ? "bg-blue-600 border-blue-500 text-white"
                                      : "bg-[#2a2d31] border-gray-600 text-gray-300 hover:border-blue-500"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm">
                                      {ip}
                                    </span>
                                    {deviceIP === ip && (
                                      <CheckCircle style={{ fontSize: 18 }} />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Manual IP Input */}
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={deviceIP}
                            onChange={(e) => setDeviceIP(e.target.value)}
                            placeholder="192.168.1.100 atau aqualink-device.local"
                            className="w-full bg-[#2a2d31] text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none"
                          />

                          {/* Scan Again Button */}
                          <button
                            onClick={scanForESP32}
                            disabled={isScanning}
                            className={`w-full ${
                              isScanning
                                ? "bg-gray-600 cursor-not-allowed opacity-50"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white py-2 px-4 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2`}
                          >
                            <Refresh
                              className={isScanning ? "animate-spin" : ""}
                              style={{ fontSize: 18 }}
                            />
                            {isScanning ? "Scanning..." : "Scan Ulang Device"}
                          </button>
                        </div>

                        <p className="text-gray-500 text-xs mt-2">
                          💡 IP akan terdeteksi otomatis. Jika tidak, cek router
                          modem atau masukkan manual.
                        </p>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                      <div className="flex gap-3">
                        <Info className="text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-300">
                          <p className="font-semibold mb-2">
                            ℹ️ Informasi Penting:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>
                              Pastikan HP dan ESP32 terhubung ke modem yang sama
                            </li>
                            <li>Kode pairing hanya berlaku selama 5 menit</li>
                            <li>ESP32 akan pair dengan backend via modem</li>
                            <li>
                              Periksa IP ESP32 di router modem jika tidak bisa
                              connect
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={sendPairingData}
                      disabled={!userId || !meteranId || !deviceIP}
                      className={`w-full ${
                        userId && meteranId && deviceIP
                          ? "bg-gradient-to-r from-[#2835FF] to-[#5F68FE] hover:opacity-90"
                          : "bg-gray-600 cursor-not-allowed opacity-50"
                      } text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2`}
                    >
                      <Wifi />
                      Kirim Data Pairing ke Device
                    </button>

                    <button
                      onClick={reset}
                      className="bg-[#202226] text-white py-4 px-6 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                      <Refresh />
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Loading States */}
          {(step === "generating" || step === "connecting") && (
            <div className="bg-[#202226] rounded-3xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  {step === "generating"
                    ? "Generating Kode..."
                    : "Mengirim Data Pairing..."}
                </h2>
                <p className="text-gray-400 text-sm">
                  {step === "generating"
                    ? "Mohon tunggu sebentar"
                    : "Mengirim User ID, Meteran ID, dan Pairing Code ke device"}
                </p>
                {step === "connecting" && (
                  <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-300 text-sm">
                      💡 Device akan connect ke modem dan backend server. Ini
                      bisa memakan waktu 30-60 detik.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Success State */}
          {step === "success" && (
            <div className="bg-[#202226] rounded-3xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-500" fontSize="large" />
                </div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  🎉 Berhasil Terhubung!
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Device IoT Anda sudah terhubung dan siap digunakan
                </p>

                <button
                  onClick={() => router.push("/profile/iot-connection")}
                  className="w-full bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Lihat Status Koneksi
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {step === "error" && (
            <div className="bg-[#202226] rounded-3xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                  <ErrorIcon className="text-red-500" fontSize="large" />
                </div>
                <h2 className="text-white font-semibold text-xl mb-2">
                  Terjadi Kesalahan
                </h2>
                <p className="text-gray-400 text-sm mb-6">{errorMessage}</p>

                <button
                  onClick={reset}
                  className="w-full bg-gradient-to-r from-[#2835FF] to-[#5F68FE] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <Refresh />
                  Coba Lagi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IotPairingSoftAPPage;
