function calculateInteractiveNodes(properties) {
  return properties.reduce(
    (acc, p) => acc.concat(calculateInteractiveNodesPerProperty(p)),
    []
  )
}

function calculateInteractiveNodesPerProperty(p) {
  console.log(p)
  const name = p.dec.predicate
  const results = searchInteractiveNode(p.statement[0], name, 1)
  results.forEach(r => {
    genIsValidChallenge(r.statement)
  })
  return results
}

function searchInteractiveNode(p, name, index) {
  let results = []
  if (isNotAtomicProposition(p.predicate)) {
    results.push({
      dec: {
        predicate: name + '_' + index + '_compile',
        inputs: getArguments(p)
      },
      statement: p
    })
  }
  p.inputs.forEach(p => {
    if (typeof p == 'object' && !!p.predicate) {
      results = results.concat(searchInteractiveNode(p, name, index + 1))
    }
  })
  return results
}

function getArguments(property) {
  let args = []
  property.inputs.forEach(p => {
    if (typeof p == 'object' && !!p.predicate) {
      args = args.concat(getArguments(p))
    } else {
      args.push(p)
    }
  })
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

function genIsValidChallenge(property) {
  if (property.predicate == 'ForAllSuchThat') {
    property.isValidChallenge = {
      predicate: 'Not',
      inputs: [property.inputs[2]]
    }
  } else if (property.predicate == 'Not') {
    property.isValidChallenge = property.inputs[0]
  }
  property.inputs.forEach(p => {
    if (typeof p == 'object' && !!p.predicate) {
      genIsValidChallenge(p)
    } else {
    }
  })
}

module.exports = {
  calculateInteractiveNodes
}
