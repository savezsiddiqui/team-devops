pipeline {
  agent {
    node {
      label 'devc'
    }

  }
  stages {
    stage('build') {
      steps {
        build 'build'
      }
    }

  }
  environment {
    pipe1 = '1'
  }
}