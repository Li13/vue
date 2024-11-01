const fromUnit = 'rpx'
const viewportWidth = 750
const precision = 5

function createUnitRegexp(unit: string) {
  return new RegExp(
    '"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + unit,
    'g',
  )
}

const regex = createUnitRegexp(fromUnit)

export function rpxToVw(str: string): string {
  if (typeof str === 'string' && str.indexOf(fromUnit) > -1) {
    const value = str.replace(regex, createReplace())
    return value
  }
  return str
}

function createReplace() {
  return function (m: string, $1: string) {
    if (!$1) return m
    const pixels = parseFloat($1)
    const parsedVal = toFixed((pixels / viewportWidth) * 100, precision)
    return parsedVal === 0 ? '0' : parsedVal + 'vw'
  }
}

function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}
