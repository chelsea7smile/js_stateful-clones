'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = []; // create empty array with start state
  let currentState = { ...state }; // copy current state  to new object

  // use cycle `for of`and `switch case` method to iterate over actions
  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {}; // create an empty state object to clear
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key]; // remove keys currentState if they exists
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    // add copy of currentState to history
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
