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

function isComparisonPredicate(predicate) {
  return (
    predicate == 'assert' || predicate == 'gte' || predicate == 'checkAmount'
  )
}

function toCapitalCase(name) {
  return name[0].toUpperCase() + name.substr(1)
}

module.exports = {
  isAtomicProposition,
  isNotAtomicProposition,
  isComparisonPredicate,
  toCapitalCase
}
