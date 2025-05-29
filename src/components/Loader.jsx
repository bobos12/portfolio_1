import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="flex justify-center items-center">
        <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-[#915eff] mt-4">
          {progress.toFixed(2)}%
        </p>
      </div>
    </Html>
  )
}

export default Loader