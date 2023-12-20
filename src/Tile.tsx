import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export default function Tile({ tile, onFlippedChange, flippedPair }) {
  const [flipped, setFlipped] = useState(false);
  
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${flipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  });


  const flipTile = () => {
    let newState: boolean = true

    if (flippedPair.length === 2) {
        newState = false
    }
    setFlipped(newState)

    newState? onFlippedChange(newState, tile.id) : null
  }


  console.log(flippedPair, 'to je nowe')
  console.log(flipped, 'isflipped?')

  

  return (
    <>
      <div
        className="tile"
        onClick={flipTile}
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
