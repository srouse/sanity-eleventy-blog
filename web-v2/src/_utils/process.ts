
export default function getProcessEnv(name) {
  if (
    typeof process !== 'undefined' &&
    typeof process.env !== 'undefined') {
    return process.env[name];
  }
  return undefined;
}