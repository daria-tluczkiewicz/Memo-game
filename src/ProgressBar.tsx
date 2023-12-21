import { animated, useSpring } from "@react-spring/web";


interface ProgressBarProps {
    currentProgress: number,
    maxProgress: number
}


function ProgressBar({currentProgress, maxProgress}: ProgressBarProps) {

  const { width } = useSpring({
    width: Math.floor((currentProgress / maxProgress) * 100).toString() + "%",
    // width: Math.floor((progress.current / icons.length) * 100).toString() + '%',
    config: { duration: 300 },
  })
  console.log(currentProgress, maxProgress);

  return <animated.div className="progress-bar" style={{width}}></animated.div>
}

export default ProgressBar;
