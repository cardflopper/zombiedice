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
      return "brain";
    case Dice.Steps:
      return "steps";
    case Dice.Shotgun:
      return "shotgun";
    default:
      return "Error";
  }
};

Dice.colorToString = function(color) {
  switch (color) {
    case Dice.Green:
      return "green";
    case Dice.Yellow:
      return "yellow";
    case Dice.Red:
      return "red";
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
