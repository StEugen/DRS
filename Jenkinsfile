pipeline {
  agent any
  stages {
    stage('Git') {
      steps {
        git(url: 'https://github.com/StEugen/DRS', branch: 'main')
      }
    }

    stage('Unit test #1') {
      steps {
        sh '''cd backend
python3 manage.py test'''
      }
    }

  }
}