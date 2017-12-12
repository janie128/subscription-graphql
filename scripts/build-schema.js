// external imports
import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import mkdirp from 'mkdirp'
// local imports
import Schema from '../server/modules/api/schema'
import { staticApiSchema } from '../config/projectPaths'

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
        fs.writeFileSync(staticApiSchema, JSON.stringify(result, null, 2))
        console.log(`Successfully built schema in ${staticApiSchema}.`)
      })
    }
  })
  .catch(console.error)
