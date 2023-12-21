
import { animated, useSpring } from "@react-spring/web";

export default function Tile({ tile, onFlippedChange, isFlipped }) {
  
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${isFlipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  });
  console.log(isFlipped, tile.individualKey)


  // const flipTile = () => {
  //   const newState: boolean = true

  //   // if (flippedPair.length === 2) {
  //   //     newState = false
  //   //     onFlippedChange({}, tile.id)
  //   // }
  //   // if(flippedPair.length > 0 || flippedPair.length < 2){
  //   //   newState = true
  //   // }
  //   setFlipped(individualKey)

  //   newState? onFlippedChange(newState, tile.id) : null
  // }


  // console.log(flippedPair, 'to je nowe')
  // console.log(flipped, 'isflipped?')

  

  return (
    <>
      <div
        className="tile"
        onClick={() => onFlippedChange(tile.individualKey)}
        key={crypto.randomUUID()}
        id={tile.id.toString()}
      >
        <animated.div
          className="tile-front"
          style={{
            transform: transform,
          }}
        />
        <animated.div
          className="tile-back"
          dangerouslySetInnerHTML={{ __html: tile.image }}
          style={{
            transform: backTransform,
          }}
        />
      </div>
    </>
  );
}
