const utils = require('./utils')

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
  return newContracts
}

/**
 * Disassembles tree
 * @param {*} property
 * @param {*} name
 * @param {*} index
 */
function searchInteractiveNode(contracts, property, name, index, parent) {
  if (utils.isNotAtomicProposition(property.predicate)) {
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
      // quantifier
      children[0] = searchInteractiveNode(
        contracts,
        property.inputDefs[0],
        name,
        index + 1,
        newContract
      )
      // innerProperty
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
    newContract.statement.compiledChildren = children
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

module.exports = {
  calculateInteractiveNodes
}
