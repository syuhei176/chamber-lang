function calculateInteractiveNodes(properties) {
  return properties.reduce(
    (acc, p) => acc.concat(calculateInteractiveNodesPerProperty(p)),
    []
  )
}

function calculateInteractiveNodesPerProperty(p) {
  const name = p.dec.predicate
  let newContracts = []
  const rootContract = searchInteractiveNode(
    newContracts,
    p.statement[0],
    name,
    1,
    p
  )
  newContracts.forEach(r => {
    genIsValidChallenge(r.statement, name, 1)
  })
  return newContracts
}

/**
 * Disassembles tree
 * @param {*} property
 * @param {*} name
 * @param {*} index
 */
function searchInteractiveNode(contracts, property, name, index, parent) {
  if (isNotAtomicProposition(property.predicate)) {
    const newContract = {
      dec: {
        predicate: name + '_' + index + '_compile',
        inputDefs: getArguments(property),
        inputs: getInputIndex(parent.dec.inputDefs, getArguments(property))
      },
      statement: property
    }
    let children = []
    if (
      property.predicate == 'ForAllSuchThat' ||
      property.predicate == 'ThereExistsSuchThat'
    ) {
      children[2] = searchInteractiveNode(
        contracts,
        property.inputDefs[2],
        name,
        index + 1,
        newContract
      )
    } else if (
      property.predicate == 'And' ||
      property.predicate == 'Or' ||
      property.predicate == 'Not'
    ) {
      property.inputDefs.forEach((p, i) => {
        children[i] = searchInteractiveNode(
          contracts,
          p,
          name,
          index + 1,
          newContract
        )
      })
    }
    property.compiledChildren = children
    // If not atomic proposition, generate a contract
    contracts.push(newContract)
    return newContract
  } else {
    return {
      dec: {
        predicate: property.predicate,
        inputDefs: property.inputDefs,
        inputs: getInputIndex(parent.dec.inputDefs, property.inputDefs)
      }
    }
  }
}

function getInputIndex(inputDefs, inputs) {
  return inputs.map(name => {
    return inputDefs.indexOf(name)
  })
}

function getArguments(property) {
  let args = []
  if (
    property.predicate == 'ForAllSuchThat' ||
    property.predicate == 'ThereExistsSuchThat'
  ) {
    args = args.concat(getArguments(property.inputDefs[0]))
    const variable = property.inputDefs[1]
    const innerArgs = getArguments(property.inputDefs[2])
    args = args.concat(innerArgs.filter(a => a != variable))
  } else {
    property.inputDefs.forEach(p => {
      if (typeof p == 'object' && !!p.predicate) {
        args = args.concat(getArguments(p))
      } else {
        args.push(p)
      }
    })
  }
  return args
}

function isNotAtomicProposition(predicate) {
  return (
    predicate == 'ForAllSuchThat' ||
    predicate == 'ThereExistsSuchThat' ||
    predicate == 'Not' ||
    predicate == 'And' ||
    predicate == 'Or'
  )
}

function genIsValidChallenge(property, name, index) {
  if (property.predicate == 'ForAllSuchThat') {
    property.isValidChallenge = {
      predicate: 'Not',
      inputs: [property.compiledChildren[0]],
      challengeInput: property.inputDefs[1]
    }
  } else if (property.predicate == 'Not') {
    property.isValidChallenge = property.compiledChildren[0]
  } else if (property.predicate == 'And') {
    property.isValidChallenge = {
      predicate: 'Not',
      inputs: property.compiledChildren,
      challengeInput: 0
    }
  }
  property.inputDefs.forEach(p => {
    if (typeof p == 'object' && !!p.predicate) {
      genIsValidChallenge(p, name, index + 1)
    } else {
    }
  })
}

module.exports = {
  calculateInteractiveNodes
}
