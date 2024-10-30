// this is for closing the process when testing, as the afterAll... method we used might not work on mongoose 6 => mongoose doesn't recommentd using jest.
// We also have to add "globalTeardown": "/thisfilepath" to the jest part of the package.json, just below "testEnvironment": "node"
module.exports = ()=>{
  process.exit(0)
}