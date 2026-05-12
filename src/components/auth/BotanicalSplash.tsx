export function PlantIllustration({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/tree-illustration.png"
      alt=""
      draggable={false}
      className={`block w-[600px] max-w-[90vw] h-auto select-none pointer-events-none ${className}`}
    />
  )
}

export { PlantIllustration as BotanicalSplash }
