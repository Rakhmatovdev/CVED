import { ExclamationCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

// import { useState } from "react"

// interface ProductionErrorCatcherProps {
//   error?: Error & { digest?: string };
//   reset?: () => void;
//   errorId?: string;
// }

export default function ProductionErrorPage() {
  // const [isReporting, setIsReporting] = useState(false)
  // const [reportSent, setReportSent] = useState(false)
  // const [userFeedback, setUserFeedback] = useState("")

  // const handleReportError = async () => {
  //   setIsReporting(true)

  //   // Simulate error reporting
  //   await new Promise(resolve => setTimeout(resolve, 2000))

  //   // In real implementation, send error report to your logging service
  //   console.log("Error reported:", {
  //     errorId,
  //     userFeedback,
  //     timestamp: new Date().toISOString(),
  //     userAgent: navigator.userAgent,
  //     url: window.location.href
  //   })

  //   setIsReporting(false)
  //   setReportSent(true)
  // }

  // const goHome = () => {
  //   window.location.href = "/"
  // }

  // const contactSupport = () => {
  //   window.location.href = "mailto:support@yourapp.com?subject=Error Report - " + errorId
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20"
          >
            <ExclamationCircleOutlined className="h-10 w-10 text-orange-600 dark:text-orange-400" />
          </motion.div>
          <h1 className="mb-3 font-bold text-4xl text-gray-900 dark:text-white">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 text-lg dark:text-gray-400">
            We're sorry for the inconvenience. Our team has been notified and is
            working on a fix.
          </p>
        </div>

        {/*<div className="mx-auto max-w-4xl space-y-6">*/}
        {/*    /!* Error Summary *!/*/}
        {/*    <motion.div*/}
        {/*        initial={{opacity: 0, x: -20}}*/}
        {/*        animate={{opacity: 1, x: 0}}*/}
        {/*        transition={{delay: 0.3}}*/}
        {/*        className="rounded-xl border border-orange-200 bg-white p-8 shadow-lg dark:border-orange-800/50 dark:bg-gray-800"*/}
        {/*    >*/}
        {/*        <div className="flex items-start gap-6">*/}
        {/*            <div*/}
        {/*                className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">*/}
        {/*                <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400"/>*/}
        {/*            </div>*/}
        {/*            <div className="flex-1">*/}
        {/*                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">*/}
        {/*                    We've encountered an unexpected error*/}
        {/*                </h3>*/}
        {/*                <p className="text-gray-600 dark:text-gray-300 mb-4">*/}
        {/*                    Don't worry - your data is safe and our team has been automatically notified. We're*/}
        {/*                    working to resolve*/}
        {/*                    this issue as quickly as possible.*/}
        {/*                </p>*/}
        {/*                <div className="flex items-center gap-4 text-sm">*/}
        {/*                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">*/}
        {/*                        <Clock className="h-4 w-4"/>*/}
        {/*                        <span>{new Date().toLocaleString()}</span>*/}
        {/*                    </div>*/}
        {/*                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">*/}
        {/*                        <User className="h-4 w-4"/>*/}
        {/*                        <span>Error ID: {errorId}</span>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </motion.div>*/}

        {/*    /!* What happened *!/*/}
        {/*    <motion.div*/}
        {/*        initial={{opacity: 0, x: 20}}*/}
        {/*        animate={{opacity: 1, x: 0}}*/}
        {/*        transition={{delay: 0.4}}*/}
        {/*        className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"*/}
        {/*    >*/}
        {/*        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">What can you do*/}
        {/*            now?</h3>*/}
        {/*        <div className="grid gap-4 md:grid-cols-2">*/}
        {/*            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">*/}
        {/*                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Try refreshing the*/}
        {/*                    page</h4>*/}
        {/*                <p className="text-sm text-gray-600 dark:text-gray-400">*/}
        {/*                    Sometimes a simple refresh can resolve temporary issues.*/}
        {/*                </p>*/}
        {/*            </div>*/}
        {/*            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">*/}
        {/*                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Go back to homepage</h4>*/}
        {/*                <p className="text-sm text-gray-600 dark:text-gray-400">*/}
        {/*                    Return to the main page and try navigating to your destination again.*/}
        {/*                </p>*/}
        {/*            </div>*/}
        {/*            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">*/}
        {/*                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Contact our support*/}
        {/*                    team</h4>*/}
        {/*                <p className="text-sm text-gray-600 dark:text-gray-400">*/}
        {/*                    If the problem persists, our support team is here to help.*/}
        {/*                </p>*/}
        {/*            </div>*/}
        {/*            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">*/}
        {/*                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Report this issue</h4>*/}
        {/*                <p className="text-sm text-gray-600 dark:text-gray-400">*/}
        {/*                    Help us improve by sharing what you were doing when this happened.*/}
        {/*                </p>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </motion.div>*/}

        {/*    /!* Feedback Section *!/*/}
        {/*    {!reportSent && (*/}
        {/*        <motion.div*/}
        {/*            initial={{opacity: 0, y: 20}}*/}
        {/*            animate={{opacity: 1, y: 0}}*/}
        {/*            transition={{delay: 0.5}}*/}
        {/*            className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"*/}
        {/*        >*/}
        {/*            <div className="flex items-center gap-3 mb-4">*/}
        {/*                <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400"/>*/}
        {/*                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Help us fix*/}
        {/*                    this</h3>*/}
        {/*            </div>*/}
        {/*            <p className="text-gray-600 dark:text-gray-400 mb-4">*/}
        {/*                Tell us what you were doing when this error occurred. Your feedback helps us improve the*/}
        {/*                experience for*/}
        {/*                everyone.*/}
        {/*            </p>*/}
        {/*            <textarea*/}
        {/*                value={userFeedback}*/}
        {/*                onChange={(e) => setUserFeedback(e.target.value)}*/}
        {/*                placeholder="What were you trying to do when this error happened? (Optional)"*/}
        {/*                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"*/}
        {/*                rows={3}*/}
        {/*            />*/}
        {/*            <button*/}
        {/*                onClick={handleReportError}*/}
        {/*                disabled={isReporting}*/}
        {/*                className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"*/}
        {/*            >*/}
        {/*                {isReporting ? (*/}
        {/*                    <>*/}
        {/*                        <div*/}
        {/*                            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"/>*/}
        {/*                        Sending...*/}
        {/*                    </>*/}
        {/*                ) : (*/}
        {/*                    <>*/}
        {/*                        <MessageCircle className="h-4 w-4"/>*/}
        {/*                        Send Feedback*/}
        {/*                    </>*/}
        {/*                )}*/}
        {/*            </button>*/}
        {/*        </motion.div>*/}
        {/*    )}*/}

        {/*    /!* Thank you message *!/*/}
        {/*    {reportSent && (*/}
        {/*        <motion.div*/}
        {/*            initial={{opacity: 0, scale: 0.95}}*/}
        {/*            animate={{opacity: 1, scale: 1}}*/}
        {/*            transition={{delay: 0.2}}*/}
        {/*            className="rounded-xl border border-green-200 bg-green-50 p-8 shadow-lg dark:border-green-800/50 dark:bg-green-900/10"*/}
        {/*        >*/}
        {/*            <div className="text-center">*/}
        {/*                <div*/}
        {/*                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">*/}
        {/*                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400"/>*/}
        {/*                </div>*/}
        {/*                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">*/}
        {/*                    Thank you for your feedback!*/}
        {/*                </h3>*/}
        {/*                <p className="text-green-700 dark:text-green-300">*/}
        {/*                    Your report has been sent to our team. We appreciate your help in making our app*/}
        {/*                    better.*/}
        {/*                </p>*/}
        {/*            </div>*/}
        {/*        </motion.div>*/}
        {/*    )}*/}

        {/*    /!* Actions *!/*/}
        {/*    <motion.div*/}
        {/*        initial={{opacity: 0, y: 20}}*/}
        {/*        animate={{opacity: 1, y: 0}}*/}
        {/*        transition={{delay: 0.6}}*/}
        {/*        className="flex flex-col gap-4 sm:flex-row sm:justify-center"*/}
        {/*    >*/}
        {/*        <button*/}
        {/*            onClick={reset}*/}
        {/*            className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"*/}
        {/*        >*/}
        {/*            <RefreshCw className="h-5 w-5"/>*/}
        {/*            Try Again*/}
        {/*        </button>*/}
        {/*        <button*/}
        {/*            onClick={goHome}*/}
        {/*            className="flex items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transform hover:scale-105"*/}
        {/*        >*/}
        {/*            <Home className="h-5 w-5"/>*/}
        {/*            Go Home*/}
        {/*        </button>*/}
        {/*        <button*/}
        {/*            onClick={contactSupport}*/}
        {/*            className="flex items-center justify-center gap-3 rounded-xl border-2 border-orange-300 bg-orange-50 px-8 py-4 font-semibold text-orange-700 transition-all hover:bg-orange-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:border-orange-600 dark:bg-orange-900/10 dark:text-orange-300 dark:hover:bg-orange-900/20 transform hover:scale-105"*/}
        {/*        >*/}
        {/*            <Mail className="h-5 w-5"/>*/}
        {/*            Contact Support*/}
        {/*        </button>*/}
        {/*    </motion.div>*/}

        {/*    /!* Additional Info *!/*/}
        {/*    <motion.div*/}
        {/*        initial={{opacity: 0}}*/}
        {/*        animate={{opacity: 1}}*/}
        {/*        transition={{delay: 0.8}}*/}
        {/*        className="text-center"*/}
        {/*    >*/}
        {/*        <p className="text-sm text-gray-500 dark:text-gray-400">*/}
        {/*            If you continue to experience issues, please include Error*/}
        {/*            ID <strong>{errorId}</strong> when contacting*/}
        {/*            support.*/}
        {/*        </p>*/}
        {/*    </motion.div>*/}
        {/*</div>*/}
      </motion.div>
    </div>
  );
}
