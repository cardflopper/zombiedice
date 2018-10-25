const Dice = {
  Brain: 0,
  Steps: 1,
  Shotgun: 2,
  Green: 0,
  Yellow: 1,
  Red: 2,

  Start: { Green: 6, Yellow: 4, Red: 3 }
};

Dice.faceToString = function(face) {
  switch (face) {
    case Dice.Brain:
      return "Brain";
    case Dice.Steps:
      return "Steps";
    case Dice.Shotgun:
      return "Shotgun";
    default:
      return "Error";
  }
};

Dice.colorToString = function(color) {
  switch (color) {
    case Dice.Green:
      return "Green";
    case Dice.Yellow:
      return "Yellow";
    case Dice.Red:
      return "Red";
    default:
      return "Error";
  }
};

Dice.GreenFaces = [
  Dice.Brain,
  Dice.Brain,
  Dice.Brain,
  Dice.Steps,
  Dice.Steps,
  Dice.Shotgun
];

Dice.YellowFaces = [
  Dice.Brain,
  Dice.Brain,
  Dice.Steps,
  Dice.Steps,
  Dice.Shotgun,
  Dice.Shotgun
];
Dice.RedFaces = [
  Dice.Brain,
  Dice.Steps,
  Dice.Steps,
  Dice.Shotgun,
  Dice.Shotgun,
  Dice.Shotgun
];

export default Dice;
