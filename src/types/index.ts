export interface DeployConfig {
  projectName: any
  [propName: string]: DeployEnvConfig
}

export interface DeployEnvConfig {
  username: string
  password: string
  host: string
  localDir: string
  remoteDir: string
}
