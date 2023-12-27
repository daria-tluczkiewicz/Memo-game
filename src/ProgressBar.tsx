import { animated, useSpring } from "@react-spring/web";


interface ProgressBarProps {
    currentProgress: number,
    maxProgress: number,
    key: string
}


function ProgressBar({currentProgress, maxProgress, key}: ProgressBarProps) {

  console.log('current progress: ',currentProgress);

  const currentProgress2: number = currentProgress / 2

  const { width } = useSpring({
    width: Math.floor((currentProgress2 / maxProgress) * 100).toString() + "%",
    // width: Math.floor((progress.current / icons.length) * 100).toString() + '%',
    config: { duration: 300 },
  })
  // console.log(currentProgress, maxProgress);

  return <animated.div key={key} className="progress-bar" style={{width}}></animated.div>
}

export default ProgressBar;
 