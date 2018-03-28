// The secret key we use to sign JWT tokens when issuing them to a client
// or to verify the token someone sends us is valid
// TODO: Better understand if its safe to store this key on the filesystem
// of our server
export const FtJwtSecret: string = "1ae8ad85-7b98-4773-b003-105c420964cf";
