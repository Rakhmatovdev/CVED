import {
  BugOutlined,
  CodeOutlined,
  CopyOutlined,
  DownOutlined,
  FileTextOutlined,
  ReloadOutlined,
  RightOutlined,
  WarningOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouteError } from "react-router";

export default function DevelopmentErrorPage() {
  const routeError = useRouteError();
  const error =
    routeError instanceof Error ? routeError : new Error("Unknown route error");

  const [isStackExpanded, setIsStackExpanded] = useState(true);
  const [isComponentStackExpanded, setIsComponentStackExpanded] =
    useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatStackTrace = (stack?: string) => {
    if (!stack) return [];
    return stack.split("\n").filter((line) => line.trim());
  };

  const getErrorType = (error: Error) => {
    return error.constructor.name || "Error";
  };

  const mockComponentStack = `
    at ErrorBoundary (./components/error-boundary.tsx:23:5)
    at Layout (./app/layout.tsx:15:3)
    at RootLayout (./app/layout.tsx:8:1)
    at App (./pages/_app.tsx:12:2)
  `.trim();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20"
          >
            <BugOutlined className="text-2xl text-red-600 dark:text-red-400" />
          </motion.div>
          <h1 className="mb-2 font-bold text-3xl text-gray-900 dark:text-white">
            Development Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            An error occurred during development. Here's what we know:
          </p>
        </div>

        <div className="mx-auto max-w-6xl space-y-6">
          {/* Error Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border border-red-200 bg-white p-6 shadow-sm dark:border-red-800 dark:bg-gray-800"
          >
            <div className="flex items-start gap-4">
              <WarningOutlined className="mt-1 text-xl text-red-500" />
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-red-100 px-2 py-1 font-medium text-red-800 text-xs dark:bg-red-900/20 dark:text-red-400">
                    {getErrorType(error)}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
                  {error.message || "Unknown error occurred"}
                </h3>
                <button
                  type="button"
                  onClick={() => copyToClipboard(error.message, "message")}
                  className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <CopyOutlined className="text-xs" />
                  {copiedSection === "message" ? "Copied!" : "Copy message"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stack Trace */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="border-gray-200 border-b p-4 dark:border-gray-700">
              <div
                // type="button"
                onClick={() => setIsStackExpanded(!isStackExpanded)}
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <CodeOutlined className="text-base text-gray-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Stack Trace
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(error.stack || "", "stack");
                    }}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <CopyOutlined className="text-xs" />
                  </button>
                  {isStackExpanded ? (
                    <DownOutlined className="text-base text-gray-400" />
                  ) : (
                    <RightOutlined className="text-base text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            {isStackExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="max-h-96 overflow-y-auto p-4">
                  <pre className="text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {formatStackTrace(error.stack).map((line, index) => (
                        <div
                          key={index}
                          className={`py-1 ${line.includes("at") ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          {line}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Component Stack */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="border-gray-200 border-b p-4 dark:border-gray-700">
              <div
                // type="button"
                onClick={() =>
                  setIsComponentStackExpanded(!isComponentStackExpanded)
                }
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <FileTextOutlined className="text-base text-gray-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Component Stack
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(mockComponentStack, "component");
                    }}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <CopyOutlined className="text-xs" />
                  </button>
                  {isComponentStackExpanded ? (
                    <DownOutlined className="text-base text-gray-400" />
                  ) : (
                    <RightOutlined className="text-base text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            {isComponentStackExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  <pre className="text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {mockComponentStack.split("\n").map((line, index) => (
                        <div
                          key={index}
                          className="py-1 text-purple-600 dark:text-purple-400"
                        >
                          {line}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Error Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Error Name
                </div>
                <p className="mt-1 text-gray-900 text-sm dark:text-white">
                  {error.name || "Unknown"}
                </p>
              </div>
              <div>
                <div className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                  Timestamp
                </div>
                <p className="mt-1 text-gray-900 text-sm dark:text-white">
                  {new Date().toLocaleString()}
                </p>
              </div>
              <div>
                <div className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                  User Agent
                </div>
                <p className="mt-1 text-gray-900 text-sm dark:text-white">
                  {navigator.userAgent.split(" ").slice(0, 3).join(" ")}...
                </p>
              </div>
              <div>
                <div className="block font-medium text-gray-700 text-sm dark:text-gray-300">
                  URL
                </div>
                <p className="mt-1 text-gray-900 text-sm dark:text-white">
                  {window.location.href}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ReloadOutlined className="text-base" />
              Try Again
            </button>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(
                  `Error: ${error.message}\n\nStack:\n${error.stack}\n\nComponent Stack:\n${mockComponentStack}`,
                  "full"
                )
              }
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <CopyOutlined className="text-base" />
              {copiedSection === "full" ? "Copied!" : "Copy All Details"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
