import React, { Component } from "react";
import "./App.css";
import Dice from "./Dice";
import Die from "./Die";

class App extends Component {
  state = {
    dicePool: [Dice.Start.Green, Dice.Start.Yellow, Dice.Start.Red],
    rolled: [],
    currentBrains: [],
    currentShotguns: [],
    currentStepsCount: 0,
    action: "click roll",
    rolls: 0,
    points: 0,
    turn: 1,
    status: "active"
  };

  handleCupClick = event => {
    if (
      this.state.action !== "click roll, or click next turn" &&
      this.state.action !== "click roll"
    ) {
      alert(this.state.action);
      return;
    }

    let action = this.state.action,
      status = this.state.status,
      rolls = this.state.rolls,
      dicePool = this.state.dicePool.slice(),
      previousSteps = this.state.rolled.slice();

    rolls++;

    //alert(`green:${green}, yellow:${yellow},red:${red}`);

    let reRolledSteps = [];
    if (previousSteps.length >= 0)
      for (let die of previousSteps) {
        reRolledSteps.push(this.rollColorDie(die.color));
      }

    let diceInCup = this.getTotalDice();
    let numToRoll = 3 - this.state.rolled.length;
    numToRoll = diceInCup >= numToRoll ? numToRoll : diceInCup;

    let newRolls = this.rollDice(numToRoll);
    let rolled = reRolledSteps.concat(newRolls);

    let currentStepsCount = this.countFace(rolled, Dice.Steps);
    let rolledShotgunCount = this.countFace(rolled, Dice.Shotgun);

    dicePool[Dice.Green] =
      Dice.Start.Green -
      this.countColor(rolled, Dice.Green) -
      this.countColor(this.state.currentBrains, Dice.Green) -
      this.countColor(this.state.currentShotguns, Dice.Green);
    dicePool[Dice.Yellow] =
      Dice.Start.Yellow -
      this.countColor(rolled, Dice.Yellow) -
      this.countColor(this.state.currentBrains, Dice.Yellow) -
      this.countColor(this.state.currentShotguns, Dice.Yellow);
    dicePool[Dice.Red] =
      Dice.Start.Red -
      this.countColor(rolled, Dice.Red) -
      this.countColor(this.state.currentBrains, Dice.Red) -
      this.countColor(this.state.currentShotguns, Dice.Red);

    if (rolledShotgunCount + this.state.currentShotguns.length >= 3) {
      status = "shotgunned!";
      action = "click on next turn";
    } else if (currentStepsCount === rolled.length) {
      action = "click roll";
      if (this.state.currentBrains.length > 0) action += ", or click next turn";
    } else action = "handle dice";

    this.setState({
      status,
      rolled,
      action,
      currentStepsCount,
      dicePool,
      rolls
    });
  };

  countFace(dice, face) {
    return dice.filter(i => i.face === face).length;
  }

  countColor(dice, color) {
    return dice.filter(i => i.color === color).length;
  }

  handleDieClick = (index, face, color) => {
    let rolled = this.state.rolled.slice(),
      currentBrains = this.state.currentBrains.slice(),
      currentShotguns = this.state.currentShotguns.slice(),
      action = this.state.action,
      status = this.state.status;

    switch (status) {
      case "active":
        if (face === Dice.Brain) {
          let newBrains = rolled.filter(i => i.face === Dice.Brain);
          rolled = rolled.filter(i => i.face !== Dice.Brain);
          currentBrains = currentBrains.concat(newBrains);
        } else if (face === Dice.Shotgun) {
          let newShotguns = rolled.filter(i => i.face === Dice.Shotgun);
          rolled = rolled.filter(i => i.face !== Dice.Shotgun);
          currentShotguns = currentShotguns.concat(newShotguns);
        }

        //if we have all steps it's time to roll
        if (rolled.filter(i => i.face !== Dice.Steps).length === 0) {
          action = "click roll";
          if (currentBrains.length > 0) action += ", or click next turn";
        }

        //no dice left in the cup and no steps remaining to roll
        if (this.getTotalDice() === 0 && rolled.length === 0) {
          action = "click next turn";
          status = "no more dice";
        }
        break;

      case "no more dice":
        alert("your turn is over!");
        break;
      case "shotgunned!":
        alert("you've been shotgunned! click next turn!");
        break;
      default:
        alert("handle Die click switch statement default encountered");
    }
    this.setState({ status, action, rolled, currentBrains, currentShotguns });
  };

  render = () => {
    return (
      <React.Fragment>
        <div className="container">
          <img className="banner" alt="logo" src="./images/logo.jpg" />
          <h2 className="info">
            Turn:
            {this.state.turn}, Roll:
            {this.state.rolls}, Pts:
            {this.state.points}, Brains:
            {this.state.currentBrains.length}
          </h2>

          <div className="action">
            Status:
            {this.state.status}, Action:
            {this.state.action}
          </div>

          <img
            alt="cup"
            onClick={this.handleCupClick}
            className="diceCup"
            src="./images/rolling_dice_cup.png"
          />
          <img
            alt="lock in brains"
            onClick={this.handleTurnClick}
            className="lock"
            src="./images/lock.png"
          />

          <div>
            Remaining Dice: Green:
            {this.state.dicePool[Dice.Green]}, Yellow:
            {this.state.dicePool[Dice.Yellow]}, Red:
            {this.state.dicePool[Dice.Red]}
          </div>

          <div className="diceGroup rolled">
            {this.state.rolled.map((i, index) => (
              <Die
                key={index}
                click={() => this.handleDieClick(index, i.face, i.color)}
                color={i.color}
                face={i.face}
              />
            ))}
          </div>
          <div className="diceGroup">
            {this.state.currentBrains.map((i, index) => (
              <Die key={index} color={i.color} face={i.face} />
            ))}
          </div>

          <div className="diceGroup">
            {this.state.currentShotguns.map((i, index) => (
              <Die key={index} color={i.color} face={i.face} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  };

  handleTurnClick = () => {
    if (this.state.action === "handle dice") {
      alert("you still have dice to handle!");
      return;
    } else if (this.state.action === "click roll") {
      alert(
        "you have no brains collected, no need to proceed to the next turn, instead, click roll!"
      );
      return;
    }

    let points = this.state.points;

    if (this.state.status !== "shotgunned!")
      points += this.state.currentBrains.length;

    let turn = this.state.turn + 1;
    if (points >= 13) {
      alert(
        "congrats, you won with " +
          points +
          " in " +
          this.state.turn +
          " turns! restarting game..."
      );
      points = 0;
      turn = 1;
    }

    this.setState({
      dicePool: [Dice.Start.Green, Dice.Start.Yellow, Dice.Start.Red],
      rolled: [],
      currentBrains: [],
      currentShotguns: [],
      currentSteps: 0,
      action: "click roll",
      rolls: 0,
      points: points,
      turn: turn,
      status: "active"
    });
  };

  getTotalDice = () => {
    return (
      this.state.dicePool[Dice.Green] +
      this.state.dicePool[Dice.Yellow] +
      this.state.dicePool[Dice.Red]
    );
  };

  rollColorDie(dieColor) {
    let result = [];

    let face = null;
    switch (dieColor) {
      case Dice.Green:
        face = Dice.GreenFaces[Math.floor(Math.random() * 6)];
        result = { color: Dice.Green, face: face };
        break;
      case Dice.Yellow:
        face = Dice.YellowFaces[Math.floor(Math.random() * 6)];
        result = { color: Dice.Yellow, face: face };
        break;
      case Dice.Red:
        face = Dice.RedFaces[Math.floor(Math.random() * 6)];
        result = { color: Dice.Red, face: face };
        break;
      default:
        break;
    }

    return result;
  }

  rollDice = (n = 3) => {
    if (this.getTotalDice() < 0) {
      alert("rolldice() ERROR: dice amount is negative");
      return [];
    }
    if (this.getTotalDice() === 0) {
      return [];
    }
    if (n === 0) return [];

    let dice = [];

    //fill the cup with different available dice, note we reduce the dice pool in each color by the fixed dice amounts
    for (let i = 0; i < this.state.dicePool[Dice.Green]; i++)
      dice.push(Dice.Green);
    for (let i = 0; i < this.state.dicePool[Dice.Yellow]; i++)
      dice.push(Dice.Yellow);
    for (let i = 0; i < this.state.dicePool[Dice.Red]; i++) dice.push(Dice.Red);

    //select the dice from the cup
    let tmp = [];

    //then the remaining non-step dice
    for (let i = 0; i < n; i++) {
      let r = Math.floor(Math.random() * dice.length); //0 to (dice.length-1)
      tmp.push(dice[r]);
    }

    let result = [];
    for (let dieColor of tmp) {
      let face = null;
      switch (dieColor) {
        case Dice.Green:
          face = Dice.GreenFaces[Math.floor(Math.random() * 6)];
          result.push({ color: Dice.Green, face: face });
          break;
        case Dice.Yellow:
          face = Dice.YellowFaces[Math.floor(Math.random() * 6)];
          result.push({ color: Dice.Yellow, face: face });
          break;
        case Dice.Red:
          face = Dice.RedFaces[Math.floor(Math.random() * 6)];
          result.push({ color: Dice.Red, face: face });
          break;
        default:
          break;
      }
    }
    return result;
  };
}

export default App;
