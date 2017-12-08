// external imports
import 'babel-polyfill'
import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import mkdirp from 'mkdirp'
// local imports
import Schema from '../server/modules/api/schema'

graphql(Schema, introspectionQuery)
  .then(result => {
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      )
    } else {
      mkdirp(path.dirname(staticApiSchema), err => {
        // if something went wrong
        if (err) {
          throw new Error(err)
        }
        fs.writeFileSync('../build/schema.json', JSON.stringify(result, null, 2))
        console.log("Successfully built schema.")
      })
    }
  })
  .catch(console.error)
