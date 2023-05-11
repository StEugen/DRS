pipeline {
  agent any
  stages {
    stage('Create DB') {
      steps {
        echo 'create db'
      }
    }

    stage('Git') {
      steps {
        git(url: 'https://github.com/StEugen/DRS', branch: 'main')
      }
    }

    stage('Unit Testing') {
      steps {
        sh '''python3 -m pip install -r requirements.txt
cd backend
python3 manage.py test'''
      }
    }

    stage('DB destruction') {
      steps {
        echo 'destruct db'
      }
    }

  }
}