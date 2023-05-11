pipeline {
  agent any
  stages {
    stage('Git') {
      steps {
        echo 'create db'
        git(url: 'https://github.com/StEugen/DRS', branch: 'main')
      }
    }

    stage('Create env') {
      steps {
        sh '''cd backend
touch .env
echo "HOST=46.151.28.239" >> .env
'''
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