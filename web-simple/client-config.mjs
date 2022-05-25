import getProcessEnv from "./src/utils/process.mjs"

export default {
  // Sanity
  projectId: getProcessEnv('SANITY_PROJECT_ID') || 'eimtt5l8',
  dataset: getProcessEnv('SANITY_DATASET') || 'production',
  // Contentful
  space: getProcessEnv('CONTENTFUL_SPACE') || 'g8b53ixxksgn',
  environment: getProcessEnv('CONTENTFUL_ENVIRONMENT') || 'master', // defaults to 'master' if not set
  accessToken: getProcessEnv('CONTENTFUL_ACCESSTOKEN') || 'leqpIQnzE9tABjmAvrAmtXQRuutTUXZshvhGL4g0gEo',
}