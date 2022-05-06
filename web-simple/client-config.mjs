import getProcessEnv from "./src/utils/process.mjs"

export default {
  projectId: getProcessEnv('SANITY_PROJECT_ID') || 'eimtt5l8',
  dataset: getProcessEnv('SANITY_DATASET') || 'production'
  // projectId: 'eimtt5l8',
  // dataset: 'production'
}