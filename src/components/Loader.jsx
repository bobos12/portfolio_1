import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="w-16 h-16 border border-white/20 border-t-white/70 rounded-full animate-spin" />
        <p className="text-[12px] font-medium text-white/50 tracking-widest">
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  )
}

export default Loader
