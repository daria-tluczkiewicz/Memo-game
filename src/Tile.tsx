import { memo } from "react";
import { animated, useSpring } from "@react-spring/web";
interface TileProps {
  tile: { image: string; id: number; individualKey: string },
  onFlippedChange: (key: string, id: number) => void,
  isFlipped: boolean
}

const Tile: React.FC<TileProps> = memo(({ tile, onFlippedChange, isFlipped }) => {
  
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${isFlipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  });
 
  
  
  

  return (
    <>
      <div
        key={tile.individualKey}
        className="tile"
        onClick={() => isFlipped? null : onFlippedChange(tile.individualKey, tile.id)}
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
})

export default Tile