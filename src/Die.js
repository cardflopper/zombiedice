import React from "react";
import Dice from "./Dice";

const die = props => {
  let color = props.color,
    face = props.face;
  return (
    <img
      onClick={props.click}
      alt={Dice.colorToString(color) + "_" + Dice.faceToString(face)}
      src={
        "./images/" +
        Dice.colorToString(color) +
        "_" +
        Dice.faceToString(face) +
        ".png"
      }
    />
  );
};

export default die;
