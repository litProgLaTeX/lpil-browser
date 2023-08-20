const fs = require('fs/promises')
const walk = require("@root/walk")
const yaml = require('yaml')
const lunr = require('lunr')
const path = require('path')
const process = require('process')
//const toml = require('@ltd/j-toml')

// setup and configure
const infoFiles2type = {
  'lpildesc.yaml' : 'desc',
  'lpilrefs.yaml' : 'refs',
  'lpilglos.yaml' : 'glos',
  'lpilmap.yaml'  : 'map'
}

const indexFields = {
  'desc' : [ 'title', 'shortTitle', 'description', 'keywords' ],
  'refs' : [ ],
  'glos' : [ ],
  'map'  : [ ]
}

const ignoreDirs = ['.', '.git', 'node_modules' ]

// helper functions ...
function reportError(msg, err=null) {
  console.log(msg)
  if (err) console.log(err)
  process.exit(1)
}

function expandUser(aPath) {
  if (aPath[0] == '~') {
    aPath = path.join(
      process.env.HOME,
      aPath.slice(1)
    )
  }
  return aPath
}

async function writeFile(aPath, contentsStr) {
  const fullPath = expandUser(aPath)
  await fs.mkdir(path.dirname(fullPath), { recursive : true })
  await fs.writeFile(fullPath, contentsStr)
}

var config = {}
async function loadConfig() {
  try {
    const configStr = await fs.readFile(path.join(
      process.env.HOME,
      '.config',
      'lpil',
      'collector.yaml'
    ))
    config = yaml.parse(decoder.decode(configStr))
  } catch(error) { 
    reportError(
      "No configuration file found at ~/.config/lpil/collector.yaml",
      error
    )
  }
}

// setup the lurn index builder
var lunrIndex = new lunr.Builder()
lunrIndex.ref('ref')
lunrIndex.field('text')

// setup the bytes->string decoder
const decoder = new TextDecoder()

// THE MAIN walking function
async function walkFunc(err, pathname, dirent) {
  if (err) throw err

  const fileName = dirent.name.toLowerCase()
  if (dirent.isDirectory() && ignoreDirs.includes(fileName)) {
    return false;
  }

  if (fileName in infoFiles2type) {
    console.log("  FOUND", dirent.name, "in", pathname)

    const yamlStr = await fs.readFile(dirent.name)
    var infoObjs = yaml.parse(decoder.decode(yamlStr))
    if (!Array.isArray(infoObjs)) infoObjs = [ infoObjs ]

    for await (const anInfoObj of infoObjs) {

      if (!('ref' in anInfoObj)) continue

      const infoType = infoFiles2type[fileName]
      const theRefID = anInfoObj['ref']

      // add this object to the lpilInfo repository
      writeFile(
        path.join(config['jsonDir'], infoType, theRefID+'.json'),
        JSON.stringify(anInfoObj)
      )

      // compute the potential text to be indexed
      const fields = []
      for (const aField of indexFields[infoType]) {
        if (aField in anInfoObj) fields.push(anInfoObj[aField])
      }
      const theText = fields.join(" ")

      // add this object to the index...
      if (theText) lunrIndex.add({
        'ref'  : anInfoObj['ref'],
        'text' : theText
      })
    }
  }
};

async function main() {
  await loadConfig()

  if (!('jsonDir' in config)) reportError(
    "No output JSON direcotry specified in the collector.yaml configuration"
  )

  try {
    await fs.mkdir(expandUser(config['jsonDir']), { recursive: true })
  } catch(error) {
    reportError(
      `Could not create the JSON directory [${config['jsonDir']}]`, 
      error
    )
  }

  if (!('docDirs' in config)) reportError(
    "No document directories specified in the collector.yaml configuration"
  )
  var docDirs = config['docDirs']
  if (!Array.isArray(docDirs)) docDirs = [ docDirs ]

  for await (var aDir of docDirs) {
    console.log(`\nCollecting LPiL info from [${aDir}]`)

    const theCWD = process.cwd()
    try {
      process.chdir(expandUser(aDir))
    } catch(error) {
      console.log(`Could not change directory to [${aDir}]`)
      console.log("... ignoring this directory")
      continue
    }

    await walk.walk('./', walkFunc, null)

    process.chdir(theCWD)
  }

  writeFile(
    path.join(config['jsonDir'], 'lunrIndex.json'),
    JSON.stringify(lunrIndex.build())
  )
  console.log("\nDone");
}

main().finally()

