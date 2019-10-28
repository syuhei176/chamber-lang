function isNotAtomicProposition(predicate) {
  return (
    predicate == 'ForAllSuchThat' ||
    predicate == 'ThereExistsSuchThat' ||
    predicate == 'Not' ||
    predicate == 'And' ||
    predicate == 'Or'
  )
}

function isAtomicProposition(predicate) {
  return !isNotAtomicProposition(predicate)
}

module.exports = {
  isAtomicProposition,
  isNotAtomicProposition
}
