import { useAppSelector } from "@app/store";
import { TileType } from "@features/game-management/memoSlice";
import { animated, useSpring } from "@react-spring/web";
import { memo } from "react";

const Tile = ({ tile, isFlipped, onClick }: {
  tile: TileType,
  isFlipped: boolean,
  onClick: () => void
}) => {

  const gridSize = useAppSelector(state => state.memo.gridSize)
  const { id: tileId, imageSource } = tile

  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${isFlipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  })

  return (
    <>
      <div
        key={tileId}
        className="tile"
        onClick={onClick}
        id={tileId}
        style={{ width: `${100 / gridSize - 5}vw` }}
      >
        <animated.div
          className="tile-front"
          style={{
            transform: transform,
          }}
        />
        <animated.img
          className="tile-back"
          src={imageSource}
          style={{
            transform: backTransform,
          }}
        />
      </div>
    </>
  );
}

export default memo(Tile)