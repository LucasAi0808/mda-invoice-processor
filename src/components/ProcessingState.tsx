'use client'

interface ProcessingStateProps {
  message: string
}

export default function ProcessingState({ message }: ProcessingStateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8">
      <div className="relative rounded-2xl border border-neutral-100 bg-white/80 backdrop-blur-sm">
        <div className="px-8 py-16 sm:px-12 sm:py-20 text-center">
          {/* Animated processing indicator */}
          <div className="relative mx-auto w-16 h-16">
            {/* Outer ring - slow pulse */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-100 animate-ping opacity-30" />

            {/* Middle ring */}
            <div className="absolute inset-2 rounded-full border-2 border-primary-200 animate-pulse" />

            {/* Inner core with dots */}
            <div className="absolute inset-0 flex items-center justify-center gap-1.5">
              <span className="dot-1 w-2 h-2 rounded-full bg-primary-500" />
              <span className="dot-2 w-2 h-2 rounded-full bg-primary-500" />
              <span className="dot-3 w-2 h-2 rounded-full bg-primary-500" />
            </div>
          </div>

          {/* Status message */}
          <div className="mt-8">
            <p className="text-[15px] font-medium text-neutral-700">
              {message}
            </p>
            <p className="mt-2 text-[13px] text-neutral-400">
              This may take a moment
            </p>
          </div>

          {/* Progress bar - indeterminate */}
          <div className="mt-8 mx-auto max-w-xs">
            <div className="h-1 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 animate-[shimmer_1.5s_ease-in-out_infinite]"
                style={{
                  animation: 'shimmer 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-primary-100 rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-primary-100 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-primary-100 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-primary-100 rounded-br" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  )
}
