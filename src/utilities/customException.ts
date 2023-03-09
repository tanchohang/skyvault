export function CredentialErrorException(message) {
  const error = new Error(message);
  return error;
}
