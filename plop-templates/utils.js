exports.notEmpty = (name) => {
  return (v) => {
    if (!v || v.trim === '') {
      return `${name} is required`
    } else {
      return true
    }
  }
}

exports.toFirstUpper = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1)
}
