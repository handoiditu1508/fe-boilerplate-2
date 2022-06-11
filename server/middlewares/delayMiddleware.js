module.exports = function (delayMiliseconds) {
  return (req, res, next) => {
    setTimeout(next, 2000);
  }
}