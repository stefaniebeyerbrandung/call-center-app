"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CallCenterDashboard() {
  const [expandedCall, setExpandedCall] = useState<string | null>("call151"); // Standardmäßig geöffnet
  const [callStatuses, setCallStatuses] = useState({
    call149: false, // false = weiß, true = rot
    call150: false,
    call151: true, // Standardmäßig rot
    call152: false,
  });

  // State für editierbare Felder
  const [tableData, setTableData] = useState({
    call149: {
      queue: "0/20",
      waitTime: "00:25",
      ewt: "00:00",
      aht: "01:00",
      asa: "00:00",
      busy: "3/3",
      inactive: "0",
      unavailable: "0",
    },
    call150: {
      queue: "1/10",
      waitTime: "00:00",
      ewt: "00:38",
      aht: "01:55",
      asa: "00:05",
      busy: "3/3",
      inactive: "0",
      unavailable: "0",
    },
    call151: {
      queue: "1/10",
      waitTime: "00:06",
      ewt: "00:00",
      aht: "00:00",
      asa: "00:00",
      busy: "3/3",
      inactive: "0",
      unavailable: "0",
    },
    call152: {
      queue: "1/10",
      waitTime: "00:00",
      ewt: "00:38",
      aht: "01:55",
      asa: "00:05",
      busy: "3/3",
      inactive: "0",
      unavailable: "0",
    },
  });

  // State für Berater-Daten mit Status
  const [agentData, setAgentData] = useState([
    {
      id: "Name",
      queues: "3",
      loginTime: "16:23:46",
      duration: "01:01:30",
      state: "Wrap-up (14:29)",
      available: "76%",
      avgBusyIn: "00:00",
      avgBusyOut: "00:00",
      avgWrapup: "00:00",
      status: true, // true = grün, false = rot
    },
    {
      id: "Name",
      queues: "3",
      loginTime: "17:15:02",
      duration: "10:14",
      state: "Wrap-up (00:58)",
      available: "80%",
      avgBusyIn: "00:58",
      avgBusyOut: "00:00",
      avgWrapup: "01:00",
      status: true,
    },
    {
      id: "Name",
      queues: "3",
      loginTime: "16:29:18",
      duration: "55:58",
      state: "Wrap-up (13:00)",
      available: "58%",
      avgBusyIn: "00:00",
      avgBusyOut: "00:00",
      avgWrapup: "00:00",
      status: false, // Dieser Berater hat bereits einen roten Status
    },
  ]);

  // Neuer State für den Benutzernamen
  const [username, setUsername] = useState("User251");

  const toggleCallDetails = (callId: string) => {
    setExpandedCall(expandedCall === callId ? null : callId);
  };

  const toggleCallStatus = (callId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Verhindert, dass der Klick die Details öffnet
    setCallStatuses((prev) => ({
      ...prev,
      [callId]: !prev[callId],
    }));
  };

  // Neue Funktion zum Umschalten des Berater-Status
  const toggleAgentStatus = (index: number) => {
    setAgentData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        status: !newData[index].status,
      };
      return newData;
    });
  };

  // Handler für Änderungen an Tabellenfeldern
  const handleCallDataChange = (
    callId: string,
    field: string,
    value: string
  ) => {
    setTableData((prev) => ({
      ...prev,
      [callId]: {
        ...prev[callId],
        [field]: value,
      },
    }));
  };

  // Handler für Änderungen an Berater-Daten
  const handleAgentDataChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setAgentData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
  };

  // Verbesserte EditableCell-Komponente
  const EditableCell = ({
    value,
    onChange,
    className = "",
  }: {
    value: string;
    onChange: (value: string) => void;
    className?: string;
  }) => {
    // State für den lokalen Wert
    const [localValue, setLocalValue] = useState(value);

    // Ref für das Input-Element
    const inputRef = useRef<HTMLInputElement>(null);

    // Aktualisiere den lokalen Wert, wenn sich der Prop-Wert ändert
    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    // Behandle Änderungen lokal
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
    };

    // Aktualisiere den übergeordneten State nur, wenn der Fokus verloren geht
    const handleBlur = () => {
      if (localValue !== value) {
        onChange(localValue);
      }
    };

    // Behandle Tastatureingaben
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        // Bestätige die Änderung und behalte den Fokus
        onChange(localValue);
        e.preventDefault(); // Verhindere das Standardverhalten (Formular-Absenden)

        // Wähle den gesamten Text aus
        inputRef.current?.select();
      } else if (e.key === "Escape") {
        // Setze den Wert zurück und verliere den Fokus
        setLocalValue(value);
        inputRef.current?.blur();
      }
    };

    // Verhindere Klick-Propagation
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        className={cn(
          "w-full text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-400 px-0 py-0",
          className
        )}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header with background image */}
      <header className="bg-white relative overflow-hidden border-b border-gray-300">
        <div
          className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('/icon.png')] bg-no-repeat"
          style={{
            backgroundPosition: "center right",
            backgroundSize: "auto 80%",
          }}
        ></div>
        <div className="relative z-10 px-5 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[26px] font-bold mb-1">
                Berliner Hilfetelefon für Frauen
              </h1>
              <h2 className="text-5xl font-bold mt-[-5px]">Call Center</h2>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-4">
                <Link href="#" className="font-bold underline">
                  Vollbild
                </Link>
                <Link href="#" className="font-bold underline">
                  Schließen
                </Link>
                <Link href="#" className="font-bold underline">
                  Abmelden
                </Link>
              </div>
              <div className="text-right">
                <div>
                  Benutzername:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-400 px-0 py-0 ml-1 w-[60px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-3 bg-lightred">
        {/* Dashboard */}
        <div className="text-white bg-darkred px-5 py-3 pt-4 text-2xl leading-none font-bold">
          Dashboard
        </div>

        {/* Main Content */}
        <div className="">
          {/* Top Section */}
          <div className="relative">
            <div className="grid grid-cols-4 bg-gray-300 px-2 py-1 border-b border-gray-400 text-sm">
              <div className="table-header-gradient text-center font-bold text-md">
                Warteschlangen
              </div>
              <div className="table-header-gradient text-center font-bold text-md">
                Aktuell
              </div>
              <div className="table-header-gradient text-center font-bold text-md">
                Bereich
              </div>
              <div className="table-header-gradient text-center font-bold text-md">
                Agenten
              </div>
            </div>

            {/* Warteschlangen Tabelle */}
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Nr.
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Status
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Call in Queue
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Wartezeit
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    EWT
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    AHT
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    ASA
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Besetzt
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Inaktiv
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Nicht verfügbar
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Anzeigen
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={cn(
                    "bg-midblue hover:bg-darkblue border-b border-gray-400 h-[31px]",
                    expandedCall === "call149" ? "bg-darkblue" : ""
                  )}
                >
                  <td className="px-2 py-1">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCallDetails("call149")}
                    >
                      <Link
                        href="#"
                        className="text-textblue underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        call149
                      </Link>
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 text-textblue ml-0.5 transition-transform duration-300",
                          expandedCall === "call149" ? "rotate-180" : ""
                        )}
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <div
                      className={cn(
                        "h-4 w-4 border border-white rounded-full mx-auto cursor-pointer transition-colors duration-200",
                        callStatuses.call149 ? "bg-red" : "bg-circlegray"
                      )}
                      onClick={(e) => toggleCallStatus("call149", e)}
                    ></div>
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.queue}
                      onChange={(value) =>
                        handleCallDataChange("call149", "queue", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.waitTime}
                      onChange={(value) =>
                        handleCallDataChange("call149", "waitTime", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.ewt}
                      onChange={(value) =>
                        handleCallDataChange("call149", "ewt", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.aht}
                      onChange={(value) =>
                        handleCallDataChange("call149", "aht", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.asa}
                      onChange={(value) =>
                        handleCallDataChange("call149", "asa", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.busy}
                      onChange={(value) =>
                        handleCallDataChange("call149", "busy", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.inactive}
                      onChange={(value) =>
                        handleCallDataChange("call149", "inactive", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call149.unavailable}
                      onChange={(value) =>
                        handleCallDataChange("call149", "unavailable", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <label className="inline-flex justify-end cursor-pointer">
                      <Checkbox
                        defaultChecked
                        className="w-4 h-4 border border-gray-500 bg-white"
                      />
                    </label>
                  </td>
                </tr>

                {expandedCall === "call149" && (
                  <tr className="bg-gradient1 border-b border-gray-400">
                    <td colSpan={11} className="px-2">
                      <div className="table-header-gradient flex items-center gap-1 my-2 text-xs">
                        <span>
                          Anrufende Person Information{" "}
                          <span className="underline">(call149)</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1 text-xs">
                        {/* Art des Konflikts */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Art des Konflikts</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Stalking</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Körperliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sexueller Missbrauch</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Psychische Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Häusliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Diskriminierung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Mobbing / Cybermobbing</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Beziehungskonflikt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige</span>
                            </label>
                          </div>
                        </div>

                        {/* Anrufende Person */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Anrufende Person</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Betroffene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Angehörige / Freunde</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Fachperson / Multiplikatorin</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Unbekannt / Keine Angabe</span>
                            </label>
                          </div>
                        </div>

                        {/* Zielgruppe */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Zielgruppe</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Kind / Jugendliche*r</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Erwachsene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Ältere Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>LGBTQIA+</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Menschen mit Behinderung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige vulnerblen Gruppen</span>
                            </label>
                          </div>
                        </div>

                        {/* Bericht */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Bericht</h3>
                          <Textarea
                            className="w-full h-24"
                            defaultValue="She just needed some company ..."
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                <tr
                  className={cn(
                    "bg-midblue hover:bg-darkblue border-b border-gray-400 h-[31px]",
                    expandedCall === "call150" ? "bg-darkblue" : ""
                  )}
                >
                  <td className="px-2 py-1">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCallDetails("call150")}
                    >
                      <Link
                        href="#"
                        className="text-textblue underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        call150
                      </Link>
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 text-textblue ml-0.5 transition-transform duration-300",
                          expandedCall === "call150" ? "rotate-180" : ""
                        )}
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <div
                      className={cn(
                        "h-4 w-4 border border-white rounded-full mx-auto cursor-pointer transition-colors duration-200",
                        callStatuses.call150 ? "bg-red" : "bg-circlegray"
                      )}
                      onClick={(e) => toggleCallStatus("call150", e)}
                    ></div>
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.queue}
                      onChange={(value) =>
                        handleCallDataChange("call150", "queue", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.waitTime}
                      onChange={(value) =>
                        handleCallDataChange("call150", "waitTime", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.ewt}
                      onChange={(value) =>
                        handleCallDataChange("call150", "ewt", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.aht}
                      onChange={(value) =>
                        handleCallDataChange("call150", "aht", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.asa}
                      onChange={(value) =>
                        handleCallDataChange("call150", "asa", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.busy}
                      onChange={(value) =>
                        handleCallDataChange("call150", "busy", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.inactive}
                      onChange={(value) =>
                        handleCallDataChange("call150", "inactive", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call150.unavailable}
                      onChange={(value) =>
                        handleCallDataChange("call150", "unavailable", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <label className="inline-flex justify-end cursor-pointer">
                      <Checkbox
                        defaultChecked
                        className="w-4 h-4 border border-gray-500 bg-white"
                      />
                    </label>
                  </td>
                </tr>

                {expandedCall === "call150" && (
                  <tr className="bg-gradient1 border-b border-gray-400">
                    <td colSpan={11} className="px-2">
                      <div className="table-header-gradient flex items-center gap-1 my-2 text-xs">
                        <span>
                          Anrufende Person Information{" "}
                          <span className="underline">(call150)</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1 text-xs">
                        {/* Art des Konflikts */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Art des Konflikts</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Stalking</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Körperliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sexueller Missbrauch</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Psychische Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Häusliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Diskriminierung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Mobbing / Cybermobbing</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Beziehungskonflikt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige</span>
                            </label>
                          </div>
                        </div>

                        {/* Anrufende Person */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Anrufende Person</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Betroffene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Angehörige / Freunde</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Fachperson / Multiplikatorin</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Unbekannt / Keine Angabe</span>
                            </label>
                          </div>
                        </div>

                        {/* Zielgruppe */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Zielgruppe</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Kind / Jugendliche*r</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Erwachsene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Ältere Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>LGBTQIA+</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Menschen mit Behinderung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige vulnerblen Gruppen</span>
                            </label>
                          </div>
                        </div>

                        {/* Bericht */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Bericht</h3>
                          <Textarea
                            className="w-full h-24"
                            defaultValue="She just needed some company ..."
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                <tr
                  className={cn(
                    "bg-midblue hover:bg-darkblue border-b border-gray-400 h-[31px]",
                    expandedCall === "call151" ? "bg-darkblue" : ""
                  )}
                >
                  <td className="px-2 py-1">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCallDetails("call151")}
                    >
                      <Link
                        href="#"
                        className="text-textblue underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        call151
                      </Link>
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 text-textblue ml-0.5 transition-transform duration-300",
                          expandedCall === "call151" ? "rotate-180" : ""
                        )}
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <div
                      className={cn(
                        "h-4 w-4 border border-white rounded-full mx-auto cursor-pointer transition-colors duration-200",
                        callStatuses.call151 ? "bg-red" : "bg-circlegray"
                      )}
                      onClick={(e) => toggleCallStatus("call151", e)}
                    ></div>
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.queue}
                      onChange={(value) =>
                        handleCallDataChange("call151", "queue", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.waitTime}
                      onChange={(value) =>
                        handleCallDataChange("call151", "waitTime", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.ewt}
                      onChange={(value) =>
                        handleCallDataChange("call151", "ewt", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.aht}
                      onChange={(value) =>
                        handleCallDataChange("call151", "aht", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.asa}
                      onChange={(value) =>
                        handleCallDataChange("call151", "asa", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.busy}
                      onChange={(value) =>
                        handleCallDataChange("call151", "busy", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.inactive}
                      onChange={(value) =>
                        handleCallDataChange("call151", "inactive", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call151.unavailable}
                      onChange={(value) =>
                        handleCallDataChange("call151", "unavailable", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <label className="inline-flex justify-end cursor-pointer">
                      <Checkbox
                        defaultChecked
                        className="w-4 h-4 border border-gray-500 bg-white"
                      />
                    </label>
                  </td>
                </tr>

                {expandedCall === "call151" && (
                  <tr className="bg-gradient1 border-b border-gray-400">
                    <td colSpan={11} className="px-2">
                      <div className="table-header-gradient flex items-center gap-1 my-2 text-xs">
                        <span>
                          Anrufende Person Information{" "}
                          <span className="underline">(call151)</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1 text-xs">
                        {/* Art des Konflikts */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Art des Konflikts</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Stalking</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Körperliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sexueller Missbrauch</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Psychische Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Häusliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Diskriminierung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Mobbing / Cybermobbing</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Beziehungskonflikt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige</span>
                            </label>
                          </div>
                        </div>

                        {/* Anrufende Person */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Anrufende Person</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Betroffene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Angehörige / Freunde</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Fachperson / Multiplikatorin</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Unbekannt / Keine Angabe</span>
                            </label>
                          </div>
                        </div>

                        {/* Zielgruppe */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Zielgruppe</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Kind / Jugendliche*r</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Erwachsene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Ältere Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>LGBTQIA+</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Menschen mit Behinderung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige vulnerblen Gruppen</span>
                            </label>
                          </div>
                        </div>

                        {/* Bericht */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Bericht</h3>
                          <Textarea
                            className="w-full h-24"
                            defaultValue="She just needed some company ..."
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                <tr
                  className={cn(
                    "bg-midblue hover:bg-darkblue border-b border-gray-400 h-[31px]",
                    expandedCall === "call152" ? "bg-darkblue" : ""
                  )}
                >
                  <td className="px-2 py-1">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCallDetails("call152")}
                    >
                      <Link
                        href="#"
                        className="text-textblue underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        call152
                      </Link>
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 text-textblue ml-0.5 transition-transform duration-300",
                          expandedCall === "call152" ? "rotate-180" : ""
                        )}
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <div
                      className={cn(
                        "h-4 w-4 border border-white rounded-full mx-auto cursor-pointer transition-colors duration-200",
                        callStatuses.call152 ? "bg-red" : "bg-circlegray"
                      )}
                      onClick={(e) => toggleCallStatus("call152", e)}
                    ></div>
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.queue}
                      onChange={(value) =>
                        handleCallDataChange("call152", "queue", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.waitTime}
                      onChange={(value) =>
                        handleCallDataChange("call152", "waitTime", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.ewt}
                      onChange={(value) =>
                        handleCallDataChange("call152", "ewt", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.aht}
                      onChange={(value) =>
                        handleCallDataChange("call152", "aht", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.asa}
                      onChange={(value) =>
                        handleCallDataChange("call152", "asa", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.busy}
                      onChange={(value) =>
                        handleCallDataChange("call152", "busy", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.inactive}
                      onChange={(value) =>
                        handleCallDataChange("call152", "inactive", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1">
                    <EditableCell
                      value={tableData.call152.unavailable}
                      onChange={(value) =>
                        handleCallDataChange("call152", "unavailable", value)
                      }
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <label className="inline-flex justify-end cursor-pointer">
                      <Checkbox
                        defaultChecked
                        className="w-4 h-4 border border-gray-500 bg-white"
                      />
                    </label>
                  </td>
                </tr>

                {expandedCall === "call152" && (
                  <tr className="bg-gradient1 border-b border-gray-400">
                    <td colSpan={11} className="px-2">
                      <div className="table-header-gradient flex items-center gap-1 my-2 text-xs">
                        <span>
                          Anrufende Person Information{" "}
                          <span className="underline">(call152)</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1 text-xs">
                        {/* Art des Konflikts */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Art des Konflikts</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Stalking</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Körperliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sexueller Missbrauch</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Psychische Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Häusliche Gewalt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Diskriminierung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Mobbing / Cybermobbing</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Beziehungskonflikt</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige</span>
                            </label>
                          </div>
                        </div>

                        {/* Anrufende Person */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Anrufende Person</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Betroffene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Angehörige / Freunde</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Fachperson / Multiplikatorin</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Unbekannt / Keine Angabe</span>
                            </label>
                          </div>
                        </div>

                        {/* Zielgruppe */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Zielgruppe</h3>
                          <div className="space-y-1">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox
                                defaultChecked
                                className="w-4 h-4 border border-gray-500 bg-white"
                              />
                              <span>Kind / Jugendliche*r</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Erwachsene Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Ältere Person</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>LGBTQIA+</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Menschen mit Behinderung</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <Checkbox className="w-4 h-4 border border-gray-500 bg-white" />
                              <span>Sonstige vulnerblen Gruppen</span>
                            </label>
                          </div>
                        </div>

                        {/* Bericht */}
                        <div className="bg-midblue p-2">
                          <h3 className="font-bold mb-1">Bericht</h3>
                          <Textarea
                            className="w-full h-24"
                            defaultValue="She just needed some company ..."
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Section */}
          <div className="relative mt-10">
            <div className="grid grid-cols-4 bg-gray-300 px-2 py-1 border-b border-gray-400 text-sm">
              <div className="table-header-gradient text-center font-bold text-md">
                Beratende
              </div>
              <div className="table-header-gradient text-center font-bold text-md">
                Zugehörigkeiten
              </div>
              <div className="table-header-gradient text-center font-bold text-md">
                Aktuell
              </div>
              <div className="table-header-gradient text-center font-bold text-md">
                Durchschnitt
              </div>
            </div>

            {/* Beratende Tabelle */}
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Status
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    ID
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Warteschlangen
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Anmeldezeit
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Dauer
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-2/12">
                    Agentenzustand
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    % Verfügbar
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Avg Busy In
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-1/12">
                    Avg Busy Out
                  </th>
                  <th className="table-header-gradient px-2 py-1 text-center font-bold w-2/12">
                    Avg Wrap-up
                  </th>
                </tr>
              </thead>
              <tbody>
                {agentData.map((agent, index) => (
                  <tr
                    key={index}
                    className="bg-midblue hover:bg-darkblue border-b border-gray-400"
                  >
                    <td className="px-2 py-1 text-center">
                      <div
                        className={cn(
                          "h-4 w-4 border border-white rounded-full mx-auto cursor-pointer transition-colors duration-200",
                          agent.status ? "bg-green" : "bg-red"
                        )}
                        onClick={() => toggleAgentStatus(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Berater-Status umschalten, aktuell ${
                          agent.status ? "aktiv" : "inaktiv"
                        }`}
                      ></div>
                    </td>
                    <td className="px-2 py-1">
                      <Link href="#" className="text-textblue">
                        <EditableCell
                          value={agent.id}
                          onChange={(value) =>
                            handleAgentDataChange(index, "id", value)
                          }
                          className="underline"
                        />
                      </Link>
                    </td>
                    <td className="px-2 py-1">
                      <Link href="#" className="text-textblue">
                        <EditableCell
                          value={agent.queues}
                          onChange={(value) =>
                            handleAgentDataChange(index, "queues", value)
                          }
                          className="underline"
                        />
                      </Link>
                    </td>
                    <td className="px-2 py-1">
                      <EditableCell
                        value={agent.loginTime}
                        onChange={(value) =>
                          handleAgentDataChange(index, "loginTime", value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <EditableCell
                        value={agent.duration}
                        onChange={(value) =>
                          handleAgentDataChange(index, "duration", value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <EditableCell
                        value={agent.state}
                        onChange={(value) =>
                          handleAgentDataChange(index, "state", value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <EditableCell
                        value={agent.available}
                        onChange={(value) =>
                          handleAgentDataChange(index, "available", value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <EditableCell
                        value={agent.avgBusyIn}
                        onChange={(value) =>
                          handleAgentDataChange(index, "avgBusyIn", value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <EditableCell
                        value={agent.avgBusyOut}
                        onChange={(value) =>
                          handleAgentDataChange(index, "avgBusyOut", value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <EditableCell
                        value={agent.avgWrapup}
                        onChange={(value) =>
                          handleAgentDataChange(index, "avgWrapup", value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
