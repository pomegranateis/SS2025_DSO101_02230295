pipeline {
  agent any

  environment {
    DOCKER_CREDS = credentials('docker-hub-creds')
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build -t my-secure-app .'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW
          docker tag my-secure-app pomegranatei/my-secure-app
          docker push pomegranatei/my-secure-app
        '''
      }
    }
  }
}
